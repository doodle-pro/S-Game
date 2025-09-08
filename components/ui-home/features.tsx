import React from 'react'
import Card from './card'

const Features = () => {
  return (
    <div className='py-[15vh]'>
      <p className='text-[25px] font-bmps text-white px-[5vw]'>FEATURES</p>
      <div className='flex flex-wrap px-[5vw] gap-[50px] justify-center items-center pt-[10vh]'>
        <Card img='heart.svg' head="Compete" content='Challenge real players in high-intensity PvP battles and climb the leaderboards.' fcol='#ffffff' bcol='#EE1C25' bheadCol="#ffffff" fheadCol='#000000'/>
        <Card img='spade_black.svg' head="Train" content='Hone your skills against AI-powered bots that learn and adapt to your playstyle.' fcol='#EE1C25' bcol='#ffffff' bheadCol="#EE1C25" fheadCol='#000000'/>
        <Card img='diamond.svg' head="Bet" content='Use our DeFi-integrated betting system to place wagers in multiple cryptocurrencies, with real-time predictive analytics ensuring fair odds.' fcol='#ffffff' bcol='#EE1C25' bheadCol="#ffffff" fheadCol='#000000'/>
        <Card img='club.svg' head="Own" content=' Collect, trade, and showcase unique in-game assets as NFTs stored securely on decentralized networks.' fcol='#EE1C25' bcol='#ffffff' bheadCol="#EE1C25" fheadCol='#000000'/>
        
        {/* <Card img='bet.png' head="Next-Level PvP Battles" content='Engage in high-intensity, real-time card duels powered by cutting-edge AI and adaptive gameplay.' fcol='#ffffff' bcol='#EE1C25' bheadCol="#ffffff" fheadCol='#000000'/>
        <Card img='bet.png' head="AI-Driven Training Mode" content='Challenge smart AI bots that learn, adapt, and push your skills to the limit.' fcol='#EE1C25' bcol='#ffffff' bheadCol="#EE1C25" fheadCol='#000000'/>
        <Card img='bet.png' head="DeFi-Powered Betting" content='Place crypto wagers with seamless on-chain transactions, backed by real-time predictive analytics.' fcol='#ffffff' bcol='#EE1C25' bheadCol="#ffffff" fheadCol='#000000'/>
        <Card img='bet.png' head="NFT-Based Assets" content='Own, trade, and showcase unique in-game collectibles stored securely on the blockchain.' fcol='#EE1C25' bcol='#EE1C25' bheadCol="#ffffff" fheadCol='#000000'/>
        <Card img='bet.png' head="Built for Speed & Security" content='Running on the Sonic blockchain, ensuring lightning-fast transactions and a tamper-proof gaming experience.' fcol='#ffffff' bcol='#EE1C25' bheadCol="#ffffff" fheadCol='#000000'/>
        <Card img='bet.png' head="Next-Level PvP Battles" content='Engage in high-intensity, real-time card duels powered by cutting-edge AI and adaptive gameplay.' fcol='#ffffff' bcol='#EE1C25' bheadCol="#ffffff" fheadCol='#000000'/> */}
        
      </div>
    </div>
  )
}

export default Features
