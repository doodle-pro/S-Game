import Image from "next/image";

type RewardProps = {
  balance: number;
  nfts?: NFTSData[];
};

const Rewards = ({ balance, nfts = [] }: RewardProps) => {
  if (nfts.length === 0) return null;

  return (
    <section className="flex flex-col gap-y-7 bg-black text-white px-[5vw] font-poppins">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 font-bmps">
          My Rewards{" "}
          <span className="text-red-500 gap-2">
            <Image src="/images/heart.svg" alt="heart" width={28} height={28} />
          </span>
        </h2>
        <p className="text-gray-400 mb-4">All your rewards are stored here.</p>
      </div>

      <div className="mb-10 font-bmps">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <div className="text-white flex gap-2">
            <Image
              src="/images/account_balance_wallet.svg"
              width={25}
              height={25}
              alt="wallet"
            />{" "}
            Wallet
          </div>
        </h3>
        <div className="border border-dashed border-white p-[12px] flex justify-between items-center w-[500px]">
          <span className="text-xl ml-2">{balance}</span>
          <Image
            src="/images/sonic_big_logo.svg"
            alt="Sonic Token"
            width={90}
            height={90}
            className="mr-3"
          />
        </div>
      </div>

      <h3 className="font-bmps text-lg font-bold flex items-center gap-2">
        <div className="text-white flex gap-2">
          <Image
            src="/images/bedroom_baby.svg"
            width={25}
            height={25}
            alt="NFT"
          />
          NFTs
        </div>
      </h3>
      <div className="border border-[#ffffff] border-dashed">
        <div className="grid grid-cols-4 text-red-500 font-bold border-b border-[#ffffff] border-dashed p-5">
          <span>No.</span>
          <span>Name</span>
          <span>Date</span>
          <span>NFT ID</span>
        </div>
        {nfts.map((nft, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center border-b border-[#ffffff] border-dashed p-5"
          >
            <div className="">{index + 1}.</div>
            <div className="">{nft.nft_name}</div>
            <div className="">{new Date(nft.date).toLocaleDateString()}</div>
            <div className="">{nft.nft_id}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rewards;
