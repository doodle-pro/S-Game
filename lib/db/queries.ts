import "server-only";
import { eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { Bet, bet, match, Match, user, type User } from "./schema";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

/**
 * Fetch a user by their public wallet address.
 */
export async function getUserByPublicAddress(
  publicAddress: string
): Promise<Array<User>> {
  try {
    return await db
      .select()
      .from(user)
      .where(eq(user.publicAddress, publicAddress));
  } catch (error) {
    console.error("Failed to get user by public address");
    throw error;
  }
}

/**
 * Clear the crypto nonce and its expiry for a given user.
 */
export async function clearUserNonce(userId: string): Promise<void> {
  try {
    await db
      .update(user)
      .set({
        cryptoNonce: null,
        cryptoNonceExpires: null,
      })
      .where(eq(user.id, userId));
  } catch (error) {
    console.error("Failed to clear user nonce");
    throw error;
  }
}

/**
 * Upsert the user's crypto nonce data.
 * If a user with the given publicAddress exists, update their nonce;
 * otherwise, insert a new user record with the provided data.
 */
export async function upsertUserNonce({
  balance,
  publicAddress,
  cryptoNonce,
  cryptoNonceExpires,
}: {
  publicAddress: string;
  cryptoNonce: string;
  cryptoNonceExpires: string;
  balance?: string;
}): Promise<void> {
  try {
    const existingUsers = await getUserByPublicAddress(publicAddress);
    const expiryDate = new Date(cryptoNonceExpires); // Convert string to Date

    if (existingUsers.length > 0) {
      // Update the existing user's nonce data
      await db
        .update(user)
        .set({
          balance,
          cryptoNonce,
          cryptoNonceExpires: expiryDate,
        })
        .where(eq(user.publicAddress, publicAddress));
    } else {
      // Insert a new user with the public address and nonce data
      await db.insert(user).values({
        balance,
        publicAddress,
        cryptoNonce,
        cryptoNonceExpires: expiryDate,
      });
    }
  } catch (error) {
    console.error("Failed to upsert user nonce");
    throw error;
  }
}

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

// export async function createUser(email: string, password: string) {
//   const salt = genSaltSync(10);
//   const hash = hashSync(password, salt);

//   try {
//     return await db.insert(user).values({ email, password: hash });
//   } catch (error) {
//     console.error('Failed to create user in database');
//     throw error;
//   }
// }

/**
 * Fetch all matches for a given user ID (as player 1 or player 2).
 */
export async function getMatchesByUserId(
  userId: string
): Promise<Array<Match>> {
  try {
    return await db
      .select()
      .from(match)
      .where(or(eq(match.player_1, userId), eq(match.player_2, userId)));
  } catch (error) {
    console.error("Failed to get matches for user ID", userId);
    throw error;
  }
}

/**
 * Fetch all matches with status 'open'.
 */
export async function getMatches(): Promise<Array<Match>> {
  try {
    return await db.select().from(match).where(eq(match.is_status, "open"));
  } catch (error) {
    console.error("Failed to get open matches");
    throw error;
  }
}

/**
 * Create a match given player_1 ID and player_2 ID.
 */
export async function createMatch(
  player1Id: string,
  player2Id: string
): Promise<string> {
  try {
    await db.insert(match).values({
      player_1: player1Id,
      player_2: player2Id,
      date: new Date(),
    });
    return "Success";
  } catch (error) {
    console.error("Failed to create match");
    throw error;
  }
}

/**
 * Create a complete match
 */
export async function createCompleteMatch(
  player1Id: string,
  player2Id: string,
  winner?: string,
  nft_name?: string,
  nft_token?: string,
  nft_id?: string
): Promise<string> {
  try {
    await db.insert(match).values({
      player_1: player1Id,
      player_2: player2Id,
      winner_id: winner,
      nft_id,
      nft_name,
      nft_token,
      is_status: "closed",
      date: new Date(),
    });
    return "Success";
  } catch (error) {
    console.error("Failed to create match");
    throw error;
  }
}

/**
 * Update a match with the given ID.
 * Allows updating any combination of the following fields:
 * - nft_token
 * - nft_id
 * - winner_id
 * - nft_name
 * - is_status
 */
export async function updateMatch(
  matchId: string,
  updates: {
    nft_token?: string;
    nft_id?: string;
    winner_id?: string;
    nft_name?: string;
    is_status?: string;
  }
): Promise<void> {
  try {
    await db
      .update(match)
      .set({
        ...updates,
      })
      .where(eq(match.id, matchId));
  } catch (error) {
    console.error("Failed to update match", matchId);
    throw error;
  }
}

/**
 * Fetch all bets for a given user ID.
 */
export async function getBetsByUserId(userId: string): Promise<Array<Bet>> {
  try {
    return await db.select().from(bet).where(eq(bet.bet_user, userId));
  } catch (error) {
    console.error("Failed to get bets for user ID", userId);
    throw error;
  }
}

/**
 * Create a new bet.
 */
export async function createBet({
  bet_user,
  match_id,
  amount,
  predict_user,
}: {
  bet_user: string;
  match_id: string;
  predict_user: string;
  amount: string;
}): Promise<void> {
  try {
    await db.insert(bet).values({
      bet_user,
      predict_user,
      match: match_id,
      amount,
      date: new Date(),
    });
  } catch (error) {
    console.error("Failed to create bet", error);
    throw error;
  }
}

/**
 * Update a bet with the given ID.
 * Allows updating any combination of the following fields:
 * - winning_status
 * - nft_token
 * - nft_id
 * - nft_name
 */
export async function updateBet(
  betId: string,
  updates: {
    winning_status?: string;
    nft_token?: string;
    nft_id?: string;
    nft_name?: string;
  }
): Promise<void> {
  try {
    await db
      .update(bet)
      .set({
        ...updates,
      })
      .where(eq(bet.id, betId));
  } catch (error) {
    console.error("Failed to update bet", betId);
    throw error;
  }
}

/**
 * Fetch all bets by match ID.
 */
export async function getBetsByMatchId(matchId: string) {
  try {
    if (!matchId) {
      throw new Error("Match ID is required");
    }

    const bets = await db.select().from(bet).where(eq(bet.match, matchId));

    return bets;
  } catch (error) {
    console.error("Failed to fetch bets by match ID:", error);
    throw error;
  }
}
