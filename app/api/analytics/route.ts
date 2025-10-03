import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d"; // 7d, 30d, 90d

    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case "7d":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(now.getDate() - 90);
        break;
    }

    // Get total visitors and submissions
    const [totalVisitors, totalSubmissions, visitorsByCountry, submissionsByCountry] = await Promise.all([
      prisma.visitor.count(),
      prisma.submission.count(),
      prisma.visitor.groupBy({
        by: ['country'],
        _count: true,
        orderBy: {
          _count: {
            country: 'desc'
          }
        },
        take: 10,
      }),
      prisma.submission.groupBy({
        by: ['country'],
        _count: true,
        orderBy: {
          _count: {
            country: 'desc'
          }
        },
        take: 10,
      }),
    ]);

    // Get daily visitors trend
    const dailyVisitors = await prisma.$queryRaw`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM "Visitor"
      WHERE created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Get daily submissions trend
    const dailySubmissions = await prisma.$queryRaw`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM "Submission"
      WHERE created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Calculate conversion rate
    const conversionRate = totalVisitors > 0
      ? ((totalSubmissions / totalVisitors) * 100).toFixed(2)
      : "0";

    return NextResponse.json({
      overview: {
        totalVisitors,
        totalSubmissions,
        conversionRate: parseFloat(conversionRate),
      },
      countries: {
        visitors: visitorsByCountry,
        submissions: submissionsByCountry,
      },
      trends: {
        visitors: dailyVisitors,
        submissions: dailySubmissions,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
