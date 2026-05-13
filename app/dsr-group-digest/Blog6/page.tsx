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
  ScaleIcon,
  DocumentCheckIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

// Image paths from public folder
const heroBgImage = "/IPO-1.png";
const ipoProcessImage = "/IPO-22.png";
const benefitsImage = "/IPO-3.jpg";
const evaluationImage = "/IPO-2.png";

export default function IPOGuidePage() {
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
            alt="IPO Opportunities and Risks Hero Background"
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
              Stock Market Education
            </span>
            <span className="text-indigo-300 text-xs">•</span>
            <span className="text-indigo-200 text-sm">IPO Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Understanding IPOs: <br />
            Opportunities and Risks
          </h1>
          <div className="flex flex-wrap gap-5 text-gray-200 justify-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm">October 12, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm">7 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm">Stock Market Education</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Initial Public Offerings (IPOs) often generate significant
            excitement among investors. They provide an opportunity to invest in
            a company during its transition from a privately held business to a
            publicly traded entity listed on the stock exchange.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            While IPOs can offer strong growth potential, they also carry risks
            due to market volatility, uncertain valuations, and limited
            historical data. Understanding how IPOs work and how to evaluate
            them is essential before making investment decisions.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This guide explains the fundamentals of IPO investing, the potential
            advantages, associated risks, and important factors investors should
            consider.
          </p>
        </div>

        {/* What Is an IPO? */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What Is an IPO?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            An Initial Public Offering (IPO) is the process through which a
            private company offers its shares to the public for the first time.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Once listed on a stock exchange, investors can buy and sell the
              company's shares in the secondary market.
            </p>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Why Companies Launch IPOs
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
            Companies may go public to:
          </p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Raise capital for expansion</li>
            <li>Reduce existing debt</li>
            <li>Fund new projects or acquisitions</li>
            <li>Increase public visibility and credibility</li>
            <li>Provide liquidity to early investors</li>
          </ul>
          <div className="border-l-4 border-indigo-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              IPOs are often considered a major milestone in a company's growth
              journey.
            </p>
          </div>
        </section>

        {/* How the IPO Process Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How the IPO Process Works
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The IPO process involves multiple stages before shares become
            available to public investors.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={ipoProcessImage}
              alt="IPO Process"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="space-y-3">
            {[
              {
                title: "Appointment of Investment Banks",
                desc: "Companies hire merchant bankers or underwriters to manage the IPO process.",
              },
              {
                title: "Regulatory Approval",
                desc: "The company files required documents with market regulators containing financial and operational details.",
              },
              {
                title: "Price Band and Valuation",
                desc: "A price range is determined based on company valuation, market conditions, and investor demand.",
              },
              {
                title: "Public Subscription",
                desc: "Investors apply for shares during the subscription window.",
              },
              {
                title: "Share Allotment and Listing",
                desc: "After allotment, shares are listed on stock exchanges and begin trading publicly.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Types of IPOs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Types of IPOs
          </h2>
          <div className="grid gap-4">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Fixed Price IPO
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                In a fixed price IPO, the share price is predetermined before
                the issue opens.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Book Building IPO
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                In this method, investors bid within a specified price range,
                and the final issue price is decided based on demand.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mt-3">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Book-building issues are more commonly used in modern markets.
            </p>
          </div>
        </section>

        {/* Benefits of Investing in IPOs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Benefits of Investing in IPOs
          </h2>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={benefitsImage}
              alt="IPO Benefits"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="grid gap-3">
            {[
              {
                title: "Early Investment Opportunity",
                desc: "Investors get the chance to participate in a company's growth story from an early stage.",
                icon: ArrowTrendingUpIcon,
              },
              {
                title: "Potential Listing Gains",
                desc: "If market demand is strong, shares may list at a higher price than the issue price.",
                icon: CurrencyDollarIcon,
              },
              {
                title: "Long-Term Wealth Creation",
                desc: "Successful companies can generate substantial long-term returns for investors over time.",
                icon: BuildingOfficeIcon,
              },
              {
                title: "Portfolio Diversification",
                desc: "IPOs provide exposure to new sectors, emerging businesses, and innovative industries.",
                icon: ScaleIcon,
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
              >
                <benefit.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risks Associated with IPOs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
            Risks Associated with IPOs
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Limited Historical Market Performance",
                desc: "Newly listed companies may not have an established trading history for analysis.",
              },
              {
                title: "Overvaluation Risk",
                desc: "Some IPOs may be priced aggressively due to market hype or strong investor demand.",
              },
              {
                title: "Market Volatility",
                desc: "Broader market conditions can significantly affect post-listing performance.",
              },
              {
                title: "Business Uncertainty",
                desc: "Young or rapidly growing companies may face operational and profitability challenges.",
              },
            ].map((risk, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
              >
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {risk.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {risk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-1 mt-4">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Investors should carefully evaluate risks before applying for
              IPOs.
            </p>
          </div>
        </section>

        {/* Important Factors to Evaluate Before Investing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Important Factors to Evaluate Before Investing
          </h2>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={evaluationImage}
              alt="IPO Evaluation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Company Fundamentals",
                items: [
                  "Revenue growth",
                  "Profitability",
                  "Debt levels",
                  "Business model",
                  "Competitive advantages",
                ],
                icon: DocumentCheckIcon,
              },
              {
                title: "Industry Outlook",
                desc: "Understand the future growth potential and competitive environment of the sector.",
                icon: ChartBarIcon,
              },
              {
                title: "Valuation",
                desc: "Compare the IPO valuation with listed competitors in the same industry. An excessively high valuation may limit future returns.",
                icon: CurrencyDollarIcon,
              },
              {
                title: "Management Quality",
                desc: "Experienced leadership and strong corporate governance are important indicators of long-term sustainability.",
                icon: ShieldCheckIcon,
              },
              {
                title: "Use of IPO Funds",
                desc: "Review how the company plans to utilize the capital raised. Funding productive growth initiatives is generally viewed positively.",
                icon: BanknotesIcon,
              },
            ].map((factor, i) => (
              <div key={i} className="border-l-4 border-indigo-500 pl-4 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <factor.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {factor.title}
                  </h3>
                </div>
                {factor.items ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {factor.items.map((item, j) => (
                      <span
                        key={j}
                        className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-0.5 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                    {factor.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 mt-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Strong fundamentals are often more important than short-term hype.
            </p>
          </div>
        </section>

        {/* IPO Investment Strategies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            IPO Investment Strategies
          </h2>
          <div className="grid gap-3">
            {[
              {
                title: "Short-Term Listing Strategy",
                desc: "Some investors apply for IPOs mainly to benefit from possible listing gains.",
              },
              {
                title: "Long-Term Investment Strategy",
                desc: "Others invest in fundamentally strong companies with long-term growth potential.",
              },
              {
                title: "Diversified Approach",
                desc: "Balancing IPO investments with other asset classes can help manage risk effectively.",
              },
            ].map((strategy, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <LightBulbIcon className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {strategy.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {strategy.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes Investors Should Avoid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            Common Mistakes Investors Should Avoid
          </h2>
          <div className="space-y-2">
            {[
              "Investing Based on Hype — High media attention does not always guarantee strong returns.",
              "Ignoring Valuation Metrics — Even good companies can become poor investments if priced too high.",
              "Overallocating Capital — Investing excessive amounts in a single IPO can increase portfolio risk.",
              "Lack of Research — Reading company prospectuses and understanding business risks is essential.",
            ].map((mistake, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm"
              >
                <span className="text-red-500">•</span>
                {mistake}
              </div>
            ))}
          </div>
        </section>

        {/* IPOs in the Digital Era */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            IPOs in the Digital Era
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Technology has simplified the IPO application process significantly.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
            Today, investors can:
          </p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Apply online through trading apps</li>
            <li>Track allotment status digitally</li>
            <li>Access financial reports instantly</li>
            <li>Participate in IPOs more conveniently</li>
          </ul>
          <div className="border-l-4 border-indigo-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Retail participation in IPO markets has increased considerably due
              to digital platforms and broader financial awareness.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conclusion
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            IPOs can offer exciting investment opportunities, but they also
            involve uncertainties that require careful evaluation. Successful
            IPO investing depends on understanding company fundamentals,
            valuation, industry trends, and overall market conditions.
          </p>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-5 text-center">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Rather than following market hype, investors should focus on
              informed decision-making, diversification, and long-term financial
              goals when considering IPO investments.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
