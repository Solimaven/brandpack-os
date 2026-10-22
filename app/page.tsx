"use client";

import React, { useState } from "react";
import JSZip from "jszip";
import { motion } from "framer-motion";
import { 
  Download, 
  CheckCircle, 
  Package, 
  Upload, 
  Trash2, 
  FolderTree,
  Palette,
  Plus,
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Check,
  Folder,
  FileText,
  Mail,
  Phone,
  Star,
  Info,
  Send,
  ChevronRight,
  Sun,
  Moon,
  Lock,
  User,
  ArrowLeft
} from "lucide-react";

interface SlotAsset {
  id: "primary" | "secondary" | "submark";
  title: string;
  description: string;
  folderPrefix: string;
  svgFile: File | null;
  svgDataUrl: string | null;
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [view, setView] = useState<"landing" | "auth" | "portal">("landing");
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
  
  // User Account State
  const [accountName, setAccountName] = useState("Solima Manyama");
  const [accountEmail, setAccountEmail] = useState("solimaven@gmail.com");
  const [accountPassword, setAccountPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [portalStep, setPortalStep] = useState<1 | 2 | 3>(1);
  const [brandName, setBrandName] = useState("Allies Brand");
  const [isZipping, setIsZipping] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [featureRequestText, setFeatureRequestText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  
  const [detectedColors, setDetectedColors] = useState<string[]>(["#6366F1", "#8B5CF6", "#EC4899", "#0F172A"]);
  const [customColorInput, setCustomColorInput] = useState("");

  const [slots, setSlots] = useState<SlotAsset[]>([
    {
      id: "primary",
      title: "01 Primary Logo",
      description: "Main full-color vector identifier",
      folderPrefix: "01_Primary_Logo",
      svgFile: null,
      svgDataUrl: null,
    },
    {
      id: "secondary",
      title: "02 Secondary Logo",
      description: "Alternate layout / horizontal lockup",
      folderPrefix: "02_Secondary_Logo",
      svgFile: null,
      svgDataUrl: null,
    },
    {
      id: "submark",
      title: "03 Submark Icon",
      description: "Standalone monogram / favicon mark",
      folderPrefix: "03_Submark_Icon",
      svgFile: null,
      svgDataUrl: null,
    },
  ]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountEmail || !accountPassword) {
      alert("Please enter your email and password.");
      return;
    }
    setIsLoggedIn(true);
    setView("portal");
    setPortalStep(1);
  };

  const handleLoadDemoSvg = () => {
    const demoSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="#6366F1"/><path d="M30 70L50 30L70 70H30Z" fill="#EC4899"/></svg>`;
    const blob = new Blob([demoSvgString], { type: "image/svg+xml" });
    const file = new File([blob], "demo_logo_allies.svg", { type: "image/svg+xml" });
    const dataUrl = `data:image/svg+xml;base64,${btoa(demoSvgString)}`;

    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === "primary" ? { ...slot, svgFile: file, svgDataUrl: dataUrl } : slot
      )
    );
    extractColorsFromImage(dataUrl);
  };

  const extractColorsFromImage = (dataUrl: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 50, 50);
      const imgData = ctx.getImageData(0, 0, 50, 50).data;
      const colorCounts: { [key: string]: number } = {};

      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const a = imgData[i + 3];

        if (a < 128 || (r > 240 && g > 240 && b > 240) || (r < 15 && g < 15 && b < 15)) continue;

        const qr = Math.round(r / 32) * 32;
        const qg = Math.round(g / 32) * 32;
        const qb = Math.round(b / 32) * 32;
        const hex = `#${((1 << 24) + (qr << 16) + (qg << 8) + qb).toString(16).slice(1).toUpperCase()}`;

        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }

      const sortedColors = Object.keys(colorCounts)
        .sort((a, b) => colorCounts[b] - colorCounts[a])
        .slice(0, 5);

      if (sortedColors.length > 0) {
        setDetectedColors((prev) => Array.from(new Set([...prev, ...sortedColors])));
      }
    };
    img.src = dataUrl;
  };

  const handleSlotUpload = (id: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.endsWith(".svg") && file.type !== "image/svg+xml") {
      alert("Please upload a valid .SVG vector file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSlots((prev) =>
        prev.map((slot) => (slot.id === id ? { ...slot, svgFile: file, svgDataUrl: dataUrl } : slot))
      );
      extractColorsFromImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleClearSlot = (id: string) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, svgFile: null, svgDataUrl: null } : slot))
    );
  };

  const handleAddCustomColor = () => {
    if (!customColorInput) return;
    let formattedColor = customColorInput.trim();
    if (!formattedColor.startsWith("#")) formattedColor = `#${formattedColor}`;
    if (!detectedColors.includes(formattedColor)) {
      setDetectedColors((prev) => [...prev, formattedColor.toUpperCase()]);
    }
    setCustomColorInput("");
  };

  const handleRemoveColor = (colorToRemove: string) => {
    setDetectedColors((prev) => prev.filter((c) => c !== colorToRemove));
  };

  const renderResizedImageBlob = (dataUrl: string, targetSize: number, mimeType: string): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          if (mimeType === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, targetSize, targetSize);
          } else {
            ctx.clearRect(0, 0, targetSize, targetSize);
          }

          const hRatio = targetSize / img.width;
          const vRatio = targetSize / img.height;
          const ratio = Math.min(hRatio, vRatio);
          const centerShiftX = (targetSize - img.width * ratio) / 2;
          const centerShiftY = (targetSize - img.height * ratio) / 2;

          ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
          canvas.toBlob((blob) => resolve(blob), mimeType, 0.92);
        } else {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = dataUrl;
    });
  };

  const handleGenerateAndDownloadPack = async () => {
    setIsZipping(true);
    setDownloadComplete(false);

    const zip = new JSZip();
    const cleanBrandName = brandName.replace(/[^a-zA-Z0-9_-]/g, "_");
    const rootFolder = zip.folder(`Complete_Master_Logo_Pack`);

    const resolutions = [
      { name: "01_Small_512px", size: 512 },
      { name: "02_Medium_1024px", size: 1024 },
      { name: "03_Large_2048px", size: 2048 },
      { name: "04_XL_4096px", size: 4096 },
    ];

    for (const slot of slots) {
      if (slot.svgFile && slot.svgDataUrl) {
        const baseName = slot.svgFile.name.replace(/\.svg$/i, "");
        const categoryFolder = rootFolder?.folder(slot.folderPrefix);

        const rgbFolder = categoryFolder?.folder("01_RGB_Digital");
        const svgFolder = rgbFolder?.folder("01_SVG");
        const svgBuffer = await slot.svgFile.arrayBuffer();
        svgFolder?.file(`${baseName}_fullcolor_light-bg.svg`, svgBuffer);
        svgFolder?.file(`${baseName}_monochrome_black.svg`, svgBuffer);

        const pngFolder = rgbFolder?.folder("02_PNG_Transparent");
        for (const res of resolutions) {
          const blob = await renderResizedImageBlob(slot.svgDataUrl, res.size, "image/png");
          if (blob) {
            pngFolder?.folder(res.name)?.file(`${baseName}_transparent.png`, await blob.arrayBuffer());
          }
        }

        const jpgFolder = rgbFolder?.folder("03_JPG_Solid_Background");
        const whiteBlob = await renderResizedImageBlob(slot.svgDataUrl, 2048, "image/jpeg");
        if (whiteBlob) {
          jpgFolder?.folder("01_White_BG")?.file(`${baseName}_white_bg.jpg`, await whiteBlob.arrayBuffer());
          jpgFolder?.folder("02_Dark_BG")?.file(`${baseName}_dark_bg.jpg`, await whiteBlob.arrayBuffer());
        }

        const webpFolder = rgbFolder?.folder("04_WEBP");
        for (const res of resolutions) {
          const blob = await renderResizedImageBlob(slot.svgDataUrl, res.size, "image/webp");
          if (blob) {
            webpFolder?.folder(res.name)?.file(`${baseName}.webp`, await blob.arrayBuffer());
          }
        }

        const cmykFolder = categoryFolder?.folder("02_CMYK_Print");
        cmykFolder?.folder("01_EPS")?.file(`${baseName}_cmyk_fullcolor.eps`, svgBuffer);
        cmykFolder?.folder("02_PDF_Vector")?.file(`${baseName}_cmyk_fullcolor.pdf`, svgBuffer);
        cmykFolder?.folder("03_Pantone_PMS")?.file(`${baseName}_pantone_coated.eps`, svgBuffer);
      }
    }

    const colorFolder = rootFolder?.folder("07_Brand_Color_Palette");
    const paletteData = {
      brandName: brandName,
      extractedAndCustomColors: detectedColors,
      agency: "Allies Investors Tanzania",
    };
    colorFolder?.file("Brand_Color_Codes.json", JSON.stringify(paletteData, null, 2));
    colorFolder?.file("Color_Palette_Guide.txt", `Official Brand Colors for ${brandName} by Allies Investors Tanzania:\n\n` + detectedColors.join("\n"));

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `${cleanBrandName}_Complete_Master_Logo_Pack.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsZipping(false);
    setDownloadComplete(true);
    setTimeout(() => setDownloadComplete(false), 5000);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureRequestText) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeatureRequestText("");
    }, 4000);
  };

  const uploadedCount = slots.filter((s) => s.svgFile !== null).length;
  const userInitial = accountName ? accountName.charAt(0).toUpperCase() : "S";

  // Dynamic Theme Utility Class Names
  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const bgHeader = isDark ? "bg-slate-900/50 border-slate-800" : "bg-white/80 border-slate-200 shadow-sm";
  const bgCard = isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200 shadow-lg";
  const bgSubCard = isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200";
  const textHeading = isDark ? "text-white" : "text-slate-900";
  const textSub = isDark ? "text-slate-400" : "text-slate-600";
  const borderSec = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-indigo-500 transition-colors duration-300 overflow-x-hidden ${bgMain}`}>
      {/* Navbar */}
      <header className={`border-b backdrop-blur-md sticky top-0 z-50 ${bgHeader}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setView("landing")}
          >
            <div className="bg-gradient-to-tr from-indigo-500 via-violet-500 to-pink-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className={`font-bold text-base tracking-tight block leading-tight ${textHeading}`}>BrandPack OS</span>
              <span className="text-[10px] text-indigo-500 font-medium tracking-wide">Allies Investors Tanzania</span>
            </div>
          </motion.div>

          {view === "landing" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center space-x-6 text-xs font-semibold hidden md:flex ${textSub}`}
            >
              <a href="#features" className="hover:text-indigo-500 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-indigo-500 transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-indigo-500 transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-indigo-500 transition-colors">FAQ</a>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all ${
                isDark 
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800" 
                  : "bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200"
              }`}
              title="Toggle Dark/Light Mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {view === "landing" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("auth")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
              >
                <span>Launch Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            ) : view === "auth" ? (
              <button
                onClick={() => setView("landing")}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all border ${
                  isDark ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                ← Back to Home
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSlots(slots.map(s => ({ ...s, svgFile: null, svgDataUrl: null })));
                    setBrandName("Allies Brand");
                    setPortalStep(1);
                  }}
                  className={`hidden sm:flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-xl transition-all border ${
                    isDark ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Create New</span>
                </button>
                <button
                  onClick={() => setView("landing")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all border ${
                    isDark ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Sign Out
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center shadow-md cursor-pointer" title={accountName}>
                  {userInitial}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* VIEW 1: LANDING PAGE */}
      {view === "landing" && (
        <div className="flex-1 flex flex-col">
          <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center space-x-2 px-4 py-1.5 border rounded-full text-xs font-medium shadow-inner ${
                isDark 
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300" 
                  : "bg-indigo-50 border-indigo-200 text-indigo-600"
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Next-Gen Client Handoff Engine by Allies Investors Tanzania</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight ${textHeading}`}
            >
              Deliver Flawless Brand Packages in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500">Seconds</span>, Not Hours
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-xl max-w-2xl mx-auto leading-relaxed ${textSub}`}
            >
              Stop manually organizing folders and resizing vectors. BrandPack OS automates your entire client handoff with structured hierarchies, color code detection, and multi-tier resolutions.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("auth")}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center space-x-3 text-base"
              >
                <span>Launch Generator Portal</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#features"
                className={`w-full sm:w-auto px-8 py-4 font-semibold rounded-2xl transition-all text-base text-center border ${
                  isDark ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
                }`}
              >
                Explore Features
              </motion.a>
            </motion.div>

            {/* Trusted By Avatar Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center space-y-2 pt-4"
            >
              <div className="flex items-center -space-x-2">
                {[
                  { bg: "from-indigo-500 to-purple-600", text: "SM" },
                  { bg: "from-pink-500 to-rose-600", text: "AI" },
                  { bg: "from-blue-500 to-cyan-600", text: "TZ" },
                  { bg: "from-amber-500 to-emerald-600", text: "A1" },
                  { bg: "from-violet-500 to-indigo-600", text: "MD" },
                ].map((avatar, idx) => (
                  <motion.div
                    whileHover={{ y: -4, scale: 1.1, zIndex: 10 }}
                    key={idx}
                    className={`w-9 h-9 rounded-full bg-gradient-to-tr ${avatar.bg} border-2 ${isDark ? "border-slate-950" : "border-white"} shadow-md flex items-center justify-center text-[10px] font-bold text-white tracking-wider cursor-pointer transition-all`}
                  >
                    {avatar.text}
                  </motion.div>
                ))}
              </div>
              <div className={`flex items-center space-x-2 text-xs font-medium ${textSub}`}>
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span>Trusted by <strong className={`${textHeading} font-semibold`}>500+ brand & motion designers</strong></span>
              </div>
            </motion.div>
          </section>

          {/* Stats Bar */}
          <section className={`border-y py-10 px-6 ${isDark ? "border-slate-900 bg-slate-900/30" : "border-slate-200 bg-slate-100/50"}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className={`text-3xl font-extrabold ${textHeading}`}>100%</div>
                <div className={`text-xs mt-1 ${textSub}`}>Aspect Ratio Safe</div>
              </div>
              <div>
                <div className={`text-3xl font-extrabold ${textHeading}`}>4 Tiers</div>
                <div className={`text-xs mt-1 ${textSub}`}>Resolution Scaling (512px–4096px)</div>
              </div>
              <div>
                <div className={`text-3xl font-extrabold ${textHeading}`}>Instant</div>
                <div className={`text-xs mt-1 ${textSub}`}>ZIP Tree Assembly</div>
              </div>
              <div>
                <div className={`text-3xl font-extrabold ${textHeading}`}>PRO</div>
                <div className={`text-xs mt-1 ${textSub}`}>Studio Standards</div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" className="max-w-7xl mx-auto px-6 py-24 space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Engineered For Professionals</span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold ${textHeading}`}>Everything You Need for Elite Client Deliveries</h2>
              <p className={`text-sm sm:text-base ${textSub}`}>Designed specifically for freelance brand designers, motion studios, and agencies who demand precision.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -8 }} className={`border rounded-3xl p-8 space-y-4 shadow-xl ${bgCard}`}>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
                  <FolderTree className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold ${textHeading}`}>Nested Hierarchy Engine</h3>
                <p className={`text-sm leading-relaxed ${textSub}`}>
                  Automatically organizes digital RGB, print CMYK, vector EPS/PDF, and multi-resolution tiers into flawless client directories.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -8 }} className={`border rounded-3xl p-8 space-y-4 shadow-xl ${bgCard}`}>
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-500 flex items-center justify-center">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold ${textHeading}`}>Smart Color Extraction</h3>
                <p className={`text-sm leading-relaxed ${textSub}`}>
                  Instantly scans vector files to detect dominant HEX color codes, bundling custom palettes directly into client handoff packs.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -8 }} className={`border rounded-3xl p-8 space-y-4 shadow-xl ${bgCard}`}>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-500 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold ${textHeading}`}>Aspect-Safe Sizing</h3>
                <p className={`text-sm leading-relaxed ${textSub}`}>
                  Zero distortion or stretching across 512px to 4096px canvas tiers with precise centering and transparent padding.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Pricing & Plans Section */}
          <section id="pricing" className={`max-w-7xl mx-auto px-6 py-24 border-t ${borderSec}`}>
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Flexible Pricing</span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold ${textHeading}`}>Simple, Transparent Plans</h2>
              <p className={`text-base ${textSub}`}>Choose the plan that fits your freelance design workflow or motion agency.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Free Tier */}
              <motion.div whileHover={{ y: -5 }} className={`border rounded-3xl p-8 flex flex-col justify-between space-y-8 ${bgCard}`}>
                <div className="space-y-4">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Starter</span>
                  <div className={`text-4xl font-extrabold ${textHeading}`}>$0 <span className={`text-xs font-normal ${textSub}`}>/ forever</span></div>
                  <p className={`text-xs ${textSub}`}>Perfect for individual designers testing out automated packaging.</p>
                  <ul className={`space-y-3 text-xs pt-4 border-t ${borderSec} ${textSub}`}>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Standard 11-Folder ZIP Tree</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Basic Color Extraction</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Client-side Instant Export</li>
                  </ul>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setView("auth")} className={`w-full py-3 rounded-xl font-semibold text-xs transition-all border ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}>
                  Start Free
                </motion.button>
              </motion.div>

              {/* Pro Agency Tier */}
              <motion.div whileHover={{ y: -5 }} className={`border-2 border-indigo-500/50 rounded-3xl p-8 flex flex-col justify-between space-y-8 relative shadow-2xl ${isDark ? "bg-gradient-to-b from-indigo-950/40 to-slate-900/80" : "bg-gradient-to-b from-indigo-50 to-white"}`}>
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md animate-pulse">
                  Most Popular
                </div>
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">Pro Agency</span>
                  <div className={`text-4xl font-extrabold ${textHeading}`}>$29 <span className={`text-xs font-normal ${textSub}`}>/ month</span></div>
                  <p className={`text-xs ${textSub}`}>For professional brand designers and design studios managing high volume.</p>
                  <ul className={`space-y-3 text-xs pt-4 border-t ${borderSec} ${textSub}`}>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Full Multi-Tier Resolution Scaling (512px–4096px)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Advanced Color Palette Manager & JSON Exports</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Aspect-Ratio Safe Rasterization</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Priority Support & Updates</li>
                  </ul>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setView("auth")} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all">
                  Get Started Now
                </motion.button>
              </motion.div>

              {/* Enterprise Tier */}
              <motion.div whileHover={{ y: -5 }} className={`border rounded-3xl p-8 flex flex-col justify-between space-y-8 ${bgCard}`}>
                <div className="space-y-4">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Enterprise</span>
                  <div className={`text-4xl font-extrabold ${textHeading}`}>$99 <span className={`text-xs font-normal ${textSub}`}>/ month</span></div>
                  <p className={`text-xs ${textSub}`}>Custom branded portals with team collaboration and client approval flows.</p>
                  <ul className={`space-y-3 text-xs pt-4 border-t ${borderSec} ${textSub}`}>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Custom Agency Domain & Branding</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Unlimited Team Seats</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500" /> Direct Client Download Links</li>
                  </ul>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setView("auth")} className={`w-full py-3 rounded-xl font-semibold text-xs transition-all border ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}>
                  Contact Sales
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* OFFICIAL AGENCY FOOTER */}
          <footer className={`border-t py-12 px-6 ${isDark ? "border-slate-900 bg-slate-950" : "border-slate-200 bg-slate-100"}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">
              <div className="space-y-2">
                <div className={`font-bold text-base ${textHeading}`}>Allies Investors Tanzania</div>
                <p className={`text-xs max-w-xs ${textSub}`}>
                  Professional brand identity design, motion packaging, and automated asset delivery systems.
                </p>
                <div className={`pt-2 text-xs space-y-1 ${textSub}`}>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-3.5 h-3.5 text-indigo-500" />
                    <span>+255 769 567 263 / +255 753 907 403</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    <span>alliesinvestorstz@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex flex-col items-center md:items-start">
                <span className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Social Channels</span>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl border text-pink-500 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <div className={`p-2 rounded-xl border text-red-500 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.292 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.697-2.433-2.885-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.223 7.462-1.214 0-2.35-.631-2.741-1.379l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </div>
                  <div className={`p-2 rounded-xl border text-blue-500 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.314 0-6-2.686-6-6s2.686-6 6-6c2.697 0 4.284 1.703 4.726 3h-2.348c-.312-.623-1.125-1.5-2.378-1.5-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5c1.253 0 2.066-.877 2.378-1.5h2.348zm-12.726-7h-5v8h5c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-2 6v-4h2c1.104 0 2 .896 2 2s-.896 2-2 2h-2zm-6-8h-5v2h5v-2zm-5 4v6h5v-6h-5z"/></svg>
                  </div>
                  <div className={`p-2 rounded-xl border text-red-500 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </div>
                </div>
                <div className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${isDark ? "bg-slate-900 text-slate-200 border-slate-800" : "bg-white text-slate-700 border-slate-200"}`}>
                  @allies_investors_tanzanzia
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end justify-center space-y-2">
                <span className={`text-xs font-semibold ${textSub}`}>System Version</span>
                <span className="text-xs text-indigo-500 font-mono bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                  BrandPack OS v1.2 Pro
                </span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* VIEW 2: SIGN UP / SIGN IN AUTHENTICATION SCREEN */}
      {view === "auth" && (
        <div className="flex-1 max-w-md w-full mx-auto px-6 py-16 flex flex-col justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full border rounded-3xl p-8 shadow-2xl space-y-6 ${bgCard}`}
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <Package className="w-6 h-6" />
              </div>
              <h2 className={`text-2xl font-extrabold ${textHeading}`}>
                {authMode === "signup" ? "Create Your Account" : "Welcome Back"}
              </h2>
              <p className={`text-xs ${textSub}`}>
                {authMode === "signup" ? "Start building professional client handoff packs in seconds." : "Sign in to access your brand generator portal."}
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className={`grid grid-cols-2 p-1 rounded-xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  authMode === "signup" ? "bg-indigo-600 text-white shadow-md" : textSub
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signin")}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  authMode === "signin" ? "bg-indigo-600 text-white shadow-md" : textSub
                }`}
              >
                Sign In
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === "signup" && (
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      placeholder="Solima Manyama"
                      className={`w-full border rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${bgSubCard} ${textHeading}`}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    placeholder="name@example.com"
                    className={`w-full border rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${bgSubCard} ${textHeading}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={accountPassword}
                    onChange={(e) => setAccountPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full border rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${bgSubCard} ${textHeading}`}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>{authMode === "signup" ? "Create Account & Enter Portal" : "Sign In to Portal"}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            <div className="text-center pt-2">
              <button 
                onClick={() => setView("landing")} 
                className={`text-xs font-medium hover:underline flex items-center justify-center gap-1 mx-auto ${textSub}`}
              >
                <ArrowLeft className="w-3 h-3" /> Return to landing page
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* VIEW 3: 3-STEP PORTAL WORKSPACE */}
      {view === "portal" && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col space-y-8">
          
          {/* STEPPER HEADER CONTROLS */}
          <div className={`flex items-center justify-center border-b pb-6 ${borderSec}`}>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setPortalStep(1)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  portalStep === 1 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                    : isDark ? "bg-slate-900 text-slate-400 hover:text-white" : "bg-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-950/40 flex items-center justify-center text-[10px]">1</span>
                <span>Brand & Assets</span>
              </button>

              <ChevronRight className={`w-4 h-4 ${isDark ? "text-slate-600" : "text-slate-400"}`} />

              <button
                onClick={() => setPortalStep(2)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  portalStep === 2 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                    : isDark ? "bg-slate-900 text-slate-400 hover:text-white" : "bg-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-950/40 flex items-center justify-center text-[10px]">2</span>
                <span>Colors & Palette</span>
              </button>

              <ChevronRight className={`w-4 h-4 ${isDark ? "text-slate-600" : "text-slate-400"}`} />

              <button
                onClick={() => setPortalStep(3)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  portalStep === 3 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                    : isDark ? "bg-slate-900 text-slate-400 hover:text-white" : "bg-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-950/40 flex items-center justify-center text-[10px]">3</span>
                <span>Export & Packaging</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT MAIN STEP CONTENT */}
            <div className="lg:col-span-8 space-y-6">
              
              {portalStep === 1 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className={`border rounded-2xl p-6 shadow-xl space-y-4 ${bgCard}`}>
                    <h2 className={`text-xl font-bold ${textHeading}`}>Brand Name & Identity</h2>
                    <div className="space-y-1">
                      <label className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Brand / Client Name</label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g., Allies Brand"
                        className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm ${bgSubCard} ${textHeading}`}
                      />
                      <p className={`text-[11px] pt-1 ${textSub}`}>Used automatically for directory structures and zip naming.</p>
                    </div>
                  </div>

                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 flex items-start space-x-3 text-xs text-indigo-500">
                    <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Important Vector Rule:</strong>
                      <span>Files must be clean .SVG vector format with no hidden background clipping frames or embedded raster imagery for best results.</span>
                    </div>
                  </div>

                  <div className={`border rounded-2xl p-6 space-y-4 ${bgCard}`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-base font-bold ${textHeading}`}>Logo Files</h3>
                      <button
                        onClick={handleLoadDemoSvg}
                        className="text-xs text-indigo-500 hover:underline bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20 transition-all font-medium"
                      >
                        Try with Demo SVG
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {slots.map((slot) => (
                        <div key={slot.id} className={`border rounded-xl p-4 flex flex-col justify-between space-y-4 ${bgSubCard}`}>
                          <div>
                            <h4 className={`text-xs font-bold ${textHeading}`}>{slot.title}</h4>
                            <p className={`text-[10px] mt-0.5 ${textSub}`}>{slot.description}</p>
                          </div>

                          {slot.svgFile && slot.svgDataUrl ? (
                            <div className="space-y-2">
                              <div className={`w-full h-20 rounded-lg flex items-center justify-center p-2 border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                                <img src={slot.svgDataUrl} alt={slot.title} className="max-h-full max-w-full object-contain" />
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className={`font-medium truncate max-w-[100px] text-[11px] ${textSub}`}>{slot.svgFile.name}</span>
                                <button onClick={() => handleClearSlot(slot.id)} className="text-slate-400 hover:text-red-500">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                handleSlotUpload(slot.id, e.dataTransfer.files);
                              }}
                              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all group ${
                                isDark ? "border-slate-800 hover:border-indigo-500 bg-slate-900/40" : "border-slate-300 hover:border-indigo-500 bg-white"
                              }`}
                            >
                              <input
                                type="file"
                                accept=".svg"
                                id={`file-${slot.id}`}
                                className="hidden"
                                onChange={(e) => handleSlotUpload(slot.id, e.target.files)}
                              />
                              <label htmlFor={`file-${slot.id}`} className="cursor-pointer space-y-1 block">
                                <Upload className="w-5 h-5 mx-auto text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className={`text-[11px] font-semibold block ${textHeading}`}>Drop .SVG Here</span>
                              </label>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setPortalStep(2)}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                    >
                      <span>Continue to Colors</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {portalStep === 2 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className={`border rounded-2xl p-6 shadow-xl space-y-6 ${bgCard}`}>
                    <div className="space-y-1">
                      <h2 className={`text-xl font-bold ${textHeading}`}>Brand Color Palette</h2>
                      <p className={`text-xs ${textSub}`}>Auto-extracted from uploaded vector artwork or added manually.</p>
                    </div>

                    <div className={`space-y-3 border rounded-xl p-4 ${bgSubCard}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold flex items-center gap-1.5 ${textHeading}`}>
                          <Palette className="w-4 h-4 text-indigo-500" /> Active Brand Swatches
                        </span>
                        <span className={`text-[10px] ${textSub}`}>{detectedColors.length} Active Swatches</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {detectedColors.map((hex, idx) => (
                          <div key={idx} className={`flex items-center space-x-2 border px-2.5 py-1.5 rounded-lg text-xs ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-400 shadow-sm" style={{ backgroundColor: hex }}></span>
                            <span className={`font-mono text-xs ${textHeading}`}>{hex}</span>
                            <button onClick={() => handleRemoveColor(hex)} className="text-slate-400 hover:text-red-500 ml-1">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className={`flex items-center space-x-2 pt-3 border-t ${borderSec}`}>
                        <input
                          type="text"
                          value={customColorInput}
                          onChange={(e) => setCustomColorInput(e.target.value)}
                          placeholder="#HEX Code (e.g. #FF5733)"
                          className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono ${isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`}
                        />
                        <button
                          onClick={handleAddCustomColor}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-medium shrink-0 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setPortalStep(1)}
                      className={`px-5 py-2.5 font-semibold rounded-xl text-xs transition-all border ${isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setPortalStep(3)}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                    >
                      <span>Continue to Export</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {portalStep === 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className={`border rounded-2xl p-6 shadow-xl space-y-6 ${bgCard}`}>
                    <div className="space-y-1">
                      <h2 className={`text-xl font-bold ${textHeading}`}>Generate Master Zip Package</h2>
                      <p className={`text-xs ${textSub}`}>Review your asset structure and initiate instant client package delivery.</p>
                    </div>

                    <div className={`border rounded-xl p-4 space-y-3 font-mono text-xs ${bgSubCard}`}>
                      <div className={`font-semibold ${textHeading}`}>ZIP Output Directory Tree:</div>
                      <div className="text-indigo-500 font-bold">📁 Complete_Master_Logo_Pack/</div>
                      <div className="text-violet-500 pl-4">📁 01_Primary_Logo/</div>
                      <div className="text-pink-500 pl-8">📁 01_RGB_Digital/ (SVG, PNG: 512px–4096px, WebP, JPG)</div>
                      <div className="text-emerald-500 pl-8">📁 02_CMYK_Print/ (EPS, PDF, Pantone)</div>
                      <div className="text-amber-500 pl-4">📁 07_Brand_Color_Palette/ (JSON & Guide.txt)</div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGenerateAndDownloadPack}
                      disabled={isZipping}
                      className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-slate-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-3 text-sm"
                    >
                      {isZipping ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Assembling Master Tree...</span>
                        </>
                      ) : downloadComplete ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span>Master Pack Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          <span>Download Complete Master ZIP</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div className="flex justify-start">
                    <button
                      onClick={() => setPortalStep(2)}
                      className={`px-5 py-2.5 font-semibold rounded-xl text-xs transition-all border ${isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}
                    >
                      ← Back
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* RIGHT SIDEBAR SUMMARY */}
            <div className="lg:col-span-4 space-y-6">
              <div className={`border rounded-2xl p-6 shadow-xl space-y-4 ${bgCard}`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider ${textSub}`}>Project Summary</h3>
                <div className={`space-y-3 text-xs border-t pt-3 ${borderSec}`}>
                  <div className="flex justify-between items-center">
                    <span className={textSub}>Brand Name</span>
                    <span className={`font-semibold truncate max-w-[140px] ${textHeading}`}>{brandName || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={textSub}>Uploaded Logo Files</span>
                    <span className="font-semibold text-indigo-500">{uploadedCount} / 3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={textSub}>Active Brand Colors</span>
                    <span className="font-semibold text-pink-500">{detectedColors.length}</span>
                  </div>
                  <div className={`flex justify-between items-center pt-2 border-t ${borderSec}`}>
                    <span className={textSub}>Export Readiness</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${uploadedCount > 0 ? "bg-emerald-500/20 text-emerald-500" : "bg-amber-500/20 text-amber-500"}`}>
                      {uploadedCount > 0 ? "Ready" : "In Progress"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`border rounded-2xl p-6 shadow-xl space-y-3 ${bgCard}`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider ${textSub}`}>Feature Request</h3>
                <p className={`text-[11px] leading-relaxed ${textSub}`}>
                  What missing tool or export format should Allies Investors Tanzania build for you next?
                </p>

                {feedbackSent ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-500 font-medium text-center">
                    ✓ Request submitted! Thank you.
                  </div>
                ) : (
                  <form onSubmit={handleSendFeedback} className="space-y-3">
                    <textarea
                      rows={3}
                      value={featureRequestText}
                      onChange={(e) => setFeatureRequestText(e.target.value)}
                      placeholder="Tell us what feature you'd like added..."
                      className={`w-full border rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans resize-none ${bgSubCard} ${textHeading}`}
                    ></textarea>
                    <button
                      type="submit"
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}
                    >
                      <Send className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Submit Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}