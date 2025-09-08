import { NextResponse } from "next/server";
import { getMatches } from "@/lib/db/queries";

// for the make bet page
export async function GET(req: Request) {
  try {
    const matches = await getMatches();
    return NextResponse.json({ matches });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
