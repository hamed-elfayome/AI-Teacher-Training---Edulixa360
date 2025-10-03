"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Globe, TrendingUp } from "lucide-react";
import Link from "next/link";

interface AnalyticsData {
  overview: {
    totalVisitors: number;
    totalSubmissions: number;
    conversionRate: number;
  };
  countries: {
    visitors: Array<{ country: string; _count: number }>;
    submissions: Array<{ country: string; _count: number }>;
  };
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics?period=30d");
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here&apos;s your overview</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard/submissions">
              <Button variant="outline">View Submissions</Button>
            </Link>
            <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/login" })}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.overview.totalVisitors || 0}</div>
              <p className="text-xs text-muted-foreground">Total page visitors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.overview.totalSubmissions || 0}</div>
              <p className="text-xs text-muted-foreground">Total registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.overview.conversionRate || 0}%</div>
              <p className="text-xs text-muted-foreground">Visitor to submission</p>
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
                    <span className="text-sm font-medium">{item.country || "Unknown"}</span>
                    <span className="text-sm text-muted-foreground">{item._count}</span>
                  </div>
                ))}
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
                    <span className="text-sm font-medium">{item.country || "Unknown"}</span>
                    <span className="text-sm text-muted-foreground">{item._count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
