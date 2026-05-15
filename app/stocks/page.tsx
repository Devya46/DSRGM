"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { useTheme } from "@/context/theme-context";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Grid3x3,
  Newspaper,
  Building2,
  LineChart,
  RefreshCw,
  Clock,
  Award,
  Zap,
  Eye,
  Bell,
  Info,
  CheckCircle,
} from "lucide-react";

// Define types
interface MarketStat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  description?: string;
}

interface TrendingStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

// Dynamically import TradingView widgets with no SSR
const AdvancedChart = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then(
      (mod) => mod.AdvancedRealTimeChart,
    ),
  { ssr: false },
);

const TickerTape = dynamic(
  () => import("react-ts-tradingview-widgets").then((mod) => mod.TickerTape),
  { ssr: false },
);

// Suppress TradingView console errors
const suppressTradingViewErrors = () => {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("[tv] unsupported resolution") ||
        args[0].includes("TradingView") ||
        args[0].includes("tradingview"))
    ) {
      return;
    }
    originalError.apply(console, args);
  };
};

// Memoized TradingView Heatmap Widget Component
const TradingViewWidget = React.memo(({ theme }: { theme: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    suppressTradingViewErrors();

    if (!container.current) return;
    // Clear previous content to avoid duplicate scripts
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      dataSource: "SENSEX",
      blockSize: "market_cap_basic",
      blockColor: "change",
      grouping: "sector",
      locale: "in",
      symbolUrl: "",
      colorTheme: theme === "light" ? "light" : "dark",
      exchanges: [],
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: "100%",
      height: "700",
    });

    container.current.appendChild(script);
  }, [theme]);

  return (
    <div
      className="tradingview-widget-container h-[700px] w-full"
      ref={container}
    >
      <div className="tradingview-widget-container__widget h-[700px] w-full"></div>
    </div>
  );
});

TradingViewWidget.displayName = "TradingViewWidget";

// Stock Heatmap Widget Component
const StockHeatmap = ({ theme }: { theme: string }) => {
  return <TradingViewWidget theme={theme} />;
};

// Economic Calendar Widget Component
const EconomicCalendar = ({ theme }: { theme: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    suppressTradingViewErrors();

    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: theme === "light" ? "light" : "dark",
      isTransparent: false,
      locale: "in",
      countryFilter: "in",
      importanceFilter: "-1,0,1",
      width: "100%",
      height: "700",
    });

    container.current.appendChild(script);
  }, [theme]);

  return (
    <div
      className="tradingview-widget-container h-full min-h-[500px] w-full"
      ref={container}
    >
      <div className="tradingview-widget-container__widget h-[700px] w-full"></div>
    </div>
  );
};

// Market Summary Horizontal Widget Component
const MarketSummaryHorizontal = ({ theme }: { theme: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    suppressTradingViewErrors();

    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://widgets.tradingview-widget.com/w/en/tv-market-summary.js";
    script.async = true;

    const element = document.createElement("tv-market-summary");
    element.setAttribute("exchange", "BSE");
    element.setAttribute("direction", "horizontal");
    element.setAttribute("color-theme", theme === "light" ? "light" : "dark");

    container.current.appendChild(script);
    container.current.appendChild(element);
  }, [theme]);

  return (
    <div
      className="market-summary-container w-full min-h-[120px]"
      ref={container}
    />
  );
};

// Company News Widget
const CompanyNews = ({ theme }: { theme: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    suppressTradingViewErrors();

    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "market",
      market: "india",
      colorTheme: theme === "light" ? "light" : "dark",
      isTransparent: false,
      displayMode: "regular",
      width: "100%",
      height: "700",
      locale: "in",
    });

    container.current.appendChild(script);
  }, [theme]);

  return (
    <div
      className="tradingview-widget-container h-full min-h-[500px] w-full"
      ref={container}
    >
      <div className="tradingview-widget-container__widget h-[700px] w-full"></div>
    </div>
  );
};

