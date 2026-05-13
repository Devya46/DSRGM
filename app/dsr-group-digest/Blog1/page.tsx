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
  ComputerDesktopIcon,
  BoltIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

// Image paths from public folder
const heroBgImage = "/Quarterly-Market-Review.png";
const techImage = "/QMR-1.png";
const energyImage = "/QMR-3.jpg";
const financeImage = "/QMR-2.png";
const economicChartImage = "/QMR-1.png";

export default function QuarterlyMarketReviewPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />

      {/* Hero Section with Background Image - Reduced Height */}
      <section className="relative h-[320px] md:h-[380px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBgImage}
            alt="Market Review Hero Background"
            fill
            className="object-cover brightness-35"
            priority
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/30 backdrop-blur-sm border border-indigo-400/40 mb-4">
            <span className="text-indigo-200 text-sm font-medium">
              Market Analysis
            </span>
            <span className="text-indigo-300 text-xs">•</span>
            <span className="text-indigo-200 text-sm">Q2 2024</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Quarterly Market Review: <br />
            Insights for Investors
          </h1>
          <div className="flex flex-wrap gap-5 text-gray-200 justify-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm">May 15, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm">8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm">Quarterly Review</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Global financial markets experienced a dynamic quarter marked by
            shifting economic policies, persistent inflation concerns, and
            evolving investor sentiment. Despite short-term volatility, several
            sectors demonstrated resilience, creating new opportunities for
            long-term investors.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This quarterly review provides a detailed overview of key market
            movements, sector performance, macroeconomic developments, and
            strategic investment insights for the upcoming quarter.
          </p>
        </div>

        {/* Market Performance Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Market Performance Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
            During the quarter, major equity indices showed mixed performance as
            investors balanced optimism around economic recovery with concerns
            regarding interest rates and global uncertainty.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-5">
            <ul className="space-y-2">
              {[
                "Equity markets remained volatile amid inflationary pressures.",
                "Technology and energy sectors outperformed expectations.",
                "Consumer spending showed gradual improvement.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-indigo-500 dark:text-indigo-400">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {[
                "Central banks maintained cautious monetary policies.",
                "Bond yields fluctuated due to changing rate expectations.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-indigo-500 dark:text-indigo-400">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-1 my-5">
            <p className="text-gray-700 dark:text-gray-300 italic">
              Investors continued to focus on companies with strong
              fundamentals, healthy cash flows, and long-term growth potential.
            </p>
          </div>
        </section>

        {/* Sector-Wise Analysis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sector-Wise Analysis
          </h2>

          {/* Technology Sector */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <ComputerDesktopIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Technology Sector
              </h3>
            </div>
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <Image
                src={techImage}
                alt="Technology Sector"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              The technology sector witnessed renewed momentum driven by
              advancements in artificial intelligence, cloud computing, and
              digital transformation initiatives.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Key Trends:
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li>• Increased enterprise software adoption</li>
              <li>• Growth in AI-driven solutions</li>
              <li>• Rising demand for cybersecurity services</li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Large-cap technology firms maintained strong earnings performance
              despite broader economic challenges.
            </p>
          </div>

          {/* Energy Sector */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <BoltIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Energy Sector
              </h3>
            </div>
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <Image
                src={energyImage}
                alt="Energy Sector"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              Energy markets remained highly active due to fluctuating oil
              prices and increasing global focus on renewable energy
              investments.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Key Trends:
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li>• Continued investment in clean energy projects</li>
              <li>• Strong demand for industrial energy solutions</li>
              <li>• Volatility in crude oil pricing</li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Renewable energy companies attracted significant investor
              attention during the quarter.
            </p>
          </div>

          {/* Financial Sector */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <CurrencyDollarIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Financial Sector
              </h3>
            </div>
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <Image
                src={financeImage}
                alt="Financial Sector"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              Banks and financial institutions faced pressure from changing
              interest rate environments, though improved lending activity
              supported revenue growth.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Key Trends:
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li>• Stable credit demand</li>
              <li>• Improved digital banking adoption</li>
              <li>• Moderate pressure on profit margins</li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Financial firms with diversified portfolios performed relatively
              well.
            </p>
          </div>
        </section>

        {/* Economic Indicators */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Economic Indicators
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
            Several economic indicators influenced investor behavior throughout
            the quarter.
          </p>

          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Indicator
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  ["Inflation", "Moderately High"],
                  ["Interest Rates", "Rising"],
                  ["Employment Data", "Stable"],
                  ["Consumer Spending", "Improving"],
                  ["Manufacturing Output", "Mixed"],
                ].map(([indicator, trend], i) => (
                  <tr key={i} className="bg-white dark:bg-gray-900">
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      {indicator}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                      {trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="relative h-56 w-full rounded-xl overflow-hidden my-4">
            <Image
              src={economicChartImage}
              alt="Economic Indicators Chart"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-3">
            While inflation showed signs of easing in certain regions,
            policymakers remained cautious regarding future monetary decisions.
          </p>
        </section>

        {/* Investment Opportunities */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Opportunities
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
            Based on current market conditions, investors may consider focusing
            on:
          </p>

          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                <ArrowTrendingUpIcon className="h-5 w-5" />
                Growth-Oriented Investments
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Companies involved in:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Artificial Intelligence, Renewable Energy, Cloud Infrastructure,
                Semiconductor Manufacturing
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                <BuildingOfficeIcon className="h-5 w-5" />
                Defensive Investments
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Sectors with stable performance:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Healthcare, Utilities, Consumer Staples
              </p>
            </div>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-1 my-5">
            <p className="text-gray-700 dark:text-gray-300 italic">
              Diversification continues to remain a critical strategy during
              uncertain market cycles.
            </p>
          </div>
        </section>

        {/* Risks to Watch */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
            Risks to Watch
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            Investors should remain aware of potential risks that could impact
            market performance:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "Prolonged inflation",
              "Geopolitical tensions",
              "Supply chain disruptions",
              "Interest rate uncertainty",
              "Slower global growth",
            ].map((risk, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1"
              >
                <span className="text-amber-500">⚠</span> {risk}
              </span>
            ))}
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic">
              Careful portfolio management and long-term planning remain
              essential in navigating volatile conditions.
            </p>
          </div>
        </section>

        {/* Outlook for the Next Quarter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Outlook for the Next Quarter
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Market sentiment for the upcoming quarter remains cautiously
            optimistic. Analysts expect continued volatility; however, improving
            corporate earnings and easing inflation may support gradual market
            stabilization.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Investors are encouraged to:
          </h3>
          <div className="flex flex-wrap gap-3 mb-5">
            {[
              "Maintain diversified portfolios",
              "Focus on long-term goals",
              "Monitor macro developments",
              "Rebalance when necessary",
            ].map((item, i) => (
              <span
                key={i}
                className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic">
              Strategic investing and disciplined risk management will continue
              to play a crucial role in achieving sustainable returns.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conclusion
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The past quarter highlighted both challenges and opportunities
            across global markets. While economic uncertainty persists,
            innovation-driven sectors and resilient businesses continue to
            present attractive investment potential.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Staying informed, maintaining diversification, and adapting to
              changing market conditions can help investors navigate the
              evolving financial landscape with greater confidence.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
