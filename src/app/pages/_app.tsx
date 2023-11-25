import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/navbar";
import Header from "../components/header";
import "../styles/globals.css";
import { useRouter } from "next/router";

const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const currentPath = router.asPath;
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress: "0x9838b534cd5950CB6ea9E7fa94c00CF3986F953B",
          gasless: true,
        }),
      ]}
    >
      {!["/chat", "/explore", "/user"].includes(currentPath) && <Header />}
      <Component {...pageProps} />
      {!["/chat"].includes(currentPath) && <Navbar />}
    </ThirdwebProvider>
  );
}

export default MyApp;
