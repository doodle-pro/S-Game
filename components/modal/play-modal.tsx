"use client";
import { useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { useState } from "react";
type PlayModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PlayModal({ isOpen, onClose }: PlayModalProps) {
  const { data: session, status } = useSession();
  const [val, setVal] = useState<number>(0);
  const userId = (session?.user as any)?.id;

  if (!isOpen) return null;
  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-[560px] bg-black text-white border-2 border-dashed border-red-500 p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bmps">Room Options</h1>
          <h1
            onClick={() => onClose()}
            className="cursor-pointer text-2xl font-bmps"
          >
            X
          </h1>
        </div>

        <div className="flex flex-col space-y-4">
          <Button
            onClick={() => {
                window.open(
                    `https://durak-test.onrender.com?username=${userId}#roomId=1`,
                    '_blank'
                );
            }}
            className="bg-[#EE1C25] hover:text-[#000000] text-[#ffffff] px-6 py-2 rounded-lg text-lg font-bmps"
          >
            Create Room
          </Button>

          {/* Join Room Section */}
          <div className="flex space-x-4">
            <input
              value={val}
              onChange={(e) => {
                setVal(Number(e.target.value));
              }}
              type="number"
              placeholder="Enter Room ID"
              className="px-4 py-2 rounded-lg text-[#000000]"
            />
            <Button  onClick={() => {
              window.open(
                `https://durak-test.onrender.com?username=${userId}#roomId=${val}`,
                '_blank'
              );
            }} className="bg-[#EE1C25] text-[#ffffff] hover:text-[#000000]  px-6 py-2 rounded-lg text-lg font-bmps w-full">
              Join Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
