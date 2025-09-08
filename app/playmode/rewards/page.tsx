"use client";

import Rewards from "@/components/ui-playmode/rewards";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// const dummyNFTs: NFTSData[] = [
//     {
//       token_id: 1,
//       nft_address: "0xF1C91bA4dafdf1B0ae31C1f81E137087396a98f0E",
//       name: "Crypto Monkey",
//       imageURL: "https://via.placeholder.com/150",
//       date: new Date("2024-03-01"),
//     },
//     {
//       token_id: 2,
//       nft_address: "0xF1C91bA4d30ae31C1f81E137087396a98f0E",
//       name: "Cyber Ape",
//       imageURL: "https://via.placeholder.com/150",
//       date: new Date("2024-02-15"),
//     },
//     {
//       token_id: 3,
//       nft_address: "0xF1C91bA4d3181B0ae31C1f81E137087396a98f0",
//       name: "Pixel Panther",
//       imageURL: "https://via.placeholder.com/150",
//       date: new Date("2024-01-20"),
//     },
//     {
//       token_id: 4,
//       nft_address: "0xFafefFE351B0ae31C1f81E137087396a98f0E",
//       name: "Block Bear",
//       imageURL: "https://via.placeholder.com/150",
//       date: new Date("2023-12-10"),
//     },
//   ];

const RewardsComp = () => {
  // correct code
  const [nftdata, setNftdata] = useState<NFTSData[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchRewards = async () => {
  //     try {
  //       const userId = (session?.user as any)?.id;
  //       const trendingResponse = await fetch(`/api/match?userId=${userId}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const responseData = await trendingResponse.json();

  //       // only set those matches which has
  //       //           "winner_id": user id,
  //       //           "is_status": "open"
  //       // also only add the following fields from the response
  //       // nft_id:number;
  //       // nft_token: string;
  //       // nft_name:string;
  //       // date:Date;
  //       // imageUrl: koi bhi ek hard coded string

  //       setNftdata(responseData.matches);
  //     } catch (error) {
  //       console.error("Error fetching nftdata:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (session) fetchRewards();
  // }, [session]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const userId = (session?.user as any)?.id;
        if (!userId) return;

        const trendingResponse = await fetch(`/api/match?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const responseData = await trendingResponse.json();

        // Filter & map the required data
        const filteredData = responseData.matches
          .filter(
            (match: any) =>
              match.winner_id === userId && match.is_status === "closed"
          )
          .map((match: any) => ({
            nft_id: match.nft_id,
            nft_token: match.nft_token,
            nft_name: match.nft_name,
            date: match.date,
            imageURL:
              "https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/bafkreiewgi62iyo34y6bp5bf7jgxchwp2prqcxyotyrjm7bjcw7xoemttu",
          }));

        setNftdata(filteredData);
      } catch (error) {
        console.error("Error fetching nftdata:", error);
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
  return <Rewards nfts={nftdata} />;
};
export default RewardsComp;
