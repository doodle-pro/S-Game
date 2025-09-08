import Image from "next/image"
import PlayBtn from "./play-btn"
import Btn from "./btn"

const Land = () => {
  return (
    <div className="flex flex-col items-center gap-6">
        <Image src={"/images/arena_only.svg"} alt="." width={128} height={128}/>
        <p className="text-white font-bmps text-[150px] leading-[150px]">Sonic<span className="text-[#EE1C25]">Arena</span></p>
        <p className="text-[20px] text-white font-bold">The Ultimate Card Game—Powered by AI, DeFi & NFTs!</p>
        <div className="flex flex-row gap-5">
            <Btn text={"PLAY MODE"} color={"#EE1C25"} bdabba={"#000000"} tcol="#ffffff" path="playmode/play"/>
            <Btn text={"BET MODE"} color={"#EE1C25"} bdabba={"#000000"} tcol="#ffffff" path="betmode/matches"/>
        </div>
    </div>
  )
}

export default Land
