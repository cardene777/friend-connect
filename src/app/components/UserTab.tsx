import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface TabComponentProps {
  tabs: string[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
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
    router.push("/user");
  };

  return (
    <div className="pb-52">
      <div className="flex space-x-1 justify-start ml-3">
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 text-textColor ${
              activeTab === index ? "font-bold" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 bg-[#fef6e4]">
        {tabs.map((tab, index) => (
          <div key={index} className={`${activeTab === index ? "" : "hidden"}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((element, i) => (
              <button
                key={i}
                type="button"
                className="w-full"
                onClick={handleButtonClick}
              >
                <div className="w-full flex items-center justify-start p-4">
                  <div className="flex items-center mr-4">
                    <Image
                      src={`/icon/${index + 1}.png`}
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <Image
                      src={`/icon/${index + 2}.png`}
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                  <div className="justify-start">
                    <p className="font-semibold text-textColor text-start">
                      {userArray[index]}
                    </p>
                    <div className="flex items-center">
                      <p className="text-textColor font-semibold mr-3">
                        <span className="font-bold text-textStrong">0.001</span>{" "}
                        ETH
                      </p>
                      <p className="text-sm text-gray-600">1mo ago</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabComponent;
