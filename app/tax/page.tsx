"use client";

import { useState, useEffect } from "react";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  DollarSign,
  Calculator,
  FileText,
  Calendar,
  Shield,
  PieChart,
  TrendingUp,
  Check,
  Info,
  HelpCircle,
  ArrowRight,
  Briefcase,
  Award,
} from "lucide-react";

export default function IncomeTaxPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  // Basic tax calculation state
  const [taxCalc, setTaxCalc] = useState({
    income: 100000,
    age: "below60",
    regime: "new",
    deductions: 150000,
  });

  const [taxResults, setTaxResults] = useState({
    taxAmount: 0,
    effectiveTaxRate: 0,
    takeHomeSalary: 0,
  });

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  // Handle mounting state and theme detection
  useEffect(() => {
    setMounted(true);
    // Check for theme in localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // Calculate tax based on inputs
  useEffect(() => {
    if (!mounted) return;

    let tax = 0;
    // Income can be zero for initial state
    const income = taxCalc.income;
    const taxableIncome =
      taxCalc.regime === "old"
        ? Math.max(0, income - taxCalc.deductions)
        : income;

    if (taxCalc.regime === "new") {
      // New Tax Regime 2023-24
      if (taxableIncome <= 300000) {
        tax = 0;
      } else if (taxableIncome <= 600000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        tax = 15000 + (taxableIncome - 600000) * 0.1;
      } else if (taxableIncome <= 1200000) {
        tax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax = 90000 + (taxableIncome - 1200000) * 0.2;
      } else {
        tax = 150000 + (taxableIncome - 1500000) * 0.3;
      }
    } else {
      // Old Tax Regime
      if (taxCalc.age === "below60") {
        if (taxableIncome <= 250000) {
          tax = 0;
        } else if (taxableIncome <= 500000) {
          tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
          tax = 12500 + (taxableIncome - 500000) * 0.2;
        } else {
          tax = 112500 + (taxableIncome - 1000000) * 0.3;
        }
      } else if (taxCalc.age === "between60and80") {
        if (taxableIncome <= 300000) {
          tax = 0;
        } else if (taxableIncome <= 500000) {
          tax = (taxableIncome - 300000) * 0.05;
        } else if (taxableIncome <= 1000000) {
          tax = 10000 + (taxableIncome - 500000) * 0.2;
        } else {
          tax = 110000 + (taxableIncome - 1000000) * 0.3;
        }
      } else {
        // Above 80 years
        if (taxableIncome <= 500000) {
          tax = 0;
        } else if (taxableIncome <= 1000000) {
          tax = (taxableIncome - 500000) * 0.2;
        } else {
          tax = 100000 + (taxableIncome - 1000000) * 0.3;
        }
      }
    }

    // Add surcharge for high income (simplified)
    if (taxableIncome > 5000000) {
      tax += tax * 0.1;
    }

    // Add cess
    tax += tax * 0.04;

    // Calculate effective tax rate (with safety check for division)
    const effectiveTaxRate =
      income > 0 ? Math.round((tax / income) * 100 * 10) / 10 : 0;

    setTaxResults({
      taxAmount: Math.round(tax),
      effectiveTaxRate: effectiveTaxRate,
      takeHomeSalary: Math.round(income - tax),
    });
  }, [taxCalc, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <Info size={18} />,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "taxSystem",
      label: "Indian Tax System",
      icon: <Shield size={18} />,
      color: "text-green-600 dark:text-green-400",
    },
    {
      id: "impact",
      label: "Impact of Taxation",
      icon: <TrendingUp size={18} />,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      id: "calculator",
      label: "Tax Calculator",
      icon: <Calculator size={18} />,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      id: "planning",
      label: "Tax Planning",
      icon: <PieChart size={18} />,
      color: "text-red-600 dark:text-red-400",
    },
    {
      id: "filing",
      label: "Tax Filing",
      icon: <FileText size={18} />,
      color: "text-cyan-600 dark:text-cyan-400",
    },
    {
      id: "faq",
      label: "FAQs",
      icon: <HelpCircle size={18} />,
      color: "text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gradient-to-br from-gray-50 to-gray-100" : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"}`}
    >
      <NavBar />

      {/* Hero Section */}
      <section
        className={`relative py-24 px-4 overflow-hidden ${
          theme === "light"
            ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
            : "bg-gradient-to-br from-gray-800 via-purple-900/30 to-gray-800"
        }`}
      >
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 ${
                theme === "light"
                  ? "bg-gradient-to-r from-purple-100 to-pink-100"
                  : "bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm"
              }`}
            >
              <Award
                size={16}
                className="text-purple-600 dark:text-purple-400"
              />
              <span
                className={`text-sm font-medium ${theme === "light" ? "text-purple-700" : "text-purple-300"}`}
              >
                Expert Tax Solutions Since 2010
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-blue-600 dark:text-blue-400">Income</span>{" "}
              <span className="text-purple-600 dark:text-purple-400">Tax</span>{" "}
              <span className="text-pink-600 dark:text-pink-400">Services</span>
            </h1>
            <p
              className={`text-xl mb-8 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
            >
              Navigate the complexities of taxation with expert guidance and
              comprehensive solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab("calculator")}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
              >
                <Calculator
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
                Calculate Your Tax
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <Link
                href="/contact"
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 ${
                  theme === "light"
                    ? "bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                    : "bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-900/20"
                }`}
              >
                <Briefcase size={20} />
                Contact Our Tax Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div
        className={`sticky top-0 z-20 backdrop-blur-md shadow-lg border-b ${
          theme === "light"
            ? "bg-white/95 border-gray-200"
            : "bg-gray-900/95 border-gray-700"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-2 gap-1 justify-center">
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group px-5 py-3 font-semibold flex items-center whitespace-nowrap rounded-lg transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                    : theme === "light"
                      ? "text-gray-600 hover:bg-gray-100 hover:text-purple-600"
                      : "text-gray-400 hover:bg-gray-800 hover:text-purple-400"
                }`}
              >
                <span className="mr-2 transition-transform group-hover:scale-110">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-blue-600 dark:text-blue-400">
                    Income
                  </span>{" "}
                  <span className="text-purple-600 dark:text-purple-400">
                    Tax
                  </span>{" "}
                  <span className="text-pink-600 dark:text-pink-400">
                    Services
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
              </div>
              <p
                className={`text-lg mb-12 text-center leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
              >
                At DSR Group Mandsaur, we provide comprehensive income tax
                services to help individuals and businesses navigate the complex
                tax landscape, maximize savings, and ensure compliance with the
                latest regulations.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div
                  className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 text-center ${
                    theme === "light"
                      ? "bg-white shadow-xl hover:shadow-2xl border border-gray-100"
                      : "bg-gray-800/50 shadow-xl hover:shadow-2xl border border-gray-700 hover:border-purple-500/50 backdrop-blur-sm"
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform">
                    <DollarSign className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                    For Individuals
                  </h3>
                  <ul className="space-y-3 text-left">
                    {[
                      "Income tax return filing for all sources of income",
                      "Tax planning and optimization strategies",
                      "Capital gains tax calculation and reporting",
                      "Assistance with tax notices and assessments",
                      "NRI taxation and foreign income reporting",
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <Check className="text-green-500" size={14} />
                        </div>
                        <span
                          className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                        >
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 text-center ${
                    theme === "light"
                      ? "bg-white shadow-xl hover:shadow-2xl border border-gray-100"
                      : "bg-gray-800/50 shadow-xl hover:shadow-2xl border border-gray-700 hover:border-purple-500/50 backdrop-blur-sm"
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform">
                    <Briefcase className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                    For Businesses
                  </h3>
                  <ul className="space-y-3 text-left">
                    {[
                      "Business & professional income tax returns",
                      "Corporate tax planning and compliance",
                      "Tax audit and certification services",
                      "TDS/TCS filing and compliance",
                      "GST integration with income tax planning",
                    ].map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <Check className="text-green-500" size={14} />
                        </div>
                        <span
                          className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                        >
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Calculator Tab */}
          {activeTab === "calculator" && (
            <div className="max-w-5xl mx-auto animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-purple-600 dark:text-purple-400">
                    Income
                  </span>{" "}
                  <span className="text-pink-600 dark:text-pink-400">Tax</span>{" "}
                  <span className="text-orange-600 dark:text-orange-400">
                    Calculator
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full mb-6"></div>
                <p
                  className={`text-lg ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                >
                  Use our simple calculator to estimate your income tax
                  liability for the financial year. This is a simplified
                  calculation and actual tax liability may vary.
                </p>
              </div>

              <div
                className={`rounded-2xl overflow-hidden shadow-2xl transition-all ${
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                }`}
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Tax Calculator
                  </h3>
                  <p className="text-white/90">
                    Estimate your tax liability for FY 2023-24
                  </p>
                </div>

                <div className="md:grid md:grid-cols-2">
                  {/* Left side - Inputs */}
                  <div
                    className={`p-8 border-b md:border-b-0 md:border-r ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
                  >
                    <h4
                      className={`font-bold text-lg mb-6 text-center flex items-center justify-center gap-2 ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}
                    >
                      <Calculator size={20} className="text-purple-600" />
                      Enter Your Details
                    </h4>

                    <div className="space-y-6">
                      <div>
                        <label
                          className={`block text-sm font-semibold mb-2 text-center ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                        >
                          Total Annual Income
                        </label>
                        <div
                          className={`relative rounded-xl border-2 overflow-hidden transition-all focus-within:border-purple-500 ${
                            theme === "light"
                              ? "border-gray-300 bg-white"
                              : "border-gray-600 bg-gray-900"
                          }`}
                        >
                          <div
                            className={`absolute left-4 top-1/2 -translate-y-1/2 font-semibold ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                          >
                            ₹
                          </div>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={
                              taxCalc.income === 0
                                ? ""
                                : taxCalc.income.toLocaleString()
                            }
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                "",
                              );
                              const numValue =
                                value === "" ? 0 : parseInt(value, 10);
                              setTaxCalc({ ...taxCalc, income: numValue });
                            }}
                            className={`w-full pl-8 pr-4 py-3 text-lg outline-none text-center ${
                              theme === "light"
                                ? "bg-white text-gray-900"
                                : "bg-gray-900 text-white"
                            }`}
                            placeholder="Enter income amount"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-semibold mb-2 text-center ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                        >
                          Age Group
                        </label>
                        <select
                          value={taxCalc.age}
                          onChange={(e) =>
                            setTaxCalc({ ...taxCalc, age: e.target.value })
                          }
                          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all focus:border-purple-500 text-center ${
                            theme === "light"
                              ? "border-gray-300 bg-white text-gray-900"
                              : "border-gray-600 bg-gray-900 text-white"
                          }`}
                        >
                          <option value="below60">Below 60 years</option>
                          <option value="between60and80">60 to 80 years</option>
                          <option value="above80">Above 80 years</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-semibold mb-2 text-center ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                        >
                          Tax Regime
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {["new", "old"].map((regime) => (
                            <label
                              key={regime}
                              className={`relative cursor-pointer rounded-xl border-2 transition-all text-center ${
                                taxCalc.regime === regime
                                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg"
                                  : theme === "light"
                                    ? "border-gray-300 bg-white hover:border-purple-300"
                                    : "border-gray-600 bg-gray-900 hover:border-purple-500"
                              }`}
                            >
                              <input
                                type="radio"
                                value={regime}
                                checked={taxCalc.regime === regime}
                                onChange={() =>
                                  setTaxCalc({ ...taxCalc, regime })
                                }
                                className="sr-only"
                              />
                              <div className="px-4 py-3 text-center">
                                <span
                                  className={`font-semibold ${taxCalc.regime === regime ? "text-purple-600 dark:text-purple-400" : ""}`}
                                >
                                  {regime === "new"
                                    ? "New Regime"
                                    : "Old Regime"}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {taxCalc.regime === "old" && (
                        <div className="animate-fadeIn">
                          <label
                            className={`block text-sm font-semibold mb-2 text-center ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                          >
                            Total Deductions (Section 80C, 80D, HRA, etc.)
                          </label>
                          <div
                            className={`relative rounded-xl border-2 overflow-hidden transition-all focus-within:border-purple-500 ${
                              theme === "light"
                                ? "border-gray-300 bg-white"
                                : "border-gray-600 bg-gray-900"
                            }`}
                          >
                            <div
                              className={`absolute left-4 top-1/2 -translate-y-1/2 font-semibold ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                            >
                              ₹
                            </div>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={
                                taxCalc.deductions === 0
                                  ? ""
                                  : taxCalc.deductions.toLocaleString()
                              }
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  "",
                                );
                                const numValue =
                                  value === "" ? 0 : parseInt(value, 10);
                                setTaxCalc({
                                  ...taxCalc,
                                  deductions: numValue,
                                });
                              }}
                              className={`w-full pl-8 pr-4 py-3 text-lg outline-none text-center ${
                                theme === "light"
                                  ? "bg-white text-gray-900"
                                  : "bg-gray-900 text-white"
                              }`}
                              placeholder="Enter deductions amount"
                            />
                          </div>
                          <p
                            className={`text-xs mt-2 text-center flex items-center justify-center gap-1 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                          >
                            <Info size={12} />
                            Includes 80C, 80D, HRA, and all other eligible
                            deductions
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side - Results */}
                  <div
                    className={`p-8 ${theme === "light" ? "bg-gradient-to-br from-purple-50 to-pink-50" : "bg-gradient-to-br from-purple-900/20 to-pink-900/20"}`}
                  >
                    <h4
                      className={`font-bold text-lg mb-6 text-center flex items-center justify-center gap-2 ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}
                    >
                      <TrendingUp size={20} className="text-purple-600" />
                      Your Tax Calculation
                    </h4>

                    <div className="space-y-6">
                      <div
                        className={`p-6 rounded-2xl shadow-lg text-center ${theme === "light" ? "bg-white" : "bg-gray-900/50 backdrop-blur-sm border border-gray-700"}`}
                      >
                        <p
                          className={`text-sm font-medium mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                        >
                          Estimated Tax Amount
                        </p>
                        <h3 className="text-4xl font-bold">
                          <span className="text-purple-600 dark:text-purple-400">
                            ₹
                          </span>{" "}
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {taxResults.taxAmount.toLocaleString()}
                          </span>
                        </h3>
                        <div
                          className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme === "light" ? "bg-purple-100" : "bg-purple-900/30"}`}
                        >
                          <span
                            className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                          >
                            Effective Rate:
                          </span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">
                            {isNaN(taxResults.effectiveTaxRate)
                              ? "0"
                              : taxResults.effectiveTaxRate}
                            %
                          </span>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg transform transition-transform hover:scale-105 text-center">
                        <p className="text-sm font-medium text-green-100 mb-2">
                          Take Home Amount
                        </p>
                        <h3 className="text-4xl font-bold">
                          ₹ {taxResults.takeHomeSalary.toLocaleString()}
                        </h3>
                        <p className="text-sm text-green-100 mt-2">
                          After tax deductions
                        </p>
                      </div>

                      <div
                        className={`p-4 rounded-xl border text-center ${
                          theme === "light"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-yellow-900/20 border-yellow-800"
                        }`}
                      >
                        <p
                          className={`text-xs leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                        >
                          <strong
                            className={
                              theme === "light"
                                ? "text-yellow-700"
                                : "text-yellow-500"
                            }
                          >
                            Note:
                          </strong>{" "}
                          This is a simplified calculation based on the latest
                          tax rates. Actual liability may vary based on specific
                          exemptions and deductions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Slabs Information */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  <span className="text-blue-600 dark:text-blue-400">Tax</span>{" "}
                  <span className="text-purple-600 dark:text-purple-400">
                    Slabs
                  </span>{" "}
                  <span className="text-pink-600 dark:text-pink-400">
                    for FY 2023-24
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    className={`p-6 rounded-2xl transition-all hover:scale-105 text-center ${
                      theme === "light"
                        ? "bg-white shadow-xl"
                        : "bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:border-blue-500/50"
                    }`}
                  >
                    <h4 className="font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === "light" ? "bg-blue-100" : "bg-blue-900/30"}`}
                      >
                        <span className="text-sm">✨</span>
                      </div>
                      New Tax Regime
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          range: "Up to ₹3,00,000",
                          rate: "Nil",
                          color: "text-green-600 dark:text-green-400",
                        },
                        {
                          range: "₹3,00,001 to ₹6,00,000",
                          rate: "5%",
                          color: "text-blue-600 dark:text-blue-400",
                        },
                        {
                          range: "₹6,00,001 to ₹9,00,000",
                          rate: "10%",
                          color: "text-purple-600 dark:text-purple-400",
                        },
                        {
                          range: "₹9,00,001 to ₹12,00,000",
                          rate: "15%",
                          color: "text-orange-600 dark:text-orange-400",
                        },
                        {
                          range: "₹12,00,001 to ₹15,00,000",
                          rate: "20%",
                          color: "text-red-600 dark:text-red-400",
                        },
                        {
                          range: "Above ₹15,00,000",
                          rate: "30%",
                          color: "text-pink-600 dark:text-pink-400",
                        },
                      ].map((slab, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between py-2 border-b last:border-0 ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
                        >
                          <span
                            className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                          >
                            {slab.range}
                          </span>
                          <span className={`font-semibold ${slab.color}`}>
                            {slab.rate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-2xl transition-all hover:scale-105 text-center ${
                      theme === "light"
                        ? "bg-white shadow-xl"
                        : "bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:border-purple-500/50"
                    }`}
                  >
                    <h4 className="font-bold mb-4 text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === "light" ? "bg-purple-100" : "bg-purple-900/30"}`}
                      >
                        <span className="text-sm">📜</span>
                      </div>
                      Old Tax Regime
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          range: "Up to ₹2,50,000",
                          rate: "Nil",
                          color: "text-green-600 dark:text-green-400",
                        },
                        {
                          range: "₹2,50,001 to ₹5,00,000",
                          rate: "5%",
                          color: "text-blue-600 dark:text-blue-400",
                        },
                        {
                          range: "₹5,00,001 to ₹10,00,000",
                          rate: "20%",
                          color: "text-orange-600 dark:text-orange-400",
                        },
                        {
                          range: "Above ₹10,00,000",
                          rate: "30%",
                          color: "text-red-600 dark:text-red-400",
                        },
                      ].map((slab, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between py-2 border-b last:border-0 ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
                        >
                          <span
                            className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                          >
                            {slab.range}
                          </span>
                          <span className={`font-semibold ${slab.color}`}>
                            {slab.rate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Indian Tax System Tab */}
          {activeTab === "taxSystem" && (
            <div className="max-w-3xl mx-auto animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-orange-600 dark:text-orange-400">
                    Indian
                  </span>{" "}
                  <span className="text-green-600 dark:text-green-400">
                    Tax
                  </span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    System
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 mx-auto rounded-full"></div>
              </div>
              <p
                className={`text-lg mb-8 text-center leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
              >
                India follows a progressive tax structure governed by the Income
                Tax Act of 1961.
              </p>
              <div
                className={`p-8 rounded-2xl shadow-xl ${
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">
                  <span className="text-purple-600 dark:text-purple-400">
                    Tax
                  </span>{" "}
                  <span className="text-pink-600 dark:text-pink-400">
                    Regimes
                  </span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    in India
                  </span>
                </h3>
                <div className="space-y-8">
                  <div
                    className={`p-6 rounded-xl text-center ${
                      theme === "light"
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50"
                        : "bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30"
                    }`}
                  >
                    <h4 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                      New Tax Regime
                    </h4>
                    <p
                      className={`mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                    >
                      Lower rates but no exemptions or deductions
                    </p>
                    <ul className="space-y-2 max-w-md mx-auto">
                      <li className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          Up to ₹3 lakhs
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          No tax
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          ₹3-6 lakhs
                        </span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          5%
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          ₹6-9 lakhs
                        </span>
                        <span className="font-semibold text-purple-600 dark:text-purple-400">
                          10%
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          ₹9-12 lakhs
                        </span>
                        <span className="font-semibold text-orange-600 dark:text-orange-400">
                          15%
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-800">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          ₹12-15 lakhs
                        </span>
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          20%
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          Above ₹15 lakhs
                        </span>
                        <span className="font-semibold text-pink-600 dark:text-pink-400">
                          30%
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div
                    className={`p-6 rounded-xl text-center ${
                      theme === "light"
                        ? "bg-gradient-to-r from-purple-50 to-pink-50"
                        : "bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30"
                    }`}
                  >
                    <h4 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">
                      Old Tax Regime
                    </h4>
                    <p
                      className={`mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                    >
                      Higher rates but allows exemptions and deductions
                    </p>
                    <ul className="space-y-2 max-w-md mx-auto">
                      <li className="flex justify-between items-center py-2 border-b border-purple-200 dark:border-purple-800">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          Up to ₹2.5 lakhs
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          No tax
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-purple-200 dark:border-purple-800">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          ₹2.5-5 lakhs
                        </span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          5%
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-purple-200 dark:border-purple-800">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          ₹5-10 lakhs
                        </span>
                        <span className="font-semibold text-orange-600 dark:text-orange-400">
                          20%
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2">
                        <span
                          className={
                            theme === "light"
                              ? "text-gray-700"
                              : "text-gray-300"
                          }
                        >
                          Above ₹10 lakhs
                        </span>
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          30%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Impact of Taxation Tab */}
          {activeTab === "impact" && (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-purple-600 dark:text-purple-400">
                    Impact
                  </span>{" "}
                  <span className="text-orange-600 dark:text-orange-400">
                    of
                  </span>{" "}
                  <span className="text-green-600 dark:text-green-400">
                    Taxation
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-orange-500 to-green-500 mx-auto rounded-full"></div>
              </div>
              <p
                className={`text-lg mb-12 text-center leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
              >
                Taxation affects various aspects of the economy and society.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 text-center ${
                    theme === "light"
                      ? "bg-white shadow-xl"
                      : "bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:border-blue-500/50"
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 mx-auto">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                    Economic Impact
                  </h3>
                  <ul className="space-y-3 text-left">
                    <li
                      className={`flex items-center gap-3 p-3 rounded-lg ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
                    >
                      <ArrowRight
                        size={16}
                        className="text-blue-500 shrink-0"
                      />
                      <span
                        className={
                          theme === "light" ? "text-gray-700" : "text-gray-300"
                        }
                      >
                        Revenue generation for public services
                      </span>
                    </li>
                    <li
                      className={`flex items-center gap-3 p-3 rounded-lg ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
                    >
                      <ArrowRight
                        size={16}
                        className="text-blue-500 shrink-0"
                      />
                      <span
                        className={
                          theme === "light" ? "text-gray-700" : "text-gray-300"
                        }
                      >
                        Wealth redistribution in society
                      </span>
                    </li>
                    <li
                      className={`flex items-center gap-3 p-3 rounded-lg ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
                    >
                      <ArrowRight
                        size={16}
                        className="text-blue-500 shrink-0"
                      />
                      <span
                        className={
                          theme === "light" ? "text-gray-700" : "text-gray-300"
                        }
                      >
                        Influencing investment patterns
                      </span>
                    </li>
                  </ul>
                </div>
                <div
                  className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 text-center ${
                    theme === "light"
                      ? "bg-white shadow-xl"
                      : "bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:border-purple-500/50"
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 mx-auto">
                    <Shield className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                    Social Impact
                  </h3>
                  <ul className="space-y-3 text-left">
                    <li
                      className={`flex items-center gap-3 p-3 rounded-lg ${theme === "light" ? "bg-purple-50" : "bg-purple-900/20"}`}
                    >
                      <ArrowRight
                        size={16}
                        className="text-purple-500 shrink-0"
                      />
                      <span
                        className={
                          theme === "light" ? "text-gray-700" : "text-gray-300"
                        }
                      >
                        Funding welfare programs
                      </span>
                    </li>
                    <li
                      className={`flex items-center gap-3 p-3 rounded-lg ${theme === "light" ? "bg-purple-50" : "bg-purple-900/20"}`}
                    >
                      <ArrowRight
                        size={16}
                        className="text-purple-500 shrink-0"
                      />
                      <span
                        className={
                          theme === "light" ? "text-gray-700" : "text-gray-300"
                        }
                      >
                        Reducing income inequality
                      </span>
                    </li>
                    <li
                      className={`flex items-center gap-3 p-3 rounded-lg ${theme === "light" ? "bg-purple-50" : "bg-purple-900/20"}`}
                    >
                      <ArrowRight
                        size={16}
                        className="text-purple-500 shrink-0"
                      />
                      <span
                        className={
                          theme === "light" ? "text-gray-700" : "text-gray-300"
                        }
                      >
                        Encouraging socially beneficial behaviors
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tax Planning Tab */}
          {activeTab === "planning" && (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-green-600 dark:text-green-400">
                    Tax
                  </span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Planning
                  </span>{" "}
                  <span className="text-purple-600 dark:text-purple-400">
                    Strategies
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              <p
                className={`text-lg mb-12 text-center leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
              >
                Legally minimize your tax liability with these strategies.
              </p>
              <div
                className={`p-8 rounded-2xl shadow-xl ${
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">
                  <span className="text-orange-600 dark:text-orange-400">
                    Key
                  </span>{" "}
                  <span className="text-red-600 dark:text-red-400">
                    Tax-Saving
                  </span>{" "}
                  <span className="text-pink-600 dark:text-pink-400">
                    Options
                  </span>
                </h3>
                <div className="space-y-4">
                  <div
                    className={`p-5 rounded-xl transition-all hover:scale-105 text-center ${
                      theme === "light"
                        ? "bg-gradient-to-r from-green-50 to-emerald-50"
                        : "bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/30"
                    }`}
                  >
                    <h4 className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">
                      Section 80C Investments
                    </h4>
                    <p
                      className={
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }
                    >
                      PPF, ELSS, life insurance premiums, home loan principal
                    </p>
                  </div>
                  <div
                    className={`p-5 rounded-xl transition-all hover:scale-105 text-center ${
                      theme === "light"
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50"
                        : "bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30"
                    }`}
                  >
                    <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                      Section 80D - Health Insurance
                    </h4>
                    <p
                      className={
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }
                    >
                      Premium for self, family, and parents
                    </p>
                  </div>
                  <div
                    className={`p-5 rounded-xl transition-all hover:scale-105 text-center ${
                      theme === "light"
                        ? "bg-gradient-to-r from-purple-50 to-pink-50"
                        : "bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30"
                    }`}
                  >
                    <h4 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-2">
                      Home Loan Benefits
                    </h4>
                    <p
                      className={
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }
                    >
                      Interest deduction under Section 24
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tax Filing Tab */}
          {activeTab === "filing" && (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-cyan-600 dark:text-cyan-400">Tax</span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Filing
                  </span>{" "}
                  <span className="text-purple-600 dark:text-purple-400">
                    Process
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              <p
                className={`text-lg mb-12 text-center leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
              >
                Important steps and deadlines for filing income tax returns.
              </p>
              <div
                className={`p-8 rounded-2xl shadow-xl ${
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">
                  <span className="text-red-600 dark:text-red-400">Key</span>{" "}
                  <span className="text-orange-600 dark:text-orange-400">
                    Dates
                  </span>
                </h3>
                <div className="space-y-4">
                  <div
                    className={`flex justify-between items-center p-4 rounded-xl ${
                      theme === "light"
                        ? "bg-gradient-to-r from-orange-50 to-red-50"
                        : "bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-800/30"
                    }`}
                  >
                    <span
                      className={`font-semibold ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}
                    >
                      Regular filing deadline
                    </span>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-red-500" />
                      <span className="font-bold text-red-600 dark:text-red-400">
                        July 31
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex justify-between items-center p-4 rounded-xl ${
                      theme === "light"
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50"
                        : "bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-800/30"
                    }`}
                  >
                    <span
                      className={`font-semibold ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}
                    >
                      Filing with audit report
                    </span>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-orange-500" />
                      <span className="font-bold text-orange-600 dark:text-orange-400">
                        October 31
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex justify-between items-center p-4 rounded-xl ${
                      theme === "light"
                        ? "bg-gradient-to-r from-red-50 to-pink-50"
                        : "bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-800/30"
                    }`}
                  >
                    <span
                      className={`font-semibold ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}
                    >
                      Belated returns
                    </span>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-pink-500" />
                      <span className="font-bold text-pink-600 dark:text-pink-400">
                        December 31
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === "faq" && (
            <div className="max-w-3xl mx-auto animate-fadeIn">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-pink-600 dark:text-pink-400">
                    Frequently
                  </span>{" "}
                  <span className="text-purple-600 dark:text-purple-400">
                    Asked
                  </span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Questions
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    question: "Who needs to file income tax returns?",
                    answer:
                      "Anyone with annual income above the basic exemption limit must file ITR. Also required for those with foreign assets or seeking refunds.",
                  },
                  {
                    question:
                      "What's the difference between old and new tax regimes?",
                    answer:
                      "New regime offers lower rates without deductions; old regime has higher rates but allows various deductions and exemptions.",
                  },
                  {
                    question: "When is the last date to file ITR?",
                    answer:
                      "Regular filing deadline is July 31. With audit reports, it's October 31. Belated returns can be filed until December 31.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className={`rounded-xl overflow-hidden transition-all ${
                      theme === "light"
                        ? "bg-white shadow-lg"
                        : "bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-700"
                    }`}
                  >
                    <button
                      className={`flex justify-between items-center w-full p-6 text-left font-semibold transition-colors ${
                        theme === "light"
                          ? "hover:bg-purple-50"
                          : "hover:bg-purple-900/20"
                      }`}
                      onClick={() => toggleQuestion(index)}
                    >
                      <span className="text-lg text-purple-600 dark:text-purple-400">
                        {faq.question}
                      </span>
                      <ArrowRight
                        size={20}
                        className={`transform transition-all duration-300 ${
                          activeQuestion === index
                            ? "rotate-90 text-purple-600"
                            : ""
                        }`}
                      />
                    </button>
                    {activeQuestion === index && (
                      <div
                        className={`p-6 pt-0 border-t animate-fadeIn ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
                      >
                        <p
                          className={`leading-relaxed text-center ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
