"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Palette, 
  Video, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ChevronDown, 
  Menu, 
  X, 
  ExternalLink,
  Layers,
  Cpu,
  Globe,
  Check,
  ShieldCheck,
  Clock,
  DollarSign
} from "lucide-react";

export default function AgencyPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "brand" | "motion" | "web">("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive Project Cost Estimator State
  const [projectType, setProjectType] = useState<"brand" | "motion" | "web" | "full">("brand");
  const [projectSpeed, setProjectSpeed] = useState<"standard" | "urgent">("standard");

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", service: "Brand Identity", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculateEstimate = () => {
    let base = 300;
    if (projectType === "motion") base = 500;
    if (projectType === "web") base = 800;
    if (projectType === "full") base = 1500;
    if (projectSpeed === "urgent") base *= 1.3;
    return `$${Math.round(base)} – $${Math.round(base * 1.5)}`;
  };

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
      icon: <Palette className="w-6 h-6 text-indigo-500" />,
      title: "Brand Identity & Logo Design",
      desc: "We build unforgettable visual identities, custom vector logos, and comprehensive brand guidelines that set you apart.",
    },
    {
      icon: <Video className="w-6 h-6 text-violet-500" />,
      title: "Motion Graphics & Broadcast",
      desc: "Stunning motion design, stadium promotional bumpers, and high-energy social media animations.",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Web Development & UI/UX",
      desc: "High-performance responsive websites, web apps, and e-commerce stores engineered to turn visitors into loyal customers.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-pink-500" />,
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-white text-base tracking-tighter">AI</span>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block leading-tight text-white">Allies Investors</span>
              <span className="text-[10px] text-indigo-400 font-medium tracking-widest uppercase">Tanzania</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wide text-slate-300">
            <a href="#services" className="hover:text-indigo-400 transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-indigo-400 transition-colors">Portfolio</a>
            <a href="#estimator" className="hover:text-indigo-400 transition-colors">Cost Estimator</a>
            <a href="#about" className="hover:text-indigo-400 transition-colors">About Us</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 text-sm font-semibold"
          >
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">Services</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">Portfolio</a>
            <a href="#estimator" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">Cost Estimator</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">About Us</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-indigo-400">FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full py-3 bg-indigo-600 text-white text-center rounded-xl">Get Started</a>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-medium text-indigo-300 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Driving Technology & Brand Growth for Leading Enterprises</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight text-white"
          >
            We Transform Bold Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-500">Exceptional Digital Realities</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
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
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center space-x-3 text-base"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#estimator"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-2xl border border-slate-800 transition-all text-base text-center"
            >
              Calculate Project Cost
            </a>
          </motion.div>

          {/* Key Metrics Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-16 border-t border-slate-900"
          >
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">50+</div>
              <div className="text-xs text-slate-400 mt-1">Completed Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-slate-400 mt-1">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">24/7</div>
              <div className="text-xs text-slate-400 mt-1">Dedicated Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">Top Tier</div>
              <div className="text-xs text-slate-400 mt-1">Design & Motion Studio</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 px-6 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Comprehensive Digital Solutions</h2>
            <p className="text-sm sm:text-base text-slate-400">We love challenging projects that require thoughtful design, sophisticated development, and market strategy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((srv, idx) => (
              <motion.div 
                whileHover={{ y: -8 }}
                key={idx} 
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl hover:border-indigo-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {srv.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO / PROJECTS SECTION */}
      <section id="portfolio" className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
                Our Showcase
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">A Section of Our Recent Projects</h2>
              <p className="text-sm text-slate-400">Explore how we help brands stand out through powerful visual storytelling and robust digital engineering.</p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
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
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" 
                      : "text-slate-400 hover:text-white"
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
                className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl group hover:border-indigo-500/40 transition-all flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-indigo-400 rounded-full uppercase tracking-wider">
                    {project.tag}
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{project.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PROJECT COST ESTIMATOR */}
      <section id="estimator" className="py-24 px-6 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
              Instant Budget Calculator
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Estimate Your Project Cost</h2>
            <p className="text-sm text-slate-400">Select your requirements below to calculate an instant ballpark budget estimate.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">1. Select Service Discipline</label>
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
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10" 
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-indigo-400">{item.icon}</span>
                    <span className="text-xs font-bold">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">2. Select Project Timeline</label>
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
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg" 
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">{item.title}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Estimated Budget Range</div>
                <div className="text-3xl font-extrabold text-white mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">
                  {calculateEstimate()}
                </div>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all text-xs text-center"
              >
                Book Project With This Estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US / WHY CHOOSE US */}
      <section id="about" className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
              Why Choose Allies Investors
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Excellence is Not a Skill, It Is an Attitude.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We treat your business as if it were our own. Founded in Tanzania, Allies Investors brings together absolute experts in brand identity, motion design, and software engineering to deliver exceptional results.
            </p>

            <div className="space-y-4 pt-2">
              {[
                "Team of absolute experts with a proven track record",
                "Lightning-fast project implementation & execution",
                "Holistic digital approach combining creative & technical strategy",
                "24/7 partner availability and dedicated support",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs font-semibold text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-3xl blur-xl opacity-25"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Our Core Vision</span>
                <h3 className="text-xl font-bold text-white">Empowering African Businesses & Global Brands</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whether you are launching a startup, scaling an established enterprise, or producing broadcast sports graphics, our team delivers world-class standards without compromise.
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Solima Manyama</div>
                  <div className="text-xs text-slate-400">Founder & Lead Designer</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-bold text-white text-xs">
                  SM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-6 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400">Everything you need to know about partnering with Allies Investors Tanzania.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-indigo-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-4">
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
      <section id="contact" className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Let's Build Something Extraordinary Together
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ready to elevate your brand, build a high-performance website, or create captivating motion graphics? Contact us today for a free initial consultation.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 text-xs text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Call Us Now</div>
                  <div>+255 769 567 263 / +255 753 907 403</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Send Us An Email</div>
                  <div>alliesinvestorstz@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">Location</div>
                  <div>Dar es Salaam & Mbeya, Tanzania</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Send Us a Message</h3>

            {formSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-2 text-emerald-400">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <div className="font-bold text-sm">Message Sent Successfully!</div>
                <p className="text-xs text-slate-400">We will review your inquiry and get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Solima Manyama"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+255 ..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Service Needed</label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option>Brand Identity & Logo Design</option>
                    <option>Motion Graphics & Broadcast</option>
                    <option>Web Development & UI/UX</option>
                    <option>Digital Growth Strategy</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Project Details</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us about your goals, timeline, and requirements..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
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
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="font-bold text-white">Allies Investors Tanzania</div>
            <p className="text-xs text-slate-400">Driving technology and brand design for leading enterprises.</p>
          </div>
          <div className="text-xs text-slate-500">
            © 2026 Allies Investors Tanzania. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}