"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/theme-context";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import {
  ChevronRight,
  CheckCircle,
  BarChart4,
  TrendingUp,
  Award,
  Clock,
  Shield,
  Zap,
  Sparkles,
  ArrowUpRight,
  Eye,
  FileCheck,
  Users,
  Building2,
  LineChart,
  Bell,
  Rocket,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function IPOPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const upcomingIPOs = [
    {
      name: "TechNova Solutions",
      date: "Dec 15-18, 2024",
      priceBand: "₹1,450 - ₹1,520",
      lotSize: "10 Shares",
      type: "Mainboard",
    },
    {
      name: "GreenEnergy Ltd",
      date: "Jan 5-8, 2025",
      priceBand: "₹780 - ₹820",
      lotSize: "15 Shares",
      type: "SME",
    },
    {
      name: "FinTech Global",
      date: "Jan 20-22, 2025",
      priceBand: "₹2,100 - ₹2,200",
      lotSize: "6 Shares",
      type: "Mainboard",
    },
  ];

  const liveIPOs = [
    {
      name: "MediLife Pharma",
      subscription: "3.2x",
      priceBand: "₹450 - ₹475",
      closeDate: "Dec 12, 2024",
    },
    {
      name: "LogiChain Corp",
      subscription: "1.8x",
      priceBand: "₹620 - ₹650",
      closeDate: "Dec 13, 2024",
    },
  ];

  return React.createElement(
    "div",
    {
      className: `min-h-screen ${
        theme === "light"
          ? "bg-gradient-to-br from-white via-gray-50 to-purple-50/30 text-gray-800"
          : "bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-gray-200"
      }`,
    },
    React.createElement(NavBar, null),

    // Hero Section
    React.createElement(
      "section",
      { className: "relative overflow-hidden pt-24 pb-20 px-4" },
      React.createElement(
        "div",
        { className: "absolute inset-0 overflow-hidden" },
        React.createElement("div", {
          className: `absolute -top-40 -right-40 w-80 h-80 rounded-full ${
            theme === "light"
              ? "bg-purple-200/40 blur-3xl"
              : "bg-purple-600/10 blur-3xl"
          } animate-pulse`,
        }),
        React.createElement("div", {
          className: `absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
            theme === "light"
              ? "bg-indigo-200/40 blur-3xl"
              : "bg-indigo-600/10 blur-3xl"
          } animate-pulse delay-1000`,
        }),
      ),
      React.createElement(
        "div",
        { className: "container mx-auto relative z-10" },
        React.createElement(
          "div",
          { className: "max-w-4xl mx-auto text-center" },
          React.createElement(
            "div",
            {
              className: `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                theme === "light"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-purple-900/50 text-purple-300 backdrop-blur-sm"
              }`,
            },
            React.createElement(Sparkles, { size: 16 }),
            React.createElement(
              "span",
              null,
              "Now Invest In IPOs With Zero Commission",
            ),
          ),
          React.createElement(
            "h1",
            {
              className: `text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`,
            },
            "Invest In ",
            React.createElement(
              "span",
              {
                className: `bg-gradient-to-r ${
                  theme === "light"
                    ? "from-purple-600 to-indigo-600"
                    : "from-purple-400 to-indigo-400"
                } bg-clip-text text-transparent`,
              },
              "IPOs",
            ),
            " Seamlessly",
          ),
          React.createElement(
            "p",
            {
              className:
                "text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed",
            },
            "Be Part Of India's Growth Story. Apply For Upcoming IPOs With Just A Few Clicks And Track Your Investments In Real-Time.",
          ),
          React.createElement(
            "div",
            { className: "flex flex-col sm:flex-row justify-center gap-4" },
            React.createElement(
              Link,
              {
                href: "/open-demat-account",
                className:
                  "group relative overflow-hidden px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105",
              },
              React.createElement(
                "span",
                {
                  className:
                    "relative z-10 flex items-center justify-center gap-2",
                },
                "Open Free Demat Account",
                React.createElement(ArrowUpRight, {
                  size: 18,
                  className:
                    "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform",
                }),
              ),
              React.createElement("div", {
                className:
                  "absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              }),
            ),
            React.createElement(
              Link,
              {
                href: "#how-it-works",
                className: `px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  theme === "light"
                    ? "bg-white text-purple-600 hover:bg-gray-50 border-2 border-purple-200 hover:border-purple-300"
                    : "bg-gray-800/80 backdrop-blur-sm text-purple-400 hover:bg-gray-700/80 border border-gray-700"
                }`,
              },
              "Learn How It Works",
              React.createElement(ChevronRight, { size: 18 }),
            ),
          ),
          React.createElement(
            "div",
            {
              className:
                "grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-gray-200 dark:border-gray-800",
            },
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                {
                  className:
                    "text-3xl font-bold text-purple-600 dark:text-purple-400",
                },
                "150+",
              ),
              React.createElement(
                "div",
                { className: "text-sm text-gray-500 dark:text-gray-400" },
                "IPOs Analyzed",
              ),
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                {
                  className:
                    "text-3xl font-bold text-purple-600 dark:text-purple-400",
                },
                "₹50K Cr+",
              ),
              React.createElement(
                "div",
                { className: "text-sm text-gray-500 dark:text-gray-400" },
                "Total Applications",
              ),
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                {
                  className:
                    "text-3xl font-bold text-purple-600 dark:text-purple-400",
                },
                "2M+",
              ),
              React.createElement(
                "div",
                { className: "text-sm text-gray-500 dark:text-gray-400" },
                "Happy Investors",
              ),
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                {
                  className:
                    "text-3xl font-bold text-purple-600 dark:text-purple-400",
                },
                "99.9%",
              ),
              React.createElement(
                "div",
                { className: "text-sm text-gray-500 dark:text-gray-400" },
                "UPI Success Rate",
              ),
            ),
          ),
        ),
      ),
    ),

    // Live Ticker From TradingView (Not Chart)
    // mounted &&
    //   React.createElement(
    //     "div",
    //     {
    //       className:
    //         "py-3 px-4 border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30",
    //     },
    //     React.createElement(
    //       "div",
    //       { className: "container mx-auto" },
    //       React.createElement(
    //         "div",
    //         { className: "w-full rounded-lg overflow-hidden" },
    //         React.createElement("iframe", {
    //           src:
    //             "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_ticker&symbol=NSE%3ANIFTY&symbol=NSE%3ABANKNIFTY&symbol=BSE%3ASENSEX&symbol=NSE%3ANIFTYIT&symbol=NSE%3AMIDCPNIFTY&symbol=NSE%3AFINNIFTY&theme=" +
    //             (theme === "light" ? "light" : "dark") +
    //             "&symbol_color=089981&transparent=true&locale=in",
    //           style: { width: "100%", height: "48px", border: "none" },
    //           title: "Live Market Ticker",
    //         }),
    //       ),
    //     ),
    //   ),

    // Live & Upcoming IPOs Section
    React.createElement(
      "section",
      { className: "py-20 px-4" },
      React.createElement(
        "div",
        { className: "container mx-auto" },
        React.createElement(
          "div",
          { className: "text-center mb-12" },
          React.createElement(
            "h2",
            {
              className: `text-3xl md:text-4xl font-bold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`,
            },
            "Live & Upcoming ",
            React.createElement(
              "span",
              { className: "text-purple-600 dark:text-purple-400" },
              "IPOs",
            ),
          ),
          React.createElement(
            "p",
            { className: "text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" },
            "Get Real-Time Updates On Ongoing And Upcoming IPOs. Apply Directly Through Your Demat Account.",
          ),
        ),
        React.createElement(
          "div",
          { className: "mb-12" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2 mb-6" },
            React.createElement("div", {
              className: "w-2 h-2 rounded-full bg-green-500 animate-pulse",
            }),
            React.createElement(
              "h3",
              { className: "text-xl font-semibold" },
              "Live IPOs",
            ),
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
            liveIPOs.map((ipo, index) =>
              React.createElement(
                "div",
                {
                  key: index,
                  className: `relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                    theme === "light"
                      ? "bg-white border border-gray-200 shadow-lg shadow-purple-100/50"
                      : "bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-xl"
                  }`,
                },
                React.createElement("div", {
                  className:
                    "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-2xl",
                }),
                React.createElement(
                  "div",
                  { className: "flex justify-between items-start mb-4" },
                  React.createElement(
                    "h4",
                    { className: "text-xl font-bold" },
                    ipo.name,
                  ),
                  React.createElement(
                    "span",
                    {
                      className:
                        "px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400",
                    },
                    "LIVE",
                  ),
                ),
                React.createElement(
                  "div",
                  { className: "grid grid-cols-2 gap-4 mb-6" },
                  React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-500 dark:text-gray-400" },
                      "Subscription",
                    ),
                    React.createElement(
                      "p",
                      {
                        className:
                          "text-2xl font-bold text-green-600 dark:text-green-400",
                      },
                      ipo.subscription,
                    ),
                  ),
                  React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "p",
                      { className: "text-sm text-gray-500 dark:text-gray-400" },
                      "Price Band",
                    ),
                    React.createElement(
                      "p",
                      { className: "font-semibold" },
                      ipo.priceBand,
                    ),
                  ),
                ),
                React.createElement(
                  "div",
                  { className: "flex justify-between items-center" },
                  React.createElement(
                    "p",
                    { className: "text-sm text-gray-500" },
                    "Closes: ",
                    ipo.closeDate,
                  ),
                  React.createElement(
                    "button",
                    {
                      className:
                        "px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors",
                    },
                    "Apply Now",
                  ),
                ),
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "flex items-center gap-2 mb-6" },
            React.createElement(Clock, {
              size: 18,
              className: "text-purple-500",
            }),
            React.createElement(
              "h3",
              { className: "text-xl font-semibold" },
              "Upcoming IPOs",
            ),
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-1 md:grid-cols-3 gap-6" },
            upcomingIPOs.map((ipo, index) =>
              React.createElement(
                "div",
                {
                  key: index,
                  className: `rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                    theme === "light"
                      ? "bg-white border border-gray-200 shadow-md hover:shadow-xl"
                      : "bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:shadow-lg hover:shadow-purple-900/20"
                  }`,
                },
                React.createElement(
                  "div",
                  { className: "flex justify-between items-start mb-3" },
                  React.createElement(
                    "h4",
                    { className: "text-lg font-bold" },
                    ipo.name,
                  ),
                  React.createElement(
                    "span",
                    {
                      className: `text-xs px-2 py-1 rounded ${
                        ipo.type === "Mainboard"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                      }`,
                    },
                    ipo.type,
                  ),
                ),
                React.createElement(
                  "div",
                  { className: "space-y-2 mb-4" },
                  React.createElement(
                    "div",
                    { className: "flex justify-between" },
                    React.createElement(
                      "span",
                      { className: "text-sm text-gray-500" },
                      "Price Band",
                    ),
                    React.createElement(
                      "span",
                      { className: "font-medium" },
                      ipo.priceBand,
                    ),
                  ),
                  React.createElement(
                    "div",
                    { className: "flex justify-between" },
                    React.createElement(
                      "span",
                      { className: "text-sm text-gray-500" },
                      "Lot Size",
                    ),
                    React.createElement(
                      "span",
                      { className: "font-medium" },
                      ipo.lotSize,
                    ),
                  ),
                  React.createElement(
                    "div",
                    { className: "flex justify-between" },
                    React.createElement(
                      "span",
                      { className: "text-sm text-gray-500" },
                      "Open Date",
                    ),
                    React.createElement(
                      "span",
                      { className: "font-medium" },
                      ipo.date,
                    ),
                  ),
                ),
                React.createElement(
                  "button",
                  {
                    className: `w-full mt-2 py-2 rounded-lg font-medium transition-all ${
                      theme === "light"
                        ? "bg-gray-100 text-purple-600 hover:bg-gray-200"
                        : "bg-gray-700 text-purple-400 hover:bg-gray-600"
                    }`,
                  },
                  "Get Notification",
                ),
              ),
            ),
          ),
        ),
      ),
    ),

    // Live IPO Performance From TradingView
    // mounted &&
    //   React.createElement(
    //     "section",
    //     { className: "py-12 px-4" },
    //     React.createElement(
    //       "div",
    //       { className: "container mx-auto" },
    //       React.createElement(
    //         "div",
    //         {
    //           className: `rounded-2xl overflow-hidden ${
    //             theme === "light"
    //               ? "bg-white shadow-lg"
    //               : "bg-gray-800/50 backdrop-blur-sm"
    //           } p-6`,
    //         },
    //         React.createElement(
    //           "div",
    //           {
    //             className:
    //               "flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700",
    //           },
    //           React.createElement(TrendingUp, {
    //             size: 24,
    //             className: "text-purple-600 dark:text-purple-400",
    //           }),
    //           React.createElement(
    //             "h3",
    //             { className: "text-xl font-semibold" },
    //             "Live IPO Performance & Market Overview",
    //           ),
    //         ),
    //         React.createElement(
    //           "div",
    //           { className: "h-[500px] w-full" },
    //           React.createElement("iframe", {
    //             src: "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_market_overview&symbol=NSE%3ANIFTY&symbol=NSE%3ABANKNIFTY&symbol=NSE%3ANIFTYIT&symbol=NSE%3AMIDCPNIFTY&symbol=NSE%3AFINNIFTY&locale=in&trending&width=100%&height=500",
    //             style: { width: "100%", height: "100%", border: "none" },
    //             title: "Live IPO Performance",
    //           }),
    //         ),
    //       ),
    //     ),
    //   ),

    // What Is IPO Section
    React.createElement(
      "section",
      { className: "py-20 px-4" },
      React.createElement(
        "div",
        { className: "container mx-auto" },
        React.createElement(
          "div",
          { className: "max-w-3xl mx-auto" },
          React.createElement(
            "h2",
            {
              className: `text-3xl md:text-4xl font-bold mb-6 text-center ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`,
            },
            "What Is An Initial Public Offering?",
          ),
          React.createElement(
            "p",
            { className: "mb-6 text-lg leading-relaxed text-center" },
            "An Initial Public Offering (IPO) Marks The Transition Of A Company From Private To Public, Offering Shares To Investors For The First Time.",
          ),
          React.createElement(
            "div",
            {
              className: `p-8 rounded-2xl mt-8 border-2 ${
                theme === "light"
                  ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"
                  : "bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-purple-800/30"
              }`,
            },
            React.createElement(
              "h3",
              {
                className: `text-xl font-semibold mb-4 flex items-center gap-2 ${
                  theme === "light" ? "text-purple-700" : "text-purple-400"
                }`,
              },
              React.createElement(FileCheck, { size: 20 }),
              "Key IPO Terms To Know",
            ),
            React.createElement(
              "div",
              { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
              [
                { term: "Issue Price", desc: "Share offer price to public" },
                { term: "Lot Size", desc: "Minimum shares to apply for" },
                { term: "Price Band", desc: "Bidding price range" },
                { term: "Listing Gain", desc: "IPO vs listing price profit" },
                {
                  term: "Grey Market Premium",
                  desc: "Unofficial trading premium",
                },
                { term: "Cut-Off Price", desc: "Final issue price decided" },
              ].map((item, idx) =>
                React.createElement(
                  "div",
                  { key: idx, className: "flex items-center gap-3" },
                  React.createElement("div", {
                    className: "w-1.5 h-1.5 rounded-full bg-purple-500",
                  }),
                  React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "span",
                      { className: "font-semibold" },
                      item.term,
                      ":",
                    ),
                    React.createElement(
                      "span",
                      {
                        className:
                          "text-sm ml-2 text-gray-600 dark:text-gray-400",
                      },
                      item.desc,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),

    // How IPO Investing Works
    React.createElement(
      "section",
      {
        id: "how-it-works",
        className: `py-20 px-4 ${theme === "light" ? "bg-gray-50" : "bg-gray-900/50"}`,
      },
      React.createElement(
        "div",
        { className: "container mx-auto" },
        React.createElement(
          "div",
          { className: "text-center mb-12" },
          React.createElement(
            "h2",
            {
              className: `text-3xl md:text-4xl font-bold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`,
            },
            "How IPO Investing Works",
          ),
          React.createElement(
            "p",
            { className: "text-gray-600 dark:text-gray-400" },
            "Simple 5-Step Process To Invest In IPOs With DSR Group",
          ),
        ),
        React.createElement(
          "div",
          { className: "max-w-4xl mx-auto" },
          React.createElement(
            "div",
            { className: "relative" },
            React.createElement("div", {
              className: `absolute left-6 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 ${
                theme === "light" ? "bg-purple-200" : "bg-purple-800"
              }`,
            }),
            [
              {
                title: "Open Demat Account",
                description:
                  "Get A Free Demat & Trading Account With DSR Group In Minutes. Complete KYC Online.",
                icon: React.createElement(Users, { size: 24 }),
              },
              {
                title: "Check Upcoming IPOs",
                description:
                  "Browse Through Our Curated List Of IPOs With Detailed Research Reports And Expert Analysis.",
                icon: React.createElement(Eye, { size: 24 }),
              },
              {
                title: "Apply Online",
                description:
                  "Select The IPO, Enter Bid Details, And Apply Directly Through UPI In Just A Few Clicks.",
                icon: React.createElement(Zap, { size: 24 }),
              },
              {
                title: "Track Allotment",
                description:
                  "Get Real-Time Updates On Your Application Status And Allotment Confirmation Via SMS/Email.",
                icon: React.createElement(Bell, { size: 24 }),
              },
              {
                title: "Start Trading",
                description:
                  "Once Listed, Manage Your IPO Shares Directly From Your Demat Account And Trade Seamlessly.",
                icon: React.createElement(LineChart, { size: 24 }),
              },
            ].map((step, index) =>
              React.createElement(
                "div",
                {
                  key: index,
                  className: `relative flex flex-col md:flex-row items-start md:items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`,
                },
                React.createElement(
                  "div",
                  { className: "flex-1 md:w-1/2" },
                  React.createElement(
                    "div",
                    {
                      className: `p-6 rounded-2xl ${
                        theme === "light"
                          ? "bg-white shadow-md border border-gray-100"
                          : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                      }`,
                    },
                    React.createElement(
                      "div",
                      { className: "flex items-center gap-3 mb-3" },
                      React.createElement(
                        "div",
                        {
                          className: `w-10 h-10 rounded-xl flex items-center justify-center ${
                            theme === "light"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-purple-900/50 text-purple-400"
                          }`,
                        },
                        step.icon,
                      ),
                      React.createElement(
                        "h3",
                        {
                          className: `text-xl font-bold ${
                            theme === "light" ? "text-gray-900" : "text-white"
                          }`,
                        },
                        step.title,
                      ),
                    ),
                    React.createElement(
                      "p",
                      { className: "text-gray-600 dark:text-gray-400" },
                      step.description,
                    ),
                  ),
                ),
                React.createElement(
                  "div",
                  {
                    className:
                      "absolute left-0 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center z-10 shadow-lg",
                  },
                  index + 1,
                ),
                React.createElement("div", {
                  className: "flex-1 md:w-1/2 hidden md:block",
                }),
              ),
            ),
          ),
        ),
      ),
    ),

    // Why Invest In IPOs
    React.createElement(
      "section",
      { className: "py-20 px-4" },
      React.createElement(
        "div",
        { className: "container mx-auto" },
        React.createElement(
          "div",
          { className: "text-center mb-12" },
          React.createElement(
            "h2",
            {
              className: `text-3xl md:text-4xl font-bold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`,
            },
            "Why Invest In ",
            React.createElement(
              "span",
              { className: "text-purple-600 dark:text-purple-400" },
              "IPOs",
            ),
            "?",
          ),
          React.createElement(
            "p",
            { className: "text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" },
            "Discover The Advantages Of Investing In Initial Public Offerings",
          ),
        ),
        React.createElement(
          "div",
          {
            className:
              "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto",
          },
          [
            {
              icon: React.createElement(TrendingUp, { size: 28 }),
              title: "Growth Potential",
              description:
                "Get In Early On Companies With High Growth Potential Before They Gain Widespread Market Attention.",
              color: "green",
            },
            {
              icon: React.createElement(BarChart4, { size: 28 }),
              title: "Listing Gains",
              description:
                "Potential For Significant Returns If Shares List At A Premium To The Issue Price On Debut Day.",
              color: "blue",
            },
            {
              icon: React.createElement(Shield, { size: 28 }),
              title: "Regulated & Transparent",
              description:
                "SEBI-Regulated Process With Stringent Disclosure Requirements Ensuring Investor Protection.",
              color: "purple",
            },
            {
              icon: React.createElement(Building2, { size: 28 }),
              title: "Own A Piece Of Giants",
              description:
                "Become A Shareholder In Established Companies And Benefit From Their Success Story.",
              color: "orange",
            },
            {
              icon: React.createElement(Award, { size: 28 }),
              title: "Brand Value Appreciation",
              description:
                "Invest In Well-Known Brands And Potentially Benefit From Their Market Reputation Growth.",
              color: "red",
            },
            {
              icon: React.createElement(Users, { size: 28 }),
              title: "Retail Investor Quota",
              description:
                "Special Reservation For Retail Investors Making It Easier To Get Allotment In IPOs.",
              color: "teal",
            },
          ].map((benefit, index) =>
            React.createElement(
              "div",
              {
                key: index,
                className: `group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                  theme === "light"
                    ? "bg-white border border-gray-200 shadow-md hover:shadow-xl"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:shadow-lg hover:shadow-purple-900/20"
                }`,
              },
              React.createElement(
                "div",
                {
                  className: `w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                    theme === "light"
                      ? benefit.color === "green"
                        ? "bg-green-100 text-green-600"
                        : benefit.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : benefit.color === "purple"
                            ? "bg-purple-100 text-purple-600"
                            : benefit.color === "orange"
                              ? "bg-orange-100 text-orange-600"
                              : benefit.color === "red"
                                ? "bg-red-100 text-red-600"
                                : "bg-teal-100 text-teal-600"
                      : benefit.color === "green"
                        ? "bg-green-900/30 text-green-400"
                        : benefit.color === "blue"
                          ? "bg-blue-900/30 text-blue-400"
                          : benefit.color === "purple"
                            ? "bg-purple-900/30 text-purple-400"
                            : benefit.color === "orange"
                              ? "bg-orange-900/30 text-orange-400"
                              : benefit.color === "red"
                                ? "bg-red-900/30 text-red-400"
                                : "bg-teal-900/30 text-teal-400"
                  }`,
                },
                benefit.icon,
              ),
              React.createElement(
                "h3",
                {
                  className: `text-xl font-bold mb-3 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`,
                },
                benefit.title,
              ),
              React.createElement(
                "p",
                {
                  className: "text-gray-600 dark:text-gray-400 leading-relaxed",
                },
                benefit.description,
              ),
            ),
          ),
        ),
      ),
    ),

    // Our IPO Services
    React.createElement(
      "section",
      {
        className: `py-20 px-4 ${theme === "light" ? "bg-gray-50" : "bg-gray-900/50"}`,
      },
      React.createElement(
        "div",
        { className: "container mx-auto" },
        React.createElement(
          "div",
          { className: "text-center mb-12" },
          React.createElement(
            "h2",
            {
              className: `text-3xl md:text-4xl font-bold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`,
            },
            "Our IPO Services",
          ),
          React.createElement(
            "p",
            { className: "text-gray-600 dark:text-gray-400" },
            "Everything You Need For Successful IPO Investing",
          ),
        ),
        React.createElement(
          "div",
          { className: "max-w-5xl mx-auto" },
          React.createElement(
            "div",
            {
              className: `rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                theme === "light"
                  ? "bg-white border border-gray-200 shadow-xl"
                  : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              }`,
            },
            React.createElement(
              "div",
              { className: "grid grid-cols-1 md:grid-cols-2" },
              React.createElement(
                "div",
                { className: "p-8 md:p-10" },
                React.createElement(
                  "h3",
                  {
                    className: `text-2xl font-bold mb-6 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`,
                  },
                  "Seamless IPO Investing",
                ),
                React.createElement(
                  "ul",
                  { className: "space-y-4" },
                  [
                    "Digital IPO Applications Through UPI",
                    "Detailed Research Reports On Upcoming IPOs",
                    "Expert Recommendations And Analysis",
                    "Real-Time IPO Alerts And Notifications",
                    "Post-Listing Performance Tracking",
                    "Zero Application Fees",
                    "Dedicated Support For IPO Queries",
                    "ASBA Facility For Secure Payments",
                  ].map((service, index) =>
                    React.createElement(
                      "li",
                      { key: index, className: "flex items-start group" },
                      React.createElement(
                        "div",
                        {
                          className: `w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-3 transition-transform group-hover:scale-110 ${
                            theme === "light"
                              ? "bg-green-100 text-green-600"
                              : "bg-green-900/50 text-green-400"
                          }`,
                        },
                        React.createElement(CheckCircle, { size: 12 }),
                      ),
                      React.createElement(
                        "span",
                        { className: "text-gray-700 dark:text-gray-300" },
                        service,
                      ),
                    ),
                  ),
                ),
                React.createElement(
                  "div",
                  { className: "mt-8" },
                  React.createElement(
                    Link,
                    {
                      href: "/open-demat-account",
                      className:
                        "inline-flex items-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:gap-3",
                    },
                    "Open Free Demat Account",
                    React.createElement(ArrowUpRight, { size: 18 }),
                  ),
                ),
              ),
              React.createElement(
                "div",
                {
                  className: `hidden md:flex flex-col items-center justify-center p-10 ${
                    theme === "light"
                      ? "bg-gradient-to-br from-purple-50 to-indigo-50"
                      : "bg-gradient-to-br from-purple-900/20 to-indigo-900/20"
                  }`,
                },
                React.createElement(
                  "div",
                  { className: "text-center" },
                  React.createElement(
                    "div",
                    {
                      className:
                        "w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50",
                    },
                    React.createElement(Rocket, {
                      size: 40,
                      className: "text-purple-600 dark:text-purple-400",
                    }),
                  ),
                  React.createElement(
                    "h4",
                    {
                      className:
                        "text-2xl font-bold mb-2 text-gray-900 dark:text-white",
                    },
                    "Start Investing",
                  ),
                  React.createElement(
                    "p",
                    { className: "text-gray-600 dark:text-gray-400 text-sm" },
                    "Open Account In 5 Minutes",
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),

    // Live IPO Performance Tracker Section (Second Live Data Section)
    // mounted &&
    //   React.createElement(
    //     "section",
    //     { className: "py-20 px-4" },
    //     React.createElement(
    //       "div",
    //       { className: "container mx-auto" },
    //       React.createElement(
    //         "div",
    //         { className: "text-center mb-12" },
    //         React.createElement(
    //           "h2",
    //           {
    //             className: `text-3xl md:text-4xl font-bold mb-4 ${
    //               theme === "light" ? "text-gray-900" : "text-white"
    //             }`,
    //           },
    //           "Live IPO Performance Tracker",
    //         ),
    //         React.createElement(
    //           "p",
    //           { className: "text-gray-600 dark:text-gray-400" },
    //           "Track Real-Time Performance Of Recently Listed IPOs",
    //         ),
    //       ),
    //       React.createElement(
    //         "div",
    //         {
    //           className: `rounded-2xl overflow-hidden ${
    //             theme === "light"
    //               ? "bg-white shadow-lg"
    //               : "bg-gray-800/50 backdrop-blur-sm"
    //           } p-4`,
    //         },
    //         React.createElement(
    //           "div",
    //           { className: "h-[400px] w-full" },
    //           React.createElement("iframe", {
    //             src: `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_hotlist&symbol=NSE%3ANIFTY&sort=volume&order=desc&locale=in&theme=${theme === "light" ? "light" : "dark"}`,
    //             style: { width: "100%", height: "100%", border: "none" },
    //             title: "Live IPO Performance Tracker",
    //           }),
    //         ),
    //       ),
    //     ),
    //   ),

    // FAQ Section
    React.createElement(
      "section",
      {
        className: `py-20 px-4 ${theme === "light" ? "bg-gray-50" : "bg-gray-900/50"}`,
      },
      React.createElement(
        "div",
        { className: "container mx-auto" },
        React.createElement(
          "div",
          { className: "text-center mb-12" },
          React.createElement(
            "h2",
            {
              className: `text-3xl md:text-4xl font-bold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`,
            },
            "Frequently Asked Questions",
          ),
          React.createElement(
            "p",
            { className: "text-gray-600 dark:text-gray-400" },
            "Everything You Need To Know About IPO Investing",
          ),
        ),
        React.createElement(
          "div",
          { className: "max-w-3xl mx-auto space-y-4" },
          [
            {
              q: "What Is The Minimum Amount Required To Apply For An IPO?",
              a: "The Minimum Investment Varies By IPO Based On The Lot Size And Price Band. Typically, It Ranges From ₹10,000 To ₹15,000 For Retail Investors.",
            },
            {
              q: "How Can I Apply For An IPO?",
              a: "You Can Apply For IPOs Through Your Demat Account Using UPI Or ASBA Facility. We Provide A Seamless Digital Application Process.",
            },
            {
              q: "What Is The Allotment Process For IPOs?",
              a: "Shares Are Allotted Based On Subscription Levels. If Oversubscribed, Allotment Is Done Through A Lottery System For Retail Investors.",
            },
            {
              q: "What Are Listing Gains?",
              a: "Listing Gains Refer To The Profit You Make If The IPO Lists At A Price Higher Than The Issue Price On The Stock Exchange.",
            },
            {
              q: "Do I Need A Demat Account For IPO Investing?",
              a: "Yes, A Demat Account Is Mandatory For Investing In IPOs As Shares Are Credited In Electronic Form.",
            },
          ].map((faq, idx) =>
            React.createElement(
              "details",
              {
                key: idx,
                className: `group rounded-xl transition-all duration-300 ${
                  theme === "light"
                    ? "bg-white border border-gray-200 shadow-sm hover:shadow-md"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                }`,
              },
              React.createElement(
                "summary",
                {
                  className:
                    "flex cursor-pointer items-center justify-between p-6 font-semibold text-lg",
                },
                faq.q,
                React.createElement(ChevronRight, {
                  className:
                    "h-5 w-5 transition-transform duration-300 group-open:rotate-90",
                }),
              ),
              React.createElement(
                "div",
                {
                  className:
                    "px-6 pb-6 pt-2 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-2",
                },
                faq.a,
              ),
            ),
          ),
        ),
      ),
    ),

    // CTA Section
    React.createElement(
      "section",
      {
        className: `py-20 px-4 relative overflow-hidden ${
          theme === "light"
            ? "bg-gradient-to-r from-purple-600 to-indigo-600"
            : "bg-gradient-to-r from-purple-900 to-indigo-900"
        }`,
      },
      React.createElement("div", {
        className:
          'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-20',
      }),
      React.createElement(
        "div",
        { className: "container mx-auto text-center relative z-10" },
        React.createElement(
          "h2",
          { className: "text-3xl md:text-5xl font-bold mb-6 text-white" },
          "Ready To Invest In The Next Big IPO?",
        ),
        React.createElement(
          "p",
          {
            className:
              "text-lg md:text-xl mb-10 max-w-3xl mx-auto text-purple-100",
          },
          "Open A Free Demat Account Today And Get Access To All Upcoming IPOs With Expert Research And Zero Application Fees.",
        ),
        React.createElement(
          "div",
          { className: "flex flex-col sm:flex-row justify-center gap-4" },
          React.createElement(
            Link,
            {
              href: "/open-demat-account",
              className:
                "py-3.5 px-8 rounded-xl font-semibold transition-all duration-300 bg-white text-purple-700 hover:bg-gray-100 hover:scale-105 shadow-lg",
            },
            "Open Free Demat Account",
          ),
          React.createElement(
            Link,
            {
              href: "/contact",
              className:
                "py-3.5 px-8 rounded-xl font-semibold transition-all duration-300 bg-transparent text-white border-2 border-white/80 hover:bg-white/10 hover:scale-105",
            },
            "Talk To An Expert",
          ),
        ),
      ),
    ),

    React.createElement(Footer, null),
  );
}
