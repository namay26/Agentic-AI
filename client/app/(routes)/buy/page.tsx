'use client';

import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

type CryptoData = {
  symbol: string;
  price: number;
  change: number;
};

type Token = {
  symbol: string;
  icon: string;
};

const hotCryptos: CryptoData[] = [
  { symbol: 'BNB', price: 579.83, change: 1.35 },
  { symbol: 'BTC', price: 98485.17, change: 0.68 },
  { symbol: 'ETH', price: 2836.93, change: 2.27 },
  { symbol: 'XRP', price: 2.45, change: -3.18 },
  { symbol: 'SOL', price: 202.17, change: -1.16 },
];

const tokens: Token[] = [
  { symbol: 'USDT', icon: '💰' },
  { symbol: 'USDC', icon: '💵' },
];

const CryptoTradingPage = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('sell');
  const [spendAmount, setSpendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('0');
  const [spendToken, setSpendToken] = useState<Token>(tokens[0]);
  const [receiveToken, setReceiveToken] = useState<Token>(tokens[1]);
  const [isSpendDropdownOpen, setIsSpendDropdownOpen] = useState(false);
  const [isReceiveDropdownOpen, setIsReceiveDropdownOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* <nav className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-8">
          <div className="text-yellow-500 font-bold text-2xl">BINANCE</div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 hover:bg-gray-800 rounded">Log In</button>
          <button className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400">
            Sign Up
          </button>
        </div>
      </nav> */}

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">{activeTab === 'buy' ? 'Buy' : 'Sell'}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Hot Meme Coins</h2>
            <div className="space-y-4">
              {hotCryptos.map((crypto) => (
                <div key={crypto.symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full" />
                    <span className="font-medium">{crypto.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div>${crypto.price.toLocaleString()}</div>
                    <div className={crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={() => handleTabChange('buy')}
                className={`flex-1 py-2 rounded text-center transition-colors ${
                  activeTab === 'buy' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Buy
              </button>
              <button 
                onClick={() => handleTabChange('sell')}
                className={`flex-1 py-2 rounded text-center transition-colors ${
                  activeTab === 'sell' 
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

            <button className="w-full py-3 bg-blue-500 text-white rounded-lg mt-6 font-medium hover:bg-blue-400">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTradingPage;