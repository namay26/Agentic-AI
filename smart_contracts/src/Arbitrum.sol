// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {MyToken} from "./MyToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Arbitrum is Ownable{

    error Arbitrum__InsufficentBalance();

    address public usdcTokenAddress;
    address public backendWalletAddress;
    mapping(address myToken => string actualToken) myTokenToMemecoin;
    mapping(address user => mapping(address token => uint256 amount)) userToTokenToAmountOwned; // no need really

    constructor(/*address _backendWalletAddress,*/ address _usdcAddr) Ownable(msg.sender) {
        // backendWalletAddress = _backendWalletAddress;
        usdcTokenAddress = _usdcAddr;
    }

    event TokenCreated(address token, string memecoin);
    event BuyOrder(address user, uint256 amount, address my_token, string meme_coin); // no need
    event BuyOrderFulfilled(address user, address token, uint256 amount);
    event SellOrder(address user, uint256 numTokens, address my_token, string meme_coin); 
    event SellOrderFulfilled(address user, uint256 amount);

    function createToken(string memory actualToken) public {
        MyToken token = new MyToken();
        myTokenToMemecoin[address(token)] = actualToken;
        emit TokenCreated(address(token), actualToken);
    }

    // no need
    function buy(address user, uint256 amount, address token) external payable{
        // this fn will receive funds
        // forward them to backendWalletAddress
        // emit an event which the backend will listen 

        // require(msg.value == (101*amount)/100); // 1% fees aayi ki nhi :) , meteora has around very very less fees

        // IERC20(usdcTokenAddress).transferFrom(address(this),backendWalletAddress,amount); // no need now, we will take usdc payment directly to the backend wallet address
        string memory memecoin = myTokenToMemecoin[token];
    
        emit BuyOrder(user, amount, token, memecoin); // event to be listened by backend to execute the swap
    }

    // to be called by backend just after executing the 'buy' or 'swap' fn on the backend
    function fulfillBuy(address user, uint256 amountToMint, address token) external {
        // userToTokenToAmountOwned[user][token]+=amountToMint;
        MyToken(token).mint(user,amountToMint);
        emit BuyOrderFulfilled(user, token, amountToMint); // no need for backend to listen to this
    }

    function sell(address user, uint256 amountOfTokens, address token) external{
        // check if owner owns this much memecoins
        // ping the backend to sell this much memecoins
        // ask it to return the value 
        require(MyToken(token).balanceOf(user) >= amountOfTokens, Arbitrum__InsufficentBalance());
        string memory memecoin = myTokenToMemecoin[token];
        MyToken(token).burn(user, amountOfTokens);
        // userToTokenToAmountOwned[user][token]-=amountOfTokens;
        emit SellOrder(user, amountOfTokens, token, memecoin); // backend has to pick it up
    }

    function fulfillSell(address user, uint256 amountToPay) external payable{
        IERC20(usdcTokenAddress).transfer(user,amountToPay);
        emit SellOrderFulfilled(user, amountToPay);
    }
}

// make some changes - frontend will call backend which will then call my buy and sell functions
