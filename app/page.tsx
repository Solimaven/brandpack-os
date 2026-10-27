"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Video, 
  Globe, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ChevronDown, 
  Menu, 
  X, 
  Cpu,
  Check,
  Sun,
  Moon,
  Clock,
  DollarSign
} from "lucide-react";

export default function AgencyPortfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "brand" | "motion" | "web">("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive Project Cost Estimator State
  const [projectType, setProjectType] = useState<"brand" | "motion" | "web" | "full">("brand");
  const [projectSpeed, setProjectSpeed] = useState<"standard" | "urgent">("standard");

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", service: "Brand Identity", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const calculateEstimate = () => {
    let base = 300;
    let days = "7-10 Days";
    if (projectType === "motion") { base = 500; days = "10-14 Days"; }
    if (projectType === "web") { base = 800; days = "14-21 Days"; }
    if (projectType === "full") { base = 1500; days = "21-30 Days"; }
    if (projectSpeed === "urgent") { base *= 1.3; days = "3-5 Express Days"; }
    
    return {
      cost: `$${Math.round(base)} – $${Math.round(base * 1.4)}`,
      time: days
    };
  };

  const estimate = calculateEstimate();

  const portfolioProjects = [
    {
      title: "Prime Pay Digital UI/UX",
      category: "web",
      tag: "UI/UX & Web App",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      desc: "Complete digital payment platform UI screen concepts and responsive web dashboard.",
    },
    {
      title: "NBC Premier League Broadcast Pack",
      category: "motion",
      tag: "Motion Graphics",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
      desc: "Dynamic matchday broadcast graphics and high-impact stadium animation bumpers.",
    },
    {
      title: "Allies Master Brand Identity",
      category: "brand",
      tag: "Brand Design",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
      desc: "Comprehensive corporate visual identity, custom pen-nib monogram, and vector guidelines.",
    },
    {
      title: "Simba SC Fan Culture Visuals",
      category: "motion",
      tag: "Motion & Social",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      desc: "High-engagement social media motion graphics and stadium promotional campaign assets.",
    },
    {
      title: "TUMAINI HALIFI Book Publication",
      category: "brand",
      tag: "Editorial Design",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      desc: "Professional manuscript typesetting, cover design, and interior page layout formatting.",
    },
    {
      title: "Innovation Week Tanzania 2026",
      category: "brand",
      tag: "Event Branding",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      desc: "Event promotional flyers, digital billboards, and comprehensive branding collateral.",
    },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === selectedCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: "", email: "", phone: "", service: "Brand Identity", message: "" });
    }, 4000);
  };

  const services = [
    {
      icon: <Palette className="w-6 h-6 text-blue-500" />,
      title: "Brand Identity & Logo Design",
      desc: "We build unforgettable visual identities, custom vector logos, and comprehensive brand guidelines that set you apart.",
    },
    {
      icon: <Video className="w-6 h-6 text-orange-500" />,
      title: "Motion Graphics & Broadcast",
      desc: "Stunning motion design, stadium promotional bumpers, and high-energy social media animations.",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      title: "Web Development & UI/UX",
      desc: "High-performance responsive websites, web apps, and e-commerce stores engineered to turn visitors into loyal customers.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-orange-400" />,
      title: "Digital Growth Strategy",
      desc: "Comprehensive market analysis, content strategy, and ongoing performance optimization to maximize your business ROI.",
    },
  ];

  const faqs = [
    {
      question: "What makes Allies Investors Tanzania different from other agencies?",
      answer: "We combine world-class creative design (brand & motion) with rigorous technical execution. We treat your business as our own with lightning-fast delivery and holistic digital strategy."
    },
    {
      question: "How long does a typical brand identity or web project take?",
      answer: "Brand identity packages typically take 1 to 2 weeks, while full web development and motion campaigns range between 2 to 4 weeks depending on scope."
    },
    {
      question: "Do you work with international clients outside Tanzania?",
      answer: "Yes! While based in Dar es Salaam / Mbeya, Tanzania, we collaborate with businesses, football clubs, and entrepreneurs across Africa and globally."
    },
    {
      question: "How do we get started on a project?",
      answer: "Simply use our project cost estimator below or fill out the contact form. We will schedule a quick consultation to understand your goals and provide a tailored proposal."
    },
  ];

  // Dynamic Tailwind Theme Utility Classes
  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-[#0B0F17] text-slate-100" : "bg-slate-50 text-slate-900";
  const bgHeader = isDark ? "bg-[#0B0F17]/90 border-slate-800/80" : "bg-white/90 border-slate-200/80 shadow-sm";
  const bgCard = isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200 shadow-xl";
  const bgSubCard = isDark ? "bg-[#0B0F17] border-slate-800" : "bg-slate-100 border-slate-200";
  const textHeading = isDark ? "text-white" : "text-slate-900";
  const textSub = isDark ? "text-slate-400" : "text-slate-600";
  const borderSec = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300 overflow-x-hidden relative ${bgMain}`}>
      
      {/* ELEGANT DOT MATRIX BACKGROUND PATTERN */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute inset-0 opacity-[0.18] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]`}></div>

        <motion.div 
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]"
        />

        <motion.div 
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-orange-600/8 rounded-full blur-[170px]"
        />
      </div>

      {/* HEADER / NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${bgHeader}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Using your actual /logo.png file from the public folder */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/logo.png" 
              alt="Allies Investors Tanzania Logo" 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40 shadow-lg shadow-blue-600/20 shrink-0 hover:scale-105 transition-transform" 
            />
            
            <div className="flex flex-col justify-center">
              <span className={`font-black text-sm sm:text-base tracking-tight leading-none ${textHeading}`}>
                Allies Investors Tanzania
              </span>
              <span className="text-[10px] sm:text-[11px] text-blue-500 font-extrabold tracking-widest uppercase mt-1">
                Shaping Digital Future
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className={`hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wide ${textSub}`}>
            <a href="#services" className="hover:text-blue-500 transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-blue-500 transition-colors">Portfolio</a>
            <a href="#estimator" className="hover:text-blue-500 transition-colors">Cost Estimator</a>
            <a href="#about" className="hover:text-blue-500 transition-colors">About Us</a>
            <a href="#faq" className="hover:text-blue-500 transition-colors">FAQ</a>
          </nav>

          {/* Theme Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark 
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800" 
                  : "bg-slate-100 border-slate-200 text-blue-600 hover:bg-slate-200"
              }`}
              title="Toggle Dark/Light Mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border ${
                isDark ? "bg-slate-900 border-slate-800 text-amber-400" : "bg-slate-100 border-slate-200 text-blue-600"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${textSub}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden border-b px-6 py-6 space-y-4 text-sm font-semibold relative z-50 ${bgCard}`}
          >
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className={`block ${textSub} hover:text-blue-500`}>Services</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className={`block ${textSub} hover:text-blue-500`}>Portfolio</a>
            <a href="#estimator" onClick={() => setMobileMenuOpen(false)} className={`block ${textSub} hover:text-blue-500`}>Cost Estimator</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className={`block ${textSub} hover:text-blue-500`}>About Us</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className={`block ${textSub} hover:text-blue-500`}>FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full py-3 bg-orange-600 text-white text-center rounded-xl font-bold">Get Started</a>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-medium text-blue-500 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-blue-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Shaping Digital Future — Allies Investors Tanzania</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-4xl sm:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight ${textHeading}`}
          >
            We Transform Bold Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500">Exceptional Digital Realities</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-xl max-w-2xl mx-auto leading-relaxed ${textSub}`}
          >
            Allies Investors Tanzania is a premier creative and technology agency specializing in brand identity, motion graphics, UI/UX web development, and digital scaling.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center space-x-3 text-base"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#estimator"
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-600/20 transition-all text-base text-center"
            >
              Calculate Project Cost
            </a>
          </motion.div>

          {/* Key Metrics Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-16 border-t ${borderSec}`}
          >
            <div className="text-center">
              <div className="text-3xl font-extrabold text-blue-500">50+</div>
              <div className={`text-xs mt-1 ${textSub}`}>Completed Projects</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-extrabold ${textHeading}`}>100%</div>
              <div className={`text-xs mt-1 ${textSub}`}>Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-orange-500">24/7</div>
              <div className={`text-xs mt-1 ${textSub}`}>Dedicated Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-blue-500">Top Tier</div>
              <div className={`text-xs mt-1 ${textSub}`}>Design & Motion Studio</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className={`py-24 px-6 border-t relative z-10 ${borderSec} ${isDark ? "bg-slate-950/50" : "bg-slate-100/50"}`}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
              What We Offer
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold ${textHeading}`}>Comprehensive Digital Solutions</h2>
            <p className={`text-sm sm:text-base ${textSub}`}>We love challenging projects that require thoughtful design, sophisticated development, and market strategy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((srv, idx) => (
              <motion.div 
                whileHover={{ y: -8 }}
                key={idx} 
                className={`border rounded-3xl p-8 space-y-4 shadow-xl hover:border-blue-500/50 transition-all group ${bgCard}`}
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform ${bgSubCard}`}>
                  {srv.icon}
                </div>
                <h3 className={`text-lg font-bold ${textHeading}`}>{srv.title}</h3>
                <p className={`text-xs leading-relaxed ${textSub}`}>{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO / PROJECTS SECTION */}
      <section id="portfolio" className={`py-24 px-6 border-t relative z-10 ${borderSec}`}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
                Our Showcase
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold ${textHeading}`}>A Selection of Our Recent Projects</h2>
              <p className={`text-sm ${textSub}`}>Explore how we help brands stand out through powerful visual storytelling and robust digital engineering.</p>
            </div>

            {/* Category Filter Tabs */}
            <div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl border ${bgSubCard}`}>
              {[
                { id: "all", label: "All Projects" },
                { id: "brand", label: "Brand Identity" },
                { id: "motion", label: "Motion Graphics" },
                { id: "web", label: "Web & UI/UX" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                    selectedCategory === tab.id 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" 
                      : `${textSub} hover:text-blue-500`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                key={idx}
                className={`border rounded-3xl overflow-hidden shadow-2xl group hover:border-blue-500/40 transition-all flex flex-col ${bgCard}`}
              >
                <div className={`relative h-56 overflow-hidden ${bgSubCard}`}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-blue-400 rounded-full uppercase tracking-wider">
                    {project.tag}
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className={`text-lg font-bold group-hover:text-blue-500 transition-colors ${textHeading}`}>{project.title}</h3>
                    <p className={`text-xs leading-relaxed ${textSub}`}>{project.desc}</p>
                  </div>
                  <div className={`pt-4 border-t flex items-center justify-between text-xs font-semibold text-blue-500 ${borderSec}`}>
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PROJECT COST ESTIMATOR */}
      <section id="estimator" className={`py-24 px-6 border-t relative z-10 ${borderSec} ${isDark ? "bg-slate-950/50" : "bg-slate-100/50"}`}>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">
              Instant Budget Calculator
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold ${textHeading}`}>Estimate Your Project Cost</h2>
            <p className={`text-sm ${textSub}`}>Select your requirements below to calculate an instant ballpark budget estimate.</p>
          </div>

          <div className={`border rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 ${bgCard}`}>
            <div className="space-y-4">
              <label className={`text-xs font-bold uppercase tracking-wider ${textHeading}`}>1. Select Service Discipline</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: "brand", title: "Brand Identity", icon: <Palette className="w-4 h-4" /> },
                  { id: "motion", title: "Motion Design", icon: <Video className="w-4 h-4" /> },
                  { id: "web", title: "Web Development", icon: <Globe className="w-4 h-4" /> },
                  { id: "full", title: "Full Agency Pack", icon: <Cpu className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProjectType(item.id as any)}
                    className={`p-4 rounded-2xl border text-left flex flex-col space-y-2 transition-all ${
                      projectType === item.id 
                        ? "bg-blue-600/20 border-blue-500 text-blue-500 shadow-lg shadow-blue-600/10" 
                        : `${bgSubCard} ${textSub} hover:border-slate-400`
                    }`}
                  >
                    <span className="text-blue-500">{item.icon}</span>
                    <span className={`text-xs font-bold ${textHeading}`}>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className={`text-xs font-bold uppercase tracking-wider ${textHeading}`}>2. Select Project Timeline</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "standard", title: "Standard Delivery (2-4 Weeks)", desc: "Normal studio sprint with comprehensive QA." },
                  { id: "urgent", title: "Priority / Rush Delivery (Fast-Track)", desc: "Dedicated immediate team allocation (+30%)." },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProjectSpeed(item.id as any)}
                    className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                      projectSpeed === item.id 
                        ? "bg-blue-600/20 border-blue-500 text-blue-500 shadow-lg" 
                        : `${bgSubCard} ${textSub} hover:border-slate-400`
                    }`}
                  >
                    <div className={`text-xs font-bold ${textHeading}`}>{item.title}</div>
                    <div className={`text-[11px] ${textSub}`}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${borderSec}`}>
              <div className="space-y-1 text-center sm:text-left">
                <div className={`text-xs uppercase tracking-wider font-semibold ${textSub}`}>Estimated Investment & Turnaround</div>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">
                  {estimate.cost}
                </div>
                <div className="text-xs text-blue-500 font-semibold flex items-center justify-center sm:justify-start gap-1">
                  <Clock className="w-3.5 h-3.5" /> Est. Turnaround: {estimate.time}
                </div>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-600/30 transition-all text-xs text-center"
              >
                Book Project With This Estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US / WHY CHOOSE US */}
      <section id="about" className={`py-24 px-6 border-t relative z-10 ${borderSec}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
              Why Choose Allies Investors
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold leading-tight ${textHeading}`}>
              Shaping Digital Future Across Tanzania & Beyond.
            </h2>
            <p className={`text-sm leading-relaxed ${textSub}`}>
              We treat your business as if it were our own. Founded in Tanzania, Allies Investors brings together absolute experts in brand identity, motion design, and software engineering to deliver exceptional results.
            </p>

            <div className="space-y-4 pt-2">
              {[
                "Team of absolute experts with a proven track record",
                "Lightning-fast project implementation & execution",
                "Holistic digital approach combining creative & technical strategy",
                "24/7 partner availability and dedicated support",
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center space-x-3 text-xs font-semibold ${textHeading}`}>
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl blur-xl opacity-20"></div>
            <div className={`relative border rounded-3xl p-8 space-y-6 shadow-2xl ${bgCard}`}>
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Our Core Vision</span>
                <h3 className={`text-xl font-bold ${textHeading}`}>Empowering African Businesses & Global Brands</h3>
              </div>
              <p className={`text-xs leading-relaxed ${textSub}`}>
                Whether you are launching a startup, scaling an established enterprise, or producing broadcast sports graphics, our team delivers world-class standards without compromise.
              </p>
              <div className={`pt-4 border-t flex items-center justify-between ${borderSec}`}>
                <div>
                  <div className={`text-sm font-bold ${textHeading}`}>Solima Manyama</div>
                  <div className={`text-xs ${textSub}`}>Founder & Primary Designer</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                  SM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className={`py-24 px-6 border-t relative z-10 ${borderSec} ${isDark ? "bg-slate-950/50" : "bg-slate-100/50"}`}>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
              Got Questions?
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold ${textHeading}`}>Frequently Asked Questions</h2>
            <p className={`text-sm ${textSub}`}>Everything you need to know about partnering with Allies Investors Tanzania.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`border rounded-2xl overflow-hidden transition-all ${bgCard}`}>
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className={`w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm ${textHeading}`}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-blue-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className={`px-6 pb-6 text-xs leading-relaxed border-t pt-4 ${borderSec} ${textSub}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={`py-24 px-6 border-t relative z-10 ${borderSec}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
              Get In Touch
            </span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold leading-tight ${textHeading}`}>
              Let's Build Something Extraordinary Together
            </h2>
            <p className={`text-sm leading-relaxed ${textSub}`}>
              Ready to elevate your brand, build a high-performance website, or create captivating motion graphics? Contact us today for a free initial consultation.
            </p>

            <div className="space-y-4 pt-4">
              <div className={`flex items-center space-x-4 text-xs ${textSub}`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-blue-500 ${bgSubCard}`}>
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className={`font-bold ${textHeading}`}>Call Us Now</div>
                  <div>+255 769 567 263 / +255 753 907 403</div>
                </div>
              </div>

              <div className={`flex items-center space-x-4 text-xs ${textSub}`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-blue-500 ${bgSubCard}`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className={`font-bold ${textHeading}`}>Send Us An Email</div>
                  <div>alliesinvestorstz@gmail.com</div>
                </div>
              </div>

              <div className={`flex items-center space-x-4 text-xs ${textSub}`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-blue-500 ${bgSubCard}`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className={`font-bold ${textHeading}`}>Location</div>
                  <div>Dar es Salaam & Mbeya, Tanzania</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`border rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 ${bgCard}`}>
            <h3 className={`text-xl font-bold ${textHeading}`}>Send Us a Message</h3>

            {formSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-2 text-emerald-500">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <div className="font-bold text-sm">Message Sent Successfully!</div>
                <p className={`text-xs ${textSub}`}>We will review your inquiry and get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className={`text-[11px] font-bold uppercase tracking-wider ${textSub}`}>Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Solima Manyama"
                    className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500 ${bgSubCard} ${textHeading}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={`text-[11px] font-bold uppercase tracking-wider ${textSub}`}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500 ${bgSubCard} ${textHeading}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`text-[11px] font-bold uppercase tracking-wider ${textSub}`}>Phone Number</label>
                    <input
                      type="text"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+255 ..."
                      className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500 ${bgSubCard} ${textHeading}`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold uppercase tracking-wider ${textSub}`}>Service Needed</label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500 ${bgSubCard} ${textHeading}`}
                  >
                    <option>Brand Identity & Logo Design</option>
                    <option>Motion Graphics & Broadcast</option>
                    <option>Web Development & UI/UX</option>
                    <option>Digital Growth Strategy</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold uppercase tracking-wider ${textSub}`}>Project Details</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your goals, timeline, and requirements..."
                    className={`w-full border rounded-xl p-4 text-xs focus:outline-none focus:border-blue-500 resize-none ${bgSubCard} ${textHeading}`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-12 px-6 relative z-10 ${borderSec} ${isDark ? "bg-[#0B0F17]" : "bg-slate-200/60"}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className={`font-bold ${textHeading}`}>Allies Investors Tanzania</div>
            <p className={`text-xs ${textSub}`}>Shaping Digital Future — Driving technology & brand design across Tanzania.</p>
          </div>
          <div className={`text-xs ${textSub}`}>
            © 2026 Allies Investors Tanzania. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}