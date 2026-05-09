"use client";

import { useTheme } from "@/context/theme-context";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  ChartBarIcon,
  PresentationChartLineIcon,
  CurrencyRupeeIcon,
  CalculatorIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

// Investment options - replace with actual offerings when available
const investmentOptions = [
  {
    id: "stocks",
    title: "Equity Trading",
    icon: ChartBarIcon,
    description:
      "Access Indian and global stock markets with our comprehensive trading platform and expert guidance.",
    features: [
      "Seamless trading experience through Motilal Oswal platforms",
      "Advanced technical analysis tools",
      "Expert research and stock recommendations",
      "Regular market updates and insights",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    icon: PresentationChartLineIcon,
    description:
      "Diversify your portfolio with a curated selection of mutual funds across various asset classes and risk profiles.",
    features: [
      "Wide range of equity, debt, and hybrid funds",
      "Zero commission on direct mutual funds",
      "Systematic investment plans (SIP) options",
      "Regular portfolio review and rebalancing",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80",
  },
  {
    id: "pms",
    title: "Portfolio Management Services",
    icon: CurrencyRupeeIcon,
    description:
      "Professional portfolio management tailored to your financial goals and risk tolerance.",
    features: [
      "Customized investment strategies",
      "Professional fund managers with proven track records",
      "Transparent performance reporting",
      "Access to exclusive investment opportunities",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    id: "alternatives",
    title: "Alternative Investments",
    icon: CalculatorIcon,
    description:
      "Explore alternative investment funds (AIFs) for diversification beyond traditional assets.",
    features: [
      "Access to private equity funds",
      "Real estate investment trusts (REITs)",
      "Structured products for sophisticated investors",
      "Hedge fund strategies for market-neutral returns",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
];

// Testimonials - replace with actual testimonials when available
const testimonials = [
  {
    id: "testimonial1",
    quote:
      "DSR GROUP MANDSAUR's investment advice has helped me achieve consistent returns above market average for the past 3 years.",
    author: "Rajesh P., Retail Investor",
    location: "Indore",
  },
  {
    id: "testimonial2",
    quote:
      "Their team took the time to understand my risk profile and financial goals before recommending any investments.",
    author: "Priya S., Business Owner",
    location: "Mandsaur",
  },
  {
    id: "testimonial3",
    quote:
      "The regular portfolio reviews and market insights have been invaluable for my long-term investment strategy.",
    author: "Amit K., Retired Professional",
    location: "Ujjain",
  },
];

export default function InvestorsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {NavBar ? (
        <NavBar />
      ) : (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              DSR GROUP MANDSAUR
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Home
              </Link>
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </header>
      )}

      <main>
        {/* Hero Section with Gradient Heading */}
        <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 dark:from-purple-900 dark:via-purple-950 dark:to-indigo-950">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400 sm:text-5xl lg:text-6xl">
              Investments Tailored to Your Goals
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-purple-100">
              DSR GROUP MANDSAUR offers diverse investment opportunities across
              multiple asset classes, designed to help you build wealth and
              achieve financial security.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                <Link
                  href="#investment-options"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Explore Options
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Philosophy */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 sm:text-4xl">
                Our Investment Philosophy
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                At DSR GROUP MANDSAUR, we believe in taking a disciplined,
                research-driven approach to investing, focusing on long-term
                growth while managing risk.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900">
                  <DocumentTextIcon
                    className="h-8 w-8"
                    style={{ color: "rgb(168 85 247)" }}
                  />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
                  Research-Driven
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Our investment recommendations are backed by thorough
                  fundamental and technical analysis.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900">
                  <CalculatorIcon
                    className="h-8 w-8"
                    style={{ color: "rgb(168 85 247)" }}
                  />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
                  Risk-Managed
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We prioritize risk management through diversification and
                  careful asset allocation.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900">
                  <UserGroupIcon
                    className="h-8 w-8"
                    style={{ color: "rgb(168 85 247)" }}
                  />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
                  Client-Focused
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Every investment recommendation is tailored to the unique
                  financial goals and risk tolerance of our clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Options - Cards with Background Image Behind Icon */}
        <section
          id="investment-options"
          className="py-16 bg-gray-50 dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 sm:text-4xl">
                Investment Options
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover our comprehensive range of investment products and
                services.
              </p>
            </div>

            <div className="space-y-8">
              {investmentOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex flex-col lg:flex`}
                >
                  {/* Icon Section with Background Image */}
                  <div className="relative lg:w-1/3 h-64 lg:h-auto">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${option.bgImage})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-indigo-900/70" />
                    {/* Icon */}
                    <div className="relative h-full flex items-center justify-center">
                      <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                        <option.icon
                          className="h-24 w-24"
                          style={{ color: "rgb(168 85 247)" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Content Section */}
                  <div className="lg:w-2/3 p-8 lg:p-10 bg-white dark:bg-gray-800">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 mb-4">
                      {option.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {option.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className="flex-shrink-0 h-5 w-5 mt-0.5">
                            <svg
                              className="h-5 w-5"
                              style={{ color: "rgb(168 85 247)" }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span className="ml-3 text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-2 rounded-lg font-medium transition-all duration-200"
                        style={{ color: "rgb(168 85 247)" }}
                      >
                        Learn More
                        <svg
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 sm:text-4xl">
                What Our Investors Say
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Hear from investors who have trusted us with their financial
                goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    <svg
                      className="h-6 w-6"
                      style={{ color: "rgb(168 85 247)" }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                    <svg
                      className="h-6 w-6 -ml-2"
                      style={{ color: "rgb(168 85 247)" }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-purple-800 dark:to-indigo-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="mt-4 text-xl text-purple-100 max-w-3xl mx-auto">
              Schedule a consultation with our financial advisors to discuss
              your investment goals and explore tailored solutions.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 md:text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Schedule a Consultation
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {Footer ? (
        <Footer />
      ) : (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
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
