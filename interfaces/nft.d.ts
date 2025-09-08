type NFTSData = {
  nft_id: number;
  nft_token: string;
  nft_name: string;
  imageURL?: string;
  date: Date;
};

type HistoryData = {
  playername: string;
  date: Date;
  status: "won" | "lost" | "draw";
};

type MatchData = {
  id: number;
  teamA: string;
  teamB: string;
};

type BetsData = {
  predict_user?:string;
  match:string;
  amount: number;
  date: Date;
  status: "won" | "lost" | "draw";
};
