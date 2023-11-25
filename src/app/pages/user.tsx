import React, { useState } from "react";
import Image from "next/image";
import { utils } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import UserTab from "../components/UserTab";
import { useRouter } from "next/router";
import { FRIEND_CONNECT_SHARE_CONTRACT_ADDRESS, SHARE_OBJECT_ADDRESS } from "../utils/config"
import {
  Web3Button,
  useAddress,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";

export default function UserProfile() {
    const address = useAddress();
    const { contract } = useContract(FRIEND_CONNECT_SHARE_CONTRACT_ADDRESS);

    const { mutateAsync, isLoading, error } = useContractWrite(
        contract,
        "buyShares",
    );

    console.log(`error: ${error}`);

    const [tabs, setTabs] = useState(["Keys", "Trades", "Holders", "Holding"]);
    const router = useRouter();

    const handleButtonClick = () => {
      // 特定のパスに遷移
      router.push("/keys");
    };
  return (
    <div className="min-h-screen p-4 bg-[#fef6e4]">
      <div className="flex items-center my-3">
        <button type="button" onClick={handleButtonClick}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="mr-3 text-textColor text-3xl"
          />
        </button>
      </div>
      <div className="w-full flex items-start justify-between">
        <div className="mb-4">
          <Image
            src={`/icon/1.png`}
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="justify-end">
          <div className="flex space-x-2">
            <button type="button" className="">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-textColor text-xl p-2 rounded-full border-2 border-textColor"
              />
            </button>
            <button type="button">
              <FontAwesomeIcon
                icon={faComment}
                className="text-textColor text-xl p-2 rounded-full border-2 border-textColor"
              />
            </button>
            <Web3Button
              contractAddress={FRIEND_CONNECT_SHARE_CONTRACT_ADDRESS}
              action={() =>
                mutateAsync({
                  args: [SHARE_OBJECT_ADDRESS, 100],
                  overrides: {
                    gasLimit: 1000000,
                    value: utils.parseEther("0.1"),
                  },
                })
              }
              onSuccess={() => alert("Buy Share Key!")}
            >
              Buy
            </Web3Button>
          </div>
          <div className="grid justify-end">
            <p className="text-textColor font-bold flex items-center">
              <Image src={"/keys/ethereum.png"} alt="" width={30} height={30} />
              0.002
            </p>
            <p className="text-textColor font-semibold justify-self-end">
              Key Price
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-textColor">Ethan CryptoField</h1>
        <p className="text-gray-600 text-sm">
          Last seen 5m ago · Last message sent 25m ago
        </p>
        <p className="my-2 text-gray-600 text-sm">
          They net sold <span className="text-textStrong">100</span> ETH of keys
          in the past 7 days
        </p>
        <p className="my-6 text-textColor">Top 1 key price 👑</p>
        <p className="my-6 text-textColor">Join the movement (C,B,B) 🎓</p>
        <p className="my-6 text-textColor">Stronger together 👊</p>
      </div>

      <div className="flex justify-start space-x-4">
        <div className="text-center">
          <p className="font-bold text-textColor">120</p>
          <p className="text-gray-600 text-sm">holders</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-textColor">150</p>
          <p className="text-gray-600 text-sm">holding</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-textColor">6000</p>
          <p className="text-gray-600 text-sm">watchlists</p>
        </div>
      </div>

      <UserTab tabs={tabs} />
    </div>
  );
}
