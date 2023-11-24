import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const address = useAddress();
  return (
    <div className="pt-1 bg-[#fef6e4] rounded-lg shadow-top fixed bottom-0 w-full">
      <div className="flex items-center justify-around">
        <Link href="/keys" className="text-center">
          <Image src={"/navbar/key.png"} alt="" width={72} height={72} />
          <p className="text-textColor font-semibold">Keys</p>
        </Link>
        <Link href="/chats" className="text-center">
          <Image src={"/navbar/chat.png"} alt="" width={72} height={72} />
          <p className="text-textColor font-semibold">Chats</p>
        </Link>
        <Link href="/explore" className="text-center">
          <Image src={"/navbar/explore.png"} alt="" width={72} height={72} />
          <p className="text-textColor font-semibold">Explore</p>
        </Link>
        <Link href="/airdrop" className="text-center">
          <Image src={"/navbar/airdrop.png"} alt="" width={72} height={72} />
          <p className="text-textColor font-semibold">Airdrop</p>
        </Link>
      </div>
    </div>
  );
}