// Sector Performance Widget
const SectorPerformance = ({ theme }: { theme: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    suppressTradingViewErrors();

    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: theme === "light" ? "light" : "dark",
      dateRange: "1D",
      showChart: true,
      locale: "in",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      width: "100%",
      height: "700",
      plotLineColorGrowing: "rgba(34, 197, 94, 1)",
      plotLineColorFalling: "rgba(239, 68, 68, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: theme === "light" ? "#666" : "#DBDBDB",
      belowLineFillColorGrowing: "rgba(34, 197, 94, 0.12)",
      belowLineFillColorFalling: "rgba(239, 68, 68, 0.12)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            { s: "BSE:SENSEX", d: "SENSEX" },
            { s: "NSE:NIFTY", d: "NIFTY 50" },
            { s: "NSE:BANKNIFTY", d: "BANK NIFTY" },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Top Stocks",
          symbols: [
            { s: "BSE:RELIANCE", d: "Reliance" },
            { s: "BSE:TCS", d: "TCS" },
            { s: "BSE:HDFCBANK", d: "HDFC Bank" },
            { s: "BSE:INFY", d: "Infosys" },
            { s: "BSE:ICICIBANK", d: "ICICI Bank" },
          ],
          originalTitle: "Top Stocks",
        },
        {
          title: "Sectors",
          symbols: [
            { s: "NSE:NIFTYBANK", d: "BANK" },
            { s: "NSE:NIFTYIT", d: "IT" },
            { s: "NSE:NIFTYPHARMA", d: "PHARMA" },
            { s: "NSE:NIFTYAUTO", d: "AUTO" },
            { s: "NSE:NIFTYFMCG", d: "FMCG" },
          ],
          originalTitle: "Sectors",
        },
      ],
    });

    container.current.appendChild(script);
  }, [theme]);

  return (
    <div
      className="tradingview-widget-container h-full min-h-[500px] w-full"
      ref={container}
    >
      <div className="tradingview-widget-container__widget h-[700px] w-full"></div>
    </div>
  );
};

// Mini Chart Widget with error handling
const MiniChart = ({ theme, symbol }: { theme: string; symbol: string }) => {
  const container = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    suppressTradingViewErrors();

    if (!container.current || hasError) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: "100%",
      height: "700",
      locale: "in",
      dateRange: "1D",
      colorTheme: theme === "light" ? "light" : "dark",
      isTransparent: false,
      autosize: true,
      largeChartUrl: "",
    });

    const handleError = () => {
      setHasError(true);
    };

    script.addEventListener("error", handleError);
    container.current.appendChild(script);

    return () => {
      script.removeEventListener("error", handleError);
    };
  }, [theme, symbol, hasError]);

  if (hasError) {
    return (
      <div
        className={`h-[180px] w-full flex items-center justify-center rounded-lg ${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`}
      >
        <p className="text-xs text-gray-500">Chart temporarily unavailable</p>
      </div>
    );
  }

  return (
    <div
      className="tradingview-widget-container h-[180px] w-full"
      ref={container}
    >
      <div className="tradingview-widget-container__widget h-[700px] w-full"></div>
    </div>
  );
};

// Market Overview Widget (Custom)
const MarketOverviewWidget = ({ theme }: { theme: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    suppressTradingViewErrors();

    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: theme === "light" ? "light" : "dark",
      dateRange: "1M",
      locale: "in",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showChart: true,
      width: "100%",
      height: "700",
      plotLineColorGrowing: "rgba(34, 197, 94, 1)",
      plotLineColorFalling: "rgba(239, 68, 68, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: theme === "light" ? "#666" : "#DBDBDB",
      belowLineFillColorGrowing: "rgba(34, 197, 94, 0.12)",
      belowLineFillColorFalling: "rgba(239, 68, 68, 0.12)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            { s: "BSE:SENSEX", d: "SENSEX" },
            { s: "NSE:NIFTY", d: "NIFTY 50" },
            { s: "NSE:BANKNIFTY", d: "BANK NIFTY" },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Top Movers",
          symbols: [
            { s: "BSE:RELIANCE", d: "Reliance" },
            { s: "BSE:TCS", d: "TCS" },
            { s: "BSE:HDFCBANK", d: "HDFC Bank" },
            { s: "BSE:INFY", d: "Infosys" },
            { s: "BSE:ICICIBANK", d: "ICICI Bank" },
          ],
          originalTitle: "Top Movers",
        },
      ],
    });

    container.current.appendChild(script);
  }, [theme]);

  return (
    <div
      className="tradingview-widget-container h-[400px] w-full"
      ref={container}
    >
      <div className="tradingview-widget-container__widget h-[700px] w-full"></div>
    </div>
  );
};

