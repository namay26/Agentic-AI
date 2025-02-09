'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Flame, Star } from 'lucide-react';
import axios from 'axios';
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import Navbar from '@/components/ui/Navbar';

interface Coin {
    id: string;
    rank: number;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    total_volume: number;
    market_cap: number;
    image: string;
}

interface TrendingCoin {
    name: string;
    price: number;
    change: number;
}

const MemeCoinsDashboard = () => {
    // ... [Previous state and fetchMemeCoinData function remain the same] ...
    const [coins, setCoins] = useState<Coin[]>([]);
    const [marketStats, setMarketStats] = useState({
        totalMarketCap: 0,
        marketCapChange: 0,
        tradingVolume24h: 0,
    });
    const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
    const [topGainers, setTopGainers] = useState<TrendingCoin[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMemeCoinData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const coinsResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 10,
                    page: 1,
                    sparkline: false,
                    category: 'solana-meme-coins',
                },
            });

            const coinsData = coinsResponse.data;
            setCoins(coinsData.map((coin: any, index: number) => ({
                id: coin.id,
                rank: index + 1,
                name: coin.name,
                symbol: coin.symbol.toUpperCase(),
                current_price: coin.current_price,
                price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency,
                price_change_percentage_24h_in_currency: coin.price_change_percentage_24h_in_currency,
                price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency,
                total_volume: coin.total_volume,
                market_cap: coin.market_cap,
                image: coin.image,
            })));

            const totalMarketCap = coinsData.reduce((sum:number, coin:any) => sum + coin.market_cap, 0);
            const marketCapChange = coinsData.length > 0 ? coinsData[0].market_cap_change_percentage_24h : 0;
            const tradingVolume24h = coinsData.reduce((sum:number, coin:any) => sum + coin.total_volume, 0);
            setMarketStats({
                totalMarketCap: totalMarketCap,
                marketCapChange: marketCapChange,
                tradingVolume24h: tradingVolume24h,
            });

            setTrendingCoins(coinsData.slice(0, 3).map((coin: any) => ({ name: coin.name, price: coin.current_price, change: coin.price_change_percentage_24h })));
            setTopGainers(coinsData.slice(3, 6).map((coin: any) => ({ name: coin.name, price: coin.current_price, change: coin.price_change_percentage_24h })));

        } catch (error) {
            console.error("Error fetching meme coin data:", error);
            setError(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMemeCoinData();
        const interval = setInterval(fetchMemeCoinData, 60000);
        return () => clearInterval(interval);
    }, []);
    const { login, logout, authenticated, user } = usePrivy();
    return (
        <div className="min-h-screen w-full bg-gray-900">
          <Navbar className="top-2" login={login} logout={logout} authenticated={authenticated} user={user} />
          <ShootingStars />
          <StarsBackground />
            <div className="container mx-auto p-6 space-y-6 text-gray-100">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white">Top Meme Coins by Market Cap</h1>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-300">Highlights</span>
                        <div className="ml-2 w-12 h-6 bg-green-500 rounded-full"></div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <p className="text-gray-300">Loading meme coin data...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-96">
                        <p className="text-red-400">Error: {error}</p>
                    </div>
                ) : (
                    <>
                        <div className="text-sm text-gray-400">
                            The Meme market cap today is ${marketStats.totalMarketCap.toLocaleString()}, a
                            <span className={`${marketStats.marketCapChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {marketStats.marketCapChange >= 0 ? ' ▲ ' : ' ▼ '}
                                {marketStats.marketCapChange.toFixed(2)}%
                            </span> change in the last 24 hours.
                            <a href="#" className="text-blue-400 ml-2 hover:text-blue-300">Read More about Meme</a>
                        </div>

                        <div className="flex space-x-4">
                            <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-700">All Coins</button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-200">Key Statistics</button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-gray-800 p-6 rounded-lg shadow">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold text-white">${marketStats.totalMarketCap.toLocaleString()}</h3>
                                    <p className="text-sm text-gray-400">Market Cap <span className={`${marketStats.marketCapChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {marketStats.marketCapChange >= 0 ? '▲' : '▼'} {marketStats.marketCapChange.toFixed(2)}%</span></p>
                                </div>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-lg shadow">
                                <div className="flex items-center mb-4">
                                    <Flame className="w-5 h-5 text-orange-400 mr-2" />
                                    <h3 className="font-semibold text-white">Trending</h3>
                                </div>
                                <div className="space-y-3">
                                    {trendingCoins.map((coin, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-gray-300">{coin.name}</span>
                                            <div className="text-right">
                                                <div className="text-gray-200">${coin.price}</div>
                                                <div className={`text-sm ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {coin.change >= 0 ? '▲' : '▼'} {Math.abs(coin.change)}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-lg shadow">
                                <div className="flex items-center mb-4">
                                    <TrendingUp className="w-5 h-5 text-pink-400 mr-2" />
                                    <h3 className="font-semibold text-white">Top Gainers</h3>
                                </div>
                                <div className="space-y-3">
                                    {topGainers.map((coin, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-gray-300">{coin.name}</span>
                                            <div className="text-right">
                                                <div className="text-gray-200">${coin.price}</div>
                                                <div className="text-sm text-green-400">▲ {coin.change}%</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 border-b border-gray-700 overflow-x-auto">
                            {['All', 'Highlights', 'Pump.fun', 'Categories', 'Bittensor Ecosystem', 'Polkadot Ecosystem', 'TON Meme'].map((tab) => (
                                <button key={tab} className="px-4 py-2 text-sm text-gray-400 hover:text-blue-400 whitespace-nowrap">
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-700">
                                    <tr className="text-sm text-gray-400">
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
                                        <tr key={coin.id} className="border-b border-gray-700 hover:bg-gray-800">
                                            <td className="py-4 flex items-center gap-2">
                                                <Star className="w-4 h-4 text-gray-500" />
                                                <span className="text-gray-300">{coin.rank}</span>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={coin.image}
                                                        alt={coin.name}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    <span className="font-medium text-gray-200">{coin.name}</span>
                                                    <span className="text-gray-400 text-sm">{coin.symbol}</span>
                                                    <span className="px-2 py-1 text-xs bg-green-900 text-green-300 rounded">Buy</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-right text-gray-200">${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: coin.current_price < 0.01 ? 8 : 4 })}</td>
                                            <td className={`py-4 text-right ${coin.price_change_percentage_1h_in_currency >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {coin.price_change_percentage_1h_in_currency >= 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_1h_in_currency)}%
                                            </td>
                                            <td className={`py-4 text-right ${coin.price_change_percentage_24h_in_currency >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {coin.price_change_percentage_24h_in_currency >= 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h_in_currency)}%
                                            </td>
                                            <td className={`py-4 text-right ${coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {coin.price_change_percentage_7d_in_currency >= 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_7d_in_currency)}%
                                            </td>
                                            <td className="py-4 text-right text-gray-200">${coin.total_volume.toLocaleString()}</td>
                                            <td className="py-4 text-right text-gray-200">${coin.market_cap.toLocaleString()}</td>
                                            <td className="py-4 text-right">
                                                <div className="w-24 h-8 bg-gray-700 rounded"></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MemeCoinsDashboard;