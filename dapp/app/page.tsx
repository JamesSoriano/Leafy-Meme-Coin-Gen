"use client";
import { BrowserProvider } from "ethers";
import { JsonRpcProvider } from "ethers/providers";
import Image from "next/image";
import Minting from "../components/mint";
import Staking from "../components/stake";
import Withdraw from "../components/withdraw";
import { useEffect, useState } from "react";
import { getContract } from "../config";
import Background from "../public/images/BG2.jpg";
import style from "./button.module.css";
export default function Home() {
  const [walletKey, setWalletKey] = useState("");
  const [chosenButton, setChosenButton] = useState(0);

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && walletKey === "") {
      setChosenButton(3);
    }
  }, [walletKey]);

  const renderComponent = () => {
    switch (chosenButton) {
      case 0:
        return <Minting />;
      case 1:
        return <Staking />;
      case 2:
        return <Withdraw />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-3xl mb-8">Mint, Stake, and Withdraw Leafy</p>
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
            >
              {walletKey !== "" ? (
                `Connected: ${walletKey.substring(0, 7)}...`
              ) : (
                "Connect Wallet Now!"
              )}
            </button>
          </div>
        );
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute top-0 center-0 w-full h-15 bg-black bg-opacity-25 flex justify-center items-center">
        <a href="#">
          <Image
            src="/images/wallet.png"
            alt="Leafy Logo"
            width={50}
            height={44}
            priority
          />
        </a>
        <span className="text-3xl ml-2">
          {walletKey !== "" && `Wallet Connected: ${walletKey.substring(0, 1000)}...`}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-20">
        <button
          className={`button ${chosenButton === 0 ? "selected" : ""}`}
          onClick={() => setChosenButton(0)}
          style={{backgroundColor: "black", color: "green", borderRadius: "999px", padding: "12px 24px", fontSize: "1.2rem"}}
        >
          Mint
        </button>
        <button
          className={`button ${chosenButton === 1 ? "selected" : ""}`}
          onClick={() => setChosenButton(1)}
          style={{backgroundColor: "black", color: "red", borderRadius: "999px", padding: "12px 24px", fontSize: "1.2rem"}}
        >
          Stake
        </button>
        <button
          className={`button ${chosenButton === 2 ? "selected" : ""}`}
          onClick={() => setChosenButton(2)}
          style={{backgroundColor: "black", color: "blue", borderRadius: "999px", padding: "12px 24px", fontSize: "1.2rem"}}
        >
          Withdraw
        </button>
      </div>

      <div className="mt-20">{renderComponent()}</div>

      
    </div>
  );
}