import Image from "next/image"

const About = () => {
  return (
    <div className='flex justify-center py-[20vh]'>
        <div className='relative h-fit pt-[3vh] pb-[8vh] w-[60vw] flex flex-col gap-[40px] items-center justify-center bg-[#EE1C25]'>
            <div className='absolute h-[70px] top-0 left-0 w-[60px] bg-black'/>
            <div className='absolute h-[70px] bottom-0 right-0 w-[60px] bg-black'/>
            <div className='absolute h-[30px] top-[20%] left-0 w-[30px] bg-black'/>
            <div className='absolute h-[30px] bottom-[20%] right-0 w-[30px] bg-black'/>
            <div className='absolute h-[30px] bottom-0 left-0 w-[30px] bg-black'/>
            <div className='absolute h-[30px] top-0 right-0 w-[30px] bg-black'/>
            <p className='text-[25px] font-bmps pt-4'>ABOUT US</p>
            <div className="flex flex-row gap-[30px] h-fit">
                <Image src={"/images/gambling.png"} alt="." width={150} height={150}/>
                <Image src={"/images/gambling.png"} alt="." width={150} height={150}/>
            </div>
            <div className="font-poppins text-[16px] text-center font-bold w-[55%]">
            At SonicArena, we are redefining competitive gaming by seamlessly integrating AI-powered gameplay, DeFi betting, and blockchain technology into one futuristic platform. Our vision is to create a high-stakes, immersive experience where players don’t just compete—they evolve, strategize, and earn in a decentralized ecosystem.
            </div>
        </div>
    </div>
  )
}

export default About
