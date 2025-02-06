import React from 'react';
import { TrendingUp, Flame, Star } from 'lucide-react';
import Image from 'next/image';

interface Coin {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  volume24h: number;
  marketCap: number;
  chart7d: string;
}

interface TrendingCoin {
  name: string;
  price: number;
  change: number;
}

const MemeCoinsDashboard = () => {
  const marketStats = {
    totalMarketCap: 79731117815,
    marketCapChange: -0.2,
    tradingVolume24h: 9755746570,
  };

  const trendingCoins: TrendingCoin[] = [
    { name: 'Ondo', price: 1.41, change: 3.1 },
    { name: 'Elon4AfD', price: 0.08002, change: -30.0 },
    { name: 'Official Trump', price: 18.97, change: 1.5 },
  ];

  const topGainers: TrendingCoin[] = [
    { name: 'Dog shit going nowhere', price: 0.008275, change: 226.2 },
    { name: '$HYPERSKIDS', price: 0.01429, change: 173.8 },
    { name: 'DogeFather', price: 0.002784, change: 181.7 },
  ];

  const coins: Coin[] = [
    {
        id: 1,
        rank: 8,
        name: 'Dogecoin',
        symbol: 'DOGE',
        price: 0.2642,
        change1h: 0.7,
        change24h: -0.7,
        change7d: -20.3,
        volume24h: 1592057923,
        marketCap: 39129328639,
        chart7d: ''
    },
    {
        id: 2,
        rank: 19,
        name: 'Shiba Inu',
        symbol: 'SHIB',
        price: 0.00001609,
        change1h: 0.8,
        change24h: -1.1,
        change7d: -13.8,
        volume24h: 283402551,
        marketCap: 9482091419,
        chart7d: ''
    },
    {
        id: 3,
        rank: 34,
        name: 'Pepe',
        symbol: 'PEPE',
        price: 0.0000102,
        change1h: 0.3,
        change24h: -0.9,
        change7d: -22.3,
        volume24h: 695805211,
        marketCap: 4291447643,
        chart7d: ''
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Top Meme Coins by Market Cap</h1>
        <div className="flex items-center">
          <span className="text-sm">Highlights</span>
          <div className="ml-2 w-12 h-6 bg-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        The Meme market cap today is ${marketStats.totalMarketCap.toLocaleString()}, a
        <span className="text-red-500"> {marketStats.marketCapChange}%</span> change in the last 24 hours.
        <a href="#" className="text-blue-600 ml-2">Read More about Meme</a>
      </div>

      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">All Coins</button>
        <button className="px-4 py-2 text-sm font-medium">Key Statistics</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">${marketStats.totalMarketCap.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Market Cap <span className="text-red-500">▼ {marketStats.marketCapChange}%</span></p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Flame className="w-5 h-5 text-orange-500 mr-2" />
            <h3 className="font-semibold">Trending</h3>
          </div>
          <div className="space-y-3">
            {trendingCoins.map((coin, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{coin.name}</span>
                <div className="text-right">
                  <div>${coin.price}</div>
                  <div className={`text-sm ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change >= 0 ? '▲' : '▼'} {Math.abs(coin.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-pink-500 mr-2" />
            <h3 className="font-semibold">Top Gainers</h3>
          </div>
          <div className="space-y-3">
            {topGainers.map((coin, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{coin.name}</span>
                <div className="text-right">
                  <div>${coin.price}</div>
                  <div className="text-sm text-green-500">▲ {coin.change}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-4 border-b">
        {['All', 'Highlights', 'Pump.fun', 'Categories', 'Bittensor Ecosystem', 'Polkadot Ecosystem', 'TON Meme'].map((tab) => (
          <button key={tab} className="px-4 py-2 text-sm hover:text-blue-600">
            {tab}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-sm text-gray-600">
              <th className="py-3 text-left">#</th>
              <th className="py-3 text-left">Coin</th>
              <th className="py-3 text-right">Price</th>
              <th className="py-3 text-right">1h</th>
              <th className="py-3 text-right">24h</th>
              <th className="py-3 text-right">7d</th>
              <th className="py-3 text-right">24h Volume</th>
              <th className="py-3 text-right">Market Cap</th>
              <th className="py-3 text-right">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="border-b hover:bg-gray-50">
                <td className="py-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-400" />
                  {coin.rank}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/api/placeholder/24/24"
                      alt={coin.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-gray-500 text-sm">{coin.symbol}</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Buy</span>
                  </div>
                </td>
                <td className="py-4 text-right">${coin.price.toLocaleString(undefined, { minimumFractionDigits: coin.price < 0.01 ? 8 : 4 })}</td>
                <td className={`py-4 text-right ${coin.change1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change1h >= 0 ? '▲' : '▼'} {Math.abs(coin.change1h)}%
                </td>
                <td className={`py-4 text-right ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change24h >= 0 ? '▲' : '▼'} {Math.abs(coin.change24h)}%
                </td>
                <td className={`py-4 text-right ${coin.change7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change7d >= 0 ? '▲' : '▼'} {Math.abs(coin.change7d)}%
                </td>
                <td className="py-4 text-right">${coin.volume24h.toLocaleString()}</td>
                <td className="py-4 text-right">${coin.marketCap.toLocaleString()}</td>
                <td className="py-4 text-right">
                  <div className="w-24 h-8 bg-gray-100 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemeCoinsDashboard;