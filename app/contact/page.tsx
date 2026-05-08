"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  Send,
  Loader2,
  Clock,
  Award,
  Users,
  Headphones,
} from "lucide-react";
import { useTheme } from "@/context/theme-context";

// Google Script URL - Replace with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwa7I8CeZg9XCc924dyVqkXux7zU1dHpgtl-3FxBKaJ5vp6Bd5yaiuIPSfbgURHlTkOHg/exec";

export default function ContactPage() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    queryType: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status.success) {
      timer = setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [status.success]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.phone ||
      !formData.email ||
      !formData.queryType
    ) {
      setStatus({
        loading: false,
        success: false,
        error: "Please fill all required fields",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({
        loading: false,
        success: false,
        error: "Please enter a valid email address",
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      setStatus({
        loading: false,
        success: false,
        error: "Please enter a valid 10-digit mobile number",
      });
      return;
    }

    try {
      // Submit to Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "website_contact_form",
        }),
      });

      // Also submit to your API if needed (optional)
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).catch(console.error);
      } catch (apiError) {
        console.warn("API submission failed:", apiError);
      }

      setStatus({ loading: false, success: true, error: "" });
      formRef.current?.reset();
      setFormData({
        name: "",
        phone: "",
        email: "",
        queryType: "",
        message: "",
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        loading: false,
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      });
    }
  };

  const stats = [
    { icon: Users, value: "5000+", label: "Happy Clients" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Headphones, value: "24/7", label: "Support Available" },
    { icon: Clock, value: "15min", label: "Response Time" },
  ];

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-950 text-gray-100"}`}
    >
      <NavBar />

      {/* Background effects - theme aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-1/4 w-[800px] h-[800px] ${
            theme === "light" ? "bg-purple-100/50" : "bg-purple-900/20"
          } rounded-full blur-3xl`}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-[600px] h-[600px] ${
            theme === "light" ? "bg-blue-100/50" : "bg-blue-900/20"
          } rounded-full blur-3xl`}
        ></div>
        <div
          className={`absolute -top-20 -left-20 w-[300px] h-[300px] border ${
            theme === "light" ? "border-gray-200" : "border-gray-800"
          } rounded-full`}
        ></div>
      </div>

      {/* Hero Section with Stats */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
                Let's Start a Conversation
              </span>
            </h1>
            <p
              className={`text-xl max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
            >
              Whether you have a question about our services, need expert
              advice, or want to start your investment journey — we're just a
              message away.
            </p>
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`text-center p-4 rounded-xl ${
                  theme === "light"
                    ? "bg-gray-50 border-gray-200"
                    : "bg-gray-900/50 border-gray-800"
                } border backdrop-blur-sm`}
              >
                <stat.icon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div
                  className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact page content */}
      <div className="relative z-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column: Contact info and map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`group p-5 rounded-xl transition-all duration-300 hover:shadow-lg ${
                  theme === "light"
                    ? "bg-white border-gray-200 hover:border-purple-200"
                    : "bg-gray-900 border-gray-800 hover:border-purple-800"
                } border backdrop-blur-sm`}
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <h3
                  className={`font-semibold mb-1 ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}
                >
                  Call Us
                </h3>
                <p
                  className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                >
                  Mon-Fri, 9AM - 6PM
                </p>
                <p className="text-purple-600 font-medium mt-2">
                  +91-9024138649
                </p>
              </div>

              <div
                className={`group p-5 rounded-xl transition-all duration-300 hover:shadow-lg ${
                  theme === "light"
                    ? "bg-white border-gray-200 hover:border-purple-200"
                    : "bg-gray-900 border-gray-800 hover:border-purple-800"
                } border backdrop-blur-sm`}
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <h3
                  className={`font-semibold mb-1 ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}
                >
                  Email Us
                </h3>
                <p
                  className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                >
                  Response within 24hrs
                </p>
                <p className="text-purple-600 font-medium mt-2 text-sm">
                  dsrgroupmandsaur@gmail.com
                </p>
              </div>
            </div>

            <div
              className={`${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-gray-900 border-gray-800"
              } backdrop-blur-sm border rounded-2xl p-6 shadow-md`}
            >
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3
                    className={`font-semibold mb-1 ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}
                  >
                    Visit Our Office
                  </h3>
                  <p
                    className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
                  >
                    DSR GROUP MANDSAUR, 117 Nemi Nagar Kothari Colony, Street No
                    3, Mandsaur, Madhya Pradesh, 458001
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl overflow-hidden ${
                theme === "light" ? "border-gray-200" : "border-gray-800"
              } border shadow-md`}
            >
              <div className="relative aspect-[4/3] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.662825219631!2d75.06658107498772!3d24.08340747779791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39642de670cce563%3A0xc75ed3cf73f3dd1f!2sDSR%20GROUP%20MANDSAUR!5e0!3m2!1sen!2sin!4v1709720284607!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Right column: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div
              className={`${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-gray-900 border-gray-800"
              } backdrop-blur-sm border rounded-2xl p-6 md:p-8 shadow-md`}
            >
              <h2
                className={`text-2xl font-semibold mb-2 ${
                  theme === "light" ? "text-gray-800" : "text-gray-100"
                }`}
              >
                Send us a Message
              </h2>
              <p
                className={`mb-6 text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
              >
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              {status.success && (
                <div className="mb-6 rounded-lg bg-green-100 dark:bg-green-900/50 p-4 border-l-4 border-green-500">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-200">
                        Success!
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your message has been sent. We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {status.error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm">
                    {status.error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-1.5 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === "light"
                        ? "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
                        : "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className={`block text-sm font-medium mb-1.5 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg ${
                        theme === "light"
                          ? "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
                          : "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                      } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="9876543210"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-1.5 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg ${
                        theme === "light"
                          ? "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
                          : "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                      } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="queryType"
                    className={`block text-sm font-medium mb-1.5 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Query Type *
                  </label>
                  <select
                    id="queryType"
                    name="queryType"
                    value={formData.queryType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === "light"
                        ? "bg-gray-50 border-gray-300 text-gray-800"
                        : "bg-gray-800 border-gray-700 text-gray-100"
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    required
                  >
                    <option value="">Select a query type</option>
                    <option value="Stocks Trading">Stocks Trading</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="IPO">IPO Services</option>
                    <option value="Futures & Options">Futures & Options</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Demat Account">Open Demat Account</option>
                    <option value="Tax Services">Tax Services</option>
                    <option value="Investment Advisory">
                      Investment Advisory
                    </option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-1.5 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Message{" "}
                    <span className="text-xs opacity-70">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-lg ${
                      theme === "light"
                        ? "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
                        : "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none`}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status.loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
