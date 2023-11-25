import Image from "next/image";
import ChatList from "../components/ChatList";
import { useState } from "react";

export default function Chats() {
  const [tabNameArray, setTabNmeArray] = useState([
    "You",
    "Your keys",
    "Friends",
    "Global",
  ]);
  return (
    <div className="bg-[#fef6e4] h-screen">
      <div className="flex justify-between mx-3 items-center">
        <p className="text-textColor">Rooms</p>
        <div className="rounded-x p-4">
          <p className="text-textColor font-bold flex items-center">
            <Image src={"/keys/ethereum.png"} alt="" width={30} height={30} />
            0.002
          </p>
        </div>
      </div>
      <ChatList />
    </div>
  );
}
