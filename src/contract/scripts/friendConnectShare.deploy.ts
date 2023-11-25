import { ethers } from "hardhat";

async function main() {
  const shareKeyContract = "0x12567CdFd80371E08383697bFcfbC42cD8959f36";
  const FriendConnectShareContract = await ethers.deployContract(
    "FriendConnectShare",
    [shareKeyContract]
  );

  const contract = await FriendConnectShareContract.waitForDeployment();

  const deploymentTx = contract.deploymentTransaction();

  console.log(`Contract Address: ${await contract.getAddress()}`);
  console.log(`Tx Hash: ${deploymentTx?.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
