'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';
import { usePrivy } from "@privy-io/react-auth";
import Web3 from 'web3'; 
import localFont from 'next/font/local';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';

const myFont = localFont({
  src: [
    {
      path: '../../Mimoid.woff',
      weight: '800', 
      style: 'normal', 
    },
  ],
  display: 'swap',
});

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_usdcAddr",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Arbitrum__InsufficentBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "my_token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "meme_coin",
				"type": "string"
			}
		],
		"name": "BuyOrder",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BuyOrderFulfilled",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "actualToken",
				"type": "string"
			}
		],
		"name": "createToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountToMint",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "fulfillBuy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountToPay",
				"type": "uint256"
			}
		],
		"name": "fulfillSell",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountOfTokens",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "sell",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "numTokens",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "my_token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "meme_coin",
				"type": "string"
			}
		],
		"name": "SellOrder",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "SellOrderFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "memecoin",
				"type": "string"
			}
		],
		"name": "TokenCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "backendWalletAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdcTokenAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

type CoinData = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
};

type Token = {
  symbol: string;
  icon: string;
  address: string; 
};

const tokens: Token[] = [
  { symbol: 'USDT', icon: '💰', address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9' }, 
  { symbol: 'USDC', icon: '💵', address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8' },
];

const CONTRACT_ADDRESS = '0x256Bac4CCD510f812efAE680a61e6Ebd6356F5EA'; 

const CryptoTradingPage = () => {
  const { login, logout, authenticated, user } = usePrivy();

  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('sell');
  const [spendAmount, setSpendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('0');
  const [spendToken, setSpendToken] = useState<Token>(tokens[0]);
  const [receiveToken, setReceiveToken] = useState<Token>(tokens[1]);
  const [isSpendDropdownOpen, setIsSpendDropdownOpen] = useState(false);
  const [isReceiveDropdownOpen, setIsReceiveDropdownOpen] = useState(false);
  const [memeCoins, setMemeCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
	const [memeCoinName, setMemeCoinName] = useState<string>(''); 
  const [contract, setContract] = useState<Web3['eth']['Contract'] | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);


  useEffect(() => {
    fetchMemeCoinData();
    const interval = setInterval(fetchMemeCoinData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function initWeb3() {
      if (authenticated && user?.wallet?.address) {
        if ((window as any).ethereum) {
          try {
            const web3Instance = new Web3((window as any).ethereum);
            setWeb3(web3Instance);
            await (window as any).ethereum.enable(); 
            const contractInstance = new web3Instance.eth.Contract(
              contractABI as any, 
              CONTRACT_ADDRESS
            );
            setContract(contractInstance);
          } catch (error) {
            console.error("Could not connect to wallet:", error);
            setError("Could not connect to wallet. Please try again.");
          }
        }
        else if ((window as any).web3) {
          const web3Instance = new Web3((window as any).web3.currentProvider);
          setWeb3(web3Instance);
          const contractInstance = new web3Instance.eth.Contract(
            contractABI as any, 
            CONTRACT_ADDRESS
          );
          setContract(contractInstance);
          console.log("Injected web3 detected.");
        }
        else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
          setError("No Ethereum browser detected. Please install MetaMask.");
        }
      } else {
        setContract(null);
        setWeb3(null);
      }
    }

    initWeb3();
  }, [authenticated, user]);


  const handleTabChange = (tab: 'buy' | 'sell') => {
    setActiveTab(tab);
    setSpendAmount('');
    setReceiveAmount('0');
  };

  const handleSpendAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setSpendAmount(value);
      setReceiveAmount(value || '0');
    }
  };

 const handleTokenSwitch = (dropdownType: 'spend' | 'receive', selected: Token) => {
    if (dropdownType === 'spend') {
      setSpendToken(selected);
      setIsSpendDropdownOpen(false);
    } else {
      setReceiveToken(selected);
      setIsReceiveDropdownOpen(false);
    }
  };

  const fetchMemeCoinData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 5,
          page: 1,
          sparkline: false,
          category: 'solana-meme-coins'
        }
      });
      setMemeCoins(response.data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setError(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuy = async () => {
    if (!contract || !user?.wallet?.address || !web3) {
      console.error('Contract not initialized or wallet not connected');
      return;
    }

    try {
      const amount = web3.utils.toWei(spendAmount, 'mwei'); 
      const tokenAddress = receiveToken.address;
      const userAddress = user.wallet.address;

      console.log(`Buying with: User ${userAddress}, amount ${amount}, token ${tokenAddress}`);

      await contract.methods.buy(userAddress, amount, tokenAddress).send({
        from: userAddress,
        value: web3.utils.toWei('0.001', 'ether'), 
      });

      console.log('Buy successful');
    } catch (error) {
      console.error('Error buying:', error);
      setError(`Buy failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSell = async () => {
    if (!contract || !user?.wallet?.address || !web3) {
      console.error('Contract not initialized or wallet not connected');
      return;
    }

    try {
      const amount = web3.utils.toWei(spendAmount, 'mwei'); 
      const tokenAddress = spendToken.address;
      const userAddress = user.wallet.address;

      console.log(`Selling with: User ${userAddress}, amount ${amount}, token ${tokenAddress}`);

      await contract.methods.sell(userAddress, amount, tokenAddress).send({
        from: userAddress,
      });

      console.log('Sell successful');
    } catch (error) {
      console.error('Error selling:', error);
      setError(`Sell failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleCreateToken = async () => {
    if (!contract || !user?.wallet?.address) {
      console.error('Contract not initialized');
      return;
    }

    try {
       const userAddress = user.wallet.address;
      await contract.methods.createToken(memeCoinName).send({ from: userAddress });
      console.log('Token creation successful');
    } catch (error) {
      console.error('Error creating token:', error);
      setError(`Token creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ShootingStars />
      <StarsBackground />
      <div className="max-w-7xl mx-auto p-8">
      <h1 className={`text-4xl font-bold mb-8 ${myFont.className}`}>{activeTab === 'buy' ? 'Buy' : 'Sell'}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-3xl p-6 backdrop-filter backdrop-blur-lg bg-gray-800/50 border border-gray-700 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">Popular Memecoins</h2>
            {isLoading ? (
              <p>Loading live data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {memeCoins.map((coin) => (
                  <div key={coin.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{coin.symbol.toUpperCase()}</span>
                    </div>
                    <div className="text-right">
                      <div>${coin.current_price.toLocaleString()}</div>
                      <div className={coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="rounded-2xl p-6 backdrop-filter backdrop-blur-lg bg-gray-800/50 border border-gray-700 shadow-2xl">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => handleTabChange('buy')}
                className={`flex-1 py-2 rounded text-center transition-colors ${activeTab === 'buy'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                Buy
              </button>
              <button
                onClick={() => handleTabChange('sell')}
                className={`flex-1 py-2 rounded text-center transition-colors ${activeTab === 'sell'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                Sell
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <label className="text-sm text-gray-400">Spend</label>
                <div className="flex items-center justify-between mt-2">
                  <input
                    type="text"
                    value={spendAmount}
                    onChange={(e) => handleSpendAmountChange(e.target.value)}
                    placeholder="Enter Amount"
                    className="bg-transparent text-xl outline-none w-full"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSpendAmount('')}
                      className="hover:text-gray-300"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setIsSpendDropdownOpen(!isSpendDropdownOpen)}
                        className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
                      >
                        <span>{spendToken.icon} {spendToken.symbol}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {isSpendDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg z-10">
                          {tokens.map((token) => (
                            <button
                              key={token.symbol}
                              onClick={() => handleTokenSwitch('spend', token)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg flex items-center space-x-2"
                            >
                              <span>{token.icon}</span>
                              <span>{token.symbol}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <label className="text-sm text-gray-400">Receive</label>
                <div className="flex items-center justify-between mt-2">
                  <input
                    type="text"
                    value={receiveAmount}
                    readOnly
                    className="bg-transparent text-xl outline-none w-full"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <button
                        onClick={() => setIsReceiveDropdownOpen(!isReceiveDropdownOpen)}
                        className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
                      >
                        <span>{receiveToken.icon} {receiveToken.symbol}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {authenticated && (
              <div className="flex space-x-4 mt-6">
                <button
                  className="flex-1 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-400"
                  onClick={handleBuy}
                >
                  Buy
                </button>
                <button
                  className="flex-1 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-400"
                  onClick={handleSell}
                >
                  Sell
                </button>
              </div>
            )}

            <button
              className="w-full py-3 bg-blue-500 text-white rounded-lg mt-6 font-medium hover:bg-blue-400"
              onClick={authenticated ? logout : login}
            >
              {authenticated ? (user ? `Disconnect ${user?.wallet?.address.substring(0, 6)}...${user?.wallet?.address.slice(-4)}` : "Disconnect Wallet") : "Connect Wallet"}
            </button>

            {authenticated && (
              <p className="mt-4 text-sm text-gray-400">
                Connected as: {user?.wallet?.address}
              </p>
            )}
          </div>
        </div>
        <div className="rounded-3xl p-6 mt-8 backdrop-filter backdrop-blur-lg bg-gray-800/50 border border-gray-700 shadow-2xl neon-glow">
        <h2 className={`text-xl font-semibold mb-4 ${myFont.className}`}>Create Token</h2>
            <input
              type="text"
              value={memeCoinName}
              onChange={(e) => setMemeCoinName(e.target.value)}
              placeholder="Enter Meme Coin Name"
              className="bg-gray-900 text-white rounded-lg p-3 w-full"
            />
            <button
              className="w-full py-3 bg-purple-500 text-white rounded-lg mt-4 font-medium hover:bg-purple-400"
              onClick={handleCreateToken}
            >
              Create Token
            </button>
          </div>
      </div>
    </div>
  );
};

export default CryptoTradingPage;
