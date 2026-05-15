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
  ShieldCheckIcon,
  CloudArrowUpIcon,
  DevicePhoneMobileIcon,
  FingerPrintIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

// Image paths from public folder
const heroBgImage = "/Finace-3.png";
const digitalBankingImage = "/Digital Transformation in Financial Services.png";
const digitalPaymentsImage = "/Finace-1.jpg";
const aiFinanceImage = "/Finace-2.png";
const blockchainImage = "/Blockchain.jpg";
const fintechImage = "/Trend.png";

export default function DigitalTransformationPage() {
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
            alt="Digital Transformation Hero Background"
            fill
            className="object-cover brightness-35"
            priority
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/30 backdrop-blur-sm border border-purple-400/40 mb-4">
            <span className="text-purple-200 text-sm font-medium">
              Financial Technology
            </span>
            <span className="text-purple-300 text-xs">•</span>
            <span className="text-purple-200 text-sm">Innovation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Digital Transformation <br />
            in Financial Services
          </h1>
          <div className="flex flex-wrap gap-5 text-gray-200 justify-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-purple-400" />
              <span className="text-sm">August 18, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-purple-400" />
              <span className="text-sm">7 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-purple-400" />
              <span className="text-sm">Financial Technology</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            The financial services industry is undergoing a major digital
            transformation driven by rapid advancements in technology, changing
            customer expectations, and increasing demand for faster, more secure
            financial solutions.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            From mobile banking and digital payments to artificial intelligence
            and blockchain, technology is reshaping how financial institutions
            operate and how investors manage their finances.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This article explores the key technologies driving transformation in
            financial services and their impact on businesses, consumers, and
            investors.
          </p>
        </div>

        {/* The Rise of Digital Banking */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <BuildingOfficeIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              The Rise of Digital Banking
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Traditional banking models have evolved significantly over the past
            decade. Customers now expect seamless digital experiences that allow
            them to manage finances anytime and anywhere.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={digitalBankingImage}
              alt="Digital Banking"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Key Features of Modern Digital Banking
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Instant online account opening</li>
            <li>Mobile banking applications</li>
            <li>Real-time fund transfers</li>
            <li>Digital customer support</li>
            <li>Paperless transactions</li>
          </ul>
          <div className="border-l-4 border-purple-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Banks investing heavily in digital infrastructure are improving
              customer convenience while reducing operational costs.
            </p>
          </div>
        </section>

        {/* Growth of Digital Payments */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <DevicePhoneMobileIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Growth of Digital Payments
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Digital payment systems have transformed the way individuals and
            businesses conduct transactions.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={digitalPaymentsImage}
              alt="Digital Payments"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Popular Digital Payment Solutions
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>UPI (Unified Payments Interface)</li>
            <li>Mobile wallets</li>
            <li>Contactless payments</li>
            <li>QR-code transactions</li>
            <li>Online payment gateways</li>
          </ul>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The widespread adoption of smartphones and internet services has
              accelerated cashless transactions globally, particularly in
              emerging economies like India.
            </p>
          </div>
        </section>

        {/* Artificial Intelligence in Finance */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <CpuChipIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Artificial Intelligence in Finance
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Artificial Intelligence (AI) is becoming one of the most influential
            technologies in the financial sector.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={aiFinanceImage}
              alt="Artificial Intelligence in Finance"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Applications of AI
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Fraud detection and prevention</li>
            <li>Customer behavior analysis</li>
            <li>Automated financial advisory services</li>
            <li>Credit risk assessment</li>
            <li>Chatbots and virtual assistants</li>
          </ul>
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              AI-powered systems help financial institutions improve efficiency,
              enhance security, and personalize customer experiences.
            </p>
          </div>
        </section>

        {/* Blockchain and Financial Innovation */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <CloudArrowUpIcon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Blockchain and Financial Innovation
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Blockchain technology is introducing new possibilities in secure and
            transparent financial transactions.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={blockchainImage}
              alt="Blockchain"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Benefits of Blockchain
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Improved transaction security</li>
            <li>Faster settlement processes</li>
            <li>Reduced operational costs</li>
            <li>Enhanced transparency</li>
            <li>Better record management</li>
          </ul>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Blockchain is also playing a growing role in areas such as
              cross-border payments, digital identity verification, and smart
              contracts.
            </p>
          </div>
        </section>

        {/* The Emergence of Fintech Companies */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <BoltIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              The Emergence of Fintech Companies
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Financial technology companies, commonly known as fintech firms, are
            disrupting traditional financial models through innovation and
            customer-centric services.
          </p>
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={fintechImage}
              alt="Fintech"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Areas of Fintech Growth
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Digital lending platforms</li>
            <li>Robo-advisory services</li>
            <li>Wealth management apps</li>
            <li>Peer-to-peer payments</li>
            <li>Insurtech solutions</li>
          </ul>
          <div className="border-l-4 border-amber-500 pl-4 py-1">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Fintech companies are making financial services more accessible,
              affordable, and user-friendly for consumers.
            </p>
          </div>
        </section>

        {/* Cybersecurity and Data Protection */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheckIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Cybersecurity and Data Protection
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            As financial services become increasingly digital, cybersecurity has
            become a critical priority.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Common Challenges
          </h3>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li>Data breaches</li>
            <li>Identity theft</li>
            <li>Online fraud</li>
            <li>Phishing attacks</li>
            <li>Ransomware threats</li>
          </ul>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Financial institutions are investing heavily in advanced security
              technologies and regulatory compliance to protect sensitive
              customer information.
            </p>
          </div>
        </section>

        {/* Impact on Investors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
            Impact on Investors
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Digital transformation is changing how investors access and manage
            investment opportunities.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Easier Access to Markets
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Investors can now trade stocks, invest in mutual funds, and
                monitor portfolios through mobile applications and online
                platforms.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Better Financial Data and Analytics
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                Technology provides investors with:
              </p>
              <ul className="text-gray-700 dark:text-gray-300 text-sm list-disc list-inside">
                <li>Real-time market information</li>
                <li>Automated portfolio tracking</li>
                <li>AI-driven investment insights</li>
                <li>Advanced analytical tools</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Lower Investment Costs
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Online platforms and automated services have significantly
                reduced transaction fees and investment barriers for retail
                investors.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges of Digital Transformation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
            Challenges of Digital Transformation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            While technology brings numerous advantages, it also introduces
            challenges.
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Regulatory Compliance",
                desc: "Financial institutions must adapt to evolving digital regulations and data protection laws.",
              },
              {
                title: "Technology Integration",
                desc: "Legacy banking systems can make digital transformation complex and expensive.",
              },
              {
                title: "Digital Literacy",
                desc: "Not all customers are equally comfortable using digital financial tools.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-amber-500 pl-4 py-1 mt-4">
            <p className="text-gray-700 dark:text-gray-300 italic text-sm">
              Balancing innovation with security and accessibility remains
              essential.
            </p>
          </div>
        </section>

        {/* Future Trends in Financial Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <LightBulbIcon className="h-6 w-6 text-yellow-500" />
            Future Trends in Financial Services
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The future of financial services is expected to become even more
            technology-driven.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "AI-powered financial planning",
              "Open banking ecosystems",
              "Embedded finance",
              "Decentralized finance (DeFi)",
              "Biometric authentication",
              "Hyper-personalized banking experiences",
            ].map((trend, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1"
              >
                <FingerPrintIcon className="h-3 w-3" />
                {trend}
              </span>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Institutions that successfully adapt to technological change are
              likely to remain more competitive in the evolving financial
              landscape.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conclusion
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Digital transformation is fundamentally reshaping the financial
            services industry by improving efficiency, accessibility, and
            customer experience. Technologies such as AI, blockchain, and
            digital payments are creating new opportunities for businesses and
            investors alike.
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-5 text-center">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              As innovation continues to accelerate, understanding these
              technological shifts will become increasingly important for
              investors seeking to navigate the future of finance effectively.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
