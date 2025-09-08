import React from 'react'
import Tcard from './t-card'

const Team = () => {
  return (
    <div className='px-[5vw] pt-[2vh]'>
        <h1 className='text-[25px] font-bmps text-[#EE1C25]'>TEAM MEMBERS</h1>
        <div className='flex flex-wrap gap-[30px] py-[5vh]'>
            <Tcard img={"/images/yash.svg"} name={"Yash Agarwal"} des={"Web Developer"} />
            <Tcard img={"/images/mayank.svg"} name={"Mayank Rawat"} des={"Web Developer"} />
            <Tcard img={"/images/aviral.svg"} name={"Aviral Hatwal"} des={"Web3 Developer"} />
            {/* <Tcard img={"/images/kudnar.svg"} name={"Yash Kudnar"} des={"Web3 Developer"} /> */}
            <Tcard img={"/images/darsh.svg"} name={"Darsh Baxi"} des={"AI Developer"} />
        </div>
    </div>
  )
}

export default Team
