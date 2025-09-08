"use client";
import { signOut, useSession } from "next-auth/react";

import { IoWalletOutline } from "react-icons/io5";

type WalletModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  
  const { data: session, status } = useSession();
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
      <div className="w-[560px] bg-black text-white border-2 border-dashed border-red-500">
        <div className="p-4 border-b font-semibold border-dashed border-white-500">
          <p className="text-sm">Connected Wallet</p>
          <p className="mt-1 text-[10px] break-all text-white-300">
            {(session?.user as any)?.publicAddress || ""}
          </p>
        </div>

        {/* SONIC */}
        <div className="p-4 font-semibold border-b border-dashed border-white-500 flex flex-col justify-between">
          <span className="">SONIC</span>
          <span className="text-[12px] text-white-300">
            {(session?.user as any)?.balance || "0"}
          </span>
        </div>

        {/* NFTs */}
        <div className="p-4 border-b border-dashed border-white-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">NFTs</p>
            <p className="mt-1 font-semibold text-[11px] text-white-300">
              You currently have no NFTs.
            </p>
          </div>
          <button
            onClick={() => console.log("View all NFTs clicked")}
            className="text-white-500 underline text-xs font-semibold"
          >
            View All
          </button>
        </div>

        {/* Disconnect Wallet */}
        <div
          onClick={() => {
            signOut({
              redirectTo: "/",
            });
          }}
          className="p-4 border-b border-dashed border-red-500 cursor-pointer hover:bg-gray-800"
        >
          <p className="text-sm font-semibold">Disconnect Wallet</p>
        </div>

        {/* Bottom "Wallet" Button */}
        <div
          onClick={onClose}
          className="flex items-center justify-center gap-2 p-4 bg-red-600 cursor-pointer hover:bg-red-700"
        >
          {IoWalletOutline && <IoWalletOutline size={18} />}
          <span className="text-sm font-semibold font-bmps">Wallet</span>
        </div>
      </div>
    </div>
  );
}
