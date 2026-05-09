"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { useTheme } from "@/context/theme-context";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Clock,
  Globe,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  Newspaper,
  Zap,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type NewsArticle = {
  uuid: string;
  title: string;
  description: string;
  keywords: string[];
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  entities: {
    symbol: string;
    name: string;
    exchange: string;
    exchange_long: string;
    country: string;
    type: string;
    industry: string;
    match_score: number;
    sentiment_score: number;
    highlights: string[];
  }[];
};

// TradingView Timeline Widget - Theme Aware (Placed prominently at the top)
const TradingViewTimelineWidget = memo(({ theme }: { theme: string }) => {
  const container = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (container.current) {
      // Clear previous script if any
      const existingScript = container.current.querySelector("script");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        displayMode: "regular",
        feedMode: "market",
        colorTheme: isDark ? "dark" : "light",
        isTransparent: false,
        locale: "en",
        market: "stock",
        width: "100%",
        height: 550,
      });
      container.current.appendChild(script);
    }
    return () => {
      if (container.current) {
        const scriptElement = container.current.querySelector("script");
        if (scriptElement) scriptElement.remove();
      }
    };
  }, [isDark]);

  return (
    <div
      className={`tradingview-widget-container w-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isDark ? "bg-gray-800/30" : "bg-white/50"
      }`}
      ref={container}
    >
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright text-xs text-center mt-3 opacity-60">
        <a
          href="https://www.tradingview.com/news/top-providers/tradingview/"
          rel="noopener nofollow"
          target="_blank"
          className="hover:underline transition-colors"
        >
          <span className="blue-text">Top stories</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
});
TradingViewTimelineWidget.displayName = "TradingViewTimelineWidget";

// TradingView Hotlists Widget
const TradingViewHotlistsWidget = memo(({ theme }: { theme: string }) => {
  const container = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (container.current) {
      const existingScript = container.current.querySelector("script");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        exchange: "BSE",
        colorTheme: isDark ? "dark" : "light",
        dateRange: "1D",
        showChart: true,
        locale: "en",
        largeChartUrl: "",
        isTransparent: false,
        showSymbolLogo: true,
        showFloatingTooltip: true,
        plotLineColorGrowing: "#2962FF",
        plotLineColorFalling: "#2962FF",
        gridLineColor: isDark
          ? "rgba(240, 243, 250, 0.1)"
          : "rgba(0, 0, 0, 0.05)",
        scaleFontColor: isDark ? "#DBDBDB" : "#333333",
        belowLineFillColorGrowing: isDark
          ? "rgba(41, 98, 255, 0.12)"
          : "rgba(41, 98, 255, 0.08)",
        belowLineFillColorFalling: isDark
          ? "rgba(41, 98, 255, 0.12)"
          : "rgba(41, 98, 255, 0.08)",
        symbolActiveColor: isDark
          ? "rgba(41, 98, 255, 0.12)"
          : "rgba(41, 98, 255, 0.08)",
        width: "100%",
        height: 500,
      });
      container.current.appendChild(script);
    }
    return () => {
      if (container.current) {
        const scriptElement = container.current.querySelector("script");
        if (scriptElement) scriptElement.remove();
      }
    };
  }, [isDark]);

  return (
    <div
      className={`tradingview-widget-container w-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isDark ? "bg-gray-800/30" : "bg-white/50"
      }`}
      ref={container}
    >
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright text-xs text-center mt-3 opacity-60">
        <a
          href="https://www.tradingview.com/markets/stocks-usa/"
          rel="noopener nofollow"
          target="_blank"
          className="hover:underline transition-colors"
        >
          <span className="blue-text">Hotlists - Top Gainers & Losers</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
});
TradingViewHotlistsWidget.displayName = "TradingViewHotlistsWidget";

