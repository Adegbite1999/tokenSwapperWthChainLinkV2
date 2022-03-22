import {ethers} from 'hardhat';

async function main() {

    const MarketPlace = await ethers.getContractFactory("MarketPlace");
    const market = await MarketPlace.deploy()
    const receipt = await market.deployed()
     console.log(receipt.address)
}
main()
    .catch((error) =>{
        console.error(error);
        process.exitCode = 1;
    })