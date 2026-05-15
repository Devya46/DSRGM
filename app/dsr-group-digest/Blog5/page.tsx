"use client";

import { useTheme } from "@/context/theme-context";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  HomeIcon,
  HeartIcon,
  BanknotesIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

// Image paths from public folder
const heroBgImage = "/Retirement Planning.png";
const compoundingImage = "/RI-4.jpg";
const expensesImage = "/RI-2.jpg";
const investmentOptionsImage = "/RI-3.png";

export default function RetirementPlanningPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />

      {/* Hero Section with Background Image */}
      <section className="relative h-[320px] md:h-[380px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBgImage}
            alt="Retirement Planning Hero Background"
            fill
            className="object-cover brightness-35"
            priority
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/30 backdrop-blur-sm border border-emerald-400/40 mb-4">
            <span className="text-emerald-200 text-sm font-medium">
              Personal Finance
            </span>
            <span className="text-emerald-300 text-xs">•</span>
            <span className="text-emerald-200 text-sm">
              Retirement Planning
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Retirement Planning: <br />
            Start Early, Retire Comfortably
          </h1>
          <div className="flex flex-wrap gap-5 text-gray-200 justify-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">September 5, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">6 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">Personal Finance</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Retirement may seem far away when you are focused on building a
            career, managing expenses, or achieving short-term financial goals.
            However, one of the most effective ways to build long-term financial
            security is to start retirement planning as early as possible.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Early planning not only reduces financial stress later in life but
            also gives your investments more time to grow through the power of
            compounding. A well-structured retirement strategy can help you
            maintain your lifestyle, handle medical expenses, and enjoy
            financial independence during your retirement years.
          </p>
        </div>

        {/* Why Retirement Planning Matters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Why Retirement Planning Matters
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Many people assume that savings alone will be enough after
            retirement. In reality, increasing living costs, inflation, and
            healthcare expenses can quickly reduce financial stability.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Benefits of Retirement Planning
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Financial independence after retirement</li>
            <li>Reduced dependency on family members</li>
            <li>Better preparation for medical emergencies</li>
            <li>Peace of mind and long-term stability</li>
            <li>Ability to maintain your preferred lifestyle</li>
          </ul>
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic">
              Planning ahead allows you to create a strong financial foundation
              for the future.
            </p>
          </div>
        </section>

        {/* The Advantage of Starting Early */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            The Advantage of Starting Early
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            One of the biggest advantages of early retirement planning is
            compound growth.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={compoundingImage}
              alt="Compound Growth"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            How Compounding Works
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            When you invest regularly over a long period:
          </p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Your investment earns returns.</li>
            <li>Those returns begin generating additional returns.</li>
            <li>Wealth grows exponentially over time.</li>
          </ul>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Even small investments made early can grow significantly over
              several decades. For example, someone who starts investing in
              their 20s may accumulate substantially more wealth than someone
              who begins in their 40s, even with similar monthly contributions.
            </p>
          </div>
        </section>

        {/* Setting Retirement Goals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Setting Retirement Goals
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Before investing, it is important to define clear retirement
            objectives.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Consider These Questions
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "What age do you want to retire?",
              "What lifestyle do you expect after retirement?",
              "What will your monthly expenses look like?",
              "Will you have healthcare or dependent-related costs?",
              "Do you plan to travel or pursue hobbies?",
            ].map((question, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1"
              >
                <LightBulbIcon className="h-3 w-3 text-emerald-500" />
                {question}
              </span>
            ))}
          </div>
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Having realistic goals helps determine how much you need to save
              and invest.
            </p>
          </div>
        </section>

        {/* Estimating Retirement Expenses */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Estimating Retirement Expenses
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Retirement planning should account for future inflation and rising
            living costs.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={expensesImage}
              alt="Retirement Expenses"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Common Retirement Expenses
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Daily living expenses</li>
            <li>Healthcare and insurance</li>
            <li>Housing maintenance</li>
            <li>Travel and leisure</li>
            <li>Emergency funds</li>
          </ul>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              A retirement corpus that seems sufficient today may not meet
              future requirements due to inflation over time.
            </p>
          </div>
        </section>

        {/* Investment Options for Retirement */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Options for Retirement
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            A diversified investment strategy can help balance growth and
            stability.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={investmentOptionsImage}
              alt="Investment Options"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="grid gap-4 mb-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Equity Investments
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Equity-oriented investments can provide higher long-term
                  returns and help beat inflation.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Suitable for: Younger investors, Long investment horizons
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <BanknotesIcon className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Fixed-Income Investments
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  These investments offer relatively stable returns and lower
                  risk.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                  Examples: Bonds, Fixed deposits, Government savings schemes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <ShieldCheckIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Retirement-Specific Plans
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Several financial products are specifically designed for
                  retirement planning and long-term wealth accumulation.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                  Examples: Pension plans, Provident funds, National retirement
                  schemes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Importance of Diversification */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <ScaleIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Importance of Diversification
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Relying on a single investment type can increase financial risk.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            A Balanced Portfolio May Include
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Equities for growth</li>
            <li>Debt instruments for stability</li>
            <li>Emergency savings for liquidity</li>
            <li>Insurance for protection</li>
          </ul>
          <div className="border-l-4 border-purple-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Diversification helps manage market volatility while supporting
              long-term financial goals.
            </p>
          </div>
        </section>

        {/* Emergency and Healthcare Planning */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <HeartIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Emergency and Healthcare Planning
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Healthcare expenses often rise significantly during retirement.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Why It Matters
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Medical emergencies can impact savings.</li>
            <li>Healthcare inflation is increasing globally.</li>
            <li>Insurance coverage becomes more important with age.</li>
          </ul>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Maintaining adequate health insurance and emergency funds is a
              crucial part of retirement planning.
            </p>
          </div>
        </section>

        {/* Common Retirement Planning Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
            Common Retirement Planning Mistakes
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Delaying Investments",
                desc: "Waiting too long reduces the benefits of compounding.",
              },
              {
                title: "Ignoring Inflation",
                desc: "Future living costs may be much higher than expected.",
              },
              {
                title: "Underestimating Expenses",
                desc: "Many retirees overlook healthcare and lifestyle-related costs.",
              },
              {
                title: "Depending Only on Savings",
                desc: "Savings without investment growth may not sustain long-term retirement needs.",
              },
            ].map((mistake, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {mistake.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {mistake.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategies for a Comfortable Retirement */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <LightBulbIcon className="h-6 w-6 text-yellow-500" />
            Strategies for a Comfortable Retirement
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Invest Consistently",
                desc: "Regular investments help build discipline and long-term wealth.",
              },
              {
                title: "Increase Contributions Over Time",
                desc: "As income grows, gradually increase retirement investments.",
              },
              {
                title: "Review Your Portfolio Periodically",
                desc: "Adjust investments based on age, risk tolerance, and financial goals.",
              },
              {
                title: "Maintain Financial Discipline",
                desc: "Avoid unnecessary debt and focus on long-term financial priorities.",
              },
            ].map((strategy, i) => (
              <div key={i} className="border-l-4 border-emerald-500 pl-4 py-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {strategy.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  {strategy.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conclusion
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Retirement planning is not just about saving money — it is about
            creating long-term financial freedom and peace of mind. Starting
            early provides the advantage of time, compounding, and better
            financial flexibility.
          </p>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-5 text-center">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              By setting clear goals, investing consistently, and maintaining a
              diversified financial strategy, individuals can build a secure
              retirement future and enjoy their later years with greater comfort
              and confidence.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
