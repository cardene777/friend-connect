import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [userArray, setUserArray] = useState([
    "Tara Chainwright",
    "Ethan CryptoField",
    "Ivy Smart",
    "Jordan Tokenhill",
    "Skyler Bitmont",
  ]);
    const router = useRouter();

    const handleButtonClick = () => {
      // 特定のパスに遷移
      router.push("/chat");
    };

  return (
    <div className="pb-52">
      <div className="mt-4 bg-[#fef6e4]">
        {userArray.map((user, index) => (
          <button
            key={index}
            type="button"
            className="w-full"
            onClick={handleButtonClick}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Image
                  src={`/icon/${index + 1}.png`}
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-full mr-3"
                />
                <div className="mr-3 text-start">
                  <p className="font-semibold text-textColor">
                    {userArray[index]}
                  </p>
                </div>
              </div>
              <div className="flex items-end space-x-3">
                <p className="text-textColor font-semibold">
                  <span className="font-bold text-textStrong">0.001</span> ETH
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabComponent;
