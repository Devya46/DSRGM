"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FileText,
  BarChart2,
  FileCheck,
  Building,
  Users,
  BookOpen,
  ShieldCheck,
  Briefcase,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Pause,
  Play,
  Star,
} from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Typewriter component for animated text
function Typewriter({
  text,
  delay = 30,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-5 bg-purple-500 ml-1 animate-pulse"></span>
      )}
    </div>
  );
}

// Animated number counter
function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && !isVisible) setIsVisible(true);
  }, [inView, isVisible]);

  useEffect(() => {
    let startTime = 0;
    let animationFrame: number | null = null;
    if (isVisible) {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1,
        );
        setCount(Math.floor(progress * value));
        if (progress < 1) animationFrame = requestAnimationFrame(animate);
        else setCount(value);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, value, duration]);

  return (
    <div ref={ref}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
}

export function CharterAccountSection() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typewriterRef = useRef(null);
  const inView = useInView(typewriterRef, { once: true, amount: 0.3 });
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const carouselRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: "Clients Served", value: 500, prefix: "", suffix: "+" },
    { label: "Tax Returns Filed", value: 2500, prefix: "", suffix: "+" },
    { label: "Years of Experience", value: 7, prefix: "", suffix: "" },
  ];

  const services = [
    {
      id: "tax",
      title: "Tax Planning & Compliance",
      icon: <FileText className="w-6 h-6" />,
      description:
        "Comprehensive tax services for individuals and businesses, ensuring compliance while minimizing liability through strategic planning.",
      features: [
        "Individual & Business Tax Returns",
        "Tax Planning Strategies",
        "IRS Representation",
        "International Tax Compliance",
        "State & Local Tax Advisory",
        "Tax Compliance Reviews",
      ],
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "gst",
      title: "GST Services",
      icon: <BarChart2 className="w-6 h-6" />,
      description:
        "End-to-end GST solutions including registration, filing, reconciliation, and compliance management for businesses of all sizes.",
      features: [
        "GST Registration Assistance",
        "Monthly/Quarterly GST Filing",
        "Input Tax Credit Optimization",
        "E-way Bill Management",
        "GST Audit & Annual Returns",
        "GST Reconciliation",
      ],
      color: "from-green-500 to-teal-600",
    },
    {
      id: "audit",
      title: "Audit & Assurance",
      icon: <FileCheck className="w-6 h-6" />,
      description:
        "Independent audit services that enhance credibility of financial information and provide assurance to stakeholders.",
      features: [
        "Statutory Audits",
        "Internal Audits",
        "Compliance Audits",
        "Due Diligence",
        "Process Audits",
        "SOC Reporting",
      ],
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "rera",
      title: "RERA Compliance",
      icon: <Building className="w-6 h-6" />,
      description:
        "Specialized services for real estate professionals to ensure full compliance with Real Estate Regulatory Authority requirements.",
      features: [
        "RERA Registration",
        "Quarterly Compliance Filing",
        "Project Management",
        "Financial Statement Preparation",
        "Compliance Documentation",
        "Advisory Services",
      ],
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "corporate",
      title: "Corporate Services",
      icon: <Briefcase className="w-6 h-6" />,
      description:
        "Comprehensive corporate services including company formation, secretarial work, and regulatory compliance.",
      features: [
        "Company Formation",
        "Corporate Restructuring",
        "Annual Compliance Management",
        "Board Meeting Support",
        "Corporate Governance",
        "Regulatory Filings",
      ],
      color: "from-indigo-500 to-blue-600",
    },
    {
      id: "stockbroking",
      title: "Stock Broking",
      icon: <BarChart2 className="w-6 h-6" />,
      description:
        "Comprehensive stock broking services offering diverse investment opportunities across multiple market segments with expert guidance and cutting-edge trading platforms.",
      features: [
        "Equity Trading",
        "Derivative Trading",
        "Currency Trading",
        "Commodity Trading",
        "Portfolio Management Services",
        "IPO Trading",
        "SLBM",
        "AIF",
      ],
      color: "from-purple-500 to-violet-600",
    },
  ];

  const testimonials = [
    {
      text: "The mutual fund and equity advice I received was spot-on. Their team broke down complex terms into easy-to-understand guidance, and I've already seen positive returns thanks to their timely suggestions.",
      author: "Umesh Kumar Pitaliya",
      position: "Chief Manager SBI",
      initials: "UKP",
      rating: 5,
    },
    {
      text: "Their CA-related services are incredibly professional and hassle-free. From tax filings to financial audits, everything was managed efficiently with complete transparency. I finally feel stress-free during tax season!",
      author: "CA Neha Jain",
      position: "Chartered Accountant",
      initials: "CNJ",
      rating: 5,
    },
    {
      text: "I approached them for help with RERA documentation and was amazed at the speed and clarity with which they handled everything. Their knowledge and professionalism made the entire process seamless.",
      author: "Alpesh Nagori",
      position: "Real Estate Investor",
      initials: "AN",
      rating: 5,
    },
    {
      text: "Their GST-related services are a lifesaver! Timely filing, accurate compliance, and instant support—it's everything a business needs to stay on the right side of regulations.",
      author: "Shubham Jain",
      position: "Startup Founder",
      initials: "SJ",
      rating: 5,
    },
    {
      text: "I absolutely love their daily financial updates and the way they promote financial literacy. Their tips are practical, jargon-free, and genuinely helpful in making informed decisions.",
      author: "Shivam Agrawal",
      position: "Freelancer",
      initials: "SA",
      rating: 5,
    },
    {
      text: "The team at DSR Group provided outstanding support for our company's tax planning. Their strategic approach saved us significant amount and ensured full compliance.",
      author: "Rajesh Mehta",
      position: "CEO, Mehta Enterprises",
      initials: "RM",
      rating: 5,
    },
    {
      text: "Excellent service! They handled our GST registration and filing with utmost professionalism. Highly recommended for any business looking for reliable CA services.",
      author: "Priya Singh",
      position: "Business Owner",
      initials: "PS",
      rating: 5,
    },
  ];

  // Triple the testimonials for seamless loop
  const loopingTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  // Auto-play for services carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentCarouselIndex((prev) => (prev + 1) % services.length);
      }, 4000);
    } else if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
    return () => {
      if (autoPlayIntervalRef.current)
        clearInterval(autoPlayIntervalRef.current);
    };
  }, [isAutoPlaying, services.length]);

  const nextSlide = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % services.length);
    setHoveredServiceId(null);
    setActiveServiceId(null);
  };

  const prevSlide = () => {
    setCurrentCarouselIndex(
      (prev) => (prev - 1 + services.length) % services.length,
    );
    setHoveredServiceId(null);
    setActiveServiceId(null);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Touch handlers for carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) prevSlide();
      else nextSlide();
    }
    setTouchStart(null);
  };

  // Get visible services with proper transform
  const getVisibleServices = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      let index = currentCarouselIndex + i;
      if (index < 0) index = services.length + index;
      if (index >= services.length) index = index - services.length;
      visible.push({ service: services[index], position: i });
    }
    return visible;
  };

  return (
    <div
      className={`py-16 ${theme === "light" ? "bg-gray-50" : "bg-gray-950"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                theme === "light"
                  ? "text-gray-900"
                  : "bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              }`}
            >
              Chartered Accountant Services
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          </motion.div>
          <div
            ref={typewriterRef}
            className={`text-lg ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
          >
            {inView && (
              <Typewriter
                text="At DSR Group, our team of experienced chartered accountants provides comprehensive financial services tailored to your unique needs. We combine deep expertise, innovative technology, and personalized attention to help individuals and businesses achieve their financial objectives while ensuring regulatory compliance."
                delay={15}
              />
            )}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 ${theme === "light" ? "text-gray-800" : "text-white"}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`p-6 rounded-xl ${
                theme === "light"
                  ? "bg-white shadow-md border border-gray-100"
                  : "bg-gray-900 border border-gray-800"
              } text-center`}
            >
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2}
                />
              </h3>
              <p
                className={
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Services Carousel - Smooth with transform animations */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h3
              className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}
            >
              Our Services
            </h3>
            <div className="flex gap-2">
              <button
                onClick={toggleAutoPlay}
                className={`p-2 rounded-full transition-all ${
                  theme === "light"
                    ? "bg-white border border-gray-200 hover:bg-gray-100 text-gray-700"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300"
                }`}
              >
                {isAutoPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={prevSlide}
                className={`p-2 rounded-full transition-all ${
                  theme === "light"
                    ? "bg-white border border-gray-200 hover:bg-gray-100 text-gray-700"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className={`p-2 rounded-full transition-all ${
                  theme === "light"
                    ? "bg-white border border-gray-200 hover:bg-gray-100 text-gray-700"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {getVisibleServices().map(({ service, position }) => (
                  <motion.div
                    key={`${service.id}-${currentCarouselIndex}`}
                    initial={{
                      opacity: 0,
                      x: position === -1 ? -40 : position === 1 ? 40 : 0,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: position === -1 ? 40 : position === 1 ? -40 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className={`rounded-xl overflow-hidden transition-all duration-300 ${
                      theme === "light"
                        ? "bg-white shadow-md border border-gray-200"
                        : "bg-gray-900 border border-gray-800"
                    } ${hoveredServiceId === service.id || activeServiceId === service.id ? "shadow-xl" : ""}`}
                    onMouseEnter={() => {
                      setHoveredServiceId(service.id);
                      setIsAutoPlaying(false);
                    }}
                    onMouseLeave={() => {
                      setHoveredServiceId(null);
                      setIsAutoPlaying(true);
                    }}
                  >
                    <div
                      className={`h-2 w-full bg-gradient-to-r ${service.color}`}
                    ></div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`p-3 rounded-lg mr-4 transition-colors ${
                            hoveredServiceId === service.id
                              ? theme === "light"
                                ? "bg-purple-200"
                                : "bg-purple-800/50"
                              : theme === "light"
                                ? "bg-purple-100"
                                : "bg-purple-900/30"
                          }`}
                        >
                          {React.cloneElement(service.icon, {
                            className: `w-6 h-6 ${theme === "light" ? "text-purple-600" : "text-purple-400"}`,
                          })}
                        </div>
                        <h4
                          className={`text-xl font-semibold ${theme === "light" ? "text-gray-800" : "text-white"}`}
                        >
                          {service.title}
                        </h4>
                      </div>
                      <p
                        className={`text-sm mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {service.description}
                      </p>
                      <AnimatePresence>
                        {(hoveredServiceId === service.id ||
                          activeServiceId === service.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 overflow-hidden"
                          >
                            <h5
                              className={`text-sm font-medium mb-3 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                            >
                              Key Features:
                            </h5>
                            <ul className="grid grid-cols-1 gap-2 mb-4">
                              {service.features
                                .slice(0, 4)
                                .map((feature, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div
                                      className={`mt-1 mr-2 h-2 w-2 rounded-full flex-shrink-0 ${
                                        theme === "light"
                                          ? "bg-purple-500"
                                          : "bg-purple-400"
                                      }`}
                                    />
                                    <span
                                      className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                                    >
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <button
                        onClick={() =>
                          setActiveServiceId(
                            activeServiceId === service.id ? null : service.id,
                          )
                        }
                        className={`mt-2 text-sm font-medium flex items-center transition-colors ${
                          theme === "light"
                            ? "text-purple-600 hover:text-purple-700"
                            : "text-purple-400 hover:text-purple-300"
                        }`}
                      >
                        {activeServiceId === service.id
                          ? "Show Less"
                          : "Learn More"}
                        <ChevronDown
                          className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                            activeServiceId === service.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentCarouselIndex(idx);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentCarouselIndex === idx
                    ? "w-8 bg-purple-500"
                    : `w-2 ${theme === "light" ? "bg-gray-300" : "bg-gray-700"}`
                }`}
              />
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <h3
            className={`text-2xl font-bold mb-8 text-center ${theme === "light" ? "text-gray-800" : "text-white"}`}
          >
            Our Process
          </h3>
          <div
            className={`rounded-xl p-8 ${
              theme === "light"
                ? "bg-white shadow-lg border border-gray-200"
                : "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Initial Consultation",
                  description:
                    "We begin with a thorough assessment of your needs and objectives.",
                  icon: <Users className="w-6 h-6" />,
                  delay: 0.1,
                },
                {
                  step: 2,
                  title: "Strategy Development",
                  description:
                    "Our experts create a customized plan tailored to your specific requirements.",
                  icon: <BookOpen className="w-6 h-6" />,
                  delay: 0.2,
                },
                {
                  step: 3,
                  title: "Implementation",
                  description:
                    "We execute the strategy with precision and attention to detail.",
                  icon: <Zap className="w-6 h-6" />,
                  delay: 0.3,
                },
                {
                  step: 4,
                  title: "Ongoing Support",
                  description:
                    "We provide continuous monitoring and support to ensure optimal results.",
                  icon: <ShieldCheck className="w-6 h-6" />,
                  delay: 0.4,
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: step.delay }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  <div className="relative mb-6 mx-auto">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto relative z-10 ${
                        theme === "light"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-purple-900/40 text-purple-300"
                      }`}
                    >
                      {React.cloneElement(step.icon, { className: "w-7 h-7" })}
                    </div>
                    {index < 3 && (
                      <div
                        className={`absolute top-1/2 left-full transform -translate-y-1/2 h-0.5 w-full hidden lg:block ${
                          theme === "light"
                            ? "bg-purple-200"
                            : "bg-purple-900/40"
                        }`}
                        style={{
                          width: "calc(100% - 2rem)",
                          marginLeft: "1rem",
                        }}
                      />
                    )}
                  </div>
                  <h4
                    className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-gray-800" : "text-white"}`}
                  >
                    Step {step.step}: {step.title}
                  </h4>
                  <p
                    className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`p-8 md:p-12 rounded-2xl text-center ${
            theme === "light"
              ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
              : "bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/40"
          }`}
        >
          <h3
            className={`text-2xl md:text-3xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}
          >
            Ready to Transform Your Financial Management?
          </h3>
          <p
            className={`max-w-2xl mx-auto mb-8 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
          >
            Our chartered accountant team is ready to help you navigate complex
            financial landscapes, ensure compliance, and optimize your tax
            strategy. Schedule a consultation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/contact")}
              className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all"
            >
              Schedule a Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* CSS-Powered Smooth Scrolling Testimonials - NO JAVASCRIPT SCROLL CONFLICTS */}
      <div
        className={`w-full mt-20 py-16 overflow-hidden ${
          theme === "light"
            ? "bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50"
            : "bg-gradient-to-r from-purple-950/40 via-pink-950/40 to-purple-950/40"
        }`}
        onMouseEnter={() => setIsTestimonialPaused(true)}
        onMouseLeave={() => setIsTestimonialPaused(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <h3
              className={`text-2xl md:text-3xl font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}
            >
              What Our Clients Say
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          </div>
        </div>

        {/* CSS Marquee Animation - SMOOTH AS BUTTER */}
        <div className="relative">
          <div
            className={`flex ${isTestimonialPaused ? "animate-none" : "animate-scroll"}`}
            style={{
              width: "max-content",
            }}
          >
            {/* First set */}
            {loopingTestimonials.map((testimonial, idx) => (
              <div
                key={`first-${idx}`}
                className={`w-80 md:w-96 flex-shrink-0 rounded-2xl p-6 mx-3 transition-all duration-300 hover:scale-105 ${
                  theme === "light"
                    ? "bg-white shadow-lg border border-gray-100"
                    : "bg-gray-900/80 backdrop-blur-sm border border-gray-800 shadow-xl"
                }`}
              >
                <div className="mb-4">
                  <svg
                    className={`w-8 h-8 ${theme === "light" ? "text-purple-300" : "text-purple-600"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p
                  className={`text-sm md:text-base mb-6 leading-relaxed line-clamp-4 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                >
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      theme === "light"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    }`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${theme === "light" ? "text-gray-800" : "text-white"}`}
                    >
                      {testimonial.author}
                    </h4>
                    <p
                      className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                    >
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${theme === "light" ? "text-amber-400" : "text-amber-500"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-purple-50 via-purple-50/80 to-transparent pointer-events-none hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-purple-50 via-purple-50/80 to-transparent pointer-events-none hidden md:block" /> */}
        </div>

        {/* Pause/Resume Button */}
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setIsTestimonialPaused(!isTestimonialPaused)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              theme === "light"
                ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {isTestimonialPaused ? (
              <span className="flex items-center gap-2">
                <Play className="w-3 h-3" /> Resume Scrolling
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Pause className="w-3 h-3" /> Pause Scrolling
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Add CSS animation styles */}
      <style jsx global>{`
        @keyframes smoothScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-scroll {
          animation: smoothScroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
