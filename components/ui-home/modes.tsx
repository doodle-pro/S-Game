import React from 'react'

const modes = () => {
  return (
    <div className='flex flex-col gap-[10vh]'>
        <p className='font-bmps text-[25px] text-white px-[5vw]'>MODES</p>
        <div className='flex flex-col py-[50px]'>
        <div className='flex flex-row text-white px-[5vw] py-[5vh] items-center justify-between border-t-[1px] border-[#404040] border-b-[1px] hover:bg-[#EE1C25] hover:text-black transition duration-500'>
            <p className='text-[80px] font-bmps w-[50%]'>PLAY MODE</p>
            <p className='text-[14px] font-poppins w-[40%]'>Step into the GameXchange Arena Plus and experience intense, real-time PvP battles like never before! Whether you are challenging other players in high-stakes matches or honing your skills against our AI-driven adaptive bots, every game pushes you closer to mastery. Our intelligent bots evolve with each encounter, ensuring a dynamic and ever-improving training experience. Dominate the battlefield, refine your strategy, and rise through the ranks!</p>
        </div>
        <div className='flex flex-row text-white px-[5vw] py-[5vh] items-center justify-between border-[#404040] border-b-[1px] hover:bg-[#EE1C25] hover:text-black transition duration-500'>
            <p className='text-[80px] font-bmps w-[50%]'>BET MODE</p>
            <p className='text-[14px] font-poppins w-[40%]'>Put your knowledge and instincts to the test with our next-gen DeFi betting system. Using multiple cryptocurrencies, you can place wagers on live matches with real-time predictive analytics that calculate outcome probabilities based on match history, live stats, and even social trends. All bets are securely converted into SONIC tokens via automated bridges like deBridge, ensuring smooth transactions and enhanced token utility.</p>
        </div>
        </div>
        
    </div>
  )
}

export default modes
