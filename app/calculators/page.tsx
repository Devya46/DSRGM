"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { formatIndianCurrency } from "@/lib/utils";
import {
  Calculator,
  Clock,
  GraduationCap,
  Heart,
  Wallet,
  Plane,
  Shield,
  PiggyBank,
  ChevronRight,
  TrendingUp,
  IndianRupee,
  Lightbulb,
  Calendar,
  Percent,
  Info,
  Gift,
  School,
  BookOpen,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Globe,
} from "lucide-react";

// ==================== SIP CALCULATOR ====================
function SIPCalculator({ theme }: { theme: string }) {
  const router = useRouter();
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [showGoalPlanner, setShowGoalPlanner] = useState(false);
  const [results, setResults] = useState({
    totalInvestment: 600000,
    totalReturns: 516840,
    maturityValue: 1116840,
    monthlyInvestmentForGoal: 83333,
  });

  useEffect(() => {
    const investment = Number(monthlyInvestment) || 0;
    const returns = Number(expectedReturn) || 0;
    const years = Number(timePeriod) || 0;
    const target = Number(targetAmount) || 0;

    if (investment <= 0 || returns <= 0 || years <= 0) {
      setResults({
        totalInvestment: investment * years * 12,
        totalReturns: 0,
        maturityValue: investment * years * 12,
        monthlyInvestmentForGoal: 0,
      });
      return;
    }

    const monthlyRate = returns / 12 / 100;
    const months = years * 12;

    const maturityValue =
      investment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const totalInvestment = investment * months;
    const totalReturns = maturityValue - totalInvestment;

    let monthlyInvestmentForGoal = 0;
    if (target > 0 && monthlyRate > 0 && months > 0) {
      monthlyInvestmentForGoal =
        target /
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));
    }

    setResults({
      totalInvestment,
      totalReturns,
      maturityValue,
      monthlyInvestmentForGoal: Math.ceil(monthlyInvestmentForGoal),
    });
  }, [monthlyInvestment, expectedReturn, timePeriod, targetAmount]);

  const handleInvestmentChange = (value: string | number) => {
    if (typeof value === "string") {
      const cleanValue = value.replace(/^0+/, "") || "0";
      setMonthlyInvestment(parseInt(cleanValue, 10));
    } else {
      setMonthlyInvestment(value);
    }
  };

  const handleReturnChange = (value: string | number) => {
    if (typeof value === "string") {
      const cleanValue = value.replace(/^0+/, "") || "0";
      setExpectedReturn(parseFloat(cleanValue));
    } else {
      setExpectedReturn(value);
    }
  };

  const handlePeriodChange = (value: string | number) => {
    if (typeof value === "string") {
      const cleanValue = value.replace(/^0+/, "") || "0";
      setTimePeriod(parseInt(cleanValue, 10));
    } else {
      setTimePeriod(value);
    }
  };

  const handleTargetChange = (value: string | number) => {
    if (typeof value === "string") {
      const cleanValue = value.replace(/^0+/, "") || "0";
      setTargetAmount(parseInt(cleanValue, 10));
    } else {
      setTargetAmount(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Monthly Investment Amount
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={monthlyInvestment === 0 ? "" : monthlyInvestment}
              onChange={(e) => handleInvestmentChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              placeholder="0"
            />
          </div>
          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={monthlyInvestment}
            onChange={(e) => handleInvestmentChange(e.target.value)}
            className="w-full mt-2"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>₹500</span>
            <span>₹1,00,000</span>
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Expected Annual Returns (%)
          </label>
          <input
            type="text"
            value={expectedReturn === 0 ? "" : expectedReturn}
            onChange={(e) => handleReturnChange(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => handleReturnChange(e.target.value)}
            className="w-full mt-2"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>1%</span>
            <span>30%</span>
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Investment Period (Years)
          </label>
          <input
            type="text"
            value={timePeriod === 0 ? "" : timePeriod}
            onChange={(e) => handlePeriodChange(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <input
            type="range"
            min="1"
            max="40"
            value={timePeriod}
            onChange={(e) => handlePeriodChange(e.target.value)}
            className="w-full mt-2"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>1 Year</span>
            <span>40 Years</span>
          </div>
        </div>

        <button
          onClick={() => setShowGoalPlanner(!showGoalPlanner)}
          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${theme === "light" ? "bg-gray-100 hover:bg-gray-200 text-gray-800" : "bg-gray-700 hover:bg-gray-600 text-white"} transition-all duration-200`}
        >
          {showGoalPlanner ? "Hide" : "Show"} Goal Planner{" "}
          <ArrowRight className="w-4 h-4" />
        </button>

        {showGoalPlanner && (
          <div className="pt-4">
            <label
              className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
            >
              Target Amount
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={targetAmount === 0 ? "" : targetAmount}
                onChange={(e) => handleTargetChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                placeholder="0"
              />
            </div>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              value={targetAmount}
              onChange={(e) => handleTargetChange(e.target.value)}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>₹1 Lakh</span>
              <span>₹5 Crore</span>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div
        className={`p-6 rounded-2xl ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
      >
        <div className="text-center mb-6">
          <h2
            className={`text-2xl font-bold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}
          >
            Investment Summary
          </h2>
          <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
            Here's what your investment could grow to
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
            >
              Total Investment
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}
            >
              ₹{formatIndianCurrency(results.totalInvestment)}
            </p>
          </div>
          <div
            className={`p-4 rounded-xl ${theme === "light" ? "bg-green-50" : "bg-green-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-green-600" : "text-green-300"}`}
            >
              Total Returns
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-green-700" : "text-green-200"}`}
            >
              ₹{formatIndianCurrency(results.totalReturns)}
            </p>
          </div>
        </div>
        <div
          className={`mt-4 p-4 rounded-xl ${theme === "light" ? "bg-purple-50" : "bg-purple-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-purple-600" : "text-purple-300"}`}
          >
            Maturity Value
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-purple-700" : "text-purple-200"}`}
          >
            ₹{formatIndianCurrency(results.maturityValue)}
          </p>
        </div>
        {showGoalPlanner && (
          <div
            className={`mt-4 p-4 rounded-xl ${theme === "light" ? "bg-orange-50" : "bg-orange-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-orange-600" : "text-orange-300"}`}
            >
              Required Monthly SIP
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-orange-700" : "text-orange-200"}`}
            >
              ₹{formatIndianCurrency(results.monthlyInvestmentForGoal)}
            </p>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/contact")}
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" /> Start Investment
      </motion.button>
    </div>
  );
}

// ==================== LIMITED PERIOD SIP CALCULATOR ====================
const investmentGoals = [
  {
    name: "Short Term Goal",
    amount: 500000,
    description: "Save for a short-term goal like a gadget or vacation",
  },
  {
    name: "Medium Term Goal",
    amount: 2000000,
    description: "Plan for a medium-term goal like a car or home renovation",
  },
  {
    name: "Long Term Goal",
    amount: 5000000,
    description: "Achieve a significant long-term financial goal",
  },
  {
    name: "Custom Goal",
    amount: 1000000,
    description: "Set your own investment target",
  },
];

function LimitedPeriodSIPCalculator({ theme }: { theme: string }) {
  const router = useRouter();
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [selectedGoal, setSelectedGoal] = useState(investmentGoals[1]);
  const [results, setResults] = useState({
    totalInvestment: 600000,
    totalReturns: 516840,
    maturityAmount: 1116840,
    monthlyInvestmentNeeded: 9600,
  });

  useEffect(() => {
    const monthly = Number(monthlyInvestment) || 0;
    const period = Number(investmentPeriod) || 0;
    const returnRate = Number(expectedReturn) || 0;

    if (monthly <= 0 || period <= 0 || returnRate <= 0) {
      setResults({
        totalInvestment: monthly * period * 12,
        totalReturns: 0,
        maturityAmount: monthly * period * 12,
        monthlyInvestmentNeeded: 0,
      });
      return;
    }

    const months = period * 12;
    const monthlyRate = returnRate / 12 / 100;
    const futureValue =
      monthly *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const totalInvestment = monthly * months;
    const totalReturns = futureValue - totalInvestment;
    const goalAmount = selectedGoal.amount;
    let requiredMonthlyInvestment = 0;
    if (goalAmount > 0 && monthlyRate > 0 && months > 0) {
      requiredMonthlyInvestment =
        goalAmount /
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));
    }
    setResults({
      totalInvestment,
      totalReturns,
      maturityAmount: futureValue,
      monthlyInvestmentNeeded: requiredMonthlyInvestment,
    });
  }, [monthlyInvestment, investmentPeriod, expectedReturn, selectedGoal]);

  const handleInvestmentChange = (value: string | number) => {
    if (typeof value === "string") {
      const cleanValue = value.replace(/^0+/, "") || "0";
      setMonthlyInvestment(parseInt(cleanValue, 10));
    } else {
      setMonthlyInvestment(value);
    }
  };

  const handlePeriodChange = (value: string | number) => {
    if (typeof value === "string") {
      const cleanValue = value.replace(/^0+/, "") || "0";
      setInvestmentPeriod(parseInt(cleanValue, 10));
    } else {
      setInvestmentPeriod(value);
    }
  };

  const handleReturnChange = (value: string | number) => {
    if (typeof value === "string") {
      const cleanValue = value.replace(/^0+/, "") || "0";
      setExpectedReturn(parseFloat(cleanValue));
    } else {
      setExpectedReturn(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          className={`block text-sm font-medium mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Investment Goal
        </label>
        <div className="grid grid-cols-2 gap-3">
          {investmentGoals.map((goal) => (
            <button
              key={goal.name}
              onClick={() => setSelectedGoal(goal)}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${selectedGoal.name === goal.name ? "bg-blue-500 text-white" : theme === "light" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-gray-700 text-gray-200 hover:bg-gray-600"} transition-all duration-200`}
            >
              <Calendar className="w-4 h-4" /> {goal.name}
            </button>
          ))}
        </div>
        <p
          className={`mt-2 text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
        >
          {selectedGoal.description}
        </p>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Monthly Investment
        </label>
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={monthlyInvestment === 0 ? "" : monthlyInvestment}
            onChange={(e) => handleInvestmentChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Investment Period (Years)
        </label>
        <input
          type="text"
          value={investmentPeriod === 0 ? "" : investmentPeriod}
          onChange={(e) => handlePeriodChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
          placeholder="0"
        />
        <input
          type="range"
          min="1"
          max="10"
          value={investmentPeriod}
          onChange={(e) => handlePeriodChange(e.target.value)}
          className="w-full mt-2"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>1 year</span>
          <span>10 years</span>
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Expected Return (%)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={expectedReturn === 0 ? "" : expectedReturn}
            onChange={(e) => handleReturnChange(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <span className="text-gray-500">%</span>
        </div>
        <input
          type="range"
          min="8"
          max="20"
          step="0.5"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(Number(e.target.value))}
          className="w-full mt-2"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>8%</span>
          <span>20%</span>
        </div>
      </div>

      <div
        className={`p-6 rounded-2xl ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
      >
        <div className="text-center mb-6">
          <h2
            className={`text-2xl font-bold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}
          >
            Investment Summary
          </h2>
        </div>
        <div
          className={`p-4 rounded-xl mb-4 ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
          >
            Maturity Amount
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}
          >
            ₹{formatIndianCurrency(results.maturityAmount)}
          </p>
          <p
            className={`text-sm mt-2 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
          >
            after {investmentPeriod} years
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl ${theme === "light" ? "bg-green-50" : "bg-green-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-green-600" : "text-green-300"}`}
            >
              Total Investment
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-green-700" : "text-green-200"}`}
            >
              ₹{formatIndianCurrency(results.totalInvestment)}
            </p>
          </div>
          <div
            className={`p-4 rounded-xl ${theme === "light" ? "bg-orange-50" : "bg-orange-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-orange-600" : "text-orange-300"}`}
            >
              Total Returns
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-orange-700" : "text-orange-200"}`}
            >
              ₹{formatIndianCurrency(results.totalReturns)}
            </p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/contact")}
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" /> Start Limited Period SIP
      </motion.button>
    </div>
  );
}

// ==================== EDUCATION CALCULATOR ====================
const educationCosts = [
  { name: "Engineering", cost: 2000000 },
  { name: "Medical", cost: 5000000 },
  { name: "MBA", cost: 3500000 },
  { name: "Liberal Arts", cost: 1500000 },
  { name: "Overseas Education", cost: 10000000 },
];

function EducationCalculator({ theme }: { theme: string }) {
  const router = useRouter();
  const [currentCost, setCurrentCost] = useState(2000000);
  const [childAge, setChildAge] = useState(5);
  const [educationAge, setEducationAge] = useState(18);
  const [expectedInflation, setExpectedInflation] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [results, setResults] = useState({
    futureEducationCost: 4792320,
    monthlyInvestmentNeeded: 14050,
    totalInvestment: 2191800,
    totalReturns: 2600520,
  });

  useEffect(() => {
    const cost = Number(currentCost) || 0,
      cAge = Number(childAge) || 0,
      eAge = Number(educationAge) || 0,
      inflation = Number(expectedInflation) || 0,
      returnRate = Number(expectedReturn) || 0;
    if (cost <= 0 || cAge >= eAge || inflation <= 0 || returnRate <= 0) {
      setResults({
        futureEducationCost: cost,
        monthlyInvestmentNeeded: 0,
        totalInvestment: 0,
        totalReturns: 0,
      });
      return;
    }
    const yearsToEducation = eAge - cAge;
    const futureEducationCost =
      cost * Math.pow(1 + inflation / 100, yearsToEducation);
    const monthlyRate = returnRate / 12 / 100;
    const months = yearsToEducation * 12;
    let monthlyInvestmentNeeded = 0;
    if (monthlyRate > 0 && months > 0) {
      monthlyInvestmentNeeded =
        futureEducationCost /
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));
    }
    const totalInvestment = monthlyInvestmentNeeded * months;
    const totalReturns = futureEducationCost - totalInvestment;
    setResults({
      futureEducationCost,
      monthlyInvestmentNeeded: Math.ceil(monthlyInvestmentNeeded),
      totalInvestment,
      totalReturns,
    });
  }, [currentCost, childAge, educationAge, expectedInflation, expectedReturn]);

  const handleCostChange = (value: string | number) => {
    if (typeof value === "string") {
      const cleanValue = value.replace(/^0+/, "") || "0";
      setCurrentCost(parseInt(cleanValue, 10));
    } else {
      setCurrentCost(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          className={`block text-sm font-medium mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Quick Course Selection
        </label>
        <div className="grid grid-cols-2 gap-3">
          {educationCosts.map((edu) => (
            <button
              key={edu.name}
              onClick={() => setCurrentCost(edu.cost)}
              className={`p-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${currentCost === edu.cost ? "bg-blue-500 text-white" : theme === "light" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-gray-700 text-gray-200 hover:bg-gray-600"} transition-all duration-200`}
            >
              <School className="w-4 h-4" /> {edu.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Current Education Cost
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={currentCost === 0 ? "" : currentCost}
              onChange={(e) => handleCostChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              placeholder="0"
            />
          </div>
          <input
            type="range"
            min="500000"
            max="15000000"
            step="100000"
            value={currentCost}
            onChange={(e) => handleCostChange(e.target.value)}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Child's Current Age
          </label>
          <input
            type="text"
            value={childAge === 0 ? "" : childAge}
            onChange={(e) =>
              setChildAge(parseInt(e.target.value.replace(/^0+/, "") || "0"))
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <input
            type="range"
            min="0"
            max="15"
            value={childAge}
            onChange={(e) => setChildAge(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Education Age
          </label>
          <input
            type="text"
            value={educationAge === 0 ? "" : educationAge}
            onChange={(e) =>
              setEducationAge(
                parseInt(e.target.value.replace(/^0+/, "") || "0"),
              )
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <input
            type="range"
            min="15"
            max="25"
            value={educationAge}
            onChange={(e) => setEducationAge(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Expected Inflation (%)
          </label>
          <input
            type="text"
            value={expectedInflation === 0 ? "" : expectedInflation}
            onChange={(e) =>
              setExpectedInflation(
                parseFloat(e.target.value.replace(/^0+/, "") || "0"),
              )
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={expectedInflation}
            onChange={(e) => setExpectedInflation(parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Expected Investment Returns (%)
        </label>
        <input
          type="text"
          value={expectedReturn === 0 ? "" : expectedReturn}
          onChange={(e) =>
            setExpectedReturn(
              parseFloat(e.target.value.replace(/^0+/, "") || "0"),
            )
          }
          className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
          placeholder="0"
        />
        <input
          type="range"
          min="6"
          max="15"
          step="0.5"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div
        className={`p-6 rounded-2xl ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
      >
        <div className="text-center mb-6">
          <h2
            className={`text-2xl font-bold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}
          >
            Education Planning Summary
          </h2>
        </div>
        <div
          className={`p-4 rounded-xl mb-4 ${theme === "light" ? "bg-purple-50" : "bg-purple-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-purple-600" : "text-purple-300"}`}
          >
            Future Education Cost
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-purple-700" : "text-purple-200"}`}
          >
            ₹{formatIndianCurrency(results.futureEducationCost)}
          </p>
        </div>
        <div
          className={`p-4 rounded-xl mb-4 ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
          >
            Monthly Investment Needed
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}
          >
            ₹{formatIndianCurrency(results.monthlyInvestmentNeeded)}
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/contact")}
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" /> Start Education Planning
      </motion.button>
    </div>
  );
}

// ==================== MARRIAGE CALCULATOR ====================
const marriageExpenses = [
  { name: "Simple Wedding", cost: 1500000 },
  { name: "Moderate Wedding", cost: 2500000 },
  { name: "Grand Wedding", cost: 5000000 },
  { name: "Luxury Wedding", cost: 10000000 },
  { name: "Destination Wedding", cost: 15000000 },
];

function MarriageCalculator({ theme }: { theme: string }) {
  const router = useRouter();
  const [currentCost, setCurrentCost] = useState(2500000);
  const [childAge, setChildAge] = useState(5);
  const [marriageAge, setMarriageAge] = useState(25);
  const [expectedInflation, setExpectedInflation] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [results, setResults] = useState({
    futureMarriageCost: 8046639,
    monthlyInvestmentNeeded: 21598,
    totalInvestment: 4319600,
    totalReturns: 3727039,
  });

  useEffect(() => {
    const cost = Number(currentCost) || 0,
      cAge = Number(childAge) || 0,
      mAge = Number(marriageAge) || 0,
      inflation = Number(expectedInflation) || 0,
      returnRate = Number(expectedReturn) || 0;
    if (cost <= 0 || cAge >= mAge || inflation <= 0 || returnRate <= 0) {
      setResults({
        futureMarriageCost: cost,
        monthlyInvestmentNeeded: 0,
        totalInvestment: 0,
        totalReturns: 0,
      });
      return;
    }
    const yearsToMarriage = mAge - cAge;
    const futureMarriageCost =
      cost * Math.pow(1 + inflation / 100, yearsToMarriage);
    const monthlyRate = returnRate / 12 / 100;
    const months = yearsToMarriage * 12;
    let monthlyInvestmentNeeded = 0;
    if (monthlyRate > 0 && months > 0) {
      monthlyInvestmentNeeded =
        futureMarriageCost /
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));
    }
    setResults({
      futureMarriageCost,
      monthlyInvestmentNeeded: Math.ceil(monthlyInvestmentNeeded),
      totalInvestment: monthlyInvestmentNeeded * months,
      totalReturns: futureMarriageCost - monthlyInvestmentNeeded * months,
    });
  }, [currentCost, childAge, marriageAge, expectedInflation, expectedReturn]);

  return (
    <div className="space-y-6">
      <div>
        <label
          className={`block text-sm font-medium mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Wedding Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {marriageExpenses.map((wedding) => (
            <button
              key={wedding.name}
              onClick={() => setCurrentCost(wedding.cost)}
              className={`p-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${currentCost === wedding.cost ? "bg-blue-500 text-white" : theme === "light" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-gray-700 text-gray-200 hover:bg-gray-600"} transition-all duration-200`}
            >
              <Heart className="w-4 h-4" /> {wedding.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Wedding Cost
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={currentCost === 0 ? "" : currentCost}
              onChange={(e) =>
                setCurrentCost(
                  parseInt(e.target.value.replace(/^0+/, "") || "0"),
                )
              }
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Child's Age
          </label>
          <input
            type="text"
            value={childAge === 0 ? "" : childAge}
            onChange={(e) =>
              setChildAge(parseInt(e.target.value.replace(/^0+/, "") || "0"))
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Marriage Age
          </label>
          <input
            type="text"
            value={marriageAge === 0 ? "" : marriageAge}
            onChange={(e) =>
              setMarriageAge(parseInt(e.target.value.replace(/^0+/, "") || "0"))
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Inflation (%)
          </label>
          <input
            type="text"
            value={expectedInflation === 0 ? "" : expectedInflation}
            onChange={(e) =>
              setExpectedInflation(
                parseFloat(e.target.value.replace(/^0+/, "") || "0"),
              )
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Expected Returns (%)
        </label>
        <input
          type="text"
          value={expectedReturn === 0 ? "" : expectedReturn}
          onChange={(e) =>
            setExpectedReturn(
              parseFloat(e.target.value.replace(/^0+/, "") || "0"),
            )
          }
          className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
          placeholder="0"
        />
      </div>

      <div
        className={`p-6 rounded-2xl ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
      >
        <div
          className={`p-4 rounded-xl mb-4 ${theme === "light" ? "bg-purple-50" : "bg-purple-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-purple-600" : "text-purple-300"}`}
          >
            Future Wedding Cost
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-purple-700" : "text-purple-200"}`}
          >
            ₹{formatIndianCurrency(results.futureMarriageCost)}
          </p>
        </div>
        <div
          className={`p-4 rounded-xl ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
          >
            Monthly Investment Needed
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}
          >
            ₹{formatIndianCurrency(results.monthlyInvestmentNeeded)}
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/contact")}
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" /> Start Marriage Planning
      </motion.button>
    </div>
  );
}

// ==================== RETIREMENT CALCULATOR ====================
function RetirementCalculator({ theme }: { theme: string }) {
  const router = useRouter();
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState(50000);
  const [expectedInflation, setExpectedInflation] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [results, setResults] = useState({
    retirementCorpus: 43905618,
    monthlyInvestmentNeeded: 22875,
    totalInvestment: 6862500,
    totalReturns: 36543118,
  });

  useEffect(() => {
    const cAge = Number(currentAge) || 0,
      rAge = Number(retirementAge) || 0,
      monthlyExpenses = Number(currentMonthlyExpenses) || 0,
      inflation = Number(expectedInflation) || 0,
      returnRate = Number(expectedReturn) || 0,
      savings = Number(currentSavings) || 0;
    if (
      cAge >= rAge ||
      monthlyExpenses <= 0 ||
      inflation <= 0 ||
      returnRate <= 0
    )
      return;
    const yearsToRetirement = rAge - cAge;
    const yearsInRetirement = 30;
    const futureMonthlyExpenses =
      monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetirement);
    const monthlyRate = inflation / 12 / 100;
    const months = yearsInRetirement * 12;
    const retirementCorpus =
      futureMonthlyExpenses *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const investmentMonthlyRate = returnRate / 12 / 100;
    const investmentMonths = yearsToRetirement * 12;
    let monthlyInvestmentNeeded = 0;
    if (investmentMonthlyRate > 0 && investmentMonths > 0) {
      monthlyInvestmentNeeded =
        (retirementCorpus - savings) /
        (((Math.pow(1 + investmentMonthlyRate, investmentMonths) - 1) /
          investmentMonthlyRate) *
          (1 + investmentMonthlyRate));
    }
    setResults({
      retirementCorpus,
      monthlyInvestmentNeeded: Math.ceil(monthlyInvestmentNeeded),
      totalInvestment: monthlyInvestmentNeeded * investmentMonths,
      totalReturns:
        retirementCorpus - monthlyInvestmentNeeded * investmentMonths - savings,
    });
  }, [
    currentAge,
    retirementAge,
    currentMonthlyExpenses,
    expectedInflation,
    expectedReturn,
    currentSavings,
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Current Age
          </label>
          <input
            type="text"
            value={currentAge === 0 ? "" : currentAge}
            onChange={(e) =>
              setCurrentAge(parseInt(e.target.value.replace(/^0+/, "") || "0"))
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <input
            type="range"
            min="25"
            max="55"
            value={currentAge}
            onChange={(e) => setCurrentAge(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Retirement Age
          </label>
          <input
            type="text"
            value={retirementAge === 0 ? "" : retirementAge}
            onChange={(e) =>
              setRetirementAge(
                parseInt(e.target.value.replace(/^0+/, "") || "0"),
              )
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <input
            type="range"
            min="55"
            max="70"
            value={retirementAge}
            onChange={(e) => setRetirementAge(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Monthly Expenses
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={currentMonthlyExpenses === 0 ? "" : currentMonthlyExpenses}
              onChange={(e) =>
                setCurrentMonthlyExpenses(
                  parseInt(e.target.value.replace(/^0+/, "") || "0"),
                )
              }
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Current Savings
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={currentSavings === 0 ? "" : currentSavings}
              onChange={(e) =>
                setCurrentSavings(
                  parseInt(e.target.value.replace(/^0+/, "") || "0"),
                )
              }
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Inflation (%)
          </label>
          <input
            type="text"
            value={expectedInflation === 0 ? "" : expectedInflation}
            onChange={(e) =>
              setExpectedInflation(
                parseFloat(e.target.value.replace(/^0+/, "") || "0"),
              )
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Returns (%)
          </label>
          <input
            type="text"
            value={expectedReturn === 0 ? "" : expectedReturn}
            onChange={(e) =>
              setExpectedReturn(
                parseFloat(e.target.value.replace(/^0+/, "") || "0"),
              )
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
      </div>

      <div
        className={`p-6 rounded-2xl ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
      >
        <div
          className={`p-4 rounded-xl mb-4 ${theme === "light" ? "bg-purple-50" : "bg-purple-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-purple-600" : "text-purple-300"}`}
          >
            Required Retirement Corpus
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-purple-700" : "text-purple-200"}`}
          >
            ₹{formatIndianCurrency(results.retirementCorpus)}
          </p>
        </div>
        <div
          className={`p-4 rounded-xl ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
          >
            Monthly Investment Needed
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}
          >
            ₹{formatIndianCurrency(results.monthlyInvestmentNeeded)}
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/contact")}
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" /> Start Retirement Planning
      </motion.button>
    </div>
  );
}

// ==================== VACATION CALCULATOR ====================
const destinations = [
  {
    name: "Domestic Trip",
    cost: 100000,
    currency: "INR",
    peakSeason: "Oct-Mar",
    offSeason: "Apr-Sep",
    description: "Explore India's diverse landscapes",
  },
  {
    name: "South East Asia",
    cost: 200000,
    currency: "INR",
    peakSeason: "Nov-Feb",
    offSeason: "Jun-Sep",
    description: "Experience tropical beaches",
  },
  {
    name: "Europe",
    cost: 400000,
    currency: "EUR",
    rate: 90,
    peakSeason: "Jun-Aug",
    offSeason: "Nov-Mar",
    description: "Discover historic cities",
  },
  {
    name: "USA/Canada",
    cost: 600000,
    currency: "USD",
    rate: 83,
    peakSeason: "Jun-Aug",
    offSeason: "Dec-Feb",
    description: "Explore iconic cities",
  },
];

function VacationCalculator({ theme }: { theme: string }) {
  const router = useRouter();
  const [tripCost, setTripCost] = useState(200000);
  const [monthsToTrip, setMonthsToTrip] = useState(12);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [selectedDestination, setSelectedDestination] = useState(
    destinations[0],
  );
  const [results, setResults] = useState({
    monthlyInvestmentNeeded: 16389,
    totalInvestment: 196668,
    totalReturns: 63332,
  });

  useEffect(() => {
    const cost = Number(tripCost) || 0,
      months = Number(monthsToTrip) || 0,
      returnRate = Number(expectedReturn) || 0;
    if (cost <= 0 || months <= 0 || returnRate <= 0) return;
    const monthlyRate = returnRate / 12 / 100;
    let monthlyInvestmentNeeded = 0;
    if (monthlyRate > 0 && months > 0) {
      monthlyInvestmentNeeded =
        cost /
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate));
    }
    setResults({
      monthlyInvestmentNeeded: Math.ceil(monthlyInvestmentNeeded),
      totalInvestment: monthlyInvestmentNeeded * months,
      totalReturns: cost - monthlyInvestmentNeeded * months,
    });
  }, [tripCost, monthsToTrip, expectedReturn]);

  return (
    <div className="space-y-6">
      <div>
        <label
          className={`block text-sm font-medium mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Destination
        </label>
        <div className="grid grid-cols-2 gap-3">
          {destinations.map((dest) => (
            <button
              key={dest.name}
              onClick={() => {
                setSelectedDestination(dest);
                setTripCost(dest.cost);
              }}
              className={`p-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${selectedDestination.name === dest.name ? "bg-blue-500 text-white" : theme === "light" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-gray-700 text-gray-200 hover:bg-gray-600"} transition-all duration-200`}
            >
              <Plane className="w-4 h-4" /> {dest.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Trip Cost
        </label>
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={tripCost === 0 ? "" : tripCost}
            onChange={(e) =>
              setTripCost(parseInt(e.target.value.replace(/^0+/, "") || "0"))
            }
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
      </div>
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Months to Trip
        </label>
        <input
          type="text"
          value={monthsToTrip === 0 ? "" : monthsToTrip}
          onChange={(e) =>
            setMonthsToTrip(parseInt(e.target.value.replace(/^0+/, "") || "0"))
          }
          className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
          placeholder="0"
        />
        <input
          type="range"
          min="3"
          max="60"
          value={monthsToTrip}
          onChange={(e) => setMonthsToTrip(parseInt(e.target.value))}
          className="w-full mt-2"
        />
      </div>
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Expected Returns (%)
        </label>
        <input
          type="text"
          value={expectedReturn === 0 ? "" : expectedReturn}
          onChange={(e) =>
            setExpectedReturn(
              parseFloat(e.target.value.replace(/^0+/, "") || "0"),
            )
          }
          className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
          placeholder="0"
        />
        <input
          type="range"
          min="4"
          max="12"
          step="0.5"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div
        className={`p-6 rounded-2xl ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
      >
        <div
          className={`p-4 rounded-xl mb-4 ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
          >
            Monthly Investment Needed
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}
          >
            ₹{formatIndianCurrency(results.monthlyInvestmentNeeded)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl ${theme === "light" ? "bg-green-50" : "bg-green-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-green-600" : "text-green-300"}`}
            >
              Total Investment
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-green-700" : "text-green-200"}`}
            >
              ₹{formatIndianCurrency(results.totalInvestment)}
            </p>
          </div>
          <div
            className={`p-4 rounded-xl ${theme === "light" ? "bg-orange-50" : "bg-orange-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-orange-600" : "text-orange-300"}`}
            >
              Returns
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-orange-700" : "text-orange-200"}`}
            >
              ₹{formatIndianCurrency(results.totalReturns)}
            </p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/contact")}
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" /> Start Vacation Planning
      </motion.button>
    </div>
  );
}

// ==================== INSURANCE CALCULATOR ====================
const riskProfiles = [
  { name: "Conservative", return: 8 },
  { name: "Moderate", return: 12 },
  { name: "Aggressive", return: 15 },
];

function InsuranceCalculator({ theme }: { theme: string }) {
  const router = useRouter();
  const [age, setAge] = useState(30);
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [dependents, setDependents] = useState(2);
  const [liabilities, setLiabilities] = useState(5000000);
  const [results, setResults] = useState({
    recommendedCover: 14500000,
    monthlyPremium: 2610,
  });

  useEffect(() => {
    const currentAge = Number(age) || 0,
      income = Number(annualIncome) || 0,
      dependentCount = Number(dependents) || 0,
      liabilityAmount = Number(liabilities) || 0;
    if (income <= 0) return;
    const recommendedCover = Math.max(income * 10, liabilityAmount * 1.5);
    const basePremiumRate = 0.0005;
    const ageFactor = 1 + (currentAge - 30) * 0.02;
    const monthlyPremium =
      (recommendedCover * basePremiumRate * ageFactor) / 12;
    setResults({ recommendedCover, monthlyPremium });
  }, [age, annualIncome, dependents, liabilities]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Age
          </label>
          <input
            type="text"
            value={age === 0 ? "" : age}
            onChange={(e) =>
              setAge(parseInt(e.target.value.replace(/^0+/, "") || "0"))
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
          <input
            type="range"
            min="18"
            max="65"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Annual Income
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={annualIncome === 0 ? "" : annualIncome}
              onChange={(e) =>
                setAnnualIncome(
                  parseInt(e.target.value.replace(/^0+/, "") || "0"),
                )
              }
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Dependents
          </label>
          <input
            type="text"
            value={dependents === 0 ? "" : dependents}
            onChange={(e) =>
              setDependents(parseInt(e.target.value.replace(/^0+/, "") || "0"))
            }
            className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
          >
            Liabilities
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={liabilities === 0 ? "" : liabilities}
              onChange={(e) =>
                setLiabilities(
                  parseInt(e.target.value.replace(/^0+/, "") || "0"),
                )
              }
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div
        className={`p-6 rounded-2xl ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
      >
        <div
          className={`p-4 rounded-xl mb-4 ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
          >
            Recommended Coverage
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}
          >
            ₹{formatIndianCurrency(results.recommendedCover)}
          </p>
        </div>
        <div
          className={`p-4 rounded-xl ${theme === "light" ? "bg-green-50" : "bg-green-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-green-600" : "text-green-300"}`}
          >
            Estimated Monthly Premium
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-green-700" : "text-green-200"}`}
          >
            ₹{formatIndianCurrency(results.monthlyPremium)}
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/contact")}
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Shield className="w-5 h-5" /> Start Insurance Process
      </motion.button>
    </div>
  );
}

// ==================== LUMPSUM CALCULATOR ====================
function LumpsumCalculator({ theme }: { theme: string }) {
  const router = useRouter();
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [results, setResults] = useState({
    maturityAmount: 0,
    totalInvestment: 0,
    totalReturns: 0,
  });

  useEffect(() => {
    const amount = Number(investmentAmount) || 0,
      period = Number(investmentPeriod) || 0,
      returnRate = Number(expectedReturn) || 0;
    const rate = returnRate / 100;
    const maturityAmount = amount * Math.pow(1 + rate, period);
    setResults({
      maturityAmount,
      totalInvestment: amount,
      totalReturns: maturityAmount - amount,
    });
  }, [investmentAmount, investmentPeriod, expectedReturn]);

  return (
    <div className="space-y-6">
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Investment Amount
        </label>
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={investmentAmount === 0 ? "" : investmentAmount}
            onChange={(e) =>
              setInvestmentAmount(
                parseInt(e.target.value.replace(/^0+/, "") || "0"),
              )
            }
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
            placeholder="0"
          />
        </div>
      </div>
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Investment Period (Years)
        </label>
        <input
          type="text"
          value={investmentPeriod === 0 ? "" : investmentPeriod}
          onChange={(e) =>
            setInvestmentPeriod(
              parseInt(e.target.value.replace(/^0+/, "") || "0"),
            )
          }
          className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
          placeholder="0"
        />
        <input
          type="range"
          min="1"
          max="30"
          value={investmentPeriod}
          onChange={(e) => setInvestmentPeriod(parseInt(e.target.value))}
          className="w-full mt-2"
        />
      </div>
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}
        >
          Expected Returns (%)
        </label>
        <input
          type="text"
          value={expectedReturn === 0 ? "" : expectedReturn}
          onChange={(e) =>
            setExpectedReturn(
              parseFloat(e.target.value.replace(/^0+/, "") || "0"),
            )
          }
          className={`w-full px-4 py-3 rounded-lg border ${theme === "light" ? "border-gray-200 focus:border-blue-500" : "border-gray-600 focus:border-blue-400 bg-gray-700"} focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
          placeholder="0"
        />
        <input
          type="range"
          min="1"
          max="30"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div
        className={`p-6 rounded-2xl ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
      >
        <div
          className={`p-4 rounded-xl mb-4 ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}
        >
          <p
            className={`text-sm mb-1 ${theme === "light" ? "text-blue-600" : "text-blue-300"}`}
          >
            Maturity Amount
          </p>
          <p
            className={`text-3xl font-bold ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}
          >
            ₹{formatIndianCurrency(results.maturityAmount)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl ${theme === "light" ? "bg-green-50" : "bg-green-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-green-600" : "text-green-300"}`}
            >
              Total Investment
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-green-700" : "text-green-200"}`}
            >
              ₹{formatIndianCurrency(results.totalInvestment)}
            </p>
          </div>
          <div
            className={`p-4 rounded-xl ${theme === "light" ? "bg-purple-50" : "bg-purple-900/20"}`}
          >
            <p
              className={`text-sm mb-1 ${theme === "light" ? "text-purple-600" : "text-purple-300"}`}
            >
              Total Returns
            </p>
            <p
              className={`text-2xl font-bold ${theme === "light" ? "text-purple-700" : "text-purple-200"}`}
            >
              ₹{formatIndianCurrency(results.totalReturns)}
            </p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/contact")}
        className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" /> Start Investing Now
      </motion.button>
    </div>
  );
}

// ==================== MAIN PAGE ====================
const calculatorsList = [
  {
    id: "sip",
    title: "SIP Calculator",
    icon: Calculator,
    component: SIPCalculator,
  },
  {
    id: "limited-period",
    title: "Limited Period SIP",
    icon: Clock,
    component: LimitedPeriodSIPCalculator,
  },
  {
    id: "education",
    title: "Education Planning",
    icon: GraduationCap,
    component: EducationCalculator,
  },
  {
    id: "marriage",
    title: "Marriage Planning",
    icon: Heart,
    component: MarriageCalculator,
  },
  {
    id: "retirement",
    title: "Retirement Planning",
    icon: Wallet,
    component: RetirementCalculator,
  },
  {
    id: "vacation",
    title: "Vacation Planning",
    icon: Plane,
    component: VacationCalculator,
  },
  {
    id: "insurance",
    title: "Life Insurance",
    icon: Shield,
    component: InsuranceCalculator,
  },
  {
    id: "lumpsum",
    title: "Lumpsum",
    icon: PiggyBank,
    component: LumpsumCalculator,
  },
];

export default function CalculatorsPage() {
  const { theme } = useTheme();
  const [activeCalculator, setActiveCalculator] = useState(calculatorsList[0]);

  const ActiveComponent = activeCalculator.component;

  return (
    <div className={theme === "light" ? "bg-gray-50" : "bg-gray-950"}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className={`absolute h-[300px] w-[300px] rounded-full blur-3xl ${theme === "light" ? "bg-blue-400/20" : "bg-blue-500/10"}`}
              style={{ left: `${20 + i * 30}%`, top: `${20 + i * 20}%` }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <NavBar />

        <main className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}
            >
              Financial Calculators
            </h1>
            <p
              className={`text-xl max-w-3xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
            >
              Plan your financial future with our comprehensive suite of
              calculators
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
            {/* Left Sidebar - Calculator Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div
                className={`sticky top-24 rounded-2xl overflow-hidden ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
              >
                <div
                  className={`p-4 border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}
                >
                  <h2
                    className={`font-semibold text-lg ${theme === "light" ? "text-gray-800" : "text-white"}`}
                  >
                    Calculator Types
                  </h2>
                  <p
                    className={`text-sm mt-1 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Select a calculator to get started
                  </p>
                </div>
                <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
                  {calculatorsList.map((calc, index) => {
                    const Icon = calc.icon;
                    const isActive = activeCalculator.id === calc.id;
                    return (
                      <motion.button
                        key={calc.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setActiveCalculator(calc)}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${isActive ? (theme === "light" ? "bg-blue-50 border-l-4 border-blue-500" : "bg-blue-900/30 border-l-4 border-blue-500") : theme === "light" ? "hover:bg-gray-50 border-l-4 border-transparent" : "hover:bg-gray-700/50 border-l-4 border-transparent"}`}
                      >
                        <div
                          className={`p-2 rounded-lg ${isActive ? (theme === "light" ? "bg-blue-100" : "bg-blue-800/50") : theme === "light" ? "bg-gray-100" : "bg-gray-700"}`}
                        >
                          <Icon
                            className={`w-5 h-5 ${isActive ? (theme === "light" ? "text-blue-600" : "text-blue-400") : theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p
                            className={`font-medium text-sm ${isActive ? (theme === "light" ? "text-blue-700" : "text-blue-300") : theme === "light" ? "text-gray-700" : "text-gray-200"}`}
                          >
                            {calc.title}
                          </p>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 ${isActive ? (theme === "light" ? "text-blue-500" : "text-blue-400") : theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Active Calculator */}
            <motion.div
              key={activeCalculator.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div
                className={`rounded-2xl p-6 ${theme === "light" ? "bg-white shadow-lg" : "bg-gray-800/50 backdrop-blur-sm"}`}
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div
                    className={`p-3 rounded-xl ${theme === "light" ? "bg-blue-100" : "bg-blue-900/30"}`}
                  >
                    {activeCalculator.icon && (
                      <activeCalculator.icon
                        className={`w-6 h-6 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`}
                      />
                    )}
                  </div>
                  <div>
                    <h2
                      className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}
                    >
                      {activeCalculator.title}
                    </h2>
                    <p
                      className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                    >
                      Fill in the details to calculate
                    </p>
                  </div>
                </div>
                <ActiveComponent theme={theme} />
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
