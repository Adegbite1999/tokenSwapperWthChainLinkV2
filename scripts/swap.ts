            import { Signer } from 'ethers';
            import {ethers} from 'hardhat';

            async function main() {
                // const signer = await ethers.getSigner(AAVESENDER)
    const deployMarketPlaceAddress = "0x96F3Ce39Ad2BfDCf92C0F6E2C2CAbF83874660Fc";
            const deployedPriceFeedAddress = "0x40a42Baf86Fc821f972Ad2aC878729063CeEF403";
// 
            // base and quote address
            const base = "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9"; //AAVE/USD
            const quote = "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9"; //DAI/USD
            const decimals = 8;

            // // 

            // const PriceFeedContract = await ethers.getContractAt("PriceConverter", deployedPriceFeedAddress)
                const MarketPlaceContract = await ethers.getContractAt("MarketPlace", deployMarketPlaceAddress);
                const AAVECONTRACTADDRESS = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
                const AAVEHOLDER = "0x80845058350b8c3df5c3015d8a717d64b3bf9267";
                const DAICONTRACTADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
                const DAIHOLDER ="0x66c57bf505a85a74609d2c83e94aabb26d691e1f";


                const AAVE = await ethers.getContractAt("IERC20",AAVECONTRACTADDRESS);
                const DAI = await ethers.getContractAt("IERC20",DAICONTRACTADDRESS);
            //     // Adding Liquidity
            //     // impersonate BTC holder and DAI holder, then transfer their balance into contract account
                // check the balance of contract
                // @ts-ignore
                await hre.network.provider.request({
                    method: "hardhat_impersonateAccount",
                    params: [AAVEHOLDER],
                });
            // @ts-ignore
                await hre.network.provider.request({
                    method: "hardhat_impersonateAccount",
                    params: [DAIHOLDER],
                });
                
                const AAVEsigner = await ethers.getSigner(AAVEHOLDER)
                const DAIsigner = await ethers.getSigner(DAIHOLDER)

                    // CHECK AAVEHOLDER AND DAIHOLDER BALANCES   
                 console.log("Balance of AAVE holder:",await AAVE.balanceOf(AAVEHOLDER));
                 console.log("Balance of DAI holder:",await DAI.balanceOf(DAIHOLDER));
                    
                //  CREATE LIQUIDITY FOR MARKETPLACE CONTRACT
                // check balance of contract before
                console.log(`Your balance before`, await  AAVE.balanceOf(deployMarketPlaceAddress))
                console.log(`Your balance before`, await  DAI.balanceOf(deployMarketPlaceAddress))
                AAVE.connect(AAVEsigner).transfer(deployMarketPlaceAddress, "1000000000000000000")
                DAI.connect(DAIsigner).transfer(deployMarketPlaceAddress, "1000000000000000000" )
                console.log(`Your balance for aave`, await  AAVE.balanceOf(deployMarketPlaceAddress))
                console.log(`Your balance for dai`, await  DAI.balanceOf(deployMarketPlaceAddress))
                
                

                // impersonate an aave holder to simulate msg.sender
                const AAVESENDER="0x3744da57184575064838bbc87a0fc791f5e39ea2";
              // @ts-ignore
                await hre.network.provider.request({
                    method: "hardhat_impersonateAccount",
                   params: [AAVESENDER],
                });
                  const signer:Signer = await ethers.getSigner(AAVESENDER)
                //   first before swapping grant contract allowance
               const approve = await AAVE.connect(signer).approve(deployMarketPlaceAddress, "5000000000000000000");
               console.log(await approve.wait())
               const allowance = await AAVE.allowance(AAVESENDER, deployMarketPlaceAddress);

               console.log(`amount of allowance given is ${allowance}`);
                
            //     // swapTokenAAVE 4 DAI.

                const fromToken = "0x19184ab45c40c2920b0e0e31413b9434abd243ed"
                //  @ts-ignore
                await hre.network.provider.request({
                    method: "hardhat_impersonateAccount",
                    params: [AAVESENDER],
                });
                const swapper:Signer = await ethers.getSigner(AAVESENDER)
                await MarketPlaceContract.connect(swapper).SwapToken(
                    AAVECONTRACTADDRESS,
                    DAICONTRACTADDRESS,
                    base,
                    quote,
                    decimals,
                    "100"
                )
                console.log(await DAI.balanceOf(AAVESENDER))



                     console.log(`Your balance for aave`, await  AAVE.balanceOf(deployMarketPlaceAddress))
                console.log(`Your balance for dai`, await  DAI.balanceOf(fromToken))


                //  impersonate
            }
            main()
                .catch((error) =>{
                    console.error(error);
                    process.exitCode = 1;
                })