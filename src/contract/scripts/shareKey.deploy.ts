import { ethers } from "hardhat";

async function main() {
  const ShareKeyContract = await ethers.deployContract(
    "contracts/ShareKey.sol:ShareKey"
  );

  const contract = await ShareKeyContract.waitForDeployment();

  const deploymentTx = contract.deploymentTransaction();

  console.log(`Contract Address: ${await contract.getAddress()}`);
  console.log(`Tx Hash: ${deploymentTx?.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
