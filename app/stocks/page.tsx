"use client";

import React, { useState, useEffect } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { useTheme } from "@/context/theme-context";
import dynamic from "next/dynamic";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Define types and constants for Indian stocks
interface StockInfo {
  symbol: string;
  name: string;
}

interface MarketStat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface IPO {
  id: string;
  companyName: string;
  priceRange: string;
  openDate: string;
  closeDate: string;
  lotSize: number;
  status: "upcoming" | "open" | "closed";
  subscription?: number;
}

interface TrendingStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

const TOP_STOCKS: StockInfo[] = [
  { symbol: "INFY", name: "Infosys Ltd." },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd." },
  { symbol: "RELIANCE", name: "Reliance Industries Ltd." },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd." },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd." },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd." },
  { symbol: "SBIN", name: "State Bank of India" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd." },
  { symbol: "ITC", name: "ITC Ltd." },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd." },
];

// Dynamically import TradingView widget with no SSR
const TradingViewWidget = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then(
      (mod) => mod.AdvancedRealTimeChart,
    ),
  { ssr: false },
);

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  currentPrice?: number;
  changePercent: number;
}

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

async function fetchStockData(symbol: string): Promise<Stock> {
  try {
    // Try to fetch from API
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
    );

    const data = await response.json();
    const quote = data["Global Quote"];

    // Check if we have a valid response
    if (quote && Object.keys(quote).length > 0) {
      return {
        symbol: symbol,
        name: getCompanyName(symbol),
        price: parseFloat(quote["05. price"]),
        change: parseFloat(quote["09. change"]),
        changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
      };
    }

    // If API failed or returned empty data, use mock data
    console.warn(`Using mock data for ${symbol} - API limit may be reached`);
    return getMockStockData(symbol);
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    // Return mock data if API fails
    return getMockStockData(symbol);
  }
}

// Generate realistic mock data for stocks when API fails
function getMockStockData(symbol: string): Stock {
  const basePrices: { [key: string]: number } = {
    INFY: 1450 + Math.random() * 100,
    TCS: 3500 + Math.random() * 150,
    RELIANCE: 2450 + Math.random() * 100,
    HDFCBANK: 1650 + Math.random() * 80,
    ICICIBANK: 1050 + Math.random() * 60,
    HINDUNILVR: 2450 + Math.random() * 100,
    SBIN: 620 + Math.random() * 40,
    BHARTIARTL: 1050 + Math.random() * 60,
    ITC: 430 + Math.random() * 30,
    KOTAKBANK: 1850 + Math.random() * 90,
  };

  const basePrice = basePrices[symbol] || 100 + Math.random() * 50;
  const changePercent = Math.random() * 8 - 4;
  const change = basePrice * (changePercent / 100);

  return {
    symbol: symbol,
    name: getCompanyName(symbol),
    price: parsePrice(basePrice),
    change: parsePrice(change),
    changePercent: parsePrice(changePercent),
  };
}

function parsePrice(price: number): number {
  return parseFloat(price.toFixed(2));
}

function getCompanyName(symbol: string): string {
  const companyNames: { [key: string]: string } = {
    INFY: "Infosys Ltd.",
    TCS: "Tata Consultancy Services",
    RELIANCE: "Reliance Industries",
    HDFCBANK: "HDFC Bank",
    ICICIBANK: "ICICI Bank",
    HINDUNILVR: "Hindustan Unilever",
    SBIN: "State Bank of India",
    BHARTIARTL: "Bharti Airtel",
    ITC: "ITC Limited",
    KOTAKBANK: "Kotak Mahindra Bank",
  };
  return companyNames[symbol] || symbol;
}

