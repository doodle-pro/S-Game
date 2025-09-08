"use client"

import Match from "@/components/ui-betmode/match";
import { Skeleton } from "@/components/ui/skeleton";
// import { Match } from "@/lib/db/schema";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
type MatchData = {
  id: number;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  status: "upcoming" | "live" | "finished";
};
// const dummyMatches: MatchData[] = [
//   {
//     id: 1,
//     teamA: "Team Alpha",
//     teamB: "Team Beta",
//     scoreA: 2,
//     scoreB: 3,
//     status: "live",
//   },
//   { id: 2, teamA: "Team Gamma", teamB: "Team Delta", status: "live" },
//   {
//     id: 3,
//     teamA: "Team Omega",
//     teamB: "Team Sigma",
//     scoreA: 1,
//     scoreB: 1,
//     status: "live",
//   },
// ];

const MatchPage = () => {

  const [matchData, setMatchData] = useState<MatchData[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchRewards = async () => {
  //     try {
  //       const trendingResponse = await fetch(
  //         `/api/betMatch`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );  
  //       const responseData = await trendingResponse.json();
  //       // reponse
  //       // {
  //         //     "id": "7ace03fa-f8e9-401f-b23f-47b4da93c5ea",
  //         //     "player_1": "3aea9482-fd14-4f93-82fa-7d2b21a0142f",
  //         //     "player_2": "ee8459da-2a5f-47ae-9fe3-5dcfd4c993a2",
  //         // }
  //       // also only add the following fields from the response in this format
  //         // type MatchData = {
  //           //   id: number;
  //           //   teamA: string;
  //           //   teamB: string;
  //           // };
  //           setMatchData(responseData.matches);

  //     } catch (error) {
  //       console.error("Error fetching matchData:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if(session)
  //     fetchRewards();
  // }, [session]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const trendingResponse = await fetch(`/api/betMatch`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        const responseData = await trendingResponse.json();
        const matchData = responseData.matches?.map((match: any) => ({
          id: (match.id), // Ensuring id is a number
          teamA: match.player_1,
          teamB: match.player_2,
        })) || [];
  

        setMatchData(matchData);

        // Store match IDs with their index in localStorage
      const matchIdMap = matchData.reduce((acc : any, match:any, index:any) => {
        acc[match.id] = index;
        return acc;
      }, {} as Record<string, number>);

      localStorage.setItem("matchIdMap", JSON.stringify(matchIdMap));

      } catch (error) {
        console.error("Error fetching matchData:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (session) fetchRewards();
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

  return <Match matches={matchData} />;
};
export default MatchPage;
