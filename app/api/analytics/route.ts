import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d"; // 7d, 30d, 90d

    // Calculate date range
    const now = new Date();
    const startDate = new Date();

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
    const totalVisitors = await prisma.visitor.count();
    const totalSubmissions = await prisma.submission.count();

    // Get visitors by country
    const visitorsByCountry = await prisma.visitor.groupBy({
      by: ['country'],
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: 'desc'
        }
      },
      take: 10,
    });

    // Get submissions by country
    const submissionsByCountry = await prisma.submission.groupBy({
      by: ['country'],
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: 'desc'
        }
      },
      take: 10,
    });

    // Calculate conversion rate
    const conversionRate = totalVisitors > 0
      ? ((totalSubmissions / totalVisitors) * 100).toFixed(2)
      : "0";

    // Format country data for response
    const formattedVisitors = visitorsByCountry.map(item => ({
      country: item.country || 'Unknown',
      _count: item._count.country,
    }));

    const formattedSubmissions = submissionsByCountry.map(item => ({
      country: item.country || 'Unknown',
      _count: item._count.country,
    }));

    return NextResponse.json({
      overview: {
        totalVisitors,
        totalSubmissions,
        conversionRate: parseFloat(conversionRate),
      },
      countries: {
        visitors: formattedVisitors,
        submissions: formattedSubmissions,
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
