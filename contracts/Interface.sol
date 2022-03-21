// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IERC20 {
    function transfer(address _to, uint256 _amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

// contract Swap {
//     struct swapRecord{
//         address base;
//         address quote;
//         bool status;
//         uint256 fromTokenAmount;
//         uint256 toTokenAmount;
//     }

//     uint256 index = 0;

//     mapping(uint => swapRecord) swaps;

//         function swapEthForUsdt(address _from, address _to, bool _status, uint256 fromToken, uint256 toAmounToken ) external {
//             swapRecord storage o = swaps[index];
//             o.from = _from;
//             o.to = _to;
//             // transfer


//         }
//         transfer SendEthForUsdt(uint256 _fromTokenamount ){

//         }
//     // struct Order {
//     //     address fromToken;
//     //     address toToken;
//     //     bool status;
//     //     uint256 fromTokenAmountIn;
//     //     uint256 toTokenAmountOut;
//     //     uint256 amountAvailable;
//     //     address owner;
//     // }
//     // int decimal;
//     //  PriceConsumerV3 p = new PriceConsumerV3();
//     // int price = p.getLatestPrice();

//     // int rate = price / decimal;

//     // uint256 indexToOrder = 1;
//     // mapping(uint256 => Order) orders;

//     // function initiateOrder(address _fromToken, address _toToken, address _owner, uint _amountIn, uint _amountOut)   external {
//     //     Order storage s = orders[indexToOrder];
//     //     require(IERC20(_fromToken).transferFrom(msg.sender, address(this), _amountIn), "Check transaction");
//     //     s.fromToken = _fromToken;
//     //     s.toToken = _toToken;
//     //     s.fromTokenAmountIn = _amountIn;
//     //     s.amountAvailable = _amountIn;
//     //     s.toTokenAmountOut = uint256(rate);
//     //     s.owner = msg.sender;
//     //     indexToOrder++;
//     // }

//     // swap 

//     // function executeSwap(uint _index, uint _amountIn) payable external {
//     //   Order storage o = orders[_index];
//     //   assert(!o.status);
//     //   assert(o.toToken != address(0));
//     //  uint256 calcRate = _amountIn / uint256(rate);
//     //   require(IERC20(o.toToken).transferFrom(msg.sender, o.owner, _amountIn), "Check transaction failed");
//     //   require(IERC20(o.fromToken).transfer(msg.sender, calcRate), "Check transaction");
//     //   o.amountAvailable -= calcRate;
//     //   o.status=o.amountAvailable==0?true:false;
//     // }
// }
