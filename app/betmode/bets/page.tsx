"use client";

import Bets from "@/components/ui-betmode/bets";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// const dummyBets: BetsData[] = [
//   {
//     id: 1,
//     teamA: "Thunder Wolves",
//     teamB: "Crimson Hawks",
//     amount: 50,
//     date: new Date(),
//     status: "won",
//   },
//   {
//     id: 2,
//     teamA: "Shadow Panthers",
//     teamB: "Blazing Foxes",
//     amount: 75,
//     date: new Date(),
//     status: "lost",
//   },
//   {
//     id: 3,
//     teamA: "Iron Giants",
//     teamB: "Storm Breakers",
//     amount: 100,
//     date: new Date(),
//     status: "draw",
//   },
//   {
//     id: 4,
//     teamA: "Frost Titans",
//     teamB: "Ember Phoenix",
//     amount: 200,
//     date: new Date(),
//     status: "won",
//   },
// ];

const BetPage = () => {
  const [betData, setBetData] = useState<BetsData[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchBetData = async () => {
  //     try {
  //       const userId = (session?.user as any)?.id;
  //       const trendingResponse = await fetch(`/api/bet?userId=${userId}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const responseData = await trendingResponse.json();
  //       console.log(responseData);
  //       // {
  //       //     "id": "73e81326-a0bb-423a-a75d-a38883bf621b",
  //       //     "bet_user": "ee8459da-2a5f-47ae-9fe3-5dcfd4c993a2",
  //       //     "match": "694d2f85-8102-480b-a99d-701fc21dfdd5",
  //       //     "date": "2025-03-09T21:52:26.309Z",
  //       //     "winning_status": "pending",
  //       //     "nft_token": null,
  //       //     "nft_id": null,
  //       //     "nft_name": null,
  //       //     "amount": "0.002",
  //       //     "predict_user": "77e3485e-4d71-428e-a4bc-6b25bfcac3e9"
  //       // }
  //       // type BetsData = {
  //       //  match:string
  //       //   amount: number;
  //       //   date: Date;
  //       //   status: "won" | "lost" | "draw";
  //       // };
  //       // also only add the following fields from the response
  //       // match : match
  //       // amount"amount
  //       // date:date;
  //       // status = winning_status
  //       //
  //       setBetData(responseData.bets);
  //     } catch (error) {
  //       console.error("Error fetching betData:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (session) fetchBetData();
  // }, [session]);

  useEffect(() => {
    const fetchBetData = async () => {
      try {
        const userId = (session?.user as any)?.id;
        if (!userId) return;
  
        const trendingResponse = await fetch(`/api/bet?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        const responseData = await trendingResponse.json();
        console.log(responseData);
  
        const betData = responseData.bets?.map((bet: any) => ({
          match: bet.match,
          predict_user:bet.predict_user,
          amount: parseFloat(bet.amount), // Ensuring amount is a number
          date: new Date(bet.date), // Converting to Date object
          status: bet.winning_status as "won" | "lost" | "draw",
        })) || [];
  
        setBetData(betData);
      } catch (error) {
        console.error("Error fetching betData:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (session) fetchBetData();
  }, [session]);
  if (loading)
    return (
      <div className="flex flex-col space-y-3 h-[50vh] w-[50%] items-center justify-center mx-auto">
        <Skeleton className="h-full w-full rounded-xl" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );

  return <Bets bets={betData} />;
};
export default BetPage;
