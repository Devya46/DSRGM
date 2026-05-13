"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/theme-context";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import {
  PlayIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ArrowLongRightIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  ArrowPathIcon,
  FunnelIcon,
  CalculatorIcon,
  SparklesIcon,
  LightBulbIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

// Sample learning materials data - replace with actual data
const learningMaterials = {
  courses: [
    {
      id: "c1",
      title: "Fundamentals of Stock Market Investing",
      description:
        "Learn the basics of stock markets, how to analyze companies, and build your first investment portfolio.",
      level: "Beginner",
      duration: "4 hours",
      modules: 8,
      instructor: "Rahul Sharma",
      category: "Stock Market",
      image: "/coming soon.png",
    },
    {
      id: "c2",
      title: "Technical Analysis Masterclass",
      description:
        "Master chart patterns, indicators, and technical analysis strategies for better trading decisions.",
      level: "Intermediate",
      duration: "6 hours",
      modules: 12,
      instructor: "Priya Patel",
      category: "Trading",
      image: "/COMING_SOON_02.png",
    },
    {
      id: "c3",
      title: "Mutual Fund Investment Strategies",
      description:
        "Comprehensive guide to mutual funds, their types, and how to build a diversified mutual fund portfolio.",
      level: "Beginner",
      duration: "3 hours",
      modules: 6,
      instructor: "Vikram Desai",
      category: "Mutual Funds",
      image: "/coming soon.png",
    },
    {
      id: "c4",
      title: "Advanced Options Trading",
      description:
        "Learn complex options strategies, Greeks, and risk management techniques for options traders.",
      level: "Advanced",
      duration: "8 hours",
      modules: 15,
      instructor: "Anjali Singh",
      category: "Options",
      image: "/COMING_SOON_02.png",
    },
  ],
  videos: [
    {
      id: "v1",
      title: "How to Read Financial Statements",
      description:
        "A detailed walkthrough of balance sheets, income statements, and cash flow statements for investors.",
      duration: "25 min",
      interest: "Trending",
      date: "Coming Soon 2026",
      category: "Financial Analysis",
      image: "/coming soon.png",
    },
    {
      id: "v2",
      title: "Understanding Market Cycles",
      description:
        "Learn about different market cycles, their indicators, and how to position your investments accordingly.",
      duration: "18 min",
      interest: "Popular",
      date: "Coming Soon 2026",
      category: "Market Analysis",
      image: "/COMING_SOON_02.png",
    },
    {
      id: "v3",
      title: "Risk Management Essentials",
      description:
        "Essential techniques to manage risk in your portfolio including position sizing and diversification.",
      duration: "22 min",
      interest: "High Demand",
      date: "Coming Soon 2026",
      category: "Risk Management",
      image: "/coming soon.png",
    },
    {
      id: "v4",
      title: "Tax Planning for Investors",
      description:
        "Strategies to optimize your tax liability while maximizing your investment returns.",
      duration: "30 min",
      interest: "Most Requested",
      date: "Coming Soon 2026",
      category: "Tax Planning",
      image: "/COMING_SOON_02.png",
    },
  ],
  articles: [
    {
      id: "a1",
      title: "Asset Allocation: The Key to Long-Term Success",
      description:
        "How to distribute your investments across different asset classes based on your risk tolerance and goals.",
      readTime: "8 min read",
      date: "Coming Soon 2026",
      category: "Investment Strategy",
      image: "/coming soon.png",
    },
    {
      id: "a2",
      title: "Behavioral Finance: Understanding Your Investment Biases",
      description:
        "Explore common psychological biases that affect investment decisions and how to overcome them.",
      readTime: "10 min read",
      date: "Coming Soon 2026",
      category: "Behavioral Finance",
      image: "/COMING_SOON_02.png",
    },
    {
      id: "a3",
      title:
        "Fundamental vs Technical Analysis: Which Approach Is Right for You?",
      description:
        "A comparison of the two main analysis methods to help you determine which suits your investing style.",
      readTime: "12 min read",
      date: "Coming Soon 2026",
      category: "Analysis Methods",
      image: "/coming soon.png",
    },
    {
      id: "a4",
      title: "Building a Retirement Portfolio: Step-by-Step Guide",
      description:
        "Practical steps to create a robust retirement portfolio that can support your future financial needs.",
      readTime: "9 min read",
      date: "Coming Soon 2026",
      category: "Retirement Planning",
      image: "/COMING_SOON_02.png",
    },
  ],
};

// All categories for filtering
const allCategories = [
  "All",
  "Stock Market",
  "Trading",
  "Mutual Funds",
  "Options",
  "Financial Analysis",
  "Market Analysis",
  "Risk Management",
  "Tax Planning",
  "Investment Strategy",
  "Behavioral Finance",
  "Analysis Methods",
  "Retirement Planning",
];

// Learning resource types (Tools removed)
const resourceTypes = [
  { id: "all", name: "All Resources", icon: null },
  { id: "courses", name: "Courses", icon: AcademicCapIcon },
  { id: "videos", name: "Videos", icon: PlayIcon },
  { id: "articles", name: "Articles", icon: BookOpenIcon },
];

export default function LearningCenterPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedResourceType, setSelectedResourceType] = useState("all");
  const [filteredResources, setFilteredResources] = useState(learningMaterials);

  // Filter resources based on search term, category, and resource type
  useEffect(() => {
    const filterContent = () => {
      let result: any = {};

      // Clone the original data structure
      Object.keys(learningMaterials).forEach((key) => {
        result[key] = [...(learningMaterials as any)[key]];
      });

      // Apply search filter if exists
      if (searchTerm) {
        const lowercaseSearchTerm = searchTerm.toLowerCase();

        Object.keys(result).forEach((key) => {
          result[key] = result[key].filter(
            (item: any) =>
              item.title.toLowerCase().includes(lowercaseSearchTerm) ||
              item.description.toLowerCase().includes(lowercaseSearchTerm) ||
              item.category.toLowerCase().includes(lowercaseSearchTerm),
          );
        });
      }

      // Apply category filter if not 'All'
      if (selectedCategory !== "All") {
        Object.keys(result).forEach((key) => {
          result[key] = result[key].filter(
            (item: any) => item.category === selectedCategory,
          );
        });
      }

      setFilteredResources(result);
    };

    filterContent();
  }, [searchTerm, selectedCategory, selectedResourceType]);

  // Get resource types to display based on selected resource type
  const getResourceTypesToDisplay = () => {
    if (selectedResourceType === "all") {
      return Object.keys(learningMaterials);
    }
    return [selectedResourceType];
  };

  // Helper to get icon for resource type
  const getResourceIcon = (resourceType: string) => {
    switch (resourceType) {
      case "courses":
        return AcademicCapIcon;
      case "videos":
        return PlayIcon;
      case "articles":
        return BookOpenIcon;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {NavBar ? (
        <NavBar />
      ) : (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DSR GROUP MANDSAUR
            </h1>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header - Modern Hero Section */}
        <div className="relative mb-16">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-100/50 to-transparent dark:from-indigo-900/20 rounded-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 left-20 w-72 h-72 bg-purple-100 dark:bg-purple-900/10 rounded-full opacity-50 blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-48 h-48 bg-pink-100 dark:bg-pink-900/10 rounded-full opacity-40 blur-3xl animate-pulse delay-1000"></div>

          <div className="relative py-20 px-8 sm:px-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            {/* Decorative dots pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="absolute top-20 right-20 w-3 h-3 bg-purple-600 rounded-full"></div>
              <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-pink-600 rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6 border border-indigo-200/50 dark:border-indigo-800/50">
                <SparklesIcon className="h-4 w-4 mr-2 text-indigo-500" />
                Empowering Financial Minds
              </div>

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Learning Center
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Expand your financial knowledge with our curated resources,
                expert-led courses, and practical articles designed to make you
                a more confident investor.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center gap-8 mb-10">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <AcademicCapIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-sm">4+ Expert Courses</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <PlayIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-sm">10+ Educational Videos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <BookOpenIcon className="h-5 w-5 text-indigo-500" />
                  <span className="text-sm">15+ In-depth Articles</span>
                </div>
              </div>

              {/* Enhanced Search Bar */}
              {/* <div className="relative max-w-2xl mx-auto group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search for courses, videos, or articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-28 py-5 w-full rounded-full bg-white dark:bg-gray-800 border-0 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                />
                <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2.5 rounded-full transition-all duration-200 ${
                      showFilters
                        ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30"
                        : "text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    aria-label="Toggle filters"
                  >
                    <FunnelIcon className="h-5 w-5" />
                  </button>
                </div>
              </div> */}

              {/* Popular tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                  Popular:
                </span>
                <button
                  onClick={() => setSelectedCategory("Stock Market")}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  Stock Market
                </button>
                <button
                  onClick={() => setSelectedCategory("Trading")}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  Trading
                </button>
                <button
                  onClick={() => setSelectedCategory("Mutual Funds")}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  Mutual Funds
                </button>
                <button
                  onClick={() => setSelectedCategory("Risk Management")}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  Risk Management
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section - Enhanced */}
        <section
          className={`transition-all duration-300 ease-in-out overflow-hidden mb-12 ${showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FunnelIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Filter by Category
              </h2>
              <div className="flex flex-wrap gap-3">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-300 dark:shadow-indigo-900/30 transform scale-105"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 hover:shadow-sm"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedResourceType("all");
                }}
                className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* Resource Type Tabs - Modern Design */}
        <section className="mb-12">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-1 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex space-x-2 overflow-x-auto py-2 px-2">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedResourceType(type.id)}
                  className={`
                    flex-1 min-w-[120px] whitespace-nowrap py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
                    ${
                      selectedResourceType === type.id
                        ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300 shadow-inner"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    }
                  `}
                >
                  <div className="flex items-center justify-center">
                    {type.icon && <type.icon className="h-5 w-5 mr-2" />}
                    {type.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Display Resources Based on Selected Type */}
        {getResourceTypesToDisplay().map((resourceType) => {
          const IconComponent = getResourceIcon(resourceType);
          const resources = (filteredResources as any)[resourceType];

          return (
            <section key={resourceType} className="mb-16">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  {IconComponent && (
                    <IconComponent className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                  )}
                  {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
                </h2>
                <Link
                  href={`/learning-center/${resourceType}`}
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center text-sm font-medium group"
                >
                  View All{" "}
                  {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
                  <ArrowLongRightIcon className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* No Results Message */}
              {resources?.length === 0 && (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border border-gray-200/50 dark:border-gray-700/50">
                  <div className="mx-auto w-16 h-16 mb-4 text-gray-300 dark:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    No {resourceType} found matching your criteria.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your filters or search term.
                  </p>
                </div>
              )}

              {/* Resource Cards - Non-clickable cards */}
              {resources?.length > 0 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {resources.map((item: any) => (
                    <div
                      key={item.id}
                      className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-default border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                        {/* Category Tag */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-medium shadow-sm backdrop-blur-sm">
                          {item.category}
                        </div>

                        {/* Coming Soon Badge */}
                        <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-sm">
                          COMING SOON
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                          {item.description}
                        </p>

                        {/* Additional Details */}
                        {resourceType === "courses" && (
                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="flex items-center">
                              <AcademicCapIcon className="h-4 w-4 mr-1" />
                              {item.modules} modules
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {item.duration}
                            </span>
                          </div>
                        )}
                        {resourceType === "videos" && (
                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="flex items-center">
                              <svg
                                className="h-4 w-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {item.interest}
                            </span>
                            <span>{item.date}</span>
                          </div>
                        )}
                        {resourceType === "articles" && (
                          <div className="flex justify-end text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span>{item.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* CTA Section - Updated to Calculator */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
            <div className="px-8 py-12 sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between relative">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-10 left-10 w-3 h-3 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-white/20 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <RocketLaunchIcon className="h-8 w-8 text-white/80" />
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    Get Started
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl max-w-xl">
                  Ready to calculate your financial future?
                </h2>
                <p className="mt-3 text-lg text-indigo-100 max-w-lg">
                  Before you learn, calculate! Use our powerful calculators to
                  understand your investment potential and plan your journey.
                </p>
              </div>

              <div className="mt-8 lg:mt-0 lg:ml-8 flex flex-shrink-0 relative z-10">
                <Link
                  href="/calculators"
                  className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 text-base font-medium rounded-full hover:bg-indigo-50 transition-all duration-200 group shadow-lg hover:shadow-xl"
                >
                  <CalculatorIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Calculate Now
                  <ArrowLongRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Enhanced */}
        <section>
          <div className="flex items-center mb-8">
            <div className="h-8 w-1 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <LightBulbIcon className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Are these learning resources free?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Most of our articles and basic videos will be free for all
                  users. Premium courses require a subscription or can be
                  accessed by our investment clients.
                </p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  When will new content be available?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  We are constantly developing new courses and materials. Stay
                  tuned for updates throughout 2026 as we roll out our complete
                  learning library.
                </p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  How often are new resources added?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  New content will be added weekly once launched, including
                  articles and videos. Major course updates are planned
                  quarterly starting 2026.
                </p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Can I request specific topics?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Absolutely! We welcome content suggestions from our users.
                  Please use the feedback form on our contact page to submit
                  your requests.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {Footer ? (
        <Footer />
      ) : (
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} DSR GROUP MANDSAUR. All rights
              reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
