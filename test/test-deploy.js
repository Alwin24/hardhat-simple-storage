const { ethers, run, network } = require("hardhat")
const { assert } = require("chai")

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage

  before(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()
  })

  it("should return the current value as 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), 0)
  })

  it("should set value when store is called", async () => {
    const transactionResponse = await simpleStorage.store(24)
    await transactionResponse.wait(1)
    const newValue = await simpleStorage.retrieve()
    assert.equal(newValue.toString(), 24)
  })
})