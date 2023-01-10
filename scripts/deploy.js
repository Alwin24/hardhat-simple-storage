const { ethers, run, network } = require("hardhat")

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying SimpleStorage...")
  const simpleStorage = await SimpleStorageFactory.deploy()

  await simpleStorage.deployed()
  console.log(`Deployed to ${simpleStorage.address}`)

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  const transactionResponse = await simpleStorage.store(24)
  await transactionResponse.wait(1)
  const newValue = await simpleStorage.retrieve()
  console.log(`New value: ${newValue}`)

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })

  } catch (error) {
    console.log(error.message)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })