pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address _to, uint _amount) external returns(bool);
      function transferFrom(address from,address to,uint256 amount) external returns (bool);
       function balanceOf(address account) external view returns (uint256);
}