"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer"; // Fixed import path
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Eye,
  Target,
  Shield,
  Zap,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Briefcase,
  BarChart3,
  FileText,
  PieChart,
  Building2,
  HandshakeIcon,
  Lightbulb,
  Rocket,
  HeartHandshake,
  Crown,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function AboutPage() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Add custom animations to head
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(2deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      
      @keyframes float-reverse {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(-2deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      
      @keyframes pulse-glow {
        0% { opacity: 0.3; transform: scale(0.95); }
        50% { opacity: 0.8; transform: scale(1.05); }
        100% { opacity: 0.3; transform: scale(0.95); }
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      @keyframes borderRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .animate-float {
        animation: float 5s ease-in-out infinite;
      }
      
      .animate-float-reverse {
        animation: float-reverse 6s ease-in-out infinite;
      }
      
      .cube-perspective {
        transform-style: preserve-3d;
        perspective: 1000px;
      }
      
      .shimmer-text {
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        background-size: 200% 100%;
        animation: shimmer 3s infinite;
      }

      .gradient-border {
        position: relative;
        border-radius: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1px;
      }
      
      .gradient-border-inner {
        border-radius: calc(1rem - 1px);
        background: inherit;
      }

      .card-hover-effect {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      .card-hover-effect:hover {
        transform: translateY(-8px) scale(1.02);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Expanded state for leadership cards
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {},
  );

  const toggleReadMore = (name: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div
      className={
        theme === "light"
          ? "bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 text-slate-800"
          : "bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white"
      }
    >
      <Head>
        <title>
          About Us | DSR Group Mandsaur - Financial Excellence Since 2015
        </title>
        <meta
          name="description"
          content="Learn about DSR Group Mandsaur, your trusted partner in financial services, investment solutions, taxation, and business consulting with over 5000+ satisfied clients."
        />
      </Head>

      <NavBar />

      <main className="relative z-10">
        {/* Hero Section - Simplified Elegant */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-4">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full filter blur-[120px] opacity-20"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full filter blur-[120px] opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-400">
                    Est. 2015
                  </span>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About DSR Group
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Since 2015, DSR Group has been your Trusted Partner in <br />
                Financial Excellence, Committed to Transparency, Integrity, and
                Client Satisfaction through personalized Financial Solutions
                that align with your goals and aspirations, where expertise
                meets Innovation and Service you can Trust.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Section 1: Image + Text - Split Layout with Stats */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Image with floating stats */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 z-10"></div>
                  <img
                    src="/about-2.png"
                    alt="DSR Group Team"
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 backdrop-blur-sm z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        5000+
                      </div>
                      <div className="text-xs text-gray-500">Happy Clients</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 backdrop-blur-sm z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ₹500Cr+
                      </div>
                      <div className="text-xs text-gray-500">
                        Assets Managed
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                    <Briefcase className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      Who We Are
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Comprehensive Financial
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {" "}
                      Services Provider
                    </span>
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  DSR Group Mandsaur is a comprehensive financial services
                  provider dedicated to guiding individuals and businesses
                  through their financial journeys. As an authorized sub-broker
                  of Motilal Oswal Financial Services Ltd, we offer a wide range
                  of investment services, including stock broking, mutual funds,
                  Portfolio Management Services (PMS), Alternative Investment
                  Funds (AIF), and comprehensive insurance solutions.
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our expertise extends to Income Tax Return (ITR) filing, Goods
                  and Services Tax (GST) assistance, audits, and a complete
                  suite of accounting services. We're committed to delivering
                  personalized financial solutions that align with your goals.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">SEBI Registered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">Authorized Sub-broker</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">ISO Certified</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Vision & Mission - Cube Style Layout (Vision Left, Mission Right with images) */}
        <section className="py-20 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent"></div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                <Target className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Our Direction
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Vision &{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Mission
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Vision Card - Image on Left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
                <div className="relative cube-perspective order-2 md:order-1">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 z-10"></div>
                    <img
                      src="about-3.png"
                      alt="Our Vision"
                      className="w-full h-[320px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
                      <p className="text-white text-sm">
                        Building a brighter financial future for all
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="order-1 md:order-2 mb-8 md:mb-0">
                  <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-indigo-500/20">
                    <div className="absolute -top-4 -left-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Eye className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-4 text-indigo-600 dark:text-indigo-400">
                      Our Vision
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      To emerge as India's most trusted financial services
                      partner, revolutionizing the industry through
                      technological innovation, unparalleled transparency, and
                      creating lasting wealth for over 1 million families by
                      2030, while setting new benchmarks in client-centric
                      financial solutions.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-12 h-px bg-gradient-to-r from-indigo-400 to-transparent"></div>
                      <span className="text-sm text-indigo-500">
                        Vision 2030
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission Card - Image on Right */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20">
                    <div className="absolute -top-4 -right-4 md:-right-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                        <Target className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-4 text-purple-600 dark:text-purple-400">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      To empower every client with personalized financial
                      wisdom, leveraging cutting-edge technology and deep market
                      expertise to transform financial aspirations into tangible
                      realities, while maintaining the highest standards of
                      integrity, transparency, and excellence across all our
                      services.
                    </p>
                    <div className="mt-6 flex items-center gap-4 justify-end">
                      <span className="text-sm text-purple-500">
                        Mission Excellence
                      </span>
                      <div className="w-12 h-px bg-gradient-to-l from-purple-400 to-transparent"></div>
                    </div>
                  </div>
                </div>

                <div className="relative cube-perspective order-1 md:order-2 mb-8 md:mb-0">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 z-10"></div>
                    <img
                      src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdyb3VwJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D"
                      alt="Our Mission"
                      className="w-full h-[320px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
                      <p className="text-white text-sm">
                        Committed to your financial success
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values Section - Enhanced Premium Design */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                <Crown className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Our Foundation
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Core{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Values
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                The principles that guide our actions, decisions, and
                relationships with our clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Integrity First",
                  description:
                    "Uncompromising ethical standards in every transaction and interaction. We believe honesty is the foundation of lasting relationships.",
                  color: "indigo",
                  gradient: "from-indigo-500 to-indigo-600",
                  lightBg: "bg-indigo-50",
                  lightText: "text-indigo-600",
                  darkBg: "bg-indigo-900/20",
                },
                {
                  icon: CheckCircle,
                  title: "Absolute Transparency",
                  description:
                    "Clear communication, no hidden fees, complete disclosure of all terms. You deserve to know exactly what you're getting.",
                  color: "emerald",
                  gradient: "from-emerald-500 to-emerald-600",
                  lightBg: "bg-emerald-50",
                  lightText: "text-emerald-600",
                  darkBg: "bg-emerald-900/20",
                },
                {
                  icon: Target,
                  title: "Excellence Driven",
                  description:
                    "Continuous improvement and pursuit of the highest quality standards in everything we do. Good is never good enough.",
                  color: "purple",
                  gradient: "from-purple-500 to-purple-600",
                  lightBg: "bg-purple-50",
                  lightText: "text-purple-600",
                  darkBg: "bg-purple-900/20",
                },
                {
                  icon: HeartHandshake,
                  title: "Client First",
                  description:
                    "Your success is our success. We're committed to your financial wellbeing above all else.",
                  color: "rose",
                  gradient: "from-rose-500 to-rose-600",
                  lightBg: "bg-rose-50",
                  lightText: "text-rose-600",
                  darkBg: "bg-rose-900/20",
                },
                {
                  icon: Zap,
                  title: "Innovation Forward",
                  description:
                    "Embracing cutting-edge technology and modern approaches for superior financial solutions.",
                  color: "amber",
                  gradient: "from-amber-500 to-amber-600",
                  lightBg: "bg-amber-50",
                  lightText: "text-amber-600",
                  darkBg: "bg-amber-900/20",
                },
                {
                  icon: TrendingUp,
                  title: "Growth Mindset",
                  description:
                    "Continuous learning, adaptation, and evolution in financial markets to serve you better.",
                  color: "cyan",
                  gradient: "from-cyan-500 to-cyan-600",
                  lightBg: "bg-cyan-50",
                  lightText: "text-cyan-600",
                  darkBg: "bg-cyan-900/20",
                },
                {
                  icon: Award,
                  title: "Accountability",
                  description:
                    "Taking ownership of outcomes and delivering on our promises every single time.",
                  color: "orange",
                  gradient: "from-orange-500 to-orange-600",
                  lightBg: "bg-orange-50",
                  lightText: "text-orange-600",
                  darkBg: "bg-orange-900/20",
                },
                {
                  icon: Star,
                  title: "Passion for Service",
                  description:
                    "Going above and beyond to exceed client expectations with genuine care.",
                  color: "pink",
                  gradient: "from-pink-500 to-pink-600",
                  lightBg: "bg-pink-50",
                  lightText: "text-pink-600",
                  darkBg: "bg-pink-900/20",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <div
                    className={`
                    relative rounded-2xl p-6 h-full transition-all duration-300
                    ${
                      theme === "light"
                        ? "bg-white shadow-md hover:shadow-xl border border-gray-100"
                        : `bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/60`
                    }
                  `}
                  >
                    {/* Animated background gradient on hover */}
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === "light" ? "bg-gradient-to-br from-gray-50 to-transparent" : "bg-gradient-to-br from-white/5 to-transparent"}`}
                    ></div>

                    <div className="relative z-10">
                      {/* Icon with gradient circle background */}
                      <div
                        className={`
                        w-14 h-14 rounded-xl flex items-center justify-center mb-5
                        ${theme === "light" ? value.lightBg : value.darkBg}
                        group-hover:scale-110 transition-transform duration-300
                      `}
                      >
                        <value.icon
                          className={`w-7 h-7 ${theme === "light" ? value.lightText : "text-white"}`}
                        />
                      </div>

                      <h3
                        className={`text-xl font-bold mb-3 ${theme === "light" ? "text-gray-800" : "text-white"}`}
                      >
                        {value.title}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {value.description}
                      </p>

                      {/* Decorative underline on hover */}
                      <div
                        className={`mt-4 h-0.5 w-0 group-hover:w-12 transition-all duration-500 bg-gradient-to-r ${value.gradient} rounded-full`}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team Section - Enhanced with Full Bios */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                <Users className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Leadership Team
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet Our{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Leadership
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                A passionate team of financial experts dedicated to your success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Deepak Jain",
                  title: "Founder & CEO",
                  image: "/CEO.jpg",
                  fullBio:
                    "Deepak Jain is the founder & CEO of DSR GROUP MANDSAUR, bringing with him a wealth of experience and expertise. He holds an MBA in finance and marketing, which has equipped him with the skills and knowledge needed to lead our organization to success. Prior to joining our team, Deepak worked at Vivo as an assistant VBA manager, where he gained valuable experience and developed his management and leadership skills. With over 12+ years of experience in financial markets, Deepak has successfully guided thousands of clients towards their financial goals.",
                  expertise: [
                    "Investment Strategy",
                    "Portfolio Management",
                    "Business Leadership",
                    "Risk Assessment",
                  ],
                  achievements: [
                    "Led DSR Group to 5000+ clients",
                    "Awarded 'Best Financial Advisor 2023'",
                    "SEBI Registered Investment Advisor",
                  ],
                  color: "from-indigo-500 to-purple-600",
                  social: { linkedin: "#", twitter: "#" },
                },
                {
                  name: "Barkha Jain",
                  title: "Marketing Director",
                  image: "/logo.jpg",
                  fullBio:
                    "Barkha Jain is managing our company's Marketing, bringing with her a diverse set of skills and experience. She holds a Bachelor's degree in Commerce and an MBA in Finance and HR. With more than eight years of experience in the industry, Barkha has a deep understanding of the latest marketing trends and techniques. Her experience includes developing marketing strategies, managing social media campaigns, and leading successful marketing initiatives that have significantly grown the DSR Group brand presence.",
                  expertise: [
                    "Digital Marketing",
                    "Brand Strategy",
                    "Client Relations",
                    "Campaign Management",
                  ],
                  achievements: [
                    "Grew social media presence by 300%",
                    "Launched successful client referral program",
                    "Marketing Excellence Award 2024",
                  ],
                  color: "from-emerald-500 to-teal-500",
                  social: { linkedin: "#", twitter: "#" },
                },
                {
                  name: "Rahul Jain",
                  title: "Chief Technology Officer",
                  image: "/CTO.jpg",
                  fullBio:
                    "Mr. Rahul Jain is a Software Engineer, currently managing all technology leads at DSR GROUP Mandsaur. He is a research scholar in Artificial Intelligence and Machine Learning, with M.Tech and B.Tech in Computer Science (Gold Medal). He has tremendous expertise in emerging technology and data analysis tools. Rahul has implemented cutting-edge trading platforms and analytics systems that have revolutionized how clients interact with financial markets.",
                  expertise: [
                    "AI/ML",
                    "Data Analytics",
                    "Tech Innovation",
                    "Platform Development",
                  ],
                  achievements: [
                    "Developed proprietary trading analytics",
                    "Gold Medalist - M.Tech CSE",
                    "Published 5 research papers on FinTech",
                  ],
                  color: "from-purple-500 to-pink-500",
                  social: { linkedin: "#", twitter: "#" },
                },
              ].map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden h-full transition-all duration-300 ${
                      theme === "light"
                        ? "bg-white shadow-lg hover:shadow-2xl"
                        : "bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/60"
                    }`}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Social Links Overlay */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        {/* <a
                          href={leader.social.linkedin}
                          className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition"
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                        <a
                          href={leader.social.twitter}
                          className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition"
                        >
                          <Twitter className="w-4 h-4 text-white" />
                        </a> */}
                      </div>

                      {/* Name Overlay */}
                      <div className="absolute bottom-0 left-0 p-5">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {leader.name}
                        </h3>
                        <div
                          className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${leader.color} text-xs text-white font-medium`}
                        >
                          {leader.title}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p
                        className={`text-sm leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-300"} ${expandedCards[leader.name] ? "" : "line-clamp-3"}`}
                      >
                        {leader.fullBio}
                      </p>

                      {expandedCards[leader.name] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-3"
                        >
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-2">
                              Core Expertise
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {leader.expertise.map((skill, i) => (
                                <span
                                  key={i}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    theme === "light"
                                      ? "bg-indigo-50 text-indigo-700"
                                      : "bg-indigo-900/30 text-indigo-300"
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-2">
                              Key Achievements
                            </h4>
                            <ul className="space-y-1">
                              {leader.achievements.map((achievement, i) => (
                                <li
                                  key={i}
                                  className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2"
                                >
                                  <Sparkles className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      <button
                        onClick={() => toggleReadMore(leader.name)}
                        className={`mt-4 text-sm font-medium flex items-center gap-1 ${
                          theme === "light"
                            ? "text-indigo-600 hover:text-indigo-700"
                            : "text-indigo-400 hover:text-indigo-300"
                        } transition-colors`}
                      >
                        {expandedCards[leader.name] ? "Show less" : "Read more"}
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${expandedCards[leader.name] ? "rotate-90" : "group-hover:translate-x-1"}`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

              <div className="relative p-10 md:p-14 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Start Your Financial Journey?
                </h3>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Join over 5000+ satisfied clients who trust DSR Group for
                  their financial success
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/products/ipo"
                    className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
