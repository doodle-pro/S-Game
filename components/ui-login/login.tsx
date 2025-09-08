"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

async function onSignInWithMetaMask() {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask first.");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const publicAddress = await signer.getAddress();
    const balance = await provider.getBalance(publicAddress);

    const s = ethers.formatEther(balance);
    const ss = s.toString();

    const response = await fetch("/api/crypto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicAddress, ss }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch nonce");
    }

    const { nonce } = await response.json();

    const signedNonce = await signer.signMessage(nonce);

    await signIn("crypto", {
      ss,
      publicAddress,
      signedNonce,
    });
  } catch (error) {
    console.error("Error during MetaMask sign-in:", error);
    alert("Error during MetaMask sign-in. Please try again.");
  }
}

export default function Login() {
  const session = useSession();
  console.log(session.status);
  return (
    <main>
      {session.status != "authenticated" ? (
        <button
          onClick={onSignInWithMetaMask}
          className="font-bmps text-[16px] text-white border px-4 py-2 rounded-[50px] bg-black transition duration-300 ease-in-out hover:bg-white hover:border-black hover:text-black"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <div onClick={() => signOut()} className="truncate font-semibold w-[150px] cursor-pointer p-2 rounded-lg text-[#ffffff] border border-[#EE1C25]">
            {(session.data?.user as any)?.publicAddress}
          </div>
        </>
      )}
    </main>
  );
}
