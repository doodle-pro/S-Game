import Image from "next/image"

const Sponsor = () => {
  return (
    <div className="flex flex-col py-[5vh] gap-[40px]">
        <p className="text-white font-bmps text-[25px] self-center">Powered By</p>
        <div className="flex flex-row justify-between px-[5vw]">
            <Image src={'/images/dora.svg'} alt="DoraHacks" width={140} height={140}/>
            <Image src={'/images/allora.svg'} alt="DoraHacks" width={140} height={140}/>
            <Image src={'/images/anon.svg'} alt="DoraHacks" width={140} height={140}/>
            <Image src={'/images/deb.svg'} alt="DoraHacks" width={140} height={140}/>
            <Image src={'/images/zere.svg'} alt="DoraHacks" width={140} height={140}/>
            <Image src={'/images/dwflabs.svg'} alt="DoraHacks" width={140} height={140}/>
        </div>
    </div>
  )
}

export default Sponsor
