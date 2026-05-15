"use client";

import { useTheme } from "@/context/theme-context";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  const { theme } = useTheme();

  // Products data organized for two columns
  const productsLeft = [
    { name: "Stocks", path: "/stocks" },
    { name: "Futures & Options", path: "/products/futures-options" },
    { name: "MTF", path: "/products/mtf" },
    { name: "IPO", path: "/products/ipo" },
    { name: "Mutual Funds", path: "/#mutual-funds" },
    { name: "NFO", path: "/products/nfo" },
    { name: "ETF", path: "/products/etf" },
  ];

  const productsRight = [
    { name: "Loans", path: "/loans" },
    { name: "Analytics", path: "/analytics" },
    { name: "PMS", path: "/products/pms" },
    { name: "IAP", path: "/products/iap" },
    { name: "SLBM", path: "/products/slbm" },
    { name: "Unlisted Share", path: "/products/unlisted-share" },
    { name: "AIF", path: "/products/aif" },
    { name: "Insurance", path: "/products/insurance" },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={18} />,
      url: "https://facebook.com/dsrgroup",
      name: "Facebook",
    },
    {
      icon: <Twitter size={18} />,
      url: "https://twitter.com/dsrgroup",
      name: "Twitter",
    },
    {
      icon: <Youtube size={18} />,
      url: "https://www.youtube.com/@dsrgroupmandsaur",
      name: "YouTube",
    },
    {
      icon: <Instagram size={18} />,
      url: "https://www.instagram.com/dsrgroupmandsaur/",
      name: "Instagram",
    },
    {
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com/in/dsr-group-684b29246/",
      name: "LinkedIn",
    },
  ];

  return (
    <footer
      className={`pt-16 ${
        theme === "light"
          ? "bg-gradient-to-b from-white to-gray-50 text-gray-600"
          : "bg-gradient-to-b from-gray-950 to-gray-900 text-gray-400"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info & Address - 4 columns */}
          <div className="md:col-span-4">
            <Link href="/" className="flex justify-center mb-6 group">
              <Image
                src="/logo-1.jpg"
                alt="DSR Group Logo"
                width={140}
                height={42}
                className="h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg"
              />
            </Link>

            <div className="space-y-4 text-sm leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-purple-500"
                />
                <p className="text-sm leading-relaxed">
                  DSR GROUP MANDSAUR, 117 Nemi Nagar Kothari Colony, Street No 3
                  (Motilal Oswal Financial Services), Mandsaur, Madhya Pradesh,
                  458001
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-purple-500"
                />
                <div>
                  <p className="text-sm">Mobile: +91-9024138649</p>
                  <p className="text-sm">Landline: 07422 - 496399</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-purple-500"
                />
                <a
                  href="mailto:dsrgroupmandsaur@gmail.com"
                  className="text-sm hover:text-purple-500 transition-colors duration-200 break-all"
                >
                  dsrgroupmandsaur@gmail.com
                </a>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-500 hover:text-purple-600 transition-colors duration-200"
                >
                  Contact Us
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit DSR Group on ${social.name}`}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* PRODUCTS - 3 columns */}
          <div className="md:col-span-3">
            <h3
              className={`text-base font-bold mb-6 uppercase tracking-wider ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Products
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <ul className="space-y-2">
                {productsLeft.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="text-sm hover:text-purple-500 transition-colors duration-200 inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {productsRight.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="text-sm hover:text-purple-500 transition-colors duration-200 inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DSR GROUP - 2.5 columns */}
          <div className="md:col-span-2">
            <h3
              className={`text-base font-bold mb-6 uppercase tracking-wider ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              DSR GROUP
            </h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Blog", path: "/dsr-group-digest" },
                { name: "Media & Press", path: "/market-news" },
                { name: "Careers", path: "/careers" },
                { name: "Help and Support", path: "/help-support" },
                { name: "Trust and Safety", path: "/trust-safety" },
                { name: "Partners", path: "/partners" },
                { name: "Investors", path: "/investors" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-sm hover:text-purple-500 transition-colors duration-200 inline-block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS - 2.5 columns */}
          <div className="md:col-span-3">
            <h3
              className={`text-base font-bold mb-6 uppercase tracking-wider ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "AMC Mutual Funds", path: "/amc-mutual-funds" },
                { name: "Calculators", path: "/calculators" },
                { name: "Glossary", path: "/glossary" },
                { name: "Open Demat Account", path: "/open-demat-account" },
                { name: "DSR Group Digest", path: "/dsr-group-digest" },
                { name: "Sitemap", path: "/sitemap" },
                { name: "Income Tax", path: "/tax" },
                { name: "Market News", path: "/market-news" },
                { name: "Learning Center", path: "/learning-center" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-sm hover:text-purple-500 transition-colors duration-200 inline-block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Compliance Section */}
        <div
          className={`mt-12 pt-8 border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Regulatory Information */}
            <div>
              <h4
                className={`text-sm font-semibold mb-3 ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
              >
                Regulatory Information
              </h4>
              <p className="text-xs leading-relaxed mb-2">
                DSR GROUP MANDSAUR™ operates as an Authorized Business Associate
                of Motilal Oswal Financial Services Limited, providing
                comprehensive financial and investment services under applicable
                regulatory frameworks.
              </p>
              <p className="text-xs text-purple-500/80 dark:text-purple-400/80 leading-relaxed">
                NSE: AP0297130541 | BSE: AP01044601140 | MCX: MCX/AP/151388 |
                AMFI: ARN-175170 | LIC Code: 07980346
              </p>
            </div>

            {/* Disclaimer */}
            <div>
              <h4
                className={`text-sm font-semibold mb-3 ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
              >
                Disclaimer
              </h4>
              <p className="text-xs leading-relaxed">
                Investments in securities market are subject to market risks;
                read all the related documents carefully before investing. Past
                performance is not indicative of future returns. Please consider
                your specific investment requirements, risk tolerance,
                investment goal, and time frame associated with the investment
                before choosing a fund or designing a portfolio.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Links & Copyright */}
        <div
          className={`mt-8 py-6 border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-center md:text-left">
              © {new Date().getFullYear()} DSR GROUP MANDSAUR™. All rights
              reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { name: "Terms & Conditions", path: "/terms-and-conditions" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Refund Policy", path: "/refund-policy" },
                { name: "Cookie Policy", path: "/cookie-policy" },
                { name: "FATCA Declaration", path: "/fatca-declaration" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-xs hover:text-purple-500 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Designed By Credit */}
        <div
          className={`py-6 text-center border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-800"
          }`}
        >
          <p className="text-xs">
            Designed by{" "}
            <a
              href="https://skilled-va.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-600 font-medium transition-all duration-200 hover:underline underline-offset-2"
            >
              Skilled VA
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
