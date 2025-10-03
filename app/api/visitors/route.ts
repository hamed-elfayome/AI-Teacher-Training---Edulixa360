import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const visitor = await prisma.visitor.create({
      data: {
        ip: body.ip || "Unknown",
        city: body.city || null,
        region: body.region || null,
        country: body.country || null,
        countryCode: body.countryCode || null,
        timezone: body.timezone || null,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
        org: body.org || null,
        userAgent: body.userAgent || null,
      },
    });

    return NextResponse.json({ success: true, data: visitor }, { status: 201 });
  } catch (error) {
    console.error("Error creating visitor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track visitor" },
      { status: 500 }
    );
  }
}