// Top Gainer Card Component
const TopGainerCard = ({
  name,
  symbol,
  price,
  changePercent,
  rank,
}: {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  rank: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: rank * 0.1 }}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
  >
    <div className="flex items-center space-x-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
          rank === 1
            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
            : rank === 2
              ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
              : "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
        }`}
      >
        {rank}
      </div>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{symbol}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-gray-900 dark:text-white">
        ₹{price.toLocaleString("en-IN")}
      </p>
      <p className="text-xs text-green-600 dark:text-green-400 flex items-center justify-end">
        <TrendingUp size={12} className="mr-1" />+{changePercent.toFixed(2)}%
      </p>
    </div>
  </motion.div>
);

// Stock Card Component (No button)
const StockCard = ({ stock, exchange }: { stock: any; exchange: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {stock.name}
          </h3>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stock.symbol}
            </p>
            <span
              className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                exchange === "NSE"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-400"
              }`}
            >
              {exchange}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹
            {stock.price.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <div
            className={`ml-3 flex items-center ${
              stock.change >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {stock.change >= 0 ? (
              <TrendingUp size={16} className="mr-1" />
            ) : (
              <TrendingDown size={16} className="mr-1" />
            )}
            <span className="font-medium text-sm">
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {stock.volume?.toLocaleString("en-IN") || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Day Range</p>
          <p className="font-medium text-gray-900 dark:text-white text-sm">
            ₹{stock.dayLow?.toFixed(2) || "N/A"} - ₹
            {stock.dayHigh?.toFixed(2) || "N/A"}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Main Component
export default function MarketNewsPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("latest");
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [similarArticles, setSimilarArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [stocksData, setStocksData] = useState<Record<string, any>>({});
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    fetchLatestNews();
    // Load mock stock data directly (no API error)
    loadMockStockData();
  }, []);

  useEffect(() => {
    if (activeTab === "markets") {
      const welcomeText =
        "Track real-time performance of India's leading companies";
      let index = 0;
      setTypedText("");
      const timer = setInterval(() => {
        if (index < welcomeText.length) {
          setTypedText(welcomeText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  // Load mock stock data directly - no API calls to avoid errors
  const loadMockStockData = useCallback(() => {
    const mockStocks = {
      RELIANCE: {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd.",
        price: 2467.35,
        change: 32.8,
        changePercent: 1.35,
        volume: 1245678,
        open: 2434.55,
        dayHigh: 2480.0,
        dayLow: 2430.0,
        previousClose: 2434.55,
      },
      HDFCBANK: {
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd.",
        price: 1523.65,
        change: 18.45,
        changePercent: 1.23,
        volume: 987654,
        open: 1505.2,
        dayHigh: 1530.0,
        dayLow: 1500.0,
        previousClose: 1505.2,
      },
      TCS: {
        symbol: "TCS",
        name: "Tata Consultancy Services Ltd.",
        price: 3725.5,
        change: -12.3,
        changePercent: -0.33,
        volume: 543210,
        open: 3737.8,
        dayHigh: 3750.0,
        dayLow: 3710.0,
        previousClose: 3737.8,
      },
      INFY: {
        symbol: "INFY",
        name: "Infosys Ltd.",
        price: 1478.25,
        change: 22.15,
        changePercent: 1.52,
        volume: 876543,
        open: 1456.1,
        dayHigh: 1490.0,
        dayLow: 1450.0,
        previousClose: 1456.1,
      },
      HDFC: {
        symbol: "HDFC",
        name: "HDFC Ltd.",
        price: 2695.75,
        change: 45.6,
        changePercent: 1.72,
        volume: 432198,
        open: 2650.15,
        dayHigh: 2710.0,
        dayLow: 2645.0,
        previousClose: 2650.15,
      },
      ICICIBANK: {
        symbol: "ICICIBANK",
        name: "ICICI Bank Ltd.",
        price: 985.5,
        change: 12.3,
        changePercent: 1.26,
        volume: 765432,
        open: 973.2,
        dayHigh: 990.0,
        dayLow: 970.0,
        previousClose: 973.2,
      },
      HINDUNILVR: {
        symbol: "HINDUNILVR",
        name: "Hindustan Unilever Ltd.",
        price: 2565.8,
        change: -8.5,
        changePercent: -0.33,
        volume: 345678,
        open: 2574.3,
        dayHigh: 2580.0,
        dayLow: 2555.0,
        previousClose: 2574.3,
      },
      SBIN: {
        symbol: "SBIN",
        name: "State Bank of India",
        price: 625.75,
        change: 15.25,
        changePercent: 2.5,
        volume: 2345678,
        open: 610.5,
        dayHigh: 630.0,
        dayLow: 608.0,
        previousClose: 610.5,
      },
      BHARTIARTL: {
        symbol: "BHARTIARTL",
        name: "Bharti Airtel Ltd.",
        price: 1025.4,
        change: 22.8,
        changePercent: 2.27,
        volume: 987654,
        open: 1002.6,
        dayHigh: 1035.0,
        dayLow: 1000.0,
        previousClose: 1002.6,
      },
      ITC: {
        symbol: "ITC",
        name: "ITC Ltd.",
        price: 445.3,
        change: 3.2,
        changePercent: 0.72,
        volume: 3456789,
        open: 442.1,
        dayHigh: 448.0,
        dayLow: 440.0,
        previousClose: 442.1,
      },
    };
    setStocksData(mockStocks);
    setLastUpdated(new Date());
  }, []);

  const handleRefreshData = () => {
    setLoading(true);
    // Simulate refresh delay
    setTimeout(() => {
      loadMockStockData();
      setLoading(false);
    }, 500);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchLatestNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using mock data - no API error
      setNewsArticles(getMockNewsData());
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load latest news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarArticles = async (uuid: string) => {
    try {
      setSimilarArticles(getMockSimilarNewsData());
    } catch (err) {
      console.error("Error fetching similar articles:", err);
    }
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    fetchSimilarArticles(article.uuid);
    setActiveTab("detail");
  };

  const filteredNews = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.entities.some(
        (entity) =>
          entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entity.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const topGainers = [
    {
      name: "Infosys Ltd.",
      symbol: "INFY",
      price: 1478.25,
      change: 22.15,
      changePercent: 1.52,
    },
    {
      name: "HDFC Ltd.",
      symbol: "HDFC",
      price: 2695.75,
      change: 45.6,
      changePercent: 1.72,
    },
    {
      name: "Reliance Industries",
      symbol: "RELIANCE",
      price: 2467.35,
      change: 32.8,
      changePercent: 1.35,
    },
    {
      name: "HDFC Bank",
      symbol: "HDFCBANK",
      price: 1523.65,
      change: 18.45,
      changePercent: 1.23,
    },
  ];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900"
          : "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
      }`}
    >
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-8 px-4">
        <div
          className={`absolute inset-0 ${
            theme === "light"
              ? "bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
              : "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
          } animate-pulse`}
        ></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Indian Market News & Analysis
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-time updates, expert insights, and comprehensive coverage of
              India's financial markets
            </p>
          </motion.div>
        </div>
      </section>

      {/* IMPORTANT: TradingView Timeline Widget - Placed FIRST before Latest News */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-2xl font-bold flex items-center">
                <Zap className="mr-2 text-yellow-500" size={28} />
                Market News Timeline
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                Powered by TradingView
              </span>
            </div>
            <TradingViewTimelineWidget theme={theme} />
          </motion.div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Top Gainers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="mr-2 text-yellow-500" size={28} />
              Top Gainers Today
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topGainers.map((gainer, index) => (
                <TopGainerCard
                  key={index}
                  rank={index + 1}
                  name={gainer.name}
                  symbol={gainer.symbol}
                  price={gainer.price}
                  change={gainer.change}
                  changePercent={gainer.changePercent}
                />
              ))}
            </div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 mb-6 rounded-lg flex items-center ${
                  theme === "light"
                    ? "bg-red-100 text-red-800"
                    : "bg-red-900 bg-opacity-20 text-red-400"
                }`}
              >
                <AlertTriangle className="mr-2" size={20} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              className={`mr-4 py-2 px-1 border-b-2 font-medium transition-all ${
                activeTab === "latest"
                  ? theme === "light"
                    ? "border-blue-600 text-blue-600"
                    : "border-blue-500 text-blue-500"
                  : "border-transparent hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("latest")}
            >
              Latest News
            </button>
            <button
              className={`mr-4 py-2 px-1 border-b-2 font-medium transition-all ${
                activeTab === "markets"
                  ? theme === "light"
                    ? "border-blue-600 text-blue-600"
                    : "border-blue-500 text-blue-500"
                  : "border-transparent hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("markets")}
            >
              Market Data
            </button>
            <button
              className={`mr-4 py-2 px-1 border-b-2 font-medium transition-all ${
                activeTab === "hotlists"
                  ? theme === "light"
                    ? "border-blue-600 text-blue-600"
                    : "border-blue-500 text-blue-500"
                  : "border-transparent hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("hotlists")}
            >
              Hotlists
            </button>
            {selectedArticle && (
              <button
                className={`mr-4 py-2 px-1 border-b-2 font-medium transition-all ${
                  activeTab === "detail"
                    ? theme === "light"
                      ? "border-blue-600 text-blue-600"
                      : "border-blue-500 text-blue-500"
                    : "border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("detail")}
              >
                Article Details
              </button>
            )}
          </div>

          {/* Latest News Tab */}
          {activeTab === "latest" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
                <h2 className="text-2xl font-bold mb-4 md:mb-0 flex items-center">
                  <Newspaper className="mr-2 text-blue-500" size={28} />
                  Latest Financial News
                </h2>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search news, companies, or symbols..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg border ${
                      theme === "light"
                        ? "bg-white border-gray-300 focus:border-blue-500"
                        : "bg-gray-800 border-gray-700 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all w-full md:w-80`}
                  />
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-6 animate-pulse bg-white dark:bg-gray-800"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredNews.length === 0 ? (
                <div
                  className={`rounded-xl p-12 text-center ${
                    theme === "light"
                      ? "bg-white shadow-lg"
                      : "bg-gray-800 shadow-xl"
                  }`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      theme === "light" ? "bg-blue-100" : "bg-blue-900/30"
                    }`}
                  >
                    <Globe
                      className={`w-8 h-8 ${
                        theme === "light" ? "text-blue-600" : "text-blue-400"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-2xl sm:text-3xl font-bold mb-4 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    No matching news found
                  </h3>
                  <p
                    className={`text-lg max-w-2xl mx-auto ${
                      theme === "light" ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    Try adjusting your search terms
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredNews.map((article, index) => (
                    <motion.div
                      key={article.uuid}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                      onClick={() => handleArticleClick(article)}
                      className={`rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${
                        theme === "light"
                          ? "bg-white hover:shadow-xl"
                          : "bg-gray-800 hover:shadow-2xl"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row">
                        {article.image_url && (
                          <div className="md:w-48 h-48 md:h-auto">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-6">
                          <div className="flex items-center mb-3 flex-wrap gap-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                theme === "light"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-blue-900 bg-opacity-30 text-blue-400"
                              }`}
                            >
                              {article.entities[0]?.industry || "Finance"}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {formatDate(article.published_at)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {article.source}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                            Read more <ArrowRight size={14} className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Market Data Tab */}
          {activeTab === "markets" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container mx-auto"
            >
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center">
                    <TrendingUp className="mr-2 text-green-500" size={28} />
                    Live Market Data
                  </h2>
                  <div className="h-6 text-gray-600 dark:text-gray-400">
                    {typedText}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRefreshData}
                  className={`mt-4 md:mt-0 px-5 py-2 rounded-lg text-sm flex items-center ${
                    theme === "light"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-700 text-white hover:bg-blue-600"
                  } shadow-md transition-all`}
                  disabled={loading}
                >
                  <RefreshCw
                    size={16}
                    className={`mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  {loading ? "Refreshing..." : "Refresh Data"}
                </motion.button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg shadow-md p-6 animate-pulse bg-white dark:bg-gray-800"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(stocksData).map(([symbol, stock], index) => {
                    const exchange = index % 2 === 0 ? "NSE" : "BSE";
                    return (
                      <StockCard
                        key={symbol}
                        stock={stock}
                        exchange={exchange}
                      />
                    );
                  })}
                </div>
              )}

              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Clock className="mr-2" size={16} />
                  Last updated:{" "}
                  {lastUpdated.toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Data for demonstration purposes | Live market data
                </p>
              </div>
            </motion.div>
          )}

          {/* Hotlists Tab */}
          {activeTab === "hotlists" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <Zap className="mr-2 text-yellow-500" size={28} />
                  TradingView Hotlists
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Track top gainers, losers, and most active stocks on BSE
                </p>
              </div>
              <TradingViewHotlistsWidget theme={theme} />
            </motion.div>
          )}

          {/* Article Detail Tab */}
          {activeTab === "detail" && selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab("latest")}
                  className={`mb-4 px-3 py-1 rounded-lg text-sm flex items-center ${
                    theme === "light"
                      ? "bg-gray-100 hover:bg-gray-200"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <ArrowRight className="mr-1 rotate-180" size={16} />
                  Back to News
                </motion.button>

                <div
                  className={`rounded-lg overflow-hidden shadow-xl ${
                    theme === "light" ? "bg-white" : "bg-gray-800"
                  }`}
                >
                  {selectedArticle.image_url && (
                    <div className="h-80 w-full">
                      <img
                        src={selectedArticle.image_url}
                        alt={selectedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center mb-4 flex-wrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          theme === "light"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-blue-900 bg-opacity-30 text-blue-400"
                        }`}
                      >
                        {selectedArticle.entities[0]?.industry || "Finance"}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatDate(selectedArticle.published_at)}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedArticle.source}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-4">
                      {selectedArticle.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {selectedArticle.description}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6">
                      {selectedArticle.snippet}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">
                        Mentioned Companies
                      </h3>
                      <div className="space-y-3">
                        {selectedArticle.entities.map((entity, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg flex items-center ${
                              theme === "light" ? "bg-gray-50" : "bg-gray-700"
                            }`}
                          >
                            <div>
                              <div className="font-medium">{entity.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {entity.symbol} • {entity.exchange}
                              </div>
                            </div>
                            <div className="ml-auto">
                              <div
                                className={`px-2 py-1 rounded-full text-xs ${
                                  entity.sentiment_score > 0.3
                                    ? theme === "light"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-green-900 bg-opacity-30 text-green-400"
                                    : entity.sentiment_score < -0.3
                                      ? theme === "light"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-red-900 bg-opacity-30 text-red-400"
                                      : theme === "light"
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-gray-600 text-gray-300"
                                }`}
                              >
                                Sentiment:{" "}
                                {entity.sentiment_score > 0 ? "+" : ""}
                                {entity.sentiment_score.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">
                        Key Highlights
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        {selectedArticle.entities
                          .flatMap((entity) => entity.highlights)
                          .map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                            theme === "light"
                              ? "bg-gray-100 hover:bg-gray-200"
                              : "bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                          Share
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                            theme === "light"
                              ? "bg-gray-100 hover:bg-gray-200"
                              : "bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                          Save
                        </motion.button>
                      </div>

                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={selectedArticle.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-1 rounded-lg text-sm flex items-center ${
                          theme === "light"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-700 text-white hover:bg-blue-600"
                        }`}
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Read Full Article
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>

              {similarArticles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Related News</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {similarArticles.map((article, index) => (
                      <motion.div
                        key={article.uuid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() => handleArticleClick(article)}
                        className={`rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all duration-300 ${
                          theme === "light"
                            ? "bg-white hover:bg-gray-50"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        {article.image_url && (
                          <div className="h-40 w-full">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <Clock size={12} className="mr-1" />
                              {formatDate(article.published_at)}
                            </span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {article.source}
                            </span>
                          </div>
                          <h4 className="font-medium mb-2 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {article.snippet}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Mock Data Functions
function getMockNewsData(): NewsArticle[] {
  return [
    {
      uuid: "1",
      title: "Reliance Industries Announces Major Investment in Green Energy",
      description:
        "Reliance Industries plans to invest ₹75,000 crore in green energy initiatives over the next 3 years, aiming to become carbon neutral by 2035.",
      keywords: ["Reliance", "green energy", "investment", "carbon neutral"],
      snippet:
        "Reliance Industries Chairman Mukesh Ambani announced a ₹75,000 crore investment plan for green energy projects, including solar, batteries, and hydrogen fuel cells.",
      url: "https://example.com/news/1",
      image_url:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2025-05-08T09:30:00Z",
      source: "Economic Times",
      entities: [
        {
          symbol: "RELIANCE.BSE",
          name: "Reliance Industries Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Energy",
          match_score: 0.98,
          sentiment_score: 0.85,
          highlights: [
            "₹75,000 crore investment",
            "green energy initiatives",
            "carbon neutral by 2035",
          ],
        },
      ],
    },
    {
      uuid: "2",
      title: "HDFC Bank Reports 20% Rise in Q2 Net Profit, Beats Estimates",
      description:
        "HDFC Bank, India's largest private sector lender, reported a 20% year-on-year increase in net profit for Q2 FY25, exceeding market expectations.",
      keywords: [
        "HDFC Bank",
        "quarterly results",
        "banking sector",
        "profit growth",
      ],
      snippet:
        "HDFC Bank posted a net profit of ₹15,976 crore for the quarter ended March 2025, up 20% from ₹13,265 crore in the same period last year, driven by strong loan growth.",
      url: "https://example.com/news/2",
      image_url:
        "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2025-05-07T14:45:00Z",
      source: "LiveMint",
      entities: [
        {
          symbol: "HDFCBANK.BSE",
          name: "HDFC Bank Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Banking",
          match_score: 0.95,
          sentiment_score: 0.72,
          highlights: [
            "20% rise in net profit",
            "exceeds analyst expectations",
            "strong loan growth",
          ],
        },
      ],
    },
    {
      uuid: "3",
      title: "Infosys Wins $1.5 Billion AI Contract from Global Retailer",
      description:
        "Infosys secures a $1.5 billion contract to implement AI-powered digital transformation solutions for a leading global retail chain.",
      keywords: [
        "Infosys",
        "AI contract",
        "digital transformation",
        "IT services",
      ],
      snippet:
        "Infosys has won a $1.5 billion multi-year contract to deploy artificial intelligence and machine learning solutions for a major international retailer.",
      url: "https://example.com/news/3",
      image_url:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2025-05-07T11:15:00Z",
      source: "Business Standard",
      entities: [
        {
          symbol: "INFY.NSE",
          name: "Infosys Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.97,
          sentiment_score: 0.91,
          highlights: [
            "$1.5 billion contract",
            "AI-powered solutions",
            "digital transformation",
          ],
        },
      ],
    },
    {
      uuid: "4",
      title:
        "TCS Reports 8.7% Growth in Q4 Profit, Announces ₹18,000 Crore Buyback",
      description:
        "Tata Consultancy Services posts strong quarterly results and announces share buyback program valued at ₹18,000 crore.",
      keywords: ["TCS", "quarterly results", "share buyback", "IT sector"],
      snippet:
        "IT giant TCS reported an 8.7% year-on-year increase in Q4 net profit to ₹11,342 crore, beating street expectations.",
      url: "https://example.com/news/4",
      image_url:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2025-05-06T16:00:00Z",
      source: "Financial Express",
      entities: [
        {
          symbol: "TCS.BSE",
          name: "Tata Consultancy Services Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.99,
          sentiment_score: 0.75,
          highlights: [
            "8.7% profit growth",
            "₹18,000 crore share buyback",
            "exceeds expectations",
          ],
        },
      ],
    },
    {
      uuid: "5",
      title: "Bharti Airtel Expands 5G Network to 500 Cities",
      description:
        "Bharti Airtel announces expansion of its 5G services to 500 cities across India, aiming to capture larger market share.",
      keywords: ["Airtel", "5G", "network expansion", "telecom"],
      snippet:
        "Bharti Airtel has expanded its 5G network to 500 cities nationwide, with plans to reach 1,000 cities by the end of this fiscal year.",
      url: "https://example.com/news/5",
      image_url:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2025-05-05T10:30:00Z",
      source: "Economic Times",
      entities: [
        {
          symbol: "BHARTIARTL.NSE",
          name: "Bharti Airtel Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Telecommunications",
          match_score: 0.94,
          sentiment_score: 0.68,
          highlights: [
            "5G expansion",
            "500 cities covered",
            "aggressive growth strategy",
          ],
        },
      ],
    },
  ];
}

function getMockSimilarNewsData(): NewsArticle[] {
  return [
    {
      uuid: "6",
      title: "Indian IT Firms to Benefit from Global AI Adoption Trend",
      description:
        "Analysis shows Indian IT service providers are well-positioned to capitalize on the growing global demand for AI implementation services.",
      keywords: [
        "IT sector",
        "AI adoption",
        "Indian companies",
        "global trend",
      ],
      snippet:
        "Research indicates that Indian IT majors including TCS, Infosys, and Wipro are set to gain significantly from AI adoption across industries.",
      url: "https://example.com/news/6",
      image_url:
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2025-05-04T09:00:00Z",
      source: "Financial Express",
      entities: [
        {
          symbol: "INFY.NSE",
          name: "Infosys Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.87,
          sentiment_score: 0.65,
          highlights: [
            "AI implementation services",
            "global demand",
            "competitive position",
          ],
        },
      ],
    },
    {
      uuid: "7",
      title: "Wipro Secures $700 Million Digital Transformation Deal",
      description:
        "Wipro has won a $700 million deal to provide digital transformation services to a major European financial services group.",
      keywords: [
        "Wipro",
        "digital transformation",
        "European market",
        "financial services",
      ],
      snippet:
        "Wipro has announced a $700 million contract with a leading European financial services group for digital transformation services over five years.",
      url: "https://example.com/news/7",
      image_url:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2025-05-03T15:30:00Z",
      source: "Economic Times",
      entities: [
        {
          symbol: "WIPRO.BSE",
          name: "Wipro Ltd",
          exchange: "BSE",
          exchange_long: "Bombay Stock Exchange",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.84,
          sentiment_score: 0.7,
          highlights: [
            "$700 million contract",
            "European financial services",
            "digital transformation",
          ],
        },
      ],
    },
    {
      uuid: "8",
      title: "Tech Mahindra Partners with Google Cloud for AI Solutions",
      description:
        "Tech Mahindra announces strategic partnership with Google Cloud to develop AI solutions across multiple sectors.",
      keywords: [
        "Tech Mahindra",
        "Google Cloud",
        "AI partnership",
        "tech collaboration",
      ],
      snippet:
        "Tech Mahindra has formed a strategic alliance with Google Cloud to co-develop AI-powered solutions for telecommunications, healthcare, and manufacturing.",
      url: "https://example.com/news/8",
      image_url:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      language: "en",
      published_at: "2025-05-02T13:45:00Z",
      source: "Business Standard",
      entities: [
        {
          symbol: "TECHM.NSE",
          name: "Tech Mahindra Ltd",
          exchange: "NSE",
          exchange_long: "National Stock Exchange of India",
          country: "India",
          type: "company",
          industry: "Information Technology",
          match_score: 0.82,
          sentiment_score: 0.68,
          highlights: [
            "Google Cloud partnership",
            "industry-specific AI solutions",
            "market expansion strategy",
          ],
        },
      ],
    },
  ];
}
