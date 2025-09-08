"use client"
import { ethers } from "ethers";
import React, { useState } from "react";
import {address,abi} from "@/contracts_abi/Bet.json"

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  player1: string;
  player2: string;
  matchId: number;
}


//agarwal put POST request for bet page

const BetModal: React.FC<BetModalProps> = ({ matchId, isOpen, onClose, player1, player2 }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(1);
  const [amount, setAmount] = useState("");

  function listenForTransactionMined(transactionResponse: any, provider: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        provider.once(transactionResponse.hash, (transactionReceipt: any) => {
          resolve();
        });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  async function enter(matchId: number, Bet_On: number): Promise<void> {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum); // Corrected for Ethers v6
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        
        const transactionResponse = await contract.enter(
          matchId, 
          Bet_On, 
          { value: ethers.parseEther(amount) } // Updated for Ethers v6
        );
  
        await listenForTransactionMined(transactionResponse, provider);
      } else {
        console.log("Ethereum provider not found");
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="font-bmps fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md">
      <div className="border border-[#ff0000] bg-black text-white w-[450px] py-4 relative border-dashed flex flex-col gap-3">
        
        <div className="flex items-center justify-center mb-4 border-dashed p-2 border-b-2 border-[#ff0000]">
          <h2 className="uppercase text-center">MAKE BET</h2>
          <button 
            onClick={onClose} 
            className="text-[16px] font-semibold text-white hover:text-red-500 absolute right-4"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-5 mb-3">
            <span className={`uppercase text-sm truncate w-[280px] ${selectedPlayer === 1 ? "text-[#ff0000]" : "text-white"}`}>Player one : {player1}</span>
            <input
              type="radio"
              name="player"
              value="1"
              checked={selectedPlayer === 1}
              onChange={() => setSelectedPlayer(1)}
              className="accent-[#ff0000]"
            />
          </div>

          <div className="flex items-center justify-center gap-5 mb-3">
            <span className={`uppercase text-sm truncate w-[280px] ${selectedPlayer === 2 ? "text-[#ff0000]" : "text-white"}`}>Player two : {player2}</span>
            <input
              type="radio"
              name="player"
              value="2"
              checked={selectedPlayer === 2}
              onChange={() => setSelectedPlayer(2)}
              className="accent-[#ff0000]"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="uppercase text-sm">Amount :</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-24 bg-black border border-white text-white p-1 focus:outline-none focus:border-[#ff0000]"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={async() => {
              await enter(matchId,selectedPlayer)
              // onClose();
            }}
            className="bg-[#ff0000] px-4 py-2 uppercase tracking-widest text-sm hover:bg-red-600"
          >
            Confirm Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetModal;
