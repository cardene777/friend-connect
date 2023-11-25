import {
  ConnectWallet,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-[#fef6e4] h-screen">
      <div className={styles.loginContainer}>
        <ConnectWallet btnTitle="Create Wallet" />
      </div>
    </div>
  );
};

export default Home;
