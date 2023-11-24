import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";
import Image from "next/image";
import TabComponent from "../components/TabComponent";
import { useState } from "react";

export default function Keys() {
  const [tabNameArray, setTabNmeArray] = useState([
    "You",
    "Your keys",
    "Friends",
    "Global",
  ]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const address = useAddress();

  const { contract } = useContract(NFT_CONTRACT_ADDRESS);

  const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

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
          <p className="text-textColor font-semibold">Your Rank</p>
          <p className="text-textColor font-bold">60,000</p>
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
