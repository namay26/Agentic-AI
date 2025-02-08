import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TypewriterEffectSmooth } from './typewriter-effect';
import axios from 'axios';

const words = [
  {
    text: "258,004,491",
    className: "text-7xl font-bold text-blue-400 mb-2",
  },
];

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const CryptoLanding = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoinData = async () => {
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
      setCoins(response.data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setError(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
    const interval = setInterval(fetchCoinData, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black-900 text-white">
      <div className="w-full px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-[1800px] mx-auto">
          <div className="space-y-8">
            <div>
              <TypewriterEffectSmooth words={words} />
              <h2 className="text-6xl font-bold">USERS<br /> TRUST US</h2>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Popular Cryptocurrencies</h3>
                <button className="text-gray-400 text-sm">View All →</button>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <p>Loading live data...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  coins.map((coin) => (
                    <div key={coin.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <span className="font-semibold">{coin.symbol.toUpperCase()}</span>
                          <span className="text-gray-400 ml-2">{coin.name}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div>${coin.current_price.toFixed(2)}</div>
                        <div className={coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoLanding;
