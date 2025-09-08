import React from 'react'
import HomeNav from './home-nav'
import Land from './land'

const LandingSec = () => {
  return (
    <div className='flex flex-col gap-[20vh] pb-[18vh]'>
        <HomeNav/>
        <Land/>
    </div>
  )
}

export default LandingSec
