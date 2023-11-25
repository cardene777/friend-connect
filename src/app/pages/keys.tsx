import Image from "next/image";
import TabComponent from "../components/TabComponent";
import { useState } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import {
  FRIEND_CONNECT_SHARE_CONTRACT_ADDRESS,
  SHARE_OBJECT_ADDRESS,
} from "../utils/config";

export default function Keys() {
  const address = useAddress();
  const { contract } = useContract(FRIEND_CONNECT_SHARE_CONTRACT_ADDRESS);
  const { data, isLoading, error } = useContractRead(contract, "sharesSupply", [
    "0xD9EB51408B1a3625591711a565aaB9824Bf99678",
  ]);
  console.log(`data: ${data}`);
  console.log(`address: ${address}`);
  const [tabNameArray, setTabNmeArray] = useState([
    "You",
    "Your keys",
    "Friends",
    "Global",
  ]);
  return (
    <div className="bg-[#fef6e4] h-max">
      <div className="flex justify-around pt-4">
        <div className="rounded-xl bg-textStrong p-4">
          <p className="text-textColor font-semibold">Portfolio</p>
          <p className="text-textColor font-bold flex items-center">
            <Image src={"/keys/ethereum.png"} alt="" width={30} height={30} />
            0.002
          </p>
        </div>
        <div className="rounded-xl border-2 border-gray-300 p-4">
          <p className="text-textColor font-semibold">Your Key</p>
          <p className="text-textColor font-bold flex items-center">
            <Image src={"/keys/ethereum2.png"} alt="" width={30} height={30} />
            0.001
          </p>
        </div>
        <div className="rounded-xl border-2 border-gray-300 p-4">
          <p className="text-textColor font-semibold">Hold Keys</p>
          <p className="text-textColor font-bold">1</p>
        </div>
      </div>
      <div className="mt-4 mb-30 bg-[#fef6e4]">
        <TabComponent tabs={tabNameArray} />
      </div>
      <div className="mt-4 flex justify-center">
        <p className="w-1/3 bg-textColor rounded-full text-center p-2">Load more</p>
      </div>
    </div>
  );
}
