import Image from "next/image"
import Login from "../ui-login/login"

const HomeNav = () => {
  return (
    <div className="flex flex-row justify-between items-center px-8 py-4">
      {/* <p className='font-bmps text-white text-[20px]'>Sonic <span className='text-[#EE1C25]'>Arena</span></p> */}
      <img src={"/images/arena_logo.svg"} alt="." width={128} height={128} />
      <div>
        <Image src={"/images/symbols.svg"} alt="PlayingCards" width={148} height={148}></Image>
      </div>
      <Login/>
    </div>
  )
}

export default HomeNav
