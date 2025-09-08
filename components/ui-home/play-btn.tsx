import React from 'react'

const PlayBtn = () => {
  return (
    <div className='text-[16px] relative font-bmps bg-[#EE1C25] py-2 px-4 w-fit text-white'>
        <div className='bg-black w-[4px] h-[4px] absolute top-0 left-0' />
        <div className='bg-black w-[4px] h-[4px] absolute top-0 right-0' />
        <div className='bg-black w-[4px] h-[4px] absolute bottom-0 left-0' />
        <div className='bg-black w-[4px] h-[4px] absolute bottom-0 right-0' />
        PLAY MODE     
    </div>
  )
}

export default PlayBtn
