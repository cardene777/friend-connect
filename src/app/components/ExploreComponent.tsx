import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface TabComponentProps {
  tabs: string[];
}

const ExploreComponent: React.FC<TabComponentProps> = ({ tabs }) => {
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
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((element, i) => (
              <button
                key={i}
                type="button"
                className="w-full"
                onClick={handleButtonClick}
              >
                <div
                  className="flex items-center justify-start p-4"
                  key={element}
                >
                  <div className="flex items-center mr-4">
                    <Image
                      src={`/icon/${element}.png`}
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                  <div className="justify-start">
                    <div>
                      <p className="font-semibold text-textColor">
                        {userArray[index]}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <p className="text-textColor font-semibold">
                        <span className="font-bold text-textStrong">
                          0.{element + 1}
                        </span>{" "}
                        ETH
                      </p>
                      <p className="text-sm text-gray-600">1mo ago</p>
                      <p className="text-sm text-green-500">Online now</p>
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

export default ExploreComponent;
