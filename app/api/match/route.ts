import { NextResponse } from "next/server";
import { createMatch, getMatchesByUserId, updateMatch } from "@/lib/db/queries";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const matches = await getMatchesByUserId(userId);

    return NextResponse.json({ matches });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { player_1, player_2 } = await req.json();

    if (!player_1 || !player_2) {
      return NextResponse.json(
        { error: "Both player_1 and player_2 IDs are required" },
        { status: 400 }
      );
    }

    await createMatch(player_1, player_2);

    return NextResponse.json({ message: "Match created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create match" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { matchId, updates } = await req.json();

    if (!matchId || !updates) {
      return NextResponse.json(
        { error: "Match ID and updates are required" },
        { status: 400 }
      );
    }

    await updateMatch(matchId, updates);

    return NextResponse.json({ message: "Match updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update match" },
      { status: 500 }
    );
  }
}
