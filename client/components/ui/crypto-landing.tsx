import React from 'react';
import Image from 'next/image';

interface CoinData {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const CryptoLanding = () => {
  const popularCoins: CoinData[] = [
    { symbol: 'BTC', name: 'Bitcoin', price: 96391.61, change: -0.22 },
    { symbol: 'ETH', name: 'Ethereum', price: 2697.83, change: -0.89 },
    { symbol: 'BNB', name: 'BNB', price: 575.68, change: 2.34 },
    { symbol: 'XRP', name: 'XRP', price: 2.30, change: -2.58 },
    { symbol: 'SOL', name: 'Solana', price: 190.26, change: -3.58 },
  ];

  const news = [
    'Bitcoin(BTC) Drops Below 96,000 USDT with a 1.30% Decrease in 24 Hours',
    'USDT Inflows to Exchanges Reach Record High Amid Market Downturn',
    "Celsius Ex-CEO Alex Mashinsky's Sentencing Postponement Requested",
    "ATB Financial Partners With Canada's Crypto Industry Amid Banking Challenges"
  ];

  return (
    <div className="w-full min-h-screen bg-black-900 text-white">
       <div className="w-full px-4 py-12">
       <div className="grid lg:grid-cols-2 gap-12 max-w-[1800px] mx-auto"> 
          <div className="space-y-8">
            <div>
              <h1 className="text-7xl font-bold text-blue-400 mb-2">
                258,004,491
              </h1>
              <h2 className="text-6xl font-bold">
                USERS<br />
                TRUST US
              </h2>
            </div>

            <div className="max-w-md">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Email/Phone number"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
                />
                <button className="px-6 py-3 bg-blue-400 text-black font-semibold rounded-lg hover:bg-purple-300 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400">Or Continue With</p>
              <div className="flex gap-4">
                <button className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Image src="/api/placeholder/24/24" alt="Google" className="w-6 h-6" />
                </button>
                <button className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Image src="/api/placeholder/24/24" alt="Apple" className="w-6 h-6" />
                </button>
                <button className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Image src="/api/placeholder/24/24" alt="QR" className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-400">Download App</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="space-x-4">
                  <button className="text-white font-semibold">Popular</button>
                  <button className="text-gray-400">New Listing</button>
                </div>
                <button className="text-gray-400 text-sm">View All 350+ Coins →</button>
              </div>

              <div className="space-y-4">
                {popularCoins.map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/api/placeholder/32/32"
                        alt={coin.symbol}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <span className="font-semibold">{coin.symbol}</span>
                        <span className="text-gray-400 ml-2">{coin.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>${coin.price.toLocaleString()}</div>
                      <div className={coin.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {coin.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">News</h3>
                <button className="text-gray-400 text-sm">View All News →</button>
              </div>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div key={index} className="hover:bg-gray-700 p-3 rounded-lg transition-colors cursor-pointer">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoLanding;