import Image from "next/image";

interface TcardProps {
  img: string;
  name: string;
  des: string;
}

const Tcard: React.FC<TcardProps> = ({ img, name, des }) => {
  return (
    <div className="flex flex-col gap-[10px] justify-center items-center p-[30px]">
      <Image src={img} alt="." width={200} height={200} />
      <h1 className="font-bmps text-[16px] text-[#EE1C25]">{name}</h1>
      <p className="font-poppins text-[14px] text-white">{des}</p>
    </div>
  );
};

export default Tcard;
