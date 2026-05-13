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
  GlobeAltIcon,
  CurrencyDollarIcon,
  BoltIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

// Image paths from public folder
const heroBgImage = "/The Impact of Global Events on Indian Markets.png";
const federalReserveImage =
  "/The Impact of Global Events on Indian Markets.png";
const crudeOilImage = "/The Impact of Global Events on Indian Markets.png";
const chinaImage = "/The Impact of Global Events on Indian Markets.png";
const sectorsImage = "/The Impact of Global Events on Indian Markets.png";

export default function GlobalEventsImpactPage() {
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
            alt="Global Events Impact Hero Background"
            fill
            className="object-cover brightness-35"
            priority
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/30 backdrop-blur-sm border border-blue-400/40 mb-4">
            <span className="text-blue-200 text-sm font-medium">
              Global Economy
            </span>
            <span className="text-blue-300 text-xs">•</span>
            <span className="text-blue-200 text-sm">Market Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            The Impact of Global Events <br />
            on Indian Markets
          </h1>
          <div className="flex flex-wrap gap-5 text-gray-200 justify-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-400" />
              <span className="text-sm">July 22, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-blue-400" />
              <span className="text-sm">7 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-blue-400" />
              <span className="text-sm">Global Economy</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Indian financial markets do not operate in isolation. In today's
            interconnected global economy, international political developments,
            economic policies, conflicts, and trade relations can significantly
            influence domestic market performance.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            From fluctuations in crude oil prices to decisions made by the US
            Federal Reserve, global events often shape investor sentiment,
            foreign investment flows, currency movements, and sector-specific
            growth in India.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This article explores how major international developments impact
            Indian equity markets, industries, and overall economic stability.
          </p>
        </div>

        {/* Why Global Events Matter to India */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Why Global Events Matter to India
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            India is one of the world's fastest-growing major economies and
            maintains strong trade and financial relationships with global
            markets.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            As a result, events occurring in:
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              "The United States",
              "Europe",
              "China",
              "Middle Eastern countries",
              "Global financial institutions",
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic">
              These can directly or indirectly influence India's economy and
              stock market behavior.
            </p>
          </div>
        </section>

        {/* Influence of US Federal Reserve Decisions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <CurrencyDollarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Influence of US Federal Reserve Decisions
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            One of the most closely watched global factors is the monetary
            policy of the US Federal Reserve.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={federalReserveImage}
              alt="US Federal Reserve"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Interest Rate Changes
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            When the Federal Reserve increases interest rates:
          </p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>
              Foreign investors may move capital from emerging markets to safer
              US assets.
            </li>
            <li>The Indian rupee may weaken against the US dollar.</li>
            <li>Equity markets can experience temporary selling pressure.</li>
          </ul>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              On the other hand, lower US interest rates often encourage foreign
              investments into developing economies like India.
            </p>
          </div>
        </section>

        {/* Crude Oil Price Volatility */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <BoltIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Crude Oil Price Volatility
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            India imports a significant portion of its crude oil requirements,
            making oil prices extremely important for the economy.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={crudeOilImage}
              alt="Crude Oil"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Rising Oil Prices Can Lead To:
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Higher fuel and transportation costs</li>
            <li>Increased inflation</li>
            <li>Pressure on government finances</li>
            <li>Reduced consumer spending power</li>
          </ul>
          <div className="border-l-4 border-amber-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Industries such as aviation, logistics, paints, and manufacturing
              are particularly sensitive to oil price movements.
            </p>
          </div>
        </section>

        {/* Geopolitical Conflicts and Market Sentiment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Geopolitical Conflicts and Market Sentiment
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Wars, diplomatic tensions, and geopolitical instability often create
            uncertainty across global financial markets.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Common Market Reactions
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Investors shift toward safer assets like gold.</li>
            <li>Stock markets experience volatility.</li>
            <li>
              Foreign institutional investors may reduce exposure to emerging
              markets.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            For India, geopolitical tensions in energy-producing regions can
            also affect energy supply chains and import costs.
          </p>
        </section>

        {/* Impact of Global Inflation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Impact of Global Inflation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Persistent inflation in developed economies affects central bank
            policies worldwide.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Effects on India
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Imported goods become more expensive.</li>
            <li>Interest rates may rise domestically to control inflation.</li>
            <li>Borrowing costs for businesses and consumers increase.</li>
          </ul>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Sectors dependent on international raw materials may face pressure
              on profit margins during inflationary periods.
            </p>
          </div>
        </section>

        {/* China's Economic Performance and Its Influence */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <GlobeAltIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              China's Economic Performance and Its Influence
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            China plays a major role in global manufacturing and trade.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={chinaImage}
              alt="China Economy"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            How China Impacts India
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Supply chain disruptions can affect Indian industries.</li>
            <li>Commodity prices may fluctuate based on Chinese demand.</li>
            <li>Export-oriented sectors may face global competition shifts.</li>
          </ul>
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Recent trends have also encouraged global companies to diversify
              manufacturing away from China, creating long-term opportunities
              for India.
            </p>
          </div>
        </section>

        {/* Foreign Institutional Investments (FII) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Foreign Institutional Investments (FII)
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Foreign investors play a significant role in Indian equity markets.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            During Global Uncertainty
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            FIIs often reduce investments in riskier markets, leading to:
          </p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Market corrections</li>
            <li>Currency depreciation</li>
            <li>Increased volatility</li>
          </ul>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              When global conditions improve, India usually benefits from
              renewed foreign capital inflows due to its strong growth
              potential.
            </p>
          </div>
        </section>

        {/* Sectors Most Affected by Global Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sectors Most Affected by Global Events
          </h2>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={sectorsImage}
              alt="Sectors Affected"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Information Technology",
                icon: ComputerDesktopIcon,
                desc: "Indian IT companies are heavily influenced by economic conditions in the US and Europe.",
              },
              {
                title: "Pharmaceuticals",
                icon: ShieldCheckIcon,
                desc: "Global healthcare demand and international regulations impact pharmaceutical exports.",
              },
              {
                title: "Banking and Finance",
                icon: BuildingOfficeIcon,
                desc: "Interest rates, currency fluctuations, and global liquidity affect financial institutions.",
              },
              {
                title: "Energy and Infrastructure",
                icon: BoltIcon,
                desc: "Commodity prices and international trade conditions influence operational costs and profitability.",
              },
            ].map((sector, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <sector.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {sector.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {sector.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How Investors Can Respond */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <LightBulbIcon className="h-6 w-6 text-yellow-500" />
            How Investors Can Respond
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Stay Diversified",
                desc: "Diversification across sectors and asset classes helps reduce risk during uncertain periods.",
              },
              {
                title: "Focus on Long-Term Goals",
                desc: "Short-term market volatility caused by global events is common. Long-term investing strategies often provide better stability.",
              },
              {
                title: "Monitor Global Indicators",
                desc: "Key indicators investors should follow include:",
                subItems: [
                  "US inflation data",
                  "Federal Reserve policy updates",
                  "Oil prices",
                  "Currency exchange rates",
                  "Geopolitical developments",
                ],
              },
              {
                title: "Avoid Panic Selling",
                desc: "Emotional investment decisions during periods of uncertainty can negatively impact long-term returns.",
              },
            ].map((tip, i) => (
              <div key={i} className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tip.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  {tip.desc}
                </p>
                {tip.subItems && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tip.subItems.map((item, j) => (
                      <span
                        key={j}
                        className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-0.5 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Outlook for Indian Markets */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Outlook for Indian Markets
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Despite global economic uncertainties, India continues to remain one
            of the more resilient emerging economies due to:
          </p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Strong domestic consumption</li>
            <li>Expanding digital economy</li>
            <li>Infrastructure development</li>
            <li>Growing manufacturing capabilities</li>
          </ul>
          <div className="border-l-4 border-green-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic">
              While global events may create temporary volatility, India's
              long-term growth story continues to attract both domestic and
              international investors.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conclusion
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Global developments have a profound influence on Indian financial
            markets, investor behavior, and economic performance. Understanding
            these international factors can help investors make more informed
            decisions and manage risk effectively.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-center">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              By staying informed, maintaining diversification, and focusing on
              long-term fundamentals, investors can better navigate market
              fluctuations caused by global events.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
