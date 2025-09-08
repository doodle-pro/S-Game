"use client";

import Rewards from "@/components/ui-betmode/rewards";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// const dummyNFTs: NFTSData[] = [
//   {
//     id: 1,
//     name: "Crypto Monkey",
//     imageURL: "@/images/logo.svg",
//     date: new Date("2024-03-01"),
//   },
//   {
//     id: 2,
//     name: "Sonic Warrior",
//     imageURL: "@/images/logo.svg",
//     date: new Date("2024-02-15"),
//   },
// ];

const RewardsPage = () => {
  const [nftdata, setNftdata] = useState<NFTSData[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [walletBalance, setWalletBalance] = useState<number>(0);

  // useEffect(() => {
  //   const fetchRewards = async () => {
  //     try {
  //       const userId = (session?.user as any)?.id;
  //       setWalletBalance((session?.user as any)?.balance);
  //       const trendingResponse = await fetch(`/api/bet?userId=${userId}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const responseData = await trendingResponse.json();
  //       console.log(responseData.bets)

  //       // only set those bets which has
  //       //       //           "winning_status": won,
  //       //       // also only add the following fields from the response
  //       //       // nft_id:number;
  //       //       // nft_token: string;
  //       //       // nft_name:string;
  //       //       // date:Date;
  //       //       // imageUrl: koi bhi ek hard coded string
  //       setNftdata(responseData.bets);
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
        setWalletBalance((session?.user as any)?.balance);

        if (!userId) return;

        const trendingResponse = await fetch(`/api/bet?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const responseData = await trendingResponse.json();

        const nftData =
          responseData.bets
            ?.filter((bet: any) => bet.winning_status === "won") // Only won bets
            .map((bet: any) => ({
              nft_id: Number(bet.nft_id), // Ensuring it's a number
              nft_token: bet.nft_token,
              nft_name: bet.nft_name,
              date: new Date(bet.date), // Converting to Date object
              imageUrl:
                "https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/bafkreiewgi62iyo34y6bp5bf7jgxchwp2prqcxyotyrjm7bjcw7xoemttu",
            })) || [];

        console.log(nftData);

        setNftdata(nftData);
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
  return <Rewards balance={walletBalance} nfts={nftdata} />;
};
export default RewardsPage;
