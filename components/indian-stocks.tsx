"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  BarChart3,
  Shield,
  Clock,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  Building2,
  Search,
  Star,
  Newspaper,
  PieChart,
  Info,
  X,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Zap,
  BookOpen,
  Users,
  Activity,
  Globe,
} from "lucide-react";

// Define interfaces
interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  dayHigh: number;
  dayLow: number;
  open: number;
  previousClose: number;
  isRealData: boolean;
  sector?: string;
  historicalPrices?: number[]; // For sparkline
}

interface MarketNews {
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
}

// Top Indian stocks
const TOP_STOCKS = [
  {
    symbol: "INFY",
    name: "Infosys Ltd.",
    sector: "Technology",
    marketCap: 6500000000000,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd.",
    sector: "Technology",
    marketCap: 12800000000000,
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd.",
    sector: "Conglomerate",
    marketCap: 17200000000000,
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd.",
    sector: "Banking",
    marketCap: 11200000000000,
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd.",
    sector: "Banking",
    marketCap: 7200000000000,
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd.",
    sector: "FMCG",
    marketCap: 6200000000000,
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    sector: "Banking",
    marketCap: 5800000000000,
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd.",
    sector: "Telecom",
    marketCap: 7800000000000,
  },
  { symbol: "ITC", name: "ITC Ltd.", sector: "FMCG", marketCap: 5400000000000 },
  {
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank Ltd.",
    sector: "Banking",
    marketCap: 3900000000000,
  },
];

// Benefits of stock investing
const BENEFITS = [
  {
    title: "Wealth Generation",
    description:
      "Historically, stocks have outperformed most investment classes over the long term, offering significant wealth creation potential.",
    icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
    stats: "14% avg. annual returns",
  },
  {
    title: "Ownership Stake",
    description:
      "When you buy stocks, you own a portion of a company and participate in its growth and success.",
    icon: <Building2 className="h-6 w-6 text-emerald-600" />,
    stats: "1,00,000+ crores",
  },
  {
    title: "Portfolio Diversification",
    description:
      "Stocks help diversify your investment portfolio, reducing overall investment risk while maximizing returns.",
    icon: <PieChart className="h-6 w-6 text-emerald-600" />,
    stats: "50+ sectors",
  },
  {
    title: "Inflation Protection",
    description:
      "Stock investments historically provide returns that outpace inflation, protecting your purchasing power over time.",
    icon: <Shield className="h-6 w-6 text-emerald-600" />,
    stats: "7-8% inflation beat",
  },
];

// Market indices data
const MARKET_INDICES = [
  { name: "SENSEX", value: 73200, change: 1.2, points: 876 },
  { name: "NIFTY 50", value: 22150, change: 0.9, points: 198 },
  { name: "BANK NIFTY", value: 47800, change: -0.3, points: -144 },
];

// Market news
const MARKET_NEWS: MarketNews[] = [
  {
    title: "RBI Keeps Repo Rate Unchanged at 6.5%",
    summary:
      "The Monetary Policy Committee maintains status quo for seventh consecutive time, focusing on inflation control.",
    date: "2 hours ago",
    source: "Economic Times",
    url: "#",
  },
  {
    title: "IT Sector Shows Resilience Amid Global Cautiousness",
    summary:
      "Indian IT companies report steady Q4 results with improved deal wins and stable margins.",
    date: "5 hours ago",
    source: "Business Standard",
    url: "#",
  },
  {
    title: "FIIs Turn Net Buyers in Indian Equities",
    summary:
      "Foreign institutional investors invest ₹12,500 crore in March after two months of outflows.",
    date: "1 day ago",
    source: "Mint",
    url: "#",
  },
];

// Helper: Generate random sparkline data for demo
const generateSparklineData = (basePrice: number, trend: number): number[] => {
  const points = 20;
  const data: number[] = [];
  let current = basePrice;
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5 + trend * 0.3) * (basePrice * 0.01);
    current = Math.max(current + change, basePrice * 0.7);
    data.push(current);
  }
  return data;
};

