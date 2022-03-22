import {ethers} from "hardhat";

const main = async() =>{
const priceFeed = await ethers.getContractFactory("PriceConverter");
const deployPriceFeed = await priceFeed.deploy()
await deployPriceFeed.deployed()

const deployedAddress = deployPriceFeed.address;

console.log(deployedAddress)

// get priceFeeds of base/quote

const base = "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9"; //AAVE/USD
const quote = "0x777A68032a88E5A84678A77Af2CD65A7b3c0775a"; //DAI/USD
const decimals = 8;

// const priceFeedResult = await deployPriceFeed.getDerivedPrice(base, quote, decimals);

// console.log(priceFeedResult)
// deployed address 0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE

}
main()
    .catch((error) =>{
        console.error(error);
        process.exitCode = 1;
    })