// Market Statistics Component
function MarketStatistics() {
  const { theme } = useTheme();
  const [stats, setStats] = useState<MarketStat[]>([
    {
      label: "NIFTY 50",
      value: "22,145.65",
      change: 0.85,
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      label: "SENSEX",
      value: "72,890.45",
      change: 0.72,
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      label: "BANK NIFTY",
      value: "47,890.30",
      change: -0.25,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: "INDIA VIX",
      value: "14.25",
      change: -2.15,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: "Market Cap",
      value: "₹4,12,45,678 Cr",
      change: 0.45,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      label: "P/E Ratio",
      value: "22.45",
      change: -0.12,
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          value: updateStatValue(stat.label, stat.value),
          change: parseFloat((Math.random() * 2 - 1).toFixed(2)),
        })),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const updateStatValue = (label: string, currentValue: string): string => {
    if (label === "Market Cap") return currentValue;
    const numericValue = parseFloat(currentValue.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numericValue)) return currentValue;
    const change = (Math.random() - 0.5) * 50;
    const newValue = numericValue + change;
    if (label === "INDIA VIX" || label === "P/E Ratio") {
      return newValue.toFixed(2);
    }
    return newValue.toFixed(2);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-3 sm:p-4 rounded-xl ${
            theme === "light"
              ? "bg-white border border-gray-200"
              : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`p-1 rounded ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}
            >
              {stat.icon}
            </div>
            <span
              className={`text-xs sm:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
            >
              {stat.label}
            </span>
          </div>
          <div
            className={`text-base sm:text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}
          >
            {stat.value}
          </div>
          <div
            className={`flex items-center gap-1 text-xs mt-1 ${
              stat.change > 0
                ? "text-green-600"
                : stat.change < 0
                  ? "text-red-600"
                  : "text-gray-500"
            }`}
          >
            {stat.change > 0 ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>{Math.abs(stat.change)}%</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Market Turnover Component
function MarketTurnover() {
  const { theme } = useTheme();
  const [turnover, setTurnover] = useState({
    nse: 78500.45,
    bse: 32450.3,
    total: 110950.75,
    change: 5.25,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTurnover((prev) => ({
        nse: prev.nse + (Math.random() - 0.5) * 500,
        bse: prev.bse + (Math.random() - 0.5) * 200,
        total: prev.total + (Math.random() - 0.5) * 700,
        change: parseFloat((Math.random() * 2 - 1).toFixed(2)),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`p-4 sm:p-6 rounded-xl ${
        theme === "light"
          ? "bg-white border border-gray-200"
          : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
      }`}
    >
      <h3
        className={`text-lg sm:text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}
      >
        Market Turnover (₹ Crores)
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span
            className={theme === "light" ? "text-gray-600" : "text-gray-400"}
          >
            NSE Cash Market
          </span>
          <span
            className={`font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}
          >
            ₹{turnover.nse.toFixed(2)} Cr
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={theme === "light" ? "text-gray-600" : "text-gray-400"}
          >
            BSE Cash Market
          </span>
          <span
            className={`font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}
          >
            ₹{turnover.bse.toFixed(2)} Cr
          </span>
        </div>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Turnover</span>
            <div className="text-right">
              <span
                className={`font-bold text-lg ${theme === "light" ? "text-gray-900" : "text-white"}`}
              >
                ₹{turnover.total.toFixed(2)} Cr
              </span>
              <div
                className={`flex items-center gap-1 text-xs mt-1 ${
                  turnover.change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {turnover.change > 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{Math.abs(turnover.change)}% from previous day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// IPO Tracker Component
function IPOTracker() {
  const { theme } = useTheme();
  const [ipos, setIpos] = useState<IPO[]>([
    {
      id: "1",
      companyName: "Tata Technologies",
      priceRange: "₹500 - ₹525",
      openDate: "2024-03-15",
      closeDate: "2024-03-18",
      lotSize: 28,
      status: "open",
      subscription: 15.5,
    },
    {
      id: "2",
      companyName: "IREDA",
      priceRange: "₹30 - ₹32",
      openDate: "2024-03-20",
      closeDate: "2024-03-22",
      lotSize: 400,
      status: "upcoming",
    },
    {
      id: "3",
      companyName: "ESAF Bank",
      priceRange: "₹57 - ₹60",
      openDate: "2024-03-10",
      closeDate: "2024-03-12",
      lotSize: 250,
      status: "closed",
      subscription: 45.2,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "";
    }
  };

  return (
    <div
      className={`p-4 sm:p-6 rounded-xl ${
        theme === "light"
          ? "bg-white border border-gray-200"
          : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-lg sm:text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}
        >
          IPO Tracker
        </h3>
        <Calendar className="h-5 w-5 text-purple-500" />
      </div>
      <div className="space-y-4">
        {ipos.map((ipo, index) => (
          <motion.div
            key={ipo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg ${
              theme === "light" ? "bg-gray-50" : "bg-gray-800/50"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4
                  className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}
                >
                  {ipo.companyName}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Price: {ipo.priceRange}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ipo.status)}`}
              >
                {ipo.status.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs mt-2">
              <span
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                Lot Size: {ipo.lotSize}
              </span>
              <span
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                {ipo.openDate} to {ipo.closeDate}
              </span>
            </div>
            {ipo.subscription && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span
                    className={
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }
                  >
                    Subscription
                  </span>
                  <span className="font-medium">{ipo.subscription}x</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-purple-600 h-1.5 rounded-full"
                    style={{ width: `${Math.min(ipo.subscription * 2, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Trending Stocks Component
function TrendingStocks() {
  const { theme } = useTheme();
  const [topGainers, setTopGainers] = useState<TrendingStock[]>([]);
  const [topLosers, setTopLosers] = useState<TrendingStock[]>([]);
  const [activeTab, setActiveTab] = useState<"gainers" | "losers">("gainers");

  useEffect(() => {
    const generateTrendingStocks = () => {
      const stocks = TOP_STOCKS.map((stock) => ({
        symbol: stock.symbol,
        name: stock.name,
        price: Math.random() * 2000 + 100,
        change: Math.random() * 10 - 5,
        changePercent: Math.random() * 10 - 5,
        volume: Math.floor(Math.random() * 10000000) + 100000,
      }));

      const gainers = [...stocks]
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 5);
      const losers = [...stocks]
        .sort((a, b) => a.changePercent - b.changePercent)
        .slice(0, 5);

      setTopGainers(gainers);
      setTopLosers(losers);
    };

    generateTrendingStocks();
    const interval = setInterval(generateTrendingStocks, 15000);
    return () => clearInterval(interval);
  }, []);

  const currentStocks = activeTab === "gainers" ? topGainers : topLosers;

  return (
    <div
      className={`p-4 sm:p-6 rounded-xl ${
        theme === "light"
          ? "bg-white border border-gray-200"
          : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-lg sm:text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}
        >
          Trending Stocks
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("gainers")}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              activeTab === "gainers"
                ? "bg-green-600 text-white"
                : theme === "light"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-gray-800 text-gray-400"
            }`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab("losers")}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              activeTab === "losers"
                ? "bg-red-600 text-white"
                : theme === "light"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-gray-800 text-gray-400"
            }`}
          >
            Top Losers
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {currentStocks.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 rounded-lg ${
              theme === "light"
                ? "bg-gray-50 hover:bg-gray-100"
                : "bg-gray-800/50 hover:bg-gray-800"
            } transition-all`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}
                  >
                    {stock.symbol}
                  </span>
                  <span className="text-xs text-gray-500">{stock.name}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    Vol: {(stock.volume / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}
                >
                  ₹{stock.price.toFixed(2)}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stock.changePercent > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.changePercent > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>
                    {stock.changePercent > 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LiveStockList({ stocks }: { stocks: Stock[] }) {
  const { theme } = useTheme();
  const [animatedStocks, setAnimatedStocks] = useState<Stock[]>([]);

  useEffect(() => {
    setAnimatedStocks(stocks.map((stock) => ({ ...stock, currentPrice: 0 })));

    const interval = setInterval(() => {
      setAnimatedStocks((prev) =>
        prev.map((stock) => {
          const targetPrice =
            stocks.find((s) => s.symbol === stock.symbol)?.price || 0;
          const step = targetPrice / 50;

          if ((stock.currentPrice || 0) < targetPrice) {
            return {
              ...stock,
              currentPrice: Math.min(
                (stock.currentPrice || 0) + step,
                targetPrice,
              ),
            };
          }
          return stock;
        }),
      );
    }, 20);

    const liveInterval = setInterval(() => {
      setAnimatedStocks((prev) =>
        prev.map((stock) => {
          const randomChange = (Math.random() - 0.5) * 0.5;
          const newPrice = (stock.currentPrice || stock.price) + randomChange;
          const change = ((newPrice - stock.price) / stock.price) * 100;

          return {
            ...stock,
            currentPrice: newPrice,
            change: change,
          };
        }),
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(liveInterval);
    };
  }, [stocks]);

  return (
    <div className="space-y-3 sm:space-y-4">
      {animatedStocks.map((stock, index) => (
        <motion.div
          key={stock.symbol}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-xl p-3 sm:p-4 transition-all ${
            theme === "light"
              ? "bg-gray-50 border border-gray-200 hover:border-blue-200 hover:shadow-md"
              : "bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-purple-900/50 hover:shadow-lg hover:shadow-purple-500/10"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4
                className={`font-bold text-sm sm:text-base ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {stock.symbol}
              </h4>
              <p
                className={`text-xs sm:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
              >
                {stock.name}
              </p>
            </div>
            <div className="text-right">
              <motion.p
                className="text-base sm:text-xl font-medium"
                animate={{
                  color:
                    stock.change > 0
                      ? theme === "light"
                        ? "rgb(22 163 74)"
                        : "rgb(74 222 128)"
                      : theme === "light"
                        ? "rgb(220 38 38)"
                        : "rgb(248 113 113)",
                }}
              >
                ₹{(stock.currentPrice || stock.price).toFixed(2)}
              </motion.p>
              <motion.p
                animate={{
                  color:
                    stock.change > 0
                      ? theme === "light"
                        ? "rgb(22 163 74)"
                        : "rgb(74 222 128)"
                      : theme === "light"
                        ? "rgb(220 38 38)"
                        : "rgb(248 113 113)",
                  backgroundColor:
                    stock.change > 0
                      ? theme === "light"
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgba(34, 197, 94, 0.2)"
                      : theme === "light"
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgba(239, 68, 68, 0.2)",
                }}
                className="text-xs sm:text-sm px-2 py-1 rounded-full inline-block"
              >
                {stock.change > 0 ? "+" : ""}
                {stock.change.toFixed(2)}%
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Add interfaces for watchlist functionality
interface WatchlistStock extends Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  dayHigh: number;
  dayLow: number;
  open: number;
  previousClose: number;
  lastUpdated: Date;
}

interface Watchlist {
  id: string;
  name: string;
  stocks: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [apiLimitWarning, setApiLimitWarning] = useState(false);

  // Add watchlist state
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState<string | null>(
    null,
  );
  const [watchlistStocks, setWatchlistStocks] = useState<
    Record<string, WatchlistStock>
  >({});
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StockInfo[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchStocks() {
      setLoading(true);
      try {
        const symbols = ["INFY", "TCS", "RELIANCE", "HDFCBANK", "ICICIBANK"];

        const cachedData = localStorage.getItem("stocksData");
        const cachedTimestamp = localStorage.getItem("stocksTimestamp");
        const now = Date.now();

        if (
          cachedData &&
          cachedTimestamp &&
          now - parseInt(cachedTimestamp) < 10 * 60 * 1000
        ) {
          console.log("Using cached stock data");
          setStocks(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        let hitApiLimit = false;
        const stocksData = [];

        for (const symbol of symbols) {
          try {
            const response = await fetch(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${API_KEY}`,
            );

            const data = await response.json();
            const quote = data["Global Quote"];

            if (quote && Object.keys(quote).length > 0) {
              const stockData = {
                symbol: symbol,
                name: getCompanyName(symbol),
                price: parseFloat(quote["05. price"]),
                change: parseFloat(quote["09. change"]),
                changePercent: parseFloat(
                  quote["10. change percent"].replace("%", ""),
                ),
              };
              stocksData.push(stockData);
            } else {
              stocksData.push(getMockStockData(symbol));
              hitApiLimit = true;
            }

            await new Promise((resolve) => setTimeout(resolve, 200));
          } catch (err) {
            console.error(`Error fetching ${symbol}:`, err);
            stocksData.push(getMockStockData(symbol));
            hitApiLimit = true;
          }
        }

        setStocks(stocksData);
        localStorage.setItem("stocksData", JSON.stringify(stocksData));
        localStorage.setItem("stocksTimestamp", now.toString());
        setApiLimitWarning(hitApiLimit);
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
        const mockData = [
          "INFY",
          "TCS",
          "RELIANCE",
          "HDFCBANK",
          "ICICIBANK",
        ].map((symbol) => getMockStockData(symbol));
        setStocks(mockData);
        setApiLimitWarning(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStocks();
    const interval = setInterval(fetchStocks, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const originalConsoleWarn = console.warn;
    console.warn = function (message) {
      if (typeof message === "string" && message.includes("API limit")) {
        setApiLimitWarning(true);
      }
      originalConsoleWarn.apply(console, arguments as any);
    };

    return () => {
      console.warn = originalConsoleWarn;
    };
  }, []);

  const searchStocks = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = TOP_STOCKS.filter(
      (stock: StockInfo) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()),
    );

    setSearchResults(results);
  };

  const createWatchlist = () => {
    if (!newWatchlistName.trim()) return;

    const newWatchlist: Watchlist = {
      id: Date.now().toString(),
      name: newWatchlistName.trim(),
      stocks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setWatchlists([...watchlists, newWatchlist]);
    setNewWatchlistName("");
    setShowWatchlistModal(false);
  };

  const addToWatchlist = async (
    watchlistId: string,
    symbol: string,
    name: string,
  ) => {
    const watchlist = watchlists.find((w) => w.id === watchlistId);
    if (!watchlist || watchlist.stocks.includes(symbol)) return;

    const updatedWatchlist = {
      ...watchlist,
      stocks: [...watchlist.stocks, symbol],
      updatedAt: new Date(),
    };

    setWatchlists(
      watchlists.map((w) => (w.id === watchlistId ? updatedWatchlist : w)),
    );

    if (!watchlistStocks[symbol]) {
      try {
        const mockStock = getMockStockData(symbol);
        setWatchlistStocks({
          ...watchlistStocks,
          [symbol]: {
            symbol,
            name,
            price: mockStock.price,
            change: mockStock.change,
            changePercent: mockStock.changePercent,
            volume: Math.floor(Math.random() * 1000000),
            dayHigh: mockStock.price * 1.02,
            dayLow: mockStock.price * 0.98,
            open: mockStock.price * 0.99,
            previousClose: mockStock.price,
            lastUpdated: new Date(),
          },
        });
      } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
      }
    }
  };

  const removeFromWatchlist = (watchlistId: string, symbol: string) => {
    const watchlist = watchlists.find((w) => w.id === watchlistId);
    if (!watchlist) return;

    const updatedWatchlist = {
      ...watchlist,
      stocks: watchlist.stocks.filter((s) => s !== symbol),
      updatedAt: new Date(),
    };

    setWatchlists(
      watchlists.map((w) => (w.id === watchlistId ? updatedWatchlist : w)),
    );
  };

  const deleteWatchlist = (watchlistId: string) => {
    setWatchlists(watchlists.filter((w) => w.id !== watchlistId));
    if (selectedWatchlist === watchlistId) {
      setSelectedWatchlist(null);
    }
  };

  useEffect(() => {
    const savedWatchlists = localStorage.getItem("watchlists");
    if (savedWatchlists) {
      setWatchlists(JSON.parse(savedWatchlists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlists", JSON.stringify(watchlists));
  }, [watchlists]);

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-50" : "bg-black"
      }`}
    >
      <NavBar />

      {apiLimitWarning && (
        <div
          className={`fixed top-20 right-4 z-50 p-3 rounded-lg shadow-lg max-w-md ${
            theme === "light"
              ? "bg-amber-50 border border-amber-200 text-amber-800"
              : "bg-amber-900/30 backdrop-blur-sm border border-amber-800/50 text-amber-300"
          }`}
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">API Rate Limit Reached</h4>
              <p className="text-sm opacity-90">
                Using demo data as AlphaVantage API limit has been reached. Data
                shown may not reflect current market conditions.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-8 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-2 sm:py-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-4 sm:py-8"
          >
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 ${
                theme === "light"
                  ? "text-gray-900"
                  : "text-white bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
              }`}
            >
              Market Overview
            </motion.h1>

            {/* Market Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 sm:mb-8"
            >
              <h2
                className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}
              >
                Market Statistics
              </h2>
              <MarketStatistics />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl ${
                  theme === "light"
                    ? "bg-white shadow-sm border border-gray-200"
                    : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
                }`}
              >
                <p
                  className={`text-base sm:text-lg leading-relaxed mb-4 ${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  Stay ahead of the market with our comprehensive real-time
                  analysis and tracking tools. Monitor major indices,
                  top-performing stocks, and market trends all in one place.
                </p>
                <div
                  className={`flex flex-wrap gap-3 sm:gap-4 ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        theme === "light" ? "bg-green-500" : "bg-green-400"
                      }`}
                    ></div>
                    <span className="text-xs sm:text-sm">
                      Real-time Updates
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        theme === "light" ? "bg-blue-500" : "bg-blue-400"
                      }`}
                    ></div>
                    <span className="text-xs sm:text-sm">Live Market Data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        theme === "light" ? "bg-purple-500" : "bg-purple-400"
                      }`}
                    ></div>
                    <span className="text-xs sm:text-sm">
                      Advanced Analytics
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        theme === "light" ? "bg-indigo-500" : "bg-indigo-400"
                      }`}
                    ></div>
                    <span className="text-xs sm:text-sm">
                      Performance Tracking
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`rounded-xl p-4 sm:p-6 transition-all ${
                    theme === "light"
                      ? "bg-white shadow-md hover:shadow-lg border border-gray-200"
                      : "bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:shadow-lg hover:shadow-purple-500/10"
                  }`}
                >
                  <h3
                    className={`text-xl sm:text-2xl font-semibold mb-4 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    Market Chart
                  </h3>
                  <div className="h-[300px] sm:h-[400px] w-full">
                    {isMounted && (
                      <TradingViewWidget
                        symbol="NSE:NIFTY"
                        theme={theme}
                        height="100%"
                        width="100%"
                        style="3"
                        timezone="exchange"
                        backgroundColor="rgba(0, 0, 0, 0)"
                        key={theme}
                        container_id={`tradingview_chart_${theme}`}
                      />
                    )}
                  </div>
                </motion.div>

                <div className="space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <MarketTurnover />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <TrendingStocks />
                  </motion.div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <IPOTracker />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`rounded-xl p-4 sm:p-6 transition-all ${
                    theme === "light"
                      ? "bg-white shadow-md hover:shadow-lg border border-gray-200"
                      : "bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:shadow-lg hover:shadow-purple-500/10"
                  }`}
                >
                  <h3
                    className={`text-xl sm:text-2xl font-semibold mb-4 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    Top Movers
                  </h3>
                  {isMounted && <LiveStockList stocks={stocks} />}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Watchlist Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`container mx-auto px-4 py-4 sm:py-8 mb-8 sm:mb-16 ${
          theme === "light"
            ? "bg-white shadow-lg border border-gray-200 rounded-xl"
            : "bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h2
            className={`text-xl sm:text-2xl font-bold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            My Watchlists
          </h2>
          <button
            onClick={() => setShowWatchlistModal(true)}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            Create Watchlist
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {watchlists.map((watchlist) => (
            <motion.div
              key={watchlist.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-xl p-3 sm:p-4 ${
                theme === "light"
                  ? "bg-gray-50 border border-gray-200"
                  : "bg-gray-800/50 border border-gray-700"
              }`}
            >
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3
                  className={`text-base sm:text-xl font-semibold ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {watchlist.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedWatchlist(watchlist.id)}
                    className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteWatchlist(watchlist.id)}
                    className="text-xs sm:text-sm text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {watchlist.stocks.slice(0, 3).map((symbol) => {
                  const stock = watchlistStocks[symbol];
                  return (
                    <motion.div
                      key={symbol}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-2 rounded ${
                        theme === "light" ? "bg-white" : "bg-gray-800"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span
                            className={`text-xs sm:text-sm font-medium ${
                              theme === "light" ? "text-gray-900" : "text-white"
                            }`}
                          >
                            {symbol}
                          </span>
                          <span
                            className={`ml-1 sm:ml-2 text-xs ${
                              theme === "light"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          >
                            {stock?.name}
                          </span>
                        </div>
                        {stock && (
                          <div
                            className={`flex items-center ${
                              stock.changePercent >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-medium">
                              ₹{stock.price.toFixed(2)}
                            </span>
                            <span className="ml-1 sm:ml-2 text-xs">
                              {stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                {watchlist.stocks.length > 3 && (
                  <div className="text-center text-xs sm:text-sm text-gray-500">
                    +{watchlist.stocks.length - 3} more stocks
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Watchlist Modal */}
        <AnimatePresence>
          {showWatchlistModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className={`rounded-xl p-4 sm:p-6 max-w-md w-full mx-4 ${
                  theme === "light" ? "bg-white" : "bg-gray-900"
                }`}
              >
                <h3
                  className={`text-lg sm:text-xl font-bold mb-4 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  Create New Watchlist
                </h3>
                <input
                  type="text"
                  value={newWatchlistName}
                  onChange={(e) => setNewWatchlistName(e.target.value)}
                  placeholder="Watchlist Name"
                  className={`w-full px-4 py-2 rounded-lg mb-4 text-sm ${
                    theme === "light"
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-800 border border-gray-700"
                  }`}
                />
                <div className="flex justify-end space-x-3 sm:space-x-4">
                  <button
                    onClick={() => setShowWatchlistModal(false)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${
                      theme === "light"
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
                        : "bg-gray-800 hover:bg-gray-700 text-white"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createWatchlist}
                    className="px-3 sm:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm"
                  >
                    Create
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Watchlist View */}
        <AnimatePresence>
          {selectedWatchlist && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed inset-0 z-50 overflow-y-auto pt-16 ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              }`}
            >
              <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2
                    className={`text-xl sm:text-2xl font-bold ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {watchlists.find((w) => w.id === selectedWatchlist)?.name}
                  </h2>
                  <button
                    onClick={() => setSelectedWatchlist(null)}
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>

                <div className="mb-4 sm:mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      searchStocks(e.target.value);
                    }}
                    placeholder="Search stocks to add..."
                    className={`w-full px-3 sm:px-4 py-2 rounded-lg text-sm ${
                      theme === "light"
                        ? "bg-gray-50 border border-gray-200"
                        : "bg-gray-800 border border-gray-700"
                    }`}
                  />

                  {searchResults.length > 0 && (
                    <div
                      className={`mt-2 rounded-lg shadow-lg ${
                        theme === "light"
                          ? "bg-white border border-gray-200"
                          : "bg-gray-800 border border-gray-700"
                      }`}
                    >
                      {searchResults.map((result) => (
                        <button
                          key={result.symbol}
                          onClick={() => {
                            addToWatchlist(
                              selectedWatchlist,
                              result.symbol,
                              result.name,
                            );
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                          className={`w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            theme === "light" ? "text-gray-900" : "text-white"
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">
                            {result.symbol}
                          </span>
                          <span className="ml-1 sm:ml-2 text-xs text-gray-500">
                            {result.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {watchlists
                    .find((w) => w.id === selectedWatchlist)
                    ?.stocks.map((symbol) => {
                      const stock = watchlistStocks[symbol];
                      return (
                        <motion.div
                          key={symbol}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3 sm:p-4 rounded-lg ${
                            theme === "light"
                              ? "bg-gray-50 border border-gray-200"
                              : "bg-gray-800/50 border border-gray-700"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                            <div>
                              <span
                                className={`text-sm sm:text-base font-medium ${
                                  theme === "light"
                                    ? "text-gray-900"
                                    : "text-white"
                                }`}
                              >
                                {symbol}
                              </span>
                              <span
                                className={`ml-1 sm:ml-2 text-xs ${
                                  theme === "light"
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }`}
                              >
                                {stock?.name}
                              </span>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                              {stock && (
                                <div
                                  className={`flex items-center ${
                                    stock.changePercent >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  <span className="text-sm sm:text-base font-medium">
                                    ₹{stock.price.toFixed(2)}
                                  </span>
                                  <span className="ml-1 sm:ml-2 text-xs">
                                    {stock.changePercent >= 0 ? "+" : ""}
                                    {stock.changePercent.toFixed(2)}%
                                  </span>
                                </div>
                              )}
                              <button
                                onClick={() =>
                                  removeFromWatchlist(selectedWatchlist, symbol)
                                }
                                className="text-xs sm:text-sm text-red-600 hover:text-red-700 ml-4"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer />
    </div>
  );
}
