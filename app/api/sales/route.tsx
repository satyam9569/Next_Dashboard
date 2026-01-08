import { NextResponse } from "next/server";

export async function GET() {
  // random data for cards
  return NextResponse.json({
    totalSales: Math.floor(Math.random() * 10000),
    lastMonthSales: Math.floor(Math.random() * 10000),
    orders: Math.floor(Math.random() * 5000),
    returns: Math.floor(Math.random() * 500),
  });
}
