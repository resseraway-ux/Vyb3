import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Vyb3Posts...");
  const Vyb3Posts = await ethers.getContractFactory("Vyb3Posts");
  const contract = await Vyb3Posts.deploy();
  await contract.deployed();
  console.log("Vyb3Posts deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});