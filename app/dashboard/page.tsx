"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Globe, TrendingUp, Smartphone, Monitor, Tablet, Clock } from "lucide-react";
import Link from "next/link";

interface AnalyticsData {
  overview: {
    totalVisitors: number;
    totalSubmissions: number;
    conversionRate: number;
    periodVisitors: number;
    periodSubmissions: number;
    periodConversionRate: number;
  };
  countries: {
    visitors: Array<{ country: string; _count: number }>;
    submissions: Array<{ country: string; _count: number }>;
  };
  trends: {
    daily: {
      visitors: Array<{ date: string; count: number }>;
      submissions: Array<{ date: string; count: number }>;
    };
  };
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  recent: {
    visitors: Array<{
      id: string;
      country: string | null;
      city: string | null;
      createdAt: Date;
      userAgent: string | null;
    }>;
    submissions: Array<{
      id: string;
      name: string;
      phone: string;
      country: string | null;
      city: string | null;
      createdAt: Date;
    }>;
  };
  period: string;
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?period=${period}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Set default empty data on error
      setAnalytics({
        overview: {
          totalVisitors: 0,
          totalSubmissions: 0,
          conversionRate: 0,
          periodVisitors: 0,
          periodSubmissions: 0,
          periodConversionRate: 0,
        },
        countries: {
          visitors: [],
          submissions: [],
        },
        trends: {
          daily: {
            visitors: [],
            submissions: [],
          }
        },
        devices: {
          mobile: 0,
          desktop: 0,
          tablet: 0,
        },
        recent: {
          visitors: [],
          submissions: [],
        },
        period: period,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDevice = (ua: string | null) => {
    if (!ua) return 'Unknown';
    const lower = ua.toLowerCase();
    if (lower.includes('mobile') || lower.includes('android') || lower.includes('iphone')) return 'Mobile';
    if (lower.includes('tablet') || lower.includes('ipad')) return 'Tablet';
    return 'Desktop';
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  const totalDevices = (analytics?.devices.mobile || 0) + (analytics?.devices.desktop || 0) + (analytics?.devices.tablet || 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here&apos;s your overview</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* Period Selector */}
            <div className="flex gap-2">
              <Button
                variant={period === "7d" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("7d")}
              >
                7 Days
              </Button>
              <Button
                variant={period === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("30d")}
              >
                30 Days
              </Button>
              <Button
                variant={period === "90d" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("90d")}
              >
                90 Days
              </Button>
            </div>
            
            <Link href="/dashboard/submissions">
              <Button variant="outline">View Submissions</Button>
            </Link>
            <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/login" })}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.overview.totalVisitors || 0}</div>
              <p className="text-xs text-muted-foreground">
                {analytics?.overview.periodVisitors || 0} in last {period}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.overview.totalSubmissions || 0}</div>
              <p className="text-xs text-muted-foreground">
                {analytics?.overview.periodSubmissions || 0} in last {period}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.overview.conversionRate || 0}%</div>
              <p className="text-xs text-muted-foreground">
                {analytics?.overview.periodConversionRate || 0}% in period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics?.countries.visitors.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Unique countries</p>
            </CardContent>
          </Card>
        </div>

        {/* Device Breakdown & Daily Trend */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Visitors by device type (last {period})</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Mobile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{analytics?.devices.mobile || 0}</span>
                    <Badge variant="secondary">
                      {totalDevices > 0 ? Math.round(((analytics?.devices.mobile || 0) / totalDevices) * 100) : 0}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Desktop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{analytics?.devices.desktop || 0}</span>
                    <Badge variant="secondary">
                      {totalDevices > 0 ? Math.round(((analytics?.devices.desktop || 0) / totalDevices) * 100) : 0}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tablet className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Tablet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{analytics?.devices.tablet || 0}</span>
                    <Badge variant="secondary">
                      {totalDevices > 0 ? Math.round(((analytics?.devices.tablet || 0) / totalDevices) * 100) : 0}%
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>Total Devices</span>
                    <span>{totalDevices}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Trend Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Trends</CardTitle>
              <CardDescription>Last 7 days activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analytics?.trends.daily.visitors.slice(-7).map((day, index) => {
                  const submission = analytics.trends.daily.submissions.slice(-7)[index];
                  return (
                    <div key={day.date} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-blue-500" />
                          <span>{day.count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-green-500" />
                          <span>{submission?.count || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Countries */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Visitor Countries</CardTitle>
              <CardDescription>Countries with most visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.countries.visitors.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="text-sm font-medium">{item.country || "Unknown"}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item._count} visitors</span>
                  </div>
                ))}
                {analytics?.countries.visitors.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No data yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Submission Countries</CardTitle>
              <CardDescription>Countries with most submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.countries.submissions.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="text-sm font-medium">{item.country || "Unknown"}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item._count} submissions</span>
                  </div>
                ))}
                {analytics?.countries.submissions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No data yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Visitors</CardTitle>
              <CardDescription>Latest 10 visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics?.recent.visitors.map((visitor) => (
                  <div key={visitor.id} className="flex items-start justify-between text-sm border-b pb-2 last:border-0">
                    <div>
                      <div className="font-medium">
                        {visitor.city || 'Unknown'}, {visitor.country || 'Unknown'}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(visitor.createdAt)}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatDevice(visitor.userAgent)}
                    </Badge>
                  </div>
                ))}
                {analytics?.recent.visitors.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No visitors yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Latest 10 form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics?.recent.submissions.map((submission) => (
                  <div key={submission.id} className="flex items-start justify-between text-sm border-b pb-2 last:border-0">
                    <div>
                      <div className="font-medium">{submission.name}</div>
                      <div className="text-xs text-muted-foreground">{submission.phone}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(submission.createdAt)}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {submission.country || 'Unknown'}
                    </Badge>
                  </div>
                ))}
                {analytics?.recent.submissions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No submissions yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
