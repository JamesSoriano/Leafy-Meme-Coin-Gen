import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";

function Minting() {
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [balance, setBalance] = useState<number | undefined>();

  useEffect(() => {
    getBalance();
  }, []); // Fetch balance on component mount

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
      // Update balance after successful minting
      getBalance();
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const getBalance = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const balance = await contract.balanceOf(signer);
      const adjustedBalance = Number(balance) / 1000000000000000000;
      setBalance(adjustedBalance);
    } catch (e: any) {
      console.log("Error data:", e.data);
      if (e.data) {
        const decodedError = contract.interface.parseError(e.data);
        console.log(`Fetching stake failed: ${decodedError?.args}`);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
    } else {
      setMintingAmount(undefined);
    }
  };

  return (
      <div className="flex items-center">
        <input
          type="number"
          className="border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent mr-2"
          value={mintingAmount}
          onChange={amountChange}
          placeholder="Enter amount to mint"
        />
        <button
          className="rounded-full bg-green-400 transition duration-200 ease-in-out hover:bg-yellow-500 hover:shadow-lg py-3 px-6 text-xl"
          onClick={mintCoin}
        >
          CLICK HERE
        </button>
      </div>

      
    
  );
}

export default Minting;
