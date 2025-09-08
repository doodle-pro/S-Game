import { NextResponse } from "next/server";
import { getBetsByUserId, createBet, updateBet } from "@/lib/db/queries";

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

    const bets = await getBetsByUserId(userId);

    return NextResponse.json({ bets });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to fetch bets" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { bet_user, matchId, amount, predict_user } = await req.json();

    if (!bet_user || !matchId || !amount || !predict_user) {
      return NextResponse.json(
        { error: "bet_user, match_id, predict_user and amount are required" },
        { status: 400 }
      );
    }

    await createBet({ bet_user, match_id: matchId, amount, predict_user });

    return NextResponse.json({ message: "Bet created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create bet" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { betId, updates } = await req.json();

    if (!betId || !updates) {
      return NextResponse.json(
        { error: "Bet ID and updates are required" },
        { status: 400 }
      );
    }

    await updateBet(betId, updates);

    return NextResponse.json({ message: "Bet updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update bet" },
      { status: 500 }
    );
  }
}
