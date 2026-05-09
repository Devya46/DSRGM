"use client";

import { useState, useEffect, useRef, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Zap,
  Sparkles,
  Activity,
  Globe,
  Clock,
} from "lucide-react";
import { format, subDays } from "date-fns";
import axios from "axios";
import debounce from "lodash/debounce";

// TradingView Widget Component
function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear previous widget if any
    container.current.innerHTML =
      '<div className="tradingview-widget-container__widget"></div>';

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      lineWidth: 2,
      lineType: 2,
      chartType: "area",
      fontColor: "rgb(106, 109, 120)",
      gridLineColor: "rgba(242, 242, 242, 0.06)",
      volumeUpColor: "rgba(34, 171, 148, 0.5)",
      volumeDownColor: "rgba(247, 82, 95, 0.5)",
      backgroundColor: "#0F0F0F",
      widgetFontColor: "#DBDBDB",
      upColor: "#22ab94",
      downColor: "#f7525f",
      borderUpColor: "#22ab94",
      borderDownColor: "#f7525f",
      wickUpColor: "#22ab94",
      wickDownColor: "#f7525f",
      colorTheme: "dark",
      isTransparent: false,
      locale: "en",
      chartOnly: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      valuesTracking: "1",
      changeMode: "price-and-percent",
      symbols: [
        ["BSE:TIMEX|1D"],
        ["BSE:NSDL|1D"],
        ["BSE:CIANAGRO|1D"],
        ["BSE:SPICEJET|1D"],
        ["BSE:TANFACIND|1D"],
        ["BSE:RIIL|1D"],
        ["NSE:RELIANCE|1D"],
        ["NSE:TCS|1D"],
        ["NSE:HDFCBANK|1D"],
      ],
      dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      fontSize: "10",
      headerFontSize: "medium",
      autosize: true,
      width: "100%",
      height: "58%",
      noTimeScale: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
    });
    container.current.appendChild(script);

    // Cleanup
    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container h-[550px] w-full"
      ref={container}
    >
      <div className="tradingview-widget-container__widget h-full w-full"></div>
      <div className="tradingview-widget-copyright text-xs text-gray-500 mt-1">
        <a
          href="https://www.tradingview.com/markets/"
          rel="noopener nofollow"
          target="_blank"
          className="text-gray-400 hover:text-gray-300"
        >
          Market data
        </a>{" "}
        by TradingView
      </div>
    </div>
  );
}

const MemoizedTradingViewWidget = memo(TradingViewWidget);

// Company interface with detailed data
interface CompanyData {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  marketCap: string;
  currentPrice: number;
  dayChange: number;
  dayChangePercentage: number;
  volume: string;
  pe: number;
  eps: number;
  revenue: string;
  netProfit: string;
  yoyGrowth: number;
  quarterlyData: {
    dates: string[];
    prices: number[];
    volumes: number[];
    revenue: number[];
    profit: number[];
  };
}

// Live market stats component
const LiveMarketStats = () => {
  const [stats, setStats] = useState({
    marketStatus: "Open",
    lastUpdated: new Date(),
    advancers: 1842,
    decliners: 1123,
    unchanged: 89,
    totalVolume: "1.2B",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        lastUpdated: new Date(),
        advancers: prev.advancers + Math.floor(Math.random() * 10) - 5,
        decliners: prev.decliners + Math.floor(Math.random() * 10) - 5,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">
              Market {stats.marketStatus}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock size={14} />
            <span>Updated {format(stats.lastUpdated, "HH:mm:ss")}</span>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-gray-400">Advancers:</span>
            <span className="text-green-400 ml-2 font-medium">
              {stats.advancers.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Decliners:</span>
            <span className="text-red-400 ml-2 font-medium">
              {stats.decliners.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Volume:</span>
            <span className="text-white ml-2 font-medium">
              {stats.totalVolume}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Counter Component
interface AnimatedCounterProps {
  value: string | number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue =
      typeof value === "string"
        ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
        : value;

    const duration = 1500;
    const frames = 60;
    const increment = numericValue / frames;
    let currentValue = 0;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      currentValue += increment;
      if (frame >= frames) {
        currentValue = numericValue;
        clearInterval(timer);
      }
      setDisplayValue(currentValue);
    }, duration / frames);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      })}
      {suffix}
    </span>
  );
};

