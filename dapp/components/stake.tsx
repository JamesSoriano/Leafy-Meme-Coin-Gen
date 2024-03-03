import { useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";

function Staking() {
  const [stakingAmount, setStakingAmount] = useState<number>();
  const [stakedAmount, setStakedAmount] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const stakedAmountString = stakedAmount?.toString();

  const getStake = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const stakedInEth = await contract.getStake(signer);
      setStakedAmount(stakedInEth);
    } catch (e: any) {
      console.error("Fetching stake failed:", e);
      alert("Failed to fetch stake amount.");
    }
  };

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
      // Update staked amount after successful staking
      getStake();
    } catch (e: any) {
      console.error("Staking failed:", e);
      alert("Failed to stake coins.");
    }
  };

  const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
    } else {
      setStakingAmount(undefined);
    }
  };

  return (
    
      

      <div className="flex items-center">
        <input
          type="number"
          className="border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent mr-2"
          value={stakingAmount}
          onChange={(e) => amountChange(e)}
          placeholder="Enter amount to stake"
          style={{ color: "black" }}
        />
        <button
          className="rounded-full bg-red-400 transition duration-200 ease-in-out hover:bg-yellow-500 hover:shadow-lg py-3 px-6 text-xl"
          onClick={stakeCoin}
        >
          CLICK HERE
        </button>
      </div>

      

  );
}

export default Staking;
