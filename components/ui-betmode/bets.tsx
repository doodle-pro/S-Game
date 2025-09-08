import Image from "next/image";
import { ethers } from "ethers";
import { address, abi } from "@/contracts_abi/Bet.json";
import { address1, abi1 } from "@/contracts_abi/NFT.json";
import { address2, abi2 } from "@/contracts_abi/NFT1.json";
import { address3, abi3 } from "@/contracts_abi/NFT2.json";
import { useEffect, useState } from "react";

type BetProps = {
  bets?: BetsData[];
};

//one post request for NFT
const Bets = ({ bets = [] }: BetProps) => {
  const [token, setToken] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [nftAddress, setNftAddress] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [matchData, setMatchData] = useState<Record<string, number>>({});

  useEffect(() => {
    const storedMatches = localStorage.getItem("matchIdMap");
    if (storedMatches) {
      setMatchData(JSON.parse(storedMatches));
    }
  }, []);
  console.log(JSON.stringify(matchData), "ma");
  function listenForTransactionMined(transactionResponse: any, provider: any) {
    try {
      return new Promise((resolve: any, reject) => {
        provider.once(transactionResponse.hash, (transactionReciept: any) => {
          resolve();
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function setWinner(matchId: number, win: number) {
    try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);

        const transactionResponse = await contract.setWinner(
          Number(matchId),
          Number(win)
        );

        await listenForTransactionMined(transactionResponse, provider);
        console.log(`Winner set for match ${matchId}`);
      } else {
        console.log("Ethereum provider not found");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function settleTeamResultWon(matchId: number) {
    try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);

        const transactionResponse = await contract.settleTeamResultWon(
          Number(matchId),
          { value: ethers.parseEther("0") } // Since it's payable, but no value is required
        );

        await listenForTransactionMined(transactionResponse, provider);
        console.log(`Winnings settled for match ${matchId}`);
      } else {
        console.log("Sonic provider not found");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function NFT_Gen(
    contractAddress: string,
    contractAbi: any,
    metadataUrl: string,
    imageUrl: string
  ) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const transactionResponse = await contract.mintNFT(metadataUrl);
      await listenForTransactionMined(transactionResponse, provider);

      // Fetch the token counter after the transaction is confirmed
      const number = await contract.getTokenCounter();
      const tokenId = Number(number.toString());
      console.log(tokenId, "ma");
      // Now update the state together
      setToken(tokenId);
      setImageUrl(imageUrl);
      setNftAddress(contractAddress);
      setIsModalOpen(true); // Open the modal after token is set
    } catch (e) {
      console.log(e);
    }
  }

  function randomNFTGeneration() {
    const random = Math.floor(Math.random() * 3);
    if (random === 0) {
      NFT_Gen(
        address1,
        abi1,
        "https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/bafkreidvqbjl5hxjhb4hzabagxsivpdgvfjj6grvnsbvkd3qmh2xacrmhy",
        "https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/bafkreifaefnw3jcsz22jdj34s7cru33aztkausruuxqs3owu6tnofeeq6y"
      );
    } else if (random === 1) {
      NFT_Gen(
        address2,
        abi2,
        "https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/bafkreifnk2toyekziis2ymx53w2nuuulh5dlagsugb6rwfym22nzpekpju",
        "https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/bafkreiewgi62iyo34y6bp5bf7jgxchwp2prqcxyotyrjm7bjcw7xoemttu"
      );
    } else {
      NFT_Gen(
        address3,
        abi3,
        "https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/bafkreidiqvndajvv2w4oz65rkvzcarynok6ig4tthvr2n7zisr2nur562q",
        "https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/bafkreiblxhjmxcppqnxnuub6l54az5xwob2mfk7sbysi22cuoox4lxt2oy"
      );
    }
  }

  if (bets.length === 0) return null;
  return (
    <section className="flex flex-col gap-y-7 bg-black text-white px-[5vw] font-poppins">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 font-bmps">
          My Bets{" "}
          <span className="text-red-500 gap-2">
            <Image src="/images/heart.svg" alt="heart" width={28} height={28} />
          </span>
        </h2>
        <p className="text-gray-400 mb-4">
          Bet on the live matches going on to earn the SONIC crypto.
        </p>
      </div>
      <div className="border border-[#ffffff] border-dashed">
        <div className="grid grid-cols-[10%_30%_10%_15%_10%_25%]  text-red-500 font-bold border-b border-[#ffffff] border-dashed p-5">
          <span>No.</span>
          <span>Name</span>
          <span>Result</span>
          <span>Amount</span>
          <span>Date</span>
          <span></span>
        </div>
        {bets.map((bet, index) => (
          <div
            key={index}
            className="grid grid-cols-[10%_30%_10%_15%_10%_25%]  items-center border-b border-[#ffffff] border-dashed p-5"
          >
            <div className="">{index + 1}.</div>
            <div className="">{bet.match}</div>
            <div className="">{bet.status.toUpperCase()}</div>
            <div className="">{`${bet.amount}`} Token</div>
            <div className="">{new Date(bet.date).toLocaleDateString()}</div>
            <div className="flex gap-4">
              {bet.status.toUpperCase() === "WON" && (
                <>
                  <button
                    onClick={async () => {
                      const matchId = matchData[String(bet.match)];
                      // const matchId = 1
                      // Ensure it's a number
                      if (matchId !== undefined) {
                        console.log(matchId);
                        // console.log(Number(bet.predict_user ?? 0))
                        await setWinner(matchId + 1, 1);
                        await settleTeamResultWon(matchId + 1);
                      } else {
                        console.error("Invalid matchId for:", bet.match);
                      }
                    }}
                    className="px-2 py-1 text-white font-bold rounded p-2 border border-dashed"
                  >
                    Withdraw
                  </button>
                  <button
                    onClick={randomNFTGeneration}
                    className="px-2 py-1 text-white font-bold rounded p-2 border border-dashed"
                  >
                    NFT
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 ">
          <div className="bg-black p-6 rounded-lg text-white w-fit border border-dashed  border-[#EE1C25]">
            <h3 className="text-lg font-bold mb-4 text-center">
              NFT Minted Successfully!
            </h3>
            <Image
              src={imageUrl}
              alt="NFT"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <p>
              <strong>Token ID:</strong> {token}
            </p>
            <p>
              <strong>Contract Address:</strong> {nftAddress}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-red-500 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Bets;
