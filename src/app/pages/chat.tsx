import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faShareNodes,
  faBookmark,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface Message {
  id: number;
  text: string;
  timestamp: Date;
}

export default function Chat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const router = useRouter();

  const handleButtonClick = () => {
    // 特定のパスに遷移
    router.push("/chats");
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1, // 簡単なID割り当て
      text: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className=" bg-[#fef6e4] h-screen">
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button type="button" onClick={handleButtonClick}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="mr-3 text-textColor text-xl"
              />
            </button>
            <Image
              src={"/icon/1.png"}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className=" text-lg bg-textStrong px-4 py-2 rounded-xl text-white">
            Buy
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div>
              <div className="font-bold text-textColor text-lg">
                Ethan CryptoField
              </div>
              <div className="text-sm text-green-500">Online now</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button type="button">
              <FontAwesomeIcon
                icon={faShareNodes}
                className="text-textColor text-xl p-2 rounded-full border-2 border-textColor"
              />
            </button>
            <button type="button">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-textColor text-xl p-2 rounded-full border-2 border-textColor"
              />
            </button>
            <button type="button">
              <FontAwesomeIcon
                icon={faBell}
                className="text-textColor text-xl p-2 rounded-full border-2 border-textColor"
              />
            </button>
          </div>
        </div>

        <div className="grid justify-end overflow-auto p-4">
          <div className="w-full grid justify-end">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 my-2 border rounded w-max justify-self-end
                }`}
              >
                <div
                  className={`w-max text-sm text-gray-800 ${
                    msg.text.length > 15 ? "text-wrap" : ""
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          className="flex items-center fixed bottom-0 w-full p-4"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            placeholder="Write something..."
            className="flex-1 border rounded px-4 py-2 mr-4 text-textColor"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-textStrong text-white rounded-full p-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <polyline points="22 2 11 13 22 2 15 22 11 13 2 9 22 2"></polyline>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
