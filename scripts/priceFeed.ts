import {ethers} from "hardhat";

const main = async() =>{
const priceFeed = await ethers.getContractFactory("PriceConverter");
const deployPriceFeed = await priceFeed.deploy()
await deployPriceFeed.deployed()

const deployedAddress = deployPriceFeed.address;

console.log(deployedAddress)

// get priceFeeds of base/quote

const base = 0x6135b13325bfC4B00278B4abC5e20bbce2D6580e; //BTC/USD
const quote = 0x777A68032a88E5A84678A77Af2CD65A7b3c0775a; //DAI/USD
const decimals = 8;

const priceFeedResult = await deployPriceFeed.getDerivedPrice(base, quote, decimals);

console.log(priceFeedResult)


}
main()
    .catch((error) =>{
        console.error(error);
        process.exitCode = 1;
    })
