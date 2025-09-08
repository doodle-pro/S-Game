"use client";

import History from "@/components/ui-playmode/history";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// const historyData: HistoryData[] = [
//   {
//     playerid: 1,
//     playername: "BOT",
//     date: new Date("2025-02-23"),
//     status: "won",
//     winpercentage: 74,
//   },
//   {
//     playerid: 2,
//     playername: "HitHuman",
//     date: new Date("2025-02-23"),
//     status: "won",
//     winpercentage: 74,
//   },
//   {
//     playerid: 3,
//     playername: "BOT",
//     date: new Date("2025-02-23"),
//     status: "won",
//     winpercentage: 74,
//   },
//   {
//     playerid: 4,
//     playername: "BOT",
//     date: new Date("2025-02-23"),
//     status: "won",
//     winpercentage: 74,
//   },
//   {
//     playerid: 5,
//     playername: "BOT",
//     date: new Date("2025-02-23"),
//     status: "lost",
//     winpercentage: 74,
//   },
// ];

const HistoryPage = () => {
  // correct code
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [winPercentage, setWinPercentage] = useState<number>(0);

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     try {
  //       const userId = (session?.user as any)?.id;
  //       const trendingResponse = await fetch(`/api/match?userId=${userId}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const rawResponseData = await trendingResponse.json();
  //       const responseData = rawResponseData.matches;
  //       let Win = 0;
  //       for (let i = 0; i < responseData.length; i++) {
  //         if (responseData[i].winner_id == userId) Win++;
  //       }
  //       if (responseData.length > 0) {
  //         setWinPercentage((Win / responseData.length) * 100);
  //       }

  //       // responseData
  //       //   {
  //       //     "matches": [
  //       //         {
  //       //             "id": "2e9af351-ab30-401b-a295-137e71ea9096",
  //       //             "player_1": "3aea9482-fd14-4f93-82fa-7d2b21a0142f",
  //       //             "player_2": "ee8459da-2a5f-47ae-9fe3-5dcfd4c993a2",
  //       //             "date": "2025-03-09T20:38:23.634Z",
  //       //             "nft_token": "0xhe03edy237d284en23e3",
  //       //             "nft_id": "12345",
  //       //             "winner_id": "ee8459da-2a5f-47ae-9fe3-5dcfd4c993a2",
  //       //             "nft_name": "Aviral",
  //       //             "is_status": "closed"
  //       //         }
  //       //     ]
  //       // }
  //       // only set those matches which has
  //       //           "is_status": "closed"
  //       // also only add the following fields from the response
  //       // playername: this is the player id which is not equal to userid among the player_1 and player_2;
  //       // date:Date;
  //       // status = won if winner_id == userid else lose
  //       setHistoryData(responseData);
  //     } catch (error) {
  //       console.error("Error fetching historyData:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (session) fetchHistory();
  // }, [session]);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = (session?.user as any)?.id;
        if (!userId) return;
  
        const trendingResponse = await fetch(`/api/match?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        const rawResponseData = await trendingResponse.json();
        const responseData = rawResponseData.matches || [];
  
        // Calculate win percentage
        
  
        // Process match history
        const historyData = responseData
          .filter((match: any) => match.is_status === "closed")
          .map((match: any) => ({
            playername: match.player_1 === userId ? match.player_2 : match.player_1,
            date: match.date,
            status: match.winner_id === userId ? "won" : "lose",
          }));
          let Win = responseData.filter((match: any) => match.winner_id === userId && match.is_status=="closed").length;
        if (historyData.length > 0) {
          setWinPercentage((Win / historyData.length) * 100);
        }
        setHistoryData(historyData);
      } catch (error) {
        console.error("Error fetching historyData:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (session) fetchHistory();
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

  return <History winPercentage={winPercentage} history={historyData} />;
};
export default HistoryPage;
