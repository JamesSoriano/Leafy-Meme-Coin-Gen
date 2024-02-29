"use client";
import { BrowserProvider } from "ethers";
import { JsonRpcProvider } from "ethers/providers";
import Image from "next/image";
import Minting from "../components/mintingPanel";
import Staking from "../components/stakingPanel";
import Withdraw from "../components/withdrawPanel";
import { useEffect, useState } from "react";
import { getContract } from "../config";
import Background from "../public/images/BG2.jpg";
import style from "./button.module.css";
export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [chosenButton, setChosenButton] = useState<number>();

  const showCard = () => {
    switch (chosenButton) {
      case 0:
        return <Minting />;
      case 1:
        return <Staking />;
      case 2:
        return <Withdraw />;
      default:
        return (
          <div
  className="mb-20 text-2xl font-times"
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center", // Center-align the text
  }}
>
  <p>Joining the Leafteam?</p>
  <button
    onClick={() => {
      connectWallet();
    }}
    className="font text-3xl ml-auto"
  >
    {walletKey !== "" && (
      <>
        <span className="font text-3xl"> Connected: </span>
        <span className="font-sans">
          {walletKey.substring(0, 7)}
          {walletKey.length > 7 ? "..." : ""}
        </span>
      </>
    )}
    {walletKey === "" && <strong>Connect Wallet Now!</strong>}
  </button>
</div>

        );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (walletKey !== "") {
        setChosenButton(0);
      } else {
        setChosenButton(4);
      }
    }
  }, [walletKey]);

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12 relative"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "80%",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-black bg-opacity-50 z-10;">
        <p className="fixed left-0 top-0 flex w-full justify-space-between items-center p-8 pb-6 pt-8 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:p-4 lg:dark:bg-transparent">
          <a
            href="https://www.youtube.com/watch?v=Z1nufRLDQMU/"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <Image
              src="/images/Leafy.png"
              alt="Leafy Logo"
              className="mr-5"
              width={50}
              height={44}
              priority
            />
          </a>
          <span className="font-times text-3xl -ml-2">Leafy</span>
          <button
    onClick={() => {
      connectWallet();
    }}
    className="font text-3xl ml-auto"
  >
    {walletKey !== "" && (
      <>
        <span className="font text-3xl"> Connected: </span>
        <span className="font-sans">
          {walletKey.substring(0, 7)}
          {walletKey.length > 7 ? "..." : ""}
        </span>
      </>
    )}
    
  </button>
        </p>
      </div>

      <div className="relative top-10 flex grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left rounded-lg p-50 bg-gradient-to-b from-amber-700 to-amber-900">
        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/40 focus:bg-gray-900/50"
          onClick={() => walletKey ? setChosenButton(0) : setChosenButton(3)}
        >
          <h2
            className={`flex items-center justify-center font text-3xl ml-auto`}
          >
            <Image
              src="/images/Leafy.png"
              alt="Left Image"
              width={40}
              height={40}
              className="mr-5"
            />
            <span className="inline-block transition-transform group-hover:translate-y-1 motion-reduce:transform-none ">
              Mint{" "}
            </span>
          </h2>
        </button>

        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/40 focus:bg-gray-900/50"
          onClick={() => walletKey ? setChosenButton(1) : setChosenButton(3)}
        >
          <h2
            className={`flex items-center justify-center font text-3xl ml-auto`}
          >
            <Image
              src="/images/lock1.png"
              alt="Left Image"
              width={40}
              height={40}
              className="mr-5"
            />
            <span className="inline-block transition-transform group-hover:translate-y-1 motion-reduce:transform-none ">
              Stake{" "}
            </span>
          </h2>
        </button>

        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/40 focus:bg-gray-900/50"
          onClick={() => walletKey ? setChosenButton(2) : setChosenButton(3)}
        >
          <h2
            className={`flex items-center justify-center font text-3xl ml-auto`}
          >
            <Image
              src="/images/withdraw.png"
              alt="Left Image"
              width={40}
              height={40}
              className="mr-5"
            />
            <span className="inline-block transition-transform group-hover:translate-y-1 motion-reduce:transform-none ">
              Withdraw{" "}
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-50`}>
            
          </p>
        </button>
      </div>

      <div className="mb-40 mt-40 ">{showCard()}</div>

      <div className="absolute bottom-0 left-0 w-full h-14 bg-black bg-opacity-50 z-10;">
        <p className="flex items-center h-full justify-spaces-between">
          <span className="font text-rl ml-2">
          © 2024-2025 Leafy. All Rights Reserved.
          </span>
          <a
            href="https://arbitrum.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-5 ml-auto"
          >
            <Image
              src="/images/arbitrum-arb-logo.png"
              alt="Arbitrum Logo"
              className=""
              width={40}
              height={40}
              priority
            />
          </a>
          <a
            href="https://github.com/JamesSoriano/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-5"
          >
            <Image
              src="/images/githublogo.svg"
              alt="Github Logo"
              className=""
              width={40}
              height={40}
              priority
            />
          </a>
        </p>
      </div>
    </main>
  );
}