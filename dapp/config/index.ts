import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x5788bbA335A62C38D28220dfc8C90a2A94D40046",
        abi as any,
        signer
    );
}