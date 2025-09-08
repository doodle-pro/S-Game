import React from 'react'
import Btn from './btn'

const Cta = () => {
  return (
    <div className='flex justify-center py-[10vh]'>
            <div className='relative h-fit pt-[3vh] pb-[8vh] w-[80vw] flex flex-col gap-[40px] items-center justify-center bg-[#EE1C25]'>
                <div className='absolute h-[70px] top-0 left-0 w-[60px] bg-black'/>
                <div className='absolute h-[70px] bottom-0 right-0 w-[60px] bg-black'/>
                <div className='absolute h-[40px] top-[20%] left-0 w-[40px] bg-black'/>
                <div className='absolute h-[40px] bottom-[20%] right-0 w-[40px] bg-black'/>
                <div className='absolute h-[30px] bottom-0 left-0 w-[30px] bg-black'/>
                <div className='absolute h-[30px] top-0 right-0 w-[30px] bg-black'/>
                <p className='text-[110px] font-bmps pt-4 text-center'>Shuffle. Strategize. Dominate.</p>
                <div className='flex flex-col gap-5 justify-center items-center'>
                    <div className="font-bmps text-[20px] text-center">
                    Enter the Arena. Prove Your Skills!
                    </div>
                    <div className='flex flex-row gap-[20px]'>
                        <Btn bdabba='#000000' color='#ffffff' text='PLAY MODE' tcol='#000000' path="playmode/play"/>
                        <Btn bdabba='#000000' color='#ffffff' text='BET MODE' tcol='#000000' path="betmode/matches"/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Cta
