import ExploreComponent from "../components/ExploreComponent";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Explore() {
  const [tabNameArray, setTabNmeArray] = useState([
    "Online",
    "Trending",
    "Top",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    "Tara Chainwright",
    "Ethan CryptoField",
    "Ivy Smart",
    "Jordan Tokenhill",
    "Skyler Bitmont",
  ]);

  const handleSearch = () => {
  };

  return (
    <div className="bg-[#fef6e4] h-screen">
      <div className="p-3 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by username"
          className="border p-3 rounded-xl w-full mr-3 text-textColor"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type="button" onClick={handleSearch} className=" ">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="mr-3 text-textColor text-xl p-3 rounded-full bg-textStrong"
          />
        </button>
      </div>
      <div className="pt-4 mb-30 bg-[#fef6e4]">
        <ExploreComponent tabs={tabNameArray} />
      </div>
      <div className="mt-4 flex justify-center">
        <p className="w-1/3 bg-textColor rounded-full text-center p-2">
          Load more
        </p>
      </div>
    </div>
  );
}
