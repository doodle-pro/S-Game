import Image from "next/image";


type HistoryProps = {
  winPercentage: number;
  history?: HistoryData[];
};

const History = ({ winPercentage, history = [] }: HistoryProps) => {
  if (history.length === 0) return null;

  return (
    <section className="flex flex-col gap-y-7 bg-black text-white px-[5vw] font-poppins">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 font-bmps">
          History{" "}
          <span className="text-red-500 gap-2">
            <Image src="/images/spade.svg" alt="heart" width={28} height={28} />
          </span>
        </h2>
        <p className="text-gray-400 mb-4">
          All your previous games against bots and players are stored here.
        </p>
      </div>

      <div className="text-3xl font-bold font-bmps">
        Win Percentage : <span className="text-red-500">{winPercentage}%</span>
      </div>
      <div className="border border-[#ffffff] border-dashed">
        <div className="grid grid-cols-[10%_50%_20%_20%] text-red-500 font-bold border-b border-[#ffffff] border-dashed p-5">
          <span>No.</span>
          <span>VS</span>
          <span>Result</span>
          <span>Date</span>
        </div>
        {history.map((hist, index) => (
          <div
            key={index}
            className="grid grid-cols-[10%_50%_20%_20%] items-center border-b border-[#ffffff] border-dashed p-5"
          >
            <div className="">{index + 1}.</div>
            <div className="">{hist.playername}</div>
            <div className="">{hist.status.toUpperCase()}</div>
            <div className="">{new Date(hist.date).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default History;
