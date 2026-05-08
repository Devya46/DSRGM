"use client";

import { useTheme } from "@/context/theme-context";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import IndianStocks from "@/components/indian-stocks";
import { MutualFundsSection } from "@/components/mutual-funds-section";
import { CharterAccountSection } from "@/components/charter-account-section";
import { ThemeWrapper } from "@/components/theme-wrapper";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  Building2,
  Sparkles,
  Users,
  LineChart,
  Award,
  ChevronRight,
  CandlestickChart,
  Activity,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const { theme } = useTheme();

  // For typewriter effect
  const [titleIndex, setTitleIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [titleDone, setTitleDone] = useState(false);
  const [descDone, setDescDone] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [currentMarketTime, setCurrentMarketTime] = useState("");

  const titleText = "DSR GROUP MANDSAUR";
  const descriptionText =
    "Grow Your Wealth with Data-Driven Investment Insights";

  // Update market time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentMarketTime(istTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Show welcome message first
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcomeVisible(true);
    }, 5);

    return () => clearTimeout(timeout);
  }, []);

  // Typewriter effect for title
  useEffect(() => {
    if (welcomeVisible && titleIndex < titleText.length) {
      const timeout = setTimeout(() => {
        setTitleIndex((prev) => prev + 1);
      }, 3);

      return () => clearTimeout(timeout);
    } else if (welcomeVisible) {
      setTitleDone(true);
    }
  }, [titleIndex, titleText.length, welcomeVisible]);

  // Typewriter effect for description
  useEffect(() => {
    if (titleDone && descIndex < descriptionText.length) {
      const timeout = setTimeout(() => {
        setDescIndex((prev) => prev + 1);
      }, 2);

      return () => clearTimeout(timeout);
    } else if (titleDone) {
      setDescDone(true);
    }
  }, [descIndex, descriptionText.length, titleDone]);

  // TradingView Widget mounting
  const [tradingViewLoaded, setTradingViewLoaded] = useState(false);

  useEffect(() => {
    // Clear previous widget container
    const container = document.getElementById("tradingview_advanced_chart");
    if (container) {
      container.innerHTML = "";
    }

    // Create and load script
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "NSE:NIFTY",
      interval: "5",
      timezone: "Asia/Kolkata",
      theme: theme === "light" ? "light" : "dark",
      style: "1",
      locale: "in",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
      container_id: "tradingview_advanced_chart",
      studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies"],
    });

    const widgetDiv = document.querySelector(
      ".tradingview-widget-container__widget",
    );
    if (widgetDiv) {
      widgetDiv.appendChild(script);
      setTradingViewLoaded(true);
    }
  }, [theme]);

  // Features data
  const features = [
    {
      icon: TrendingUp,
      title: "Stock Market Analysis",
      description:
        "Real-time insights and data-driven recommendations for Indian stocks.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Secure Investments",
      description:
        "Your financial security is our top priority with best-in-class practices.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: BarChart3,
      title: "Portfolio Management",
      description:
        "Expertly managed portfolios tailored to your risk appetite.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Building2,
      title: "Wealth Advisory",
      description:
        "Strategic planning for long-term wealth creation and preservation.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  // Stats data
  const stats = [
    { value: "500+", label: "Active Investors", icon: Users },
    { value: "₹500Cr+", label: "Assets Managed", icon: LineChart },
    { value: "15+", label: "Years of Excellence", icon: Award },
    { value: "24/7", label: "Real-time Data", icon: Sparkles },
  ];

  // Ticker data with symbols
  const tickerItems = [
    {
      symbol: "NIFTY 50",
      symbolCode: "NIFTY",
      price: "22,124.15",
      change: "+0.85%",
      changeType: "up",
    },
    {
      symbol: "SENSEX",
      symbolCode: "SENSEX",
      price: "72,987.32",
      change: "-0.12%",
      changeType: "down",
    },
    {
      symbol: "BANK NIFTY",
      symbolCode: "BANKNIFTY",
      price: "48,567.80",
      change: "+1.25%",
      changeType: "up",
    },
    {
      symbol: "RELIANCE",
      symbolCode: "RELIANCE",
      price: "₹2,845.60",
      change: "+2.35%",
      changeType: "up",
    },
    {
      symbol: "HDFC BANK",
      symbolCode: "HDFCBANK",
      price: "₹1,678.90",
      change: "-0.45%",
      changeType: "down",
    },
    {
      symbol: "INFOSYS",
      symbolCode: "INFY",
      price: "₹1,564.20",
      change: "+1.75%",
      changeType: "up",
    },
    {
      symbol: "HUL",
      symbolCode: "HINDUNILVR",
      price: "₹2,345.75",
      change: "+0.92%",
      changeType: "up",
    },
    {
      symbol: "ITC",
      symbolCode: "ITC",
      price: "₹425.30",
      change: "-0.33%",
      changeType: "down",
    },
    {
      symbol: "TCS",
      symbolCode: "TCS",
      price: "₹3,890.45",
      change: "+0.67%",
      changeType: "up",
    },
    {
      symbol: "WIPRO",
      symbolCode: "WIPRO",
      price: "₹462.15",
      change: "-0.28%",
      changeType: "down",
    },
  ];

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20" : "bg-black"}`}
    >
      <NavBar />

      {/* Hero Section with Background Image - Enhanced for light theme */}
      <div className="relative w-full overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop')`,
            }}
          />
          {/* Enhanced overlays for better theme contrast */}
          <div
            className={`absolute inset-0 ${
              theme === "light"
                ? "bg-gradient-to-br from-white/85 via-white/75 to-indigo-50/80"
                : "bg-gradient-to-br from-black/60 via-black/50 to-black/60"
            }`}
          />
          {/* Additional gradient overlay for light theme vibrancy */}
          {theme === "light" && (
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-100/30 to-transparent" />
          )}
        </div>

        {/* Hero Content */}
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ThemeWrapper className="py-16 md:py-20 text-center rounded-2xl my-8 backdrop-blur-sm bg-opacity-30">
            {/* Welcome message with fade-in effect - Enhanced for light theme */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: welcomeVisible ? 1 : 0,
                y: welcomeVisible ? 0 : -20,
              }}
              transition={{ duration: 0.7 }}
              className={`text-lg md:text-xl font-medium mb-4 tracking-wide ${
                theme === "light"
                  ? "text-indigo-700 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold"
                  : "text-gray-200"
              }`}
            >
              WELCOME TO
            </motion.h2>

            {/* DSR GROUP MANDSAUR with gradient animation */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                {titleText.substring(0, titleIndex)}
                {titleIndex < titleText.length && (
                  <span
                    className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100 text-gray-400`}
                  >
                    |
                  </span>
                )}
              </span>
            </h1>

            {/* Description Text - Enhanced for light theme */}
            <div className="mb-6">
              <p
                className={`text-2xl md:text-3xl font-semibold max-w-3xl mx-auto ${
                  theme === "light"
                    ? "text-gray-800 drop-shadow-sm"
                    : "text-white"
                }`}
              >
                {descriptionText.substring(0, descIndex)}
                {titleDone && descIndex < descriptionText.length && (
                  <span
                    className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
                  >
                    |
                  </span>
                )}
              </p>
            </div>

            {/* Subtext with stats badges - Enhanced for light theme */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: descDone ? 1 : 0, y: descDone ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-12"
            >
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                  theme === "light"
                    ? "bg-white/80 text-indigo-700 shadow-sm border border-indigo-200"
                    : "bg-blue-900/50 text-blue-300 backdrop-blur-sm"
                }`}
              >
                <Users className="w-4 h-4" />
                Trusted by 500+ investors
              </span>
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                  theme === "light"
                    ? "bg-white/80 text-purple-700 shadow-sm border border-purple-200"
                    : "bg-purple-900/50 text-purple-300 backdrop-blur-sm"
                }`}
              >
                <LineChart className="w-4 h-4" />
                Real-time market data
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: descDone ? 1 : 0,
                y: descDone ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0px 0px 0px rgba(59,130,246,0)",
                      "0px 0px 20px rgba(59,130,246,0.5)",
                      "0px 0px 0px rgba(59,130,246,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Who We Are</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute inset-0 overflow-hidden rounded-lg">
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/20 transition-transform duration-700 ease-in-out" />
                  </span>
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0px 0px 0px rgba(147,51,234,0)",
                      "0px 0px 20px rgba(147,51,234,0.5)",
                      "0px 0px 0px rgba(147,51,234,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                  }}
                  className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Get In Touch</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 2,
                        delay: 0.2,
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute inset-0 overflow-hidden rounded-lg">
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/20 transition-transform duration-700 ease-in-out" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </ThemeWrapper>
        </main>
      </div>

      {/* Ticker Section - With symbols and pause on hover */}
      <div className="w-full overflow-hidden border-y border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-950/10 dark:to-purple-950/10">
        <div className="relative flex overflow-x-hidden py-3 group/ticker">
          <div className="animate-marquee whitespace-nowrap flex group-hover/ticker:pause-animation">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 px-4">
                {tickerItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    {/* Symbol Code Badge */}
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        {item.symbolCode}
                      </span>
                      <span className="text-sm font-bold text-gray-800 dark:text-white">
                        {item.symbol}
                      </span>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>

                    {/* Price */}
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {item.price}
                    </span>

                    {/* Change with icon */}
                    <div
                      className={`flex items-center gap-1 ${item.changeType === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {item.changeType === "up" ? (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                      <span className="text-sm font-semibold">
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Data Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24 pb-16">
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                      theme === "light"
                        ? "bg-white/80 backdrop-blur-sm shadow-lg border border-white/50"
                        : "bg-gray-900/80 backdrop-blur-sm shadow-xl"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${index === 0 ? "from-emerald-500 to-teal-500" : index === 1 ? "from-blue-500 to-indigo-500" : index === 2 ? "from-purple-500 to-pink-500" : "from-orange-500 to-red-500"} flex items-center justify-center mx-auto mb-3`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`text-2xl md:text-3xl font-bold ${
                        theme === "light" ? "text-gray-800" : "text-white"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={
                        theme === "light"
                          ? "text-gray-600 text-sm"
                          : "text-gray-400 text-sm"
                      }
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-8"
          >
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-4 ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Why Choose{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  DSR Group
                </span>
              </h2>
              <p
                className={`text-lg ${theme === "light" ? "text-gray-600" : "text-gray-400"} max-w-2xl mx-auto`}
              >
                Comprehensive financial solutions backed by decades of expertise
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className={`group p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                      theme === "light"
                        ? "bg-white shadow-lg hover:shadow-xl border border-gray-100"
                        : "bg-gray-900 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        theme === "light" ? "text-gray-800" : "text-white"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }
                    >
                      {feature.description}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight
                        className={`w-5 h-5 ${feature.gradient.split(" ")[1] === "to-teal-500" ? "text-teal-500" : feature.gradient.split(" ")[1] === "to-indigo-500" ? "text-indigo-500" : feature.gradient.split(" ")[1] === "to-pink-500" ? "text-pink-500" : "text-red-500"}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Live Trading Chart Section - After Features, Before Indian Stocks */}
          {/* <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`rounded-2xl p-6 md:p-8 ${
              theme === "light"
                ? "bg-gradient-to-br from-white via-white to-indigo-50/30 shadow-xl border border-indigo-100"
                : "bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 shadow-xl shadow-gray-800/30 border border-gray-800"
            }`}
          >
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20">
                    <CandlestickChart className="w-5 h-5 text-white" />
                  </div>
                  <h2
                    className={`text-2xl md:text-3xl font-bold tracking-tight ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    Live Market Intelligence
                  </h2>
                </div>
                <p
                  className={`text-base max-w-2xl ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  Real-time price action and technical analysis for NSE & BSE
                  listed stocks
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Feed
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm">
                    <Activity className="w-3 h-3" />
                    NSE | BSE
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Market Time: {currentMarketTime} IST</span>
                </div>
              </div>
            </div>

            
            <div className="rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
              <div
                className="tradingview-widget-container"
                style={{ height: "550px", width: "100%" }}
              >
                <div
                  id="tradingview_advanced_chart"
                  className="tradingview-widget-container__widget"
                  style={{ height: "calc(100% - 32px)", width: "100%" }}
                ></div>
                <div className="text-xs text-center text-gray-400 dark:text-gray-500 mt-3">
                  <a
                    href="https://www.tradingview.com/symbols/NSE-NIFTY/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-emerald-500 transition-colors duration-200"
                  >
                    Explore NIFTY 50 Chart
                  </a>
                  {" • "}
                  <a
                    href="https://www.tradingview.com/symbols/NSE-SENSEX/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-emerald-500 transition-colors duration-200"
                  >
                    SENSEX
                  </a>
                  {" • Powered by TradingView"}
                </div>
              </div>
            </div>

            
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"}`}
              >
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                NIFTY 50
              </div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"}`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                SENSEX
              </div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"}`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                BANK NIFTY
              </div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"}`}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                FIN NIFTY
              </div>
            </div>
          </motion.section> */}

          {/* Section 1: Top Indian Stocks */}
          <IndianStocks />

          {/* Section 2: Mutual Funds */}
          <div id="mutual-funds">
            <MutualFundsSection />
          </div>

          {/* Section 3: Charter Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`rounded-2xl overflow-hidden ${
              theme === "light"
                ? "bg-white shadow-lg"
                : "bg-gray-900 shadow-xl shadow-gray-800/30"
            }`}
          >
            <CharterAccountSection />
          </motion.div>
        </div>
      </div>
      <Footer />

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        /* TradingView widget container styling */
        .tradingview-widget-container iframe {
          border-radius: 0.75rem;
        }

        /* Marquee animation for ticker */
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        /* Pause animation on hover */
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
