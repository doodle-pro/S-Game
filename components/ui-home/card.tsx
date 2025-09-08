import Image from "next/image";

interface CardProps {
  img: string;
  head: string;
  content: string;
  fcol: string; // Front background color
  bcol: string; // Back background color
  bheadCol: string;
  fheadCol: string;
}

export default function Card({ img, head, content, fcol, bcol, bheadCol, fheadCol }: CardProps) {
  return (
    <div className="group w-64 h-80 perspective">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180 grid grid-rows-2">
        
        {/* Front Side */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white backface-hidden font-poppins gap-4 p-4"
          style={{ backgroundColor: fcol, color: fheadCol }} 
        >
          <Image src={`/images/${img}`} alt="icon" width={128} height={128} />
          <h1 className="text-[30px] font-bold">{head}</h1>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 flex flex-col justify-between font-poppins rotate-y-180 backface-hidden p-6 gap-2"
          style={{ backgroundColor: bcol }}
        >
          <h1 className="text-[24px] font-bold self-start" style={{ color: bheadCol }}>
            {head}
          </h1>
          <p className="text-[16px] text-right font-bold leading-5 self-baseline">{content}</p>
        </div>
        
      </div>
    </div>
  );
}
