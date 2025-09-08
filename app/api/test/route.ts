import { createCompleteMatch, createMatch } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow all origins (use specific origin in production)
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const loser = searchParams.get("loser");
    const winner = searchParams.get("winner");
    if (loser && winner) {
      await createCompleteMatch(
        loser,
        winner,
        winner,
        "aviral",
        "0x34tg4fd4f3",
        "23"
      );
    }
    return NextResponse.json(
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Same here
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
