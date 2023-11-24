import {
  ConnectWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();

  const { contract } = useContract(NFT_CONTRACT_ADDRESS);

  const { data: contractMetadata } = useContractMetadata(contract);

  return (
    <div className="bg-[#fef6e4] h-screen">
      <div className={styles.loginContainer}>
        <ConnectWallet btnTitle="Create Wallet" />
      </div>
    </div>
  );
};

export default Home;
