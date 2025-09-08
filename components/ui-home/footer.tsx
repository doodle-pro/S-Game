import Image from "next/image"

const Footer = () => {
  return (
    <div className="flex flex-col justify-between items-center py-[8vh]">
        <Image src={"/images/footer.svg"} alt="." width={1500} height={1500}/>
        <p className="font-bmps text-white text-[12px]">@SONICARENA 2025</p>
    </div>
  )
}

export default Footer