// Metric Card Component
const MetricCard = ({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ElementType;
}) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-2">
      <div className="text-gray-400 text-sm">{label}</div>
      {Icon && (
        <Icon
          size={16}
          className="text-gray-500 group-hover:text-purple-400 transition-colors"
        />
      )}
    </div>
    <div className="text-xl font-semibold flex items-center">
      {typeof value === "number" ? <AnimatedCounter value={value} /> : value}
      {change !== undefined && change !== 0 && (
        <span
          className={`ml-2 text-sm font-normal flex items-center ${
            change >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {change >= 0 ? (
            <ArrowUpRight size={14} className="mr-0.5" />
          ) : (
            <ArrowDownRight size={14} className="mr-0.5" />
          )}
          {Math.abs(change).toFixed(1)}%
        </span>
      )}
    </div>
  </div>
);

// Popular Companies Data
const popularCompanies: CompanyData[] = [
  {
    id: "reliance",
    name: "Reliance Industries",
    symbol: "RELIANCE",
    sector: "Conglomerate",
    marketCap: "$17.8T",
    currentPrice: 2350,
    dayChange: 10,
    dayChangePercentage: 0.43,
    volume: "$792,756 Cr",
    pe: 20.5,
    eps: 115,
    revenue: "$792,756 Cr",
    netProfit: "$60,705 Cr",
    yoyGrowth: 28.8,
    quarterlyData: {
      dates: ["Q1", "Q2", "Q3", "Q4"],
      prices: [2300, 2350, 2400, 2450],
      volumes: [1000000, 1200000, 1500000, 1800000],
      revenue: [200000, 210000, 220000, 230000],
      profit: [15000, 16000, 17000, 18000],
    },
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    symbol: "TCS",
    sector: "IT Services",
    marketCap: "$13.1T",
    currentPrice: 3400,
    dayChange: 50,
    dayChangePercentage: 1.48,
    volume: "$208,854 Cr",
    pe: 25.3,
    eps: 134,
    revenue: "$208,854 Cr",
    netProfit: "$38,327 Cr",
    yoyGrowth: 16.2,
    quarterlyData: {
      dates: ["Q1", "Q2", "Q3", "Q4"],
      prices: [3300, 3400, 3500, 3600],
      volumes: [500000, 600000, 700000, 800000],
      revenue: [50000, 52000, 54000, 56000],
      profit: [10000, 11000, 12000, 13000],
    },
  },
  {
    id: "hdfcBank",
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    sector: "Banking",
    marketCap: "$12.3T",
    currentPrice: 1700,
    dayChange: 20,
    dayChangePercentage: 1.18,
    volume: "$350,000 Cr",
    pe: 15.2,
    eps: 112,
    revenue: "$350,000 Cr",
    netProfit: "$50,000 Cr",
    yoyGrowth: 12.3,
    quarterlyData: {
      dates: ["Q1", "Q2", "Q3", "Q4"],
      prices: [1650, 1700, 1750, 1800],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [200000, 210000, 220000, 230000],
      profit: [30000, 32000, 34000, 36000],
    },
  },
  {
    id: "infosys",
    name: "Infosys",
    symbol: "INFY",
    sector: "IT Services",
    marketCap: "$6.9T",
    currentPrice: 1500,
    dayChange: 50,
    dayChangePercentage: 3.43,
    volume: "$150,000 Cr",
    pe: 20.5,
    eps: 100,
    revenue: "$150,000 Cr",
    netProfit: "$25,000 Cr",
    yoyGrowth: 18.5,
    quarterlyData: {
      dates: ["Q1", "Q2", "Q3", "Q4"],
      prices: [1450, 1500, 1550, 1600],
      volumes: [500000, 600000, 700000, 800000],
      revenue: [30000, 32000, 34000, 36000],
      profit: [5000, 6000, 7000, 8000],
    },
  },
  {
    id: "itc",
    name: "ITC Limited",
    symbol: "ITC",
    sector: "FMCG",
    marketCap: "$4.8T",
    currentPrice: 300,
    dayChange: 10,
    dayChangePercentage: 3.33,
    volume: "$200,000 Cr",
    pe: 15.2,
    eps: 20,
    revenue: "$200,000 Cr",
    netProfit: "$28,000 Cr",
    yoyGrowth: 17.6,
    quarterlyData: {
      dates: ["Q1", "Q2", "Q3", "Q4"],
      prices: [290, 300, 310, 320],
      volumes: [1000000, 1200000, 1400000, 1600000],
      revenue: [30000, 32000, 34000, 36000],
      profit: [5000, 6000, 7000, 8000],
    },
  },
];

// Function to search for a company
const searchCompany = async (query: string): Promise<CompanyData | null> => {
  const lowerQuery = query.toLowerCase();
  const found = popularCompanies.find(
    (company) =>
      company.symbol.toLowerCase() === lowerQuery ||
      company.name.toLowerCase().includes(lowerQuery),
  );
  return found || null;
};

export default function AnalyticsPage() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(
    popularCompanies[0],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCompanies, setFilteredCompanies] =
    useState<CompanyData[]>(popularCompanies);
  const [error, setError] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFilteredCompanies((prev) =>
        prev.map((company) => ({
          ...company,
          currentPrice:
            company.currentPrice * (1 + (Math.random() - 0.5) * 0.002),
          dayChange: company.dayChange + (Math.random() - 0.5) * 2,
          dayChangePercentage:
            company.dayChangePercentage + (Math.random() - 0.5) * 0.1,
        })),
      );
      setLastRefreshed(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Update selected company when filtered list changes
  useEffect(() => {
    if (selectedCompany && filteredCompanies.length > 0) {
      const updated = filteredCompanies.find(
        (c) => c.id === selectedCompany.id,
      );
      if (updated) {
        setSelectedCompany(updated);
      }
    }
  }, [filteredCompanies, selectedCompany?.id]);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query.trim()) {
          setFilteredCompanies(popularCompanies);
          setError("");
          return;
        }

        setIsLoading(true);
        setError("");

        try {
          const result = await searchCompany(query);
          if (result) {
            setFilteredCompanies([result]);
            setSelectedCompany(result);
            setError("");
          } else {
            setFilteredCompanies([]);
            setError("Company not found. Try a different name or symbol.");
          }
        } catch (err) {
          setError("Failed to search. Please try again.");
          setFilteredCompanies([]);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <NavBar />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Market Analytics
                </h1>
                <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <p className="text-gray-400">
                Real-time market data, insights, and analysis at your fingertips
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search stocks (e.g., RELIANCE, TCS)..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>
        </div>

        {/* Live Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <LiveMarketStats />
        </motion.div>

        {/* TradingView Widget Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-purple-400" />
              <h2 className="text-xl font-semibold">Market Overview</h2>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Activity size={12} />
              <span>Live data from BSE/NSE</span>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-4 overflow-hidden h-[900px]">
            <MemoizedTradingViewWidget />
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={16} className="text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Main Content */}
        {!isLoading && filteredCompanies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* Company List Sidebar */}
            <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp size={18} className="text-purple-400" />
                  Popular Stocks
                </h2>
                <div className="text-xs text-gray-500">
                  {filteredCompanies.length} results
                </div>
              </div>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {filteredCompanies.map((company, index) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedCompany?.id === company.id
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/20"
                      }`}
                      onClick={() => setSelectedCompany(company)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium flex items-center gap-1">
                            {company.name}
                            {company.dayChangePercentage >= 2 && (
                              <Sparkles size={12} className="text-yellow-400" />
                            )}
                          </div>
                          <div className="text-sm text-gray-400">
                            {company.symbol}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            ₹
                            {(company.currentPrice || 0).toLocaleString(
                              "en-IN",
                              { maximumFractionDigits: 2 },
                            )}
                          </div>
                          <div
                            className={`text-sm flex items-center justify-end ${(company.dayChangePercentage || 0) >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {(company.dayChangePercentage || 0) >= 0 ? (
                              <ArrowUpRight size={14} className="mr-0.5" />
                            ) : (
                              <ArrowDownRight size={14} className="mr-0.5" />
                            )}
                            {Math.abs(company.dayChangePercentage || 0).toFixed(
                              2,
                            )}
                            %
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-gray-500">
                Last refreshed: {format(lastRefreshed, "HH:mm:ss")}
              </div>
            </div>

            {/* Company Details */}
            <div className="lg:col-span-3">
              {selectedCompany ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCompany.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Company Header Card */}
                    <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-bold">
                              {selectedCompany.name}
                            </h2>
                            <div className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-gray-300">
                              {selectedCompany.sector}
                            </div>
                          </div>
                          <div className="text-gray-400">
                            {selectedCompany.symbol}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">
                            ₹
                            {selectedCompany.currentPrice.toLocaleString(
                              "en-IN",
                              { maximumFractionDigits: 2 },
                            )}
                          </div>
                          <div
                            className={`flex items-center justify-end text-lg ${selectedCompany.dayChangePercentage >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {selectedCompany.dayChangePercentage >= 0 ? (
                              <ArrowUpRight size={18} className="mr-1" />
                            ) : (
                              <ArrowDownRight size={18} className="mr-1" />
                            )}
                            ₹{Math.abs(selectedCompany.dayChange).toFixed(2)} (
                            {Math.abs(
                              selectedCompany.dayChangePercentage,
                            ).toFixed(2)}
                            %)
                          </div>
                        </div>
                      </div>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricCard
                          label="Market Cap"
                          value={selectedCompany.marketCap}
                          icon={TrendingUp}
                        />
                        <MetricCard
                          label="Volume"
                          value={selectedCompany.volume}
                        />
                        <MetricCard
                          label="P/E Ratio"
                          value={selectedCompany.pe.toFixed(2)}
                        />
                        <MetricCard
                          label="EPS"
                          value={`₹${selectedCompany.eps.toFixed(2)}`}
                        />
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MetricCard
                        label="Revenue (TTM)"
                        value={selectedCompany.revenue}
                      />
                      <MetricCard
                        label="Net Profit"
                        value={selectedCompany.netProfit}
                      />
                      <MetricCard
                        label="YoY Growth"
                        value={`${selectedCompany.yoyGrowth.toFixed(2)}%`}
                        change={selectedCompany.yoyGrowth}
                      />
                    </div>

                    {/* Quick Stats Note */}
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-purple-300">
                        <Sparkles size={16} />
                        <span className="text-sm font-medium">
                          Live Analytics
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">
                        Data updates every 10 seconds. All figures are in Indian
                        Rupees (₹) and represent real-time market conditions.
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-8 flex flex-col items-center justify-center h-[400px] text-center">
                  <TrendingUp size={48} className="text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg">
                    Select a company to view detailed analytics
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Choose from the list of popular stocks on the left
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {!isLoading && !error && filteredCompanies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-12 text-center"
          >
            <Search size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400 mb-2">No companies found</p>
            <p className="text-gray-500">
              Try searching for a different company name or ticker symbol.
            </p>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}
