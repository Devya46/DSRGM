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
  CurrencyDollarIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ScaleIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

// Image paths from public folder
const heroBgImage = "/Understanding Mutual Funds.png";
const equityFundImage = "/MF-1.jpg";
const debtFundImage = "/MF-2.jpg";
const hybridFundImage = "/MF-3.jpg";
const sipVsLumpSumImage = "/MF-5.jpg";

export default function MutualFundsGuidePage() {
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
            alt="Mutual Funds Hero Background"
            fill
            className="object-cover brightness-35"
            priority
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-600/30 backdrop-blur-sm border border-green-400/40 mb-4">
            <span className="text-green-200 text-sm font-medium">
              Investment Education
            </span>
            <span className="text-green-300 text-xs">•</span>
            <span className="text-green-200 text-sm">Beginner's Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Understanding Mutual Funds: <br />A Beginner's Guide
          </h1>
          <div className="flex flex-wrap gap-5 text-gray-200 justify-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-green-400" />
              <span className="text-sm">June 10, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-green-400" />
              <span className="text-sm">6 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-green-400" />
              <span className="text-sm">Beginner's Guide</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Investing can often feel overwhelming for beginners, especially with
            the wide range of financial products available in the market. Mutual
            funds are considered one of the most accessible and
            beginner-friendly investment options because they offer
            diversification, professional management, and flexibility.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This guide explains the basics of mutual funds, how they work, their
            benefits, associated risks, and how new investors can get started
            confidently.
          </p>
        </div>

        {/* What Are Mutual Funds? */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What Are Mutual Funds?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
            A mutual fund is an investment vehicle that pools money from
            multiple investors and invests it in a diversified portfolio of
            assets such as:
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              "Stocks",
              "Bonds",
              "Government securities",
              "Money market instruments",
              "Other assets",
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These funds are managed by professional fund managers who make
              investment decisions on behalf of investors. Instead of purchasing
              individual stocks or bonds yourself, you own units of the mutual
              fund, representing your share in the overall portfolio.
            </p>
          </div>
        </section>

        {/* How Mutual Funds Work */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How Mutual Funds Work
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            When investors contribute money to a mutual fund:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-5">
            <li>The collected funds are pooled together.</li>
            <li>Fund managers invest the money across different securities.</li>
            <li>
              Any gains or losses are shared proportionally among investors.
            </li>
            <li>
              The value of your investment changes based on the fund's
              performance.
            </li>
          </ol>
          <div className="border-l-4 border-green-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic">
              The price of one mutual fund unit is called the{" "}
              <span className="font-semibold">Net Asset Value (NAV)</span>,
              which is calculated daily.
            </p>
          </div>
        </section>

        {/* Types of Mutual Funds */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Types of Mutual Funds
          </h2>

          {/* Equity Funds */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Equity Funds
              </h3>
            </div>
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <Image
                src={equityFundImage}
                alt="Equity Funds"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              These funds primarily invest in stocks and aim for higher
              long-term returns.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Suitable for:
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Long-term investors</li>
              <li>• Investors comfortable with market risk</li>
            </ul>
          </div>

          {/* Debt Funds */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <BanknotesIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Debt Funds
              </h3>
            </div>
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <Image
                src={debtFundImage}
                alt="Debt Funds"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              Debt funds invest in fixed-income instruments like bonds and
              treasury bills.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Suitable for:
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Conservative investors</li>
              <li>• Short- to medium-term goals</li>
            </ul>
          </div>

          {/* Hybrid Funds */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <ScaleIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Hybrid Funds
              </h3>
            </div>
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <Image
                src={hybridFundImage}
                alt="Hybrid Funds"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              Hybrid funds combine both equity and debt investments to balance
              risk and return.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Suitable for:
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Moderate-risk investors</li>
              <li>• Beginners seeking balanced exposure</li>
            </ul>
          </div>

          {/* Index Funds */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <DocumentChartBarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Index Funds
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              Index funds track a specific market index such as the Nifty 50 or
              Sensex.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Advantages:
            </p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Lower management fees</li>
              <li>• Passive investment strategy</li>
              <li>• Broad market exposure</li>
            </ul>
          </div>
        </section>

        {/* Benefits of Investing in Mutual Funds */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Benefits of Investing in Mutual Funds
          </h2>
          <div className="grid gap-4">
            {[
              {
                title: "Diversification",
                icon: ShieldCheckIcon,
                description:
                  "Mutual funds spread investments across multiple assets, reducing the impact of poor performance from any single investment.",
              },
              {
                title: "Professional Management",
                icon: UserGroupIcon,
                description:
                  "Experienced fund managers handle research, asset allocation, and investment decisions.",
              },
              {
                title: "Affordability",
                icon: CurrencyDollarIcon,
                description:
                  "Many mutual funds allow investors to start with relatively small amounts through SIPs (Systematic Investment Plans).",
              },
              {
                title: "Liquidity",
                icon: BanknotesIcon,
                description:
                  "Most open-ended mutual funds allow investors to buy or redeem units easily.",
              },
              {
                title: "Transparency",
                icon: DocumentChartBarIcon,
                description:
                  "Fund houses regularly publish portfolio holdings, performance reports, and risk disclosures.",
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <benefit.icon className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risks Involved */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
            Risks Involved
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Although mutual funds offer many benefits, they are not risk-free.
          </p>
          <div className="grid gap-3 mb-5">
            {[
              {
                risk: "Market Risk",
                desc: "Fund values may fluctuate due to market movements.",
              },
              {
                risk: "Interest Rate Risk",
                desc: "Debt funds can be affected by changing interest rates.",
              },
              {
                risk: "Credit Risk",
                desc: "Certain debt instruments may carry the risk of default.",
              },
              {
                risk: "Inflation Risk",
                desc: "Returns may not always outpace inflation.",
              },
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-amber-500 pl-4 py-1">
                <p className="text-gray-900 dark:text-white font-semibold">
                  {item.risk}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Understanding your risk tolerance is essential before investing.
            </p>
          </div>
        </section>

        {/* SIP vs Lump Sum Investment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            SIP vs Lump Sum Investment
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-5">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                SIP (Systematic Investment Plan)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Invest a fixed amount regularly, such as monthly.
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                Benefits:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm mt-1">
                <li>Encourages disciplined investing</li>
                <li>Reduces timing risk</li>
                <li>Suitable for salaried individuals</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Lump Sum Investment
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Invest a larger amount at one time.
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                Suitable when:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm mt-1">
                <li>Markets are favorable</li>
                <li>You have surplus funds available</li>
              </ul>
            </div>
          </div>
          <div className="relative h-48 w-full rounded-xl overflow-hidden my-4">
            <Image
              src={sipVsLumpSumImage}
              alt="SIP vs Lump Sum Investment"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-3">
            Both methods have advantages depending on financial goals and market
            conditions.
          </p>
        </section>

        {/* Tips for Beginners */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <LightBulbIcon className="h-6 w-6 text-yellow-500" />
            Tips for Beginners
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Define Your Goals",
                items: [
                  "Retirement",
                  "Wealth creation",
                  "Education",
                  "Emergency savings",
                ],
              },
              {
                title: "Understand Your Risk Appetite",
                items: [
                  "Choose funds aligned with your comfort level and investment horizon.",
                ],
              },
              {
                title: "Start Early",
                items: [
                  "The power of compounding can significantly increase long-term returns.",
                ],
              },
              {
                title: "Avoid Emotional Decisions",
                items: [
                  "Market fluctuations are normal. Focus on long-term objectives instead of short-term volatility.",
                ],
              },
              {
                title: "Review Investments Periodically",
                items: [
                  "Track performance and rebalance your portfolio when necessary.",
                ],
              },
            ].map((tip, i) => (
              <div key={i} className="border-l-4 border-green-500 pl-4 py-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tip.title}
                </h3>
                {tip.items.length > 1 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {tip.items.map((item, j) => (
                      <span
                        key={j}
                        className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-0.5 text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                    {tip.items[0]}
                  </p>
                )}
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
            Mutual funds provide a convenient and effective way for beginners to
            participate in financial markets without requiring deep market
            expertise. With professional management, diversification, and
            flexible investment options, they can serve as a strong foundation
            for long-term wealth creation.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Before investing, always research carefully, understand the risks
              involved, and align your investments with your financial goals and
              time horizon.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
