import { useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";

function Withdraw() {
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      console.error("Withdrawal failed:", e);
      alert("Make sure you have staked and wait for 2 minutes before withdrawing");
    }
  };

  return (
    <button
          className="rounded-full bg-blue-400 transition duration-200 ease-in-out hover:bg-yellow-500 hover:shadow-lg py-3 px-6 text-xl"
          onClick={withdrawCoin}
        >
          WITHDRAW ALL
        </button>
      
    
  );
}

export default Withdraw;
