"use client"
import Link from "next/link";
import Image from "next/image";
import Btn from "../ui-home/btn";
import { usePathname } from "next/navigation";
const DFooter = () => {
  const pathname = usePathname();
  const activePath = pathname.split("/")[2] || "";

  return (
    <header className="p-2 bg-black text-white flex items-center py-6 px-6 md:px-10 absolute top-0 w-full">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex flex-row gap-3 items-center">
          <Image src={"/images/arena_logo.svg"} alt="." width={128} height={128}/>
        </Link>
      </div>
      <nav className="ml-auto flex items-center gap-6 text-sm font-mono">
        <Btn
          text={"PLAY"}
          color={activePath === "play" ? "#EE1C25" : "transparent"}
          bdabba="#000000"
          tcol={activePath === "play" ? "#ffffff" : "#ffffff"}
          path="playmode/play"
        />
        <Btn
          text={"REWARDS"}
          color={activePath === "rewards" ? "#EE1C25" : "transparent"}
          bdabba="#000000"
          tcol={activePath === "rewards" ? "#ffffff" : "#ffffff"}
          path="playmode/rewards"
        />
        <Btn
          text={"HISTORY"}
          color={activePath === "history" ? "#EE1C25" : "transparent"}
          bdabba="#000000"
          tcol={activePath === "history" ? "#ffffff" : "#ffffff"}
          path="playmode/history"
        />
        <Btn
          text={"PROFILE"}
          color={activePath === "profile" ? "#EE1C25" : "transparent"}
          bdabba="#000000"
          tcol={activePath === "profile" ? "#ffffff" : "#ffffff"}
          path="playmode/profile"
        />
      </nav>
    </header>
  );
};

export default DFooter;