// Sparkline component
const Sparkline = ({
  data,
  changePercent,
}: {
  data: number[];
  changePercent: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPositive = changePercent >= 0;

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((value - min) / range) * height,
    }));

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = isPositive ? "#10b981" : "#ef4444";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Optional: subtle fill
    ctx.lineTo(points[points.length - 1].x, height);
    ctx.lineTo(points[0].x, height);
    ctx.fillStyle = isPositive
      ? "rgba(16, 185, 129, 0.1)"
      : "rgba(239, 68, 68, 0.1)";
    ctx.fill();
  }, [data, changePercent]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={40}
      className="w-[120px] h-[40px]"
    />
  );
};

export default function IndianStocks() {
  const router = useRouter();
  const [stockData, setStockData] = useState<Record<string, Stock>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "change" | "volume">(
    "name",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [marketMood, setMarketMood] = useState<
    "bullish" | "bearish" | "neutral"
  >("neutral");
  const [lastUpdatedMinutes, setLastUpdatedMinutes] = useState<number>(0);

  // Use ref to track if initial load has been done
  const initialLoadDone = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load watchlist from localStorage
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("stockWatchlist");
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
  }, []);

  // Save watchlist to localStorage (memoized to prevent unnecessary updates)
  useEffect(() => {
    if (watchlist.length > 0 || localStorage.getItem("stockWatchlist")) {
      localStorage.setItem("stockWatchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  // Calculate market mood based on overall performance - FIXED: use useMemo instead of useEffect
  const calculatedMarketMood = useMemo(() => {
    if (Object.keys(stockData).length === 0) return "neutral";
    const totalChange = Object.values(stockData).reduce(
      (sum, s) => sum + s.changePercent,
      0,
    );
    const avgChange = totalChange / Object.keys(stockData).length;
    if (avgChange > 0.5) return "bullish";
    if (avgChange < -0.5) return "bearish";
    return "neutral";
  }, [stockData]);

  // Update market mood when calculated value changes
  useEffect(() => {
    setMarketMood(calculatedMarketMood);
  }, [calculatedMarketMood]);

  // Update "X mins ago" every minute
  useEffect(() => {
    if (!lastUpdated) return;
    const updateMinutes = () => {
      const minutes = Math.floor((Date.now() - lastUpdated.getTime()) / 60000);
      setLastUpdatedMinutes(minutes);
    };
    updateMinutes();
    const minuteInterval = setInterval(updateMinutes, 60000);
    return () => clearInterval(minuteInterval);
  }, [lastUpdated]);

  const toggleWatchlist = useCallback((symbol: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWatchlist((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol],
    );
  }, []);

  // Handle refresh button
  const handleRefresh = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await loadStockData();
  }, []);

  // Handle consult experts button
  const handleConsultExperts = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      router.push("/contact");
    },
    [router],
  );

  // Handle learn more button
  const handleLearnMore = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLearnMore((prev) => !prev);
  }, []);

  // Handle stock card click
  const handleStockClick = useCallback(
    (symbol: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedStock((prev) => (prev === symbol ? null : symbol));
    },
    [],
  );

  // Filter and sort stocks
  const filteredStocks = useMemo(() => {
    let stocks = TOP_STOCKS.filter((stock) => {
      const matchesSearch =
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector =
        selectedSector === "all" || stock.sector === selectedSector;
      return matchesSearch && matchesSector;
    });

    stocks = stocks.sort((a, b) => {
      const dataA = stockData[a.symbol];
      const dataB = stockData[b.symbol];
      if (!dataA || !dataB) return 0;

      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = dataA.price - dataB.price;
          break;
        case "change":
          comparison = dataA.changePercent - dataB.changePercent;
          break;
        case "volume":
          comparison = dataA.volume - dataB.volume;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return stocks;
  }, [searchQuery, selectedSector, sortBy, sortOrder, stockData]);

  // Get unique sectors
  const sectors = useMemo(() => {
    const sectorSet = new Set(TOP_STOCKS.map((s) => s.sector));
    return ["all", ...Array.from(sectorSet)];
  }, []);

  // Create a server route to bypass CORS issues
  const fetchStockData = useCallback(async (symbol: string, name: string) => {
    try {
      const response = await fetch(
        `/api/indian-stocks?symbol=${encodeURIComponent(symbol)}`,
      );

      if (!response.ok) {
        console.warn(`API error for ${symbol}: ${response.statusText}`);
        return null;
      }

      const data = await response.json();

      return {
        symbol,
        name,
        price: data.price || 0,
        change: data.change || 0,
        changePercent: data.changePercent || 0,
        volume: data.volume || 0,
        open: data.open || 0,
        dayHigh: data.dayHigh || 0,
        dayLow: data.dayLow || 0,
        previousClose: data.previousClose || 0,
        isRealData: true,
      };
    } catch (error) {
      console.warn(`Error fetching ${symbol}:`, error);
      return null;
    }
  }, []);

  // Generate fallback data when API fails
  const generateFallbackStock = useCallback(
    (symbol: string, name: string): Stock => {
      const priceMap: Record<string, number> = {
        INFY: 1530.2,
        TCS: 3556.45,
        RELIANCE: 2943.0,
        HDFCBANK: 1769.9,
        ICICIBANK: 1067.0,
        HINDUNILVR: 2237.0,
        SBIN: 773.0,
        BHARTIARTL: 1341.67,
        ITC: 428.3,
        KOTAKBANK: 1753.0,
      };

      const sectorMap: Record<string, string> = {
        INFY: "Technology",
        TCS: "Technology",
        RELIANCE: "Conglomerate",
        HDFCBANK: "Banking",
        ICICIBANK: "Banking",
        HINDUNILVR: "FMCG",
        SBIN: "Banking",
        BHARTIARTL: "Telecom",
        ITC: "FMCG",
        KOTAKBANK: "Banking",
      };

      // Generate random change percent for demo (-3% to +3%)
      const changePercent = (Math.random() - 0.5) * 6;
      const price = priceMap[symbol] || 1000;
      const change = price * (changePercent / 100);

      return {
        symbol,
        name,
        price,
        change,
        changePercent,
        volume: Math.floor(Math.random() * 10000000) + 100000,
        open: price * (0.98 + Math.random() * 0.04),
        dayHigh: price * (1 + Math.random() * 0.02),
        dayLow: price * (0.98 - Math.random() * 0.02),
        previousClose: price,
        isRealData: false,
        sector: sectorMap[symbol],
        historicalPrices: generateSparklineData(
          price,
          changePercent > 0 ? 0.3 : -0.3,
        ),
      };
    },
    [],
  );

  // Load stock data
  const loadStockData = useCallback(async () => {
    if (refreshing) return; // Prevent concurrent refreshes

    setRefreshing(true);

    try {
      // Initialize with fallback data if needed
      setStockData((prevData) => {
        if (Object.keys(prevData).length < TOP_STOCKS.length) {
          const newData = { ...prevData };
          TOP_STOCKS.forEach((stock) => {
            if (!newData[stock.symbol]) {
              newData[stock.symbol] = generateFallbackStock(
                stock.symbol,
                stock.name,
              );
            }
          });
          return newData;
        }
        return prevData;
      });

      // Fetch only a subset of stocks to avoid rate limits
      const now = Date.now();
      const cycleIndex = Math.floor(now / (2 * 60 * 1000)) % 5;
      const startIdx = cycleIndex * 2;
      const stocksToFetch = TOP_STOCKS.slice(startIdx, startIdx + 2);

      const updates: Record<string, Stock> = {};

      for (const stock of stocksToFetch) {
        const liveData = await fetchStockData(stock.symbol, stock.name);
        if (liveData) {
          // Add historical prices for sparkline
          updates[stock.symbol] = {
            ...liveData,
            historicalPrices: generateSparklineData(
              liveData.price,
              liveData.changePercent > 0 ? 0.3 : -0.3,
            ),
          };
        }
        if (stock !== stocksToFetch[stocksToFetch.length - 1]) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      if (Object.keys(updates).length > 0) {
        setStockData((prev) => ({ ...prev, ...updates }));
      }

      setLastUpdated(new Date());
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Failed to load stock data:", error);
      setError("Failed to load stock data");
    } finally {
      setRefreshing(false);
    }
  }, [fetchStockData, generateFallbackStock, refreshing]);

  // Format currency
  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    })
      .format(value)
      .replace(/^₹/, "₹");
  }, []);

  // Format large numbers
  const formatLargeNumber = useCallback((value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(2)} L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} K`;
    }
    return value.toString();
  }, []);

  // Initial load - only once
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      const initializeData = async () => {
        const initialData: Record<string, Stock> = {};
        TOP_STOCKS.forEach((stock) => {
          initialData[stock.symbol] = generateFallbackStock(
            stock.symbol,
            stock.name,
          );
        });
        setStockData(initialData);
        setLoading(false);
        await loadStockData();
      };
      initializeData();
    }

    // Set up interval for periodic refresh
    intervalRef.current = setInterval(() => {
      if (!refreshing) {
        loadStockData();
      }
    }, 60000); // Every 60 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loadStockData, generateFallbackStock, refreshing]);

  // Get stock card background gradient based on performance
  const getStockGradient = useCallback((changePercent: number) => {
    if (changePercent > 1)
      return "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20";
    if (changePercent < -1)
      return "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20";
    return "from-gray-50 to-gray-50 dark:from-gray-900/10 dark:to-gray-900/10";
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Full Width with better spacing */}
        <div className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-800 p-8 text-white shadow-xl w-full">
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Indian Stock Market
                <span className="block text-emerald-300">
                  Insights & Analytics
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-emerald-100 text-lg max-w-2xl"
              >
                Track real-time performance of top BSE-listed companies and make
                informed investment decisions with DSR GROUP's expert guidance.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all disabled:opacity-50 cursor-pointer"
                type="button"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">
                  {refreshing ? "Updating..." : "Refresh"}
                </span>
              </button>
              <button
                onClick={handleConsultExperts}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-800 rounded-xl hover:bg-emerald-50 font-medium transition-all shadow-lg hover:shadow-xl cursor-pointer"
                type="button"
              >
                Consult Experts <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Trust boost: Last updated X mins ago */}
          {lastUpdated && (
            <div className="absolute bottom-4 right-6 text-sm text-emerald-200 flex items-center gap-1 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Clock className="h-3 w-3" />
              <span>Last updated: {lastUpdatedMinutes} mins ago</span>
            </div>
          )}
        </div>

        {/* Market Overview Cards */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MARKET_INDICES.map((index, i) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {index.name}
                </span>
                {index.change > 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {index.value.toLocaleString()}
              </div>
              <div
                className={`flex items-center gap-1 mt-1 text-sm ${index.change > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {index.change > 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span className="font-bold">{Math.abs(index.change)}%</span>
                <span className="text-gray-400">
                  ({index.points > 0 ? "+" : ""}
                  {index.points})
                </span>
              </div>
            </motion.div>
          ))}

          {/* Market Mood Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium opacity-90">
                Market Mood
              </span>
              {marketMood === "bullish" && <TrendingUp className="h-5 w-5" />}
              {marketMood === "bearish" && (
                <ArrowDownRight className="h-5 w-5" />
              )}
              {marketMood === "neutral" && <BarChart3 className="h-5 w-5" />}
            </div>
            <div className="text-2xl font-bold capitalize">{marketMood}</div>
            <div className="text-sm opacity-90 mt-1">
              Based on top 10 stocks
            </div>
          </motion.div>
        </div>

        {/* Controls Bar */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector === "all" ? "All Sectors" : sector}
                </option>
              ))}
            </select>

            <div className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 cursor-pointer ${viewMode === "grid" ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-900 text-gray-600"}`}
                type="button"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 cursor-pointer ${viewMode === "list" ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-900 text-gray-600"}`}
                type="button"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWatchlist(!showWatchlist)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${showWatchlist ? "bg-emerald-500 text-white border-emerald-500" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-emerald-500"}`}
              type="button"
            >
              <Star
                className={`h-4 w-4 ${showWatchlist ? "fill-current" : ""}`}
              />
              Watchlist ({watchlist.length})
            </button>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stocks Section */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {showWatchlist ? "Your Watchlist" : "Top Performing Companies"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {showWatchlist
                  ? `Tracking ${watchlist.length} companies`
                  : "Current market prices of India's leading BSE-listed companies"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                type="button"
              >
                {sortOrder === "asc" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {loading && Object.keys(stockData).length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 animate-pulse"
                >
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-4"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-3"
              }
            >
              <AnimatePresence>
                {(showWatchlist
                  ? filteredStocks.filter((s) => watchlist.includes(s.symbol))
                  : filteredStocks
                ).map((stock, index) => {
                  const data = stockData[stock.symbol];
                  if (!data) return null;

                  const isInWatchlist = watchlist.includes(stock.symbol);

                  if (viewMode === "grid") {
                    return (
                      <motion.div
                        key={stock.symbol}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className={`bg-gradient-to-br ${getStockGradient(data.changePercent)} bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 cursor-pointer group`}
                        onClick={(e) => handleStockClick(stock.symbol, e)}
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white text-lg group-hover:text-emerald-600 transition-colors">
                                {stock.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {stock.symbol}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={(e) =>
                                  toggleWatchlist(stock.symbol, e)
                                }
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                type="button"
                              >
                                <Star
                                  className={`h-4 w-4 ${isInWatchlist ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`}
                                />
                              </button>
                              {!data.isRealData && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  Demo
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-end mb-4">
                            <div>
                              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                {formatCurrency(data.price)}
                              </span>
                              <span
                                className={`ml-3 inline-flex items-center text-sm font-bold ${
                                  data.change >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {data.change >= 0 ? (
                                  <ArrowUpRight className="h-4 w-4 mr-0.5" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4 mr-0.5" />
                                )}
                                {Math.abs(data.changePercent).toFixed(2)}%
                              </span>
                            </div>
                            {/* Sparkline */}
                            {data.historicalPrices && (
                              <Sparkline
                                data={data.historicalPrices}
                                changePercent={data.changePercent}
                              />
                            )}
                          </div>

                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {stock.sector}
                            </span>
                            {data.volume > 0 && (
                              <span className="flex items-center gap-1">
                                <BarChart3 className="h-3 w-3" />
                                {formatLargeNumber(data.volume)}
                              </span>
                            )}
                          </div>

                          <AnimatePresence>
                            {selectedStock === stock.symbol && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800"
                              >
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                      <Activity className="h-3 w-3" />
                                      Day Range
                                    </p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {formatCurrency(data.dayLow)} -{" "}
                                      {formatCurrency(data.dayHigh)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      Open/Prev Close
                                    </p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {formatCurrency(data.open)} /{" "}
                                      {formatCurrency(data.previousClose)}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  } else {
                    // List view with sparkline and color-coded percent
                    return (
                      <motion.div
                        key={stock.symbol}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 hover:shadow-md transition-all flex flex-wrap items-center justify-between gap-4 border border-gray-100 dark:border-gray-800"
                      >
                        <div className="flex items-center gap-4 min-w-[200px]">
                          <button
                            onClick={(e) => toggleWatchlist(stock.symbol, e)}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                            type="button"
                          >
                            <Star
                              className={`h-4 w-4 ${isInWatchlist ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`}
                            />
                          </button>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {stock.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              {stock.symbol} • {stock.sector}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                          <div className="text-right min-w-[100px]">
                            <div className="font-bold text-gray-900 dark:text-white">
                              {formatCurrency(data.price)}
                            </div>
                            <div
                              className={`text-sm flex items-center justify-end gap-1 font-bold ${
                                data.change >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {data.change >= 0 ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              {Math.abs(data.changePercent).toFixed(2)}%
                            </div>
                          </div>

                          {/* Sparkline in list view */}
                          {data.historicalPrices && (
                            <Sparkline
                              data={data.historicalPrices}
                              changePercent={data.changePercent}
                            />
                          )}

                          <div className="text-sm text-gray-500 min-w-[120px]">
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              Vol: {formatLargeNumber(data.volume)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              Day: {formatCurrency(data.dayLow)}-
                              {formatCurrency(data.dayHigh)}
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleStockClick(stock.symbol, e)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                            type="button"
                          >
                            <Info className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  }
                })}
              </AnimatePresence>
            </div>
          )}

          {showWatchlist && watchlist.length === 0 && !loading && (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl">
              <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your watchlist is empty</p>
              <p className="text-sm text-gray-400">
                Click the star icon on any stock to add it to your watchlist
              </p>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
                <Zap className="h-3 w-3" />
                Why Invest?
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Benefits of Stock Investments
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover why millions of Indians are investing in the stock
                market with DSR GROUP's expert guidance
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {benefit.title}
                      </h3>
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                        {benefit.stats}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Market News Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Newspaper className="h-6 w-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Market News & Updates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MARKET_NEWS.map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 dark:border-gray-800 group"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {news.summary}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {news.source}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {news.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learn More Section */}
        <AnimatePresence>
          {showLearnMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Understanding Stock Market Investments
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowLearnMore(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    type="button"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="prose prose-emerald dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>DSR GROUP MANDSAUR™</strong> provides expert
                    guidance on stock market investments, helping clients
                    navigate the complexities of equity markets with confidence
                    and clarity.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    The stock market represents ownership shares in companies
                    that are publicly traded. When you buy a stock, you're
                    purchasing a small piece of that company, becoming a
                    shareholder. As the company grows and increases in value,
                    the value of your shares may increase as well, allowing you
                    to sell them at a higher price than you paid.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-emerald-600" />
                        Stock prices fluctuate based on:
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-center gap-2">
                          • Company performance and financial health
                        </li>
                        <li className="flex items-center gap-2">
                          • Industry trends and market conditions
                        </li>
                        <li className="flex items-center gap-2">
                          • Economic indicators and government policies
                        </li>
                        <li className="flex items-center gap-2">
                          • Investor sentiment and market psychology
                        </li>
                      </ul>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-emerald-600" />
                        In India, primary stock exchanges:
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-center gap-2">
                          • Bombay Stock Exchange (BSE)
                        </li>
                        <li className="flex items-center gap-2">
                          • National Stock Exchange (NSE)
                        </li>
                        <li className="flex items-center gap-2">
                          • These platforms facilitate buying/selling of shares
                        </li>
                        <li className="flex items-center gap-2">
                          • Providing liquidity and price discovery
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">
                    At DSR GROUP, we help our clients build diversified
                    portfolios aligned with their financial goals, risk
                    tolerance, and investment horizon. Our team of experts
                    continuously monitors market conditions to identify
                    opportunities and mitigate risks.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 shadow-xl mb-16"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format')] bg-cover bg-center opacity-10"></div>
          <div className="relative px-8 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-emerald-100 md:text-lg">
                Our expert team is ready to help you navigate the Indian stock
                market with personalized strategies and insights tailored to
                your financial goals.
              </p>
              <div className="flex gap-3 mt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-emerald-700 flex items-center justify-center"
                    >
                      <Users className="h-4 w-4 text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-emerald-200 text-sm flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Trusted by 5,000+ investors
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleConsultExperts}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold rounded-xl text-center shadow-lg hover:shadow-xl transition-all cursor-pointer"
                type="button"
              >
                Book Free Consultation <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleLearnMore}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl text-center transition-colors cursor-pointer"
                type="button"
              >
                {showLearnMore ? (
                  <X className="h-4 w-4" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
                {showLearnMore ? "Hide Details" : "Learn More"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-400 dark:text-gray-500 pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="flex items-center justify-center gap-1">
            <Clock size={14} className="mr-1" />
            Data updates every 60 seconds during market hours
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            <Zap className="h-3 w-3" />
            Powered by Yahoo Finance & Alpha Vantage APIs | Data for
            informational purposes only
          </p>
          <p className="mt-1 text-xs">
            © DSR GROUP MANDSAUR™ - Expert Investment Advisory
          </p>
        </div>
      </div>
    </motion.section>
  );
}
