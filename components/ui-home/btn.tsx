"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PlayModal from "../modal/play-modal";

interface BtnProps {
  color?: string;
  bdabba?: string;
  text: string;
  tcol: string;
  path: string;
  opt?: string;
}

const Btn: React.FC<BtnProps> = ({
  color,
  bdabba,
  text,
  tcol,
  path,
  opt = "yes",
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (opt === "yes") {
    return (
      <Link
        href={`/${path}`}
        className={`text-[16px] relative font-bmps py-2 px-4 w-fit`}
        style={{ backgroundColor: color, color: tcol }}
      >
        <div
          className="w-[6px] h-[6px] absolute top-0 left-0"
          style={{ backgroundColor: bdabba }}
        />
        <div
          className="w-[6px] h-[6px] absolute top-0 right-0"
          style={{ backgroundColor: bdabba }}
        />
        <div
          className="w-[6px] h-[6px] absolute bottom-0 left-0"
          style={{ backgroundColor: bdabba }}
        />
        <div
          className="w-[6px] h-[6px] absolute bottom-0 right-0"
          style={{ backgroundColor: bdabba }}
        />
        {text}
      </Link>
    );
  } else if (opt === "nop") {
    return (
      <button
        onClick={() => {
          window.open(path, "_blank");
        }}
        className={`text-[16px] relative font-bmps py-2 px-4 w-fit`}
        style={{ backgroundColor: color, color: tcol }}
      >
        <div
          className="w-[6px] h-[6px] absolute top-0 left-0"
          style={{ backgroundColor: bdabba }}
        />
        <div
          className="w-[6px] h-[6px] absolute top-0 right-0"
          style={{ backgroundColor: bdabba }}
        />
        <div
          className="w-[6px] h-[6px] absolute bottom-0 left-0"
          style={{ backgroundColor: bdabba }}
        />
        <div
          className="w-[6px] h-[6px] absolute bottom-0 right-0"
          style={{ backgroundColor: bdabba }}
        />
        {text}
      </button>
    );
  } else {
    return (
      <>
        <PlayModal isOpen={open} onClose={() => setOpen(false)} />
        <button
          onClick={() => {
            setOpen(true);
          }}
          className={`text-[16px] relative font-bmps py-2 px-4 w-fit`}
          style={{ backgroundColor: color, color: tcol }}
        >
          <div
            className="w-[6px] h-[6px] absolute top-0 left-0"
            style={{ backgroundColor: bdabba }}
          />
          <div
            className="w-[6px] h-[6px] absolute top-0 right-0"
            style={{ backgroundColor: bdabba }}
          />
          <div
            className="w-[6px] h-[6px] absolute bottom-0 left-0"
            style={{ backgroundColor: bdabba }}
          />
          <div
            className="w-[6px] h-[6px] absolute bottom-0 right-0"
            style={{ backgroundColor: bdabba }}
          />
          {text}
        </button>
      </>
    );
  }
};

export default Btn;
