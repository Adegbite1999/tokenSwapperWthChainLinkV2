// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Price.sol";
import "./Interface.sol";

contract MarketPlace {
PriceConverter priceCalc = PriceConverter(0x40a42Baf86Fc821f972Ad2aC878729063CeEF403);
IERC20 private TokenA;
IERC20 private TokenB;

struct SwapRecord {
    address fromToken;
    address baseToken;
    address toToken;
    address quoteToken;
    uint256 amountIn; // baseTokenAmount
    uint256 amountOut; // TokenAmount
    uint256 timeOfTransaction;
    bool status;
}

uint256 indexToSwapRecord = 0;
mapping(uint => SwapRecord) Swap;

function SwapToken(address _fromToken, address _toToken, address _baseToken, address _quoteToken, uint8 _decimals, uint256 _amountIn) external{
    int256 rate = priceCalc.getDerivedPrice(_baseToken, _quoteToken, _decimals);
    uint256 amountReturn = uint256(rate) * _amountIn;
    SwapRecord storage record = Swap[indexToSwapRecord];
    record.fromToken = _fromToken;
    record.toToken = _toToken;
    record.baseToken = _baseToken;
    record.quoteToken = _quoteToken;
    record.amountIn = _amountIn;
    record.amountOut = amountReturn;
    record.timeOfTransaction = block.timestamp;
    transferFromClientToContract(record.amountIn, _fromToken);
    transferFromContractToClient(record.amountOut, _toToken);
    record.status = true;
    indexToSwapRecord +=1;
}


        function transferFromClientToContract(uint256 _amount, address _fromToken)  internal returns(bool) {
            TokenA = IERC20(_fromToken);
        return TokenA.transferFrom(msg.sender, address(this), _amount);

        }

    function transferFromContractToClient( uint256 _amount, address _toToken) internal returns (bool){
    TokenB = IERC20(_toToken);
    return TokenB.transfer(msg.sender, _amount);
    }



}
