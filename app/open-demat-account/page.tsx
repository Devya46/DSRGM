"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  IdentificationIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -8,
    transition: { duration: 0.3, type: "spring", stiffness: 300 },
  },
};

const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

// Section wrapper with animation
const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function OpenDematAccountPage() {
  const { theme } = useTheme();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    accountType: "individual",
    queryType: "general",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("There was an error submitting your query. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requirements = [
    {
      id: 1,
      name: "PAN Card",
      description:
        "Valid and active PAN card is mandatory for all account holders",
      icon: IdentificationIcon,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      name: "Aadhaar Card",
      description: "For address proof and e-KYC verification",
      icon: ShieldCheckIcon,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      name: "Bank Account",
      description: "Active savings account with a valid IFSC code",
      icon: CreditCardIcon,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "Passport-sized Photographs",
      description: "Recent passport-sized photographs",
      icon: UserGroupIcon,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      name: "Income Proof",
      description: "For trading accounts (like salary slips, ITR, etc.)",
      icon: DocumentTextIcon,
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const benefits = [
    {
      id: 1,
      title: "Safety & Security",
      description:
        "Electronic storage eliminates risks associated with physical certificates",
      icon: ShieldCheckIcon,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: 2,
      title: "Seamless Trading",
      description:
        "Buy or sell securities with ease through our trading platforms",
      icon: ChartBarIcon,
      color: "from-sky-500 to-blue-500",
    },
    {
      id: 3,
      title: "Reduced Paperwork",
      description: "No physical handling of documents for most transactions",
      icon: DocumentTextIcon,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 4,
      title: "Lower Transaction Costs",
      description: "Reduced charges compared to physical share transactions",
      icon: LockClosedIcon,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 5,
      title: "Easy Portfolio Tracking",
      description: "Monitor all your investments in one place",
      icon: SparklesIcon,
      color: "from-rose-500 to-pink-500",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Complete the Registration Form",
      desc: "Fill in your basic details in our online form below or visit our office to get started.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      step: 2,
      title: "KYC Verification",
      desc: "Complete your KYC verification through in-person verification or e-KYC.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      step: 3,
      title: "Sign the Agreement",
      desc: "Review and sign the account opening agreement digitally or physically.",
      color: "from-pink-500 to-rose-500",
    },
    {
      step: 4,
      title: "Account Activation",
      desc: "Your Demat account will be activated within 24-48 hours of completing all requirements.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const faqs = [
    {
      q: "What is a Demat account?",
      a: "A Demat account is an account that holds your financial securities in electronic form, eliminating the need for physical certificates and making trading easier and more secure.",
    },
    {
      q: "Is there any annual maintenance charge?",
      a: "Yes, there is an Annual Maintenance Charge (AMC) associated with Demat accounts. Please contact us for our current fee structure.",
    },
    {
      q: "How long does it take to open a Demat account?",
      a: "Once all required documents and forms are submitted, your Demat account can be opened within 1-2 business days.",
    },
    {
      q: "Can I have multiple Demat accounts?",
      a: "Yes, you can have multiple Demat accounts with different depository participants (DPs).",
    },
    {
      q: "How do I check my Demat account balance?",
      a: "You can check your Demat account balance through our online portal, mobile app, or by requesting a statement from our office.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      {/* Sticky Header - NavBar with sticky positioning */}
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section with animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6"
          >
            <SparklesIcon className="h-4 w-4 mr-2" />
            Start Your Investment Journey
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
          >
            Open Your Demat Account
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Start your investment journey with DSR GROUP MANDSAUR. Open a Demat
            account today and gain access to a world of investment
            opportunities.
          </motion.p>

          {/* Main CTA Card - No blinking shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative group"
            >
              {/* Static shadow - no blinking/pulsing */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 md:p-10 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mb-4"
                  >
                    <SparklesIcon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Open your Free Demat Account with Scheme TRX20
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Get started with our special offer scheme - quick account
                    opening with premium benefits!
                  </p>
                  <motion.a
                    href="https://ekyc.motilaloswal.com/Partner/?diyid=0b5fb411-b64a-4ec8-bc49-b316540e42d5"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all duration-200 text-lg"
                  >
                    Open Account Now
                    <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    Fast, secure, and hassle-free account opening process
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <AnimatedSection className="mb-24">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Why Choose a Demat Account?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Experience the future of investing with our comprehensive Demat
              account benefits
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.color}`}
                ></div>
                <div className="p-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${benefit.color} bg-opacity-10 mb-4 transition-transform duration-300`}
                  >
                    <benefit.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Account Opening Process */}
        <AnimatedSection className="mb-24">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Simple 4-Step Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Get your Demat account up and running in no time
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                  type: "spring",
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.desc}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-3 text-gray-300 dark:text-gray-600">
                    <ArrowRightIcon className="h-6 w-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Requirements Section */}
        <AnimatedSection className="mb-24">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Documents Required
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Get these documents ready for a smooth account opening process
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {requirements.map((requirement) => (
              <motion.div
                key={requirement.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-r ${requirement.color} bg-opacity-10`}
                  >
                    <requirement.icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {requirement.name}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
                      {requirement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* CTA Banner - Redesigned & Better */}
        <AnimatedSection className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 md:p-12 shadow-2xl"
          >
            <div className="relative z-10 text-center">
              {/* Floating badges - removed RocketIcon since it wasn't exported */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white mb-6"
              >
                <SparklesIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold text-white mb-4"
              >
                Ready to Start Investing?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto"
              >
                Join over 10,000+ satisfied investors who trust DSR GROUP
                MANDSAUR
              </motion.p>

              {/* Feature list */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                {[
                  { icon: CheckCircleIcon, text: "Zero Account Opening Fees" },
                  { icon: ShieldCheckIcon, text: "Free Research Reports" },
                  { icon: LockClosedIcon, text: "24/7 Customer Support" },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full"
                  >
                    <feature.icon className="h-4 w-4 text-green-400" />
                    <span className="text-white text-sm">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.a
                href="https://ekyc.motilaloswal.com/Partner/?diyid=0b5fb411-b64a-4ec8-bc49-b316540e42d5"
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg text-lg"
              >
                Open Your Free Demat Account
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-indigo-200 text-sm"
              >
                No hidden charges • Quick verification • Start in 5 minutes
              </motion.p>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Registration Form */}
        <AnimatedSection className="mb-24">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Have Questions?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Fill out the form below and our investment experts will get back
              to you within 24 hours
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4"
              >
                <h3 className="text-xl font-semibold text-white">
                  Open Demat Account Queries
                </h3>
                <p className="text-indigo-100 text-sm">
                  Get personalized assistance for your investment journey
                </p>
              </motion.div>

              <div className="p-6 md:p-8">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    >
                      <CheckCircleIcon className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                      We've received your query. Our team will contact you
                      shortly to assist with your Demat account needs.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Submit Another Query
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {["name", "email", "phone", "city"].map(
                        (field, index) => (
                          <motion.div
                            key={field}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <label
                              htmlFor={field}
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize"
                            >
                              {field === "name"
                                ? "Full Name"
                                : field === "phone"
                                  ? "Phone Number"
                                  : field}{" "}
                              *
                            </label>
                            <input
                              type={
                                field === "email"
                                  ? "email"
                                  : field === "phone"
                                    ? "tel"
                                    : "text"
                              }
                              name={field}
                              id={field}
                              value={
                                formData[
                                  field as keyof typeof formData
                                ] as string
                              }
                              onChange={handleInputChange}
                              required
                              className="block w-full px-4 py-3 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                              placeholder={
                                field === "name"
                                  ? "John Doe"
                                  : field === "email"
                                    ? "example@email.com"
                                    : field === "phone"
                                      ? "+91 9876543210"
                                      : "Mumbai"
                              }
                            />
                          </motion.div>
                        ),
                      )}

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <label
                          htmlFor="accountType"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Account Type
                        </label>
                        <select
                          id="accountType"
                          name="accountType"
                          value={formData.accountType}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="individual">Individual</option>
                          <option value="joint">Joint</option>
                          <option value="corporate">Corporate</option>
                        </select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <label
                          htmlFor="queryType"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Query Type
                        </label>
                        <select
                          id="queryType"
                          name="queryType"
                          value={formData.queryType}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="account_opening">
                            Account Opening
                          </option>
                          <option value="kyc">KYC Process</option>
                          <option value="documents">Required Documents</option>
                          <option value="charges">Charges & Fees</option>
                          <option value="technical">Technical Support</option>
                        </select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="sm:col-span-2"
                      >
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Message (Optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please provide any specific details about your query..."
                          className="block w-full px-4 py-3 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        ></textarea>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      viewport={{ once: true }}
                      className="flex items-center"
                    >
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                      >
                        I agree to the{" "}
                        <Link
                          href="#"
                          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 underline font-medium"
                        >
                          terms and conditions
                        </Link>
                      </label>
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      variants={buttonHover}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Query"
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Find answers to common questions about Demat accounts
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer"
                >
                  <div className="px-6 py-4">
                    <dt className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {faq.q}
                    </dt>
                    <dd className="mt-2 text-gray-600 dark:text-gray-300">
                      {faq.a}
                    </dd>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
}