// Market Statistics Component
function MarketStatistics() {
  const { theme } = useTheme();
  const [stats, setStats] = useState<MarketStat[]>([
    {
      label: "NIFTY 50",
      value: "22,145.65",
      change: 0.85,
      icon: <BarChart3 className="h-4 w-4" />,
      description: "India's benchmark index",
    },
    {
      label: "SENSEX",
      value: "72,890.45",
      change: 0.72,
      icon: <Activity className="h-4 w-4" />,
      description: "BSE 30 companies",
    },
    {
      label: "BANK NIFTY",
      value: "47,890.30",
      change: -0.25,
      icon: <Building2 className="h-4 w-4" />,
      description: "Banking sector index",
    },
    {
      label: "INDIA VIX",
      value: "14.25",
      change: -2.15,
      icon: <Activity className="h-4 w-4" />,
      description: "Volatility index",
    },
    {
      label: "Market Cap",
      value: "₹412.46 Lakh Cr",
      change: 0.45,
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Total market valuation",
    },
    {
      label: "P/E Ratio",
      value: "22.45",
      change: -0.12,
      icon: <LineChart className="h-4 w-4" />,
      description: "Price to earnings",
    },
  ]);

  useEffect(() => {
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
    return newValue.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className={`p-3 sm:p-4 rounded-xl transition-all duration-300 ${
            theme === "light"
              ? "bg-white border border-gray-200 shadow-sm hover:shadow-md"
              : "bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`p-1 rounded ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}
            >
              {stat.icon}
            </motion.div>
            <div className="flex flex-col">
              <span
                className={`text-xs sm:text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
              >
                {stat.label}
              </span>
              {stat.description && (
                <span className="text-[10px] text-gray-500 hidden sm:block">
                  {stat.description}
                </span>
              )}
            </div>
          </div>
          <motion.div
            key={stat.value}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-base sm:text-lg font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}
          >
            {stat.value}
          </motion.div>
          <motion.div
            animate={{
              color:
                stat.change > 0
                  ? "#22c55e"
                  : stat.change < 0
                    ? "#ef4444"
                    : "#6b7280",
            }}
            className="flex items-center gap-1 text-xs mt-1"
          >
            {stat.change > 0 ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>{Math.abs(stat.change)}%</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// Trending Stocks Component with Toggle
function TrendingStocks() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"gainers" | "losers">("gainers");
  const [trendingStocks, setTrendingStocks] = useState<TrendingStock[]>([]);

  useEffect(() => {
    const generateTrendingStocks = () => {
      const stocksList = [
        { symbol: "RELIANCE", name: "Reliance Industries" },
        { symbol: "TCS", name: "Tata Consultancy Services" },
        { symbol: "HDFCBANK", name: "HDFC Bank" },
        { symbol: "INFY", name: "Infosys" },
        { symbol: "ICICIBANK", name: "ICICI Bank" },
        { symbol: "HINDUNILVR", name: "Hindustan Unilever" },
        { symbol: "SBIN", name: "SBI" },
        { symbol: "BHARTIARTL", name: "Bharti Airtel" },
        { symbol: "ITC", name: "ITC" },
        { symbol: "KOTAKBANK", name: "Kotak Bank" },
      ];

      const stocks = stocksList.map((stock) => ({
        symbol: stock.symbol,
        name: stock.name,
        price: Math.random() * 2000 + 100,
        change: Math.random() * 10 - 5,
        changePercent: Math.random() * 10 - 5,
        volume: Math.floor(Math.random() * 10000000) + 100000,
      }));
      setTrendingStocks(stocks);
    };

    generateTrendingStocks();
    const interval = setInterval(generateTrendingStocks, 15000);
    return () => clearInterval(interval);
  }, []);

  const topGainers = [...trendingStocks]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);
  const topLosers = [...trendingStocks]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5);
  const currentStocks = activeTab === "gainers" ? topGainers : topLosers;

  return (
    <div
      className={`rounded-xl p-4 sm:p-6 h-full ${
        theme === "light"
          ? "bg-white shadow-md border border-gray-200"
          : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
      }`}
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3
          className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} flex items-center gap-2`}
        >
          <Award className="h-5 w-5 text-yellow-500" />
          Trending Stocks
        </h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("gainers")}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              activeTab === "gainers"
                ? "bg-green-600 text-white shadow-lg shadow-green-500/25"
                : theme === "light"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-gray-800 text-gray-400"
            }`}
          >
            <TrendingUp className="h-3 w-3 inline mr-1" />
            Top Gainers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("losers")}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              activeTab === "losers"
                ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                : theme === "light"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-gray-800 text-gray-400"
            }`}
          >
            <TrendingDown className="h-3 w-3 inline mr-1" />
            Top Losers
          </motion.button>
        </div>
      </div>

      <div className="space-y-3">
        {currentStocks.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 5, scale: 1.01 }}
            className={`p-3 rounded-lg transition-all cursor-pointer ${
              theme === "light"
                ? "bg-gray-50 hover:bg-gray-100"
                : "bg-gray-800/50 hover:bg-gray-800"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}
                  >
                    {stock.symbol}
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:inline">
                    {stock.name}
                  </span>
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
                  className={`flex items-center gap-1 text-sm ${stock.changePercent > 0 ? "text-green-600" : "text-red-600"}`}
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

// Quick Charts Component
function QuickCharts({ theme }: { theme: string }) {
  const popularSymbols = [
    { symbol: "NSE:NIFTY", name: "NIFTY 50" },
    { symbol: "BSE:SENSEX", name: "SENSEX" },
    { symbol: "NSE:BANKNIFTY", name: "BANK NIFTY" },
    { symbol: "NSE:RELIANCE", name: "Reliance" },
    { symbol: "NSE:TCS", name: "TCS" },
    { symbol: "NSE:HDFCBANK", name: "HDFC Bank" },
    { symbol: "NSE:INFY", name: "Infosys" },
    { symbol: "NSE:ICICIBANK", name: "ICICI Bank" },
  ];

  // return (
  //   <div
  //     className={`rounded-xl p-4 sm:p-6 h-full ${
  //       theme === "light"
  //         ? "bg-white shadow-md border border-gray-200"
  //         : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
  //     }`}
  //   >
  //     <h3
  //       className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"} flex items-center gap-2`}
  //     >
  //       <Clock className="h-5 w-5 text-blue-500" />
  //       Quick Charts
  //     </h3>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
  //       {popularSymbols.map((sym) => (
  //         <div
  //           key={sym.symbol}
  //           className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition-all"
  //         >
  //           <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
  //             {sym.name}
  //           </p>
  //           <MiniChart theme={theme} symbol={sym.symbol} />
  //         </div>
  //       ))}
  //     </div>
  //     <style jsx>{`
  //       .custom-scrollbar::-webkit-scrollbar {
  //         width: 4px;
  //       }
  //       .custom-scrollbar::-webkit-scrollbar-track {
  //         background: transparent;
  //       }
  //       .custom-scrollbar::-webkit-scrollbar-thumb {
  //         background: #888;
  //         border-radius: 4px;
  //       }
  //     `}</style>
  //   </div>
  // );
}

// Market Analysis Section
function MarketAnalysis({
  theme,
  isMounted,
}: {
  theme: string;
  isMounted: boolean;
}) {
  const [activeAnalysis, setActiveAnalysis] = useState<
    "heatmap" | "sectors" | "news" | "calendar"
  >("heatmap");

  const analysisOptions = [
    {
      id: "heatmap",
      label: "Stocks Heatmap",
      icon: <Grid3x3 className="h-4 w-4" />,
      color: "from-red-500 to-orange-500",
    },
    {
      id: "sectors",
      label: "Sector Performance",
      icon: <Building2 className="h-4 w-4" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "news",
      label: "Market News",
      icon: <Newspaper className="h-4 w-4" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "calendar",
      label: "Economic Calendar",
      icon: <Calendar className="h-4 w-4" />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div
      className={`rounded-xl p-4 sm:p-6 h-full ${
        theme === "light"
          ? "bg-white shadow-md border border-gray-200"
          : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h3
          className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} flex items-center gap-2`}
        >
          <Zap className="h-5 w-5 text-purple-500" />
          Market Analysis
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysisOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveAnalysis(option.id as typeof activeAnalysis)
              }
              className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                activeAnalysis === option.id
                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                  : theme === "light"
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {option.icon}
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-4 min-h-[700px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAnalysis}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {activeAnalysis === "heatmap" && isMounted && (
              <StockHeatmap theme={theme} />
            )}
            {activeAnalysis === "sectors" && isMounted && (
              <SectorPerformance theme={theme} />
            )}
            {activeAnalysis === "news" && isMounted && (
              <CompanyNews theme={theme} />
            )}
            {activeAnalysis === "calendar" && isMounted && (
              <EconomicCalendar theme={theme} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Last Updated Timer Component
function LastUpdatedTimer() {
  const { theme } = useTheme();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [timeAgo, setTimeAgo] = useState("just now");

  useEffect(() => {
    const updateTimeAgo = () => {
      const seconds = Math.floor(
        (new Date().getTime() - lastUpdated.getTime()) / 1000,
      );
      if (seconds < 60) {
        setTimeAgo(`${seconds} seconds ago`);
      } else if (seconds < 120) {
        setTimeAgo("1 minute ago");
      } else {
        setTimeAgo(`${Math.floor(seconds / 60)} minutes ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(() => {
      updateTimeAgo();
    }, 10000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
        theme === "light"
          ? "bg-gray-100 text-gray-600"
          : "bg-gray-800 text-gray-400"
      }`}
    >
      <RefreshCw
        className={`h-3 w-3 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
      />
      <span>Data refreshed {timeAgo}</span>
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
    </div>
  );
}

export default function StocksPage() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("NSE:NIFTY");
  const [showAlert, setShowAlert] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Suppress TradingView errors on mount
    suppressTradingViewErrors();
  }, []);

  const popularSymbols = [
    { symbol: "NSE:NIFTY", name: "NIFTY 50" },
    { symbol: "BSE:SENSEX", name: "SENSEX" },
    { symbol: "NSE:BANKNIFTY", name: "BANK NIFTY" },
    { symbol: "NSE:RELIANCE", name: "Reliance" },
    { symbol: "NSE:TCS", name: "TCS" },
    { symbol: "NSE:HDFCBANK", name: "HDFC Bank" },
    { symbol: "NSE:INFY", name: "Infosys" },
    { symbol: "NSE:ICICIBANK", name: "ICICI Bank" },
  ];

  const handleReferralCopy = () => {
    navigator.clipboard.writeText(
      "https://stockmarket.example.com/refer?code=INVEST2024",
    );
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-50" : "bg-black"}`}
    >
      <NavBar />

      {/* Hero Section with Page Heading & Ref Button + Timer */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-orange-500/20" />
        <div className="container mx-auto px-4 pt-8 sm:pt-12 pb-6 sm:pb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full mb-4"
              >
                <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                  Live Market Data
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                  theme === "light"
                    ? "text-gray-900"
                    : "bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent"
                }`}
              >
                Indian Stock Market
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-sm sm:text-base max-w-2xl ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
              >
                Real-time data, advanced charts, and comprehensive market
                analysis for NSE & BSE
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <LastUpdatedTimer />
              {/* <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReferral(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Info className="h-4 w-4" />
                  Refer & Earn
                </motion.button>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ticker Tape */}
      {isMounted && (
        <div className="w-full overflow-hidden border-y border-gray-200 dark:border-gray-800">
          <TickerTape
            colorTheme={theme}
            displayMode="adaptive"
            isTransparent={theme !== "light"}
            showSymbolLogo={false}
            width="100%"
            locale="in"
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Market Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} flex items-center gap-2`}
            >
              <BarChart3 className="h-5 w-5" />
              Market Statistics
            </h2>
          </div>
          <MarketStatistics />
        </motion.div>

        {/* TV Market Summary BSE Horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h2
            className={`text-xl font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"} flex items-center gap-2`}
          >
            <Building2 className="h-5 w-5" />
            BSE Market Summary
          </h2>
          <div
            className={`rounded-xl overflow-hidden ${theme === "light" ? "bg-white shadow-sm" : "bg-gray-900/80 backdrop-blur-sm"}`}
          >
            {isMounted && <MarketSummaryHorizontal theme={theme} />}
          </div>
        </motion.div>

        {/* Live Market Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div
            className={`rounded-xl p-4 sm:p-6 ${
              theme === "light"
                ? "bg-white shadow-md border border-gray-200"
                : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2
                className={`text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} flex items-center gap-2`}
              >
                <LineChart className="h-5 w-5 text-purple-500" />
                Live Market Chart
              </h2>
              <div className="flex flex-wrap gap-2">
                {popularSymbols.map((sym) => (
                  <motion.button
                    key={sym.symbol}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSymbol(sym.symbol)}
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      selectedSymbol === sym.symbol
                        ? "bg-purple-600 text-white"
                        : theme === "light"
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {sym.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="h-[400px] sm:h-[500px] w-full">
              {isMounted && (
                <AdvancedChart
                  symbol={selectedSymbol}
                  theme={theme}
                  height="100%"
                  width="100%"
                  style="3"
                  timezone="Asia/Kolkata"
                  backgroundColor="rgba(0, 0, 0, 0)"
                  key={`${selectedSymbol}_${theme}`}
                  container_id={`live_chart_${selectedSymbol.replace(":", "_")}`}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Market Analysis Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <div className="min-h-[650px] w-full">
            <MarketAnalysis theme={theme} isMounted={isMounted} />
          </div>
        </motion.div>

        {/* Trending Stocks Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="mb-8"
        >
          <TrendingStocks />
        </motion.div>

        {/* Market Overview Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <div
            className={`rounded-xl p-4 sm:p-6 h-full ${
              theme === "light"
                ? "bg-white shadow-md border border-gray-200"
                : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"} flex items-center gap-2`}
            >
              <BarChart3 className="h-5 w-5 text-green-500" />
              Market Overview
            </h3>
            {isMounted && <MarketOverviewWidget theme={theme} />}
          </div>
        </motion.div>

        {/* Quick Charts and Market Overview - Side by Side */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="h-full"
          >
            <QuickCharts theme={theme} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05 }}
            className="h-full"
          >
            <div
              className={`rounded-xl p-4 sm:p-6 h-full ${
                theme === "light"
                  ? "bg-white shadow-md border border-gray-200"
                  : "bg-gray-900/80 backdrop-blur-sm border border-gray-800"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"} flex items-center gap-2`}
              >
                <BarChart3 className="h-5 w-5 text-green-500" />
                Market Overview
              </h3>
              {isMounted && <MarketOverviewWidget theme={theme} />}
            </div>
          </motion.div>
        </div> */}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-8"
        >
          <div
            className={`rounded-xl p-6 sm:p-8 text-center relative overflow-hidden ${
              theme === "light"
                ? "bg-gradient-to-r from-purple-600 to-pink-600"
                : "bg-gradient-to-r from-purple-600/90 to-pink-600/90"
            }`}
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4"
              >
                <Bell className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Never Miss a Market Opportunity
              </h3>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Get real-time alerts, personalized recommendations, and
                exclusive market insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Referral Modal */}
        <AnimatePresence>
          {showReferral && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowReferral(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`rounded-xl p-6 max-w-md w-full ${theme === "light" ? "bg-white" : "bg-gray-900"}`}
              >
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <h3
                    className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}
                  >
                    Refer & Earn
                  </h3>
                  <p
                    className={`text-sm mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    Share this link with your friends and earn rewards when they
                    join!
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 p-2 rounded-lg ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-gray-800 border border-gray-700"}`}
                >
                  <input
                    type="text"
                    value="https://stockmarket.example.com/refer?code=INVEST2024"
                    readOnly
                    className={`flex-1 px-3 py-2 text-sm bg-transparent outline-none ${theme === "light" ? "text-gray-900" : "text-white"}`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReferralCopy}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                  >
                    {referralCopied ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      "Copy"
                    )}
                  </motion.button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Earn ₹500 for each successful referral!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alert Modal */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAlert(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`rounded-xl p-6 max-w-md w-full ${theme === "light" ? "bg-white" : "bg-gray-900"}`}
              >
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-3">
                    <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3
                    className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}
                  >
                    Stay Updated!
                  </h3>
                  <p
                    className={`text-sm mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    Enter your email to receive market alerts and insights
                  </p>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 rounded-lg mb-4 ${
                    theme === "light"
                      ? "bg-gray-50 border border-gray-200 focus:border-purple-500"
                      : "bg-gray-800 border border-gray-700 focus:border-purple-500"
                  } outline-none transition-all`}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAlert(false)}
                    className={`flex-1 px-4 py-2 rounded-lg ${
                      theme === "light"
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
                        : "bg-gray-800 hover:bg-gray-700 text-white"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                  >
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
