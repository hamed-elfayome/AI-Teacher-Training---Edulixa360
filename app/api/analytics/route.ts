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

    // Get total visitors and submissions (all time)
    const totalVisitors = await prisma.visitor.count();
    const totalSubmissions = await prisma.submission.count();

    // Get period-based counts
    const periodVisitors = await prisma.visitor.count({
      where: { createdAt: { gte: startDate } }
    });
    const periodSubmissions = await prisma.submission.count({
      where: { createdAt: { gte: startDate } }
    });

    // Get visitors by country
    const visitorsByCountry = await prisma.visitor.groupBy({
      by: ['country'],
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    });

    // Get submissions by country
    const submissionsByCountry = await prisma.submission.groupBy({
      by: ['country'],
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    });

    // Get recent visitors (last 10)
    const recentVisitors = await prisma.visitor.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        country: true,
        city: true,
        createdAt: true,
        userAgent: true,
      }
    });

    // Get recent submissions (last 10)
    const recentSubmissions = await prisma.submission.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        phone: true,
        country: true,
        city: true,
        createdAt: true,
      }
    });

    // Get daily visitors for the period (simplified - last 30 days max)
    const daysToShow = Math.min(30, Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const dailyVisitors = [];
    const dailySubmissions = [];
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const dayStart = new Date(now);
      dayStart.setDate(now.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const [visitorsCount, submissionsCount] = await Promise.all([
        prisma.visitor.count({
          where: {
            createdAt: { gte: dayStart, lte: dayEnd }
          }
        }),
        prisma.submission.count({
          where: {
            createdAt: { gte: dayStart, lte: dayEnd }
          }
        })
      ]);

      dailyVisitors.push({
        date: dayStart.toISOString().split('T')[0],
        count: visitorsCount
      });
      
      dailySubmissions.push({
        date: dayStart.toISOString().split('T')[0],
        count: submissionsCount
      });
    }

    // Device breakdown (parse userAgent)
    const allVisitors = await prisma.visitor.findMany({
      select: { userAgent: true },
      where: { createdAt: { gte: startDate } }
    });

    let mobileCount = 0;
    let desktopCount = 0;
    let tabletCount = 0;

    allVisitors.forEach(v => {
      const ua = v.userAgent?.toLowerCase() || '';
      if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
        mobileCount++;
      } else if (ua.includes('tablet') || ua.includes('ipad')) {
        tabletCount++;
      } else {
        desktopCount++;
      }
    });

    // Calculate conversion rates
    const conversionRate = totalVisitors > 0
      ? ((totalSubmissions / totalVisitors) * 100).toFixed(2)
      : "0";

    const periodConversionRate = periodVisitors > 0
      ? ((periodSubmissions / periodVisitors) * 100).toFixed(2)
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
        periodVisitors,
        periodSubmissions,
        periodConversionRate: parseFloat(periodConversionRate),
      },
      countries: {
        visitors: formattedVisitors,
        submissions: formattedSubmissions,
      },
      trends: {
        daily: {
          visitors: dailyVisitors,
          submissions: dailySubmissions,
        }
      },
      devices: {
        mobile: mobileCount,
        desktop: desktopCount,
        tablet: tabletCount,
      },
      recent: {
        visitors: recentVisitors,
        submissions: recentSubmissions,
      },
      period: period,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
