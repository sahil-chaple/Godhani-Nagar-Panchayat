/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import aerialImage from "./assets/Godhani Village Aerial View.png";
import React, { useState, useEffect } from 'react';
import {
  Home as HomeIcon,
  Building,
  Users,
  Landmark,
  FileText,
  Image as ImageIcon,
  Download,
  Phone,
  Map,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Globe,
  MapPin,
  Droplet,
  Lightbulb,
  ChevronRight,
  Sparkles,
  Clock,
  Compass,
  FileCheck,
  AlertTriangle,
  Heart,
  TrendingUp,
  Coins,
  Eye,
  ArrowRight,
  Award,
  Calendar,
  Percent,
  CheckCircle2,
  Trash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// Custom sub-components
import InteractiveMap from './components/InteractiveMap';
import ComplaintForm from './components/ComplaintForm';
import TaxPortals from './components/TaxPortals';
import CertificateForms from './components/CertificateForms';
import AdministrationSection from './components/AdministrationSection';
import GallerySection from './components/GallerySection';
import NewsSection from './components/NewsSection';

// Mock Data
import {
  PROJECTS,
  SCHEMES,
  DOWNLOAD_ITEMS,
  ENGLISH_STRINGS,
  MARATHI_STRINGS,
  HINDI_STRINGS
} from './data/portalData';
import { LanguageStrings } from './types';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<'EN' | 'MR' | 'HI'>('EN');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showMobileEmulator, setShowMobileEmulator] = useState<boolean>(false);

  // Stats Count Animation Simulation
  const [stats, setStats] = useState({
    population: 1200,
    wards: 1,
    families: 150,
    literacy: 60,
    male: 100,
    female: 100
  });

  // Project Filter state
  const [projectFilter, setProjectFilter] = useState<'All' | 'Completed' | 'Ongoing' | 'Upcoming'>('All');
  
  // Downloads state
  const [downloadSearch, setDownloadSearch] = useState('');
  const [downloadCategory, setDownloadCategory] = useState('All');

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', phone: '', msg: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Scheme detail modal state
  const [selectedScheme, setSelectedScheme] = useState<any | null>(null);

  // Get active translation string resource
  const t: LanguageStrings = 
    language === 'MR' ? MARATHI_STRINGS : 
    language === 'HI' ? HINDI_STRINGS : 
    ENGLISH_STRINGS;

  // Simulate smooth stats count-up on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        population: 9804,
        wards: 17,
        families: 2178,
        literacy: 95.18,
        male: 5538,
        female: 4765
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Sync dark class on body
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    setContactSubmitted(true);
    setContactForm({ name: '', phone: '', msg: '' });
  };

  // Helper to trigger specific actions from home quick links
  const triggerQuickLink = (targetTab: string, elementIdToScroll?: string) => {
    setActiveTab(targetTab);
    setMobileMenuOpen(false);
    
    if (elementIdToScroll) {
      setTimeout(() => {
        const el = document.getElementById(elementIdToScroll);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  return (
    
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#d4d4d0] text-gray-900'}`}>
      

      {/* STICKY MAIN NAVBAR */}
      <nav className="  top-0 z-40  bg-[#671e1e] backdrop-blur-md border-b border-[#E5E3D8] dark:border-slate-800 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Branding Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-12 h-12 mr-2.5 pl-0 rounded-full bg-[#800000] flex items-center justify-center text-white border border-[#ffffff] shadow-xs">
                {/* Government Seal Icon Placeholder */}
                <Landmark className="w-6 h-6" />
              </div>

              <div>
                <h1 className="text-base md:text-lg font-extrabold text-[#ffbc3f] dark:text-[#ffbc3f] leading-none uppercase tracking-tight">
                  Godhani Nagar
                </h1>
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">
                  Panchayat Portal
                </p>
              </div>
            </div>

            {/* Desktop Navigation Menu Links */}
            <div className="hidden lg:flex items-center gap-1.5">
              {[
                { key: 'home', label: t.home },
                { key: 'about', label: t.about },
                { key: 'administration', label: t.administration },
                { key: 'dashboard', label: 'Dashboard' },
                { key: 'services', label: t.citizenServices },
                { key: 'development', label: 'Welfare & Works' },
                { key: 'gallery', label: t.gallery },
                { key: 'downloads', label: t.downloads },
                { key: 'contact', label: t.contact }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-[#ffbc3f] text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-[#FAF9F5] dark:hover:bg-slate-800 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Controls panel: Lang, dark-mode, Mobile mirror trigger, Hamburger */}
            <div className="flex items-center gap-2">
              
              {/* Language Switch */}
              <div className="flex bg-[#ffffe7] ml-1.5 border-[#E5E3D8] dark:border-slate-700 p-0.5 rounded-lg text-[10px] font-bold">
                {['EN', 'MR', 'HI'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-[#ffbc3f] text-white'
                        : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Dark Mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-lg border border-[#E5E3D8] dark:border-slate-700 bg-[#ffffe7] hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
              </button>

              {/* Hamburger Mobile Menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg border border-[#E5E3D8] dark:border-slate-700 bg-[#FAF9F5] dark:bg-slate-800 hover:bg-slate-100 cursor-pointer"
                aria-label="Toggle Navigation Drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-800 dark:text-gray-200" /> : <Menu className="w-5 h-5 text-gray-800 dark:text-gray-200" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-[#E5E3D8] dark:border-slate-800 bg-[#FAF9F5] dark:bg-slate-900 overflow-hidden shadow-lg"
            >
              <div className="px-4 py-4 space-y-2">
                {[
                  { key: 'home', label: t.home, icon: <HomeIcon className="w-4 h-4" /> },
                  { key: 'about', label: t.about, icon: <Building className="w-4 h-4" /> },
                  { key: 'administration', label: t.administration, icon: <Users className="w-4 h-4" /> },
                  { key: 'dashboard', label: 'Overview Dashboard', icon: <Landmark className="w-4 h-4" /> },
                  { key: 'services', label: t.citizenServices, icon: <FileText className="w-4 h-4" /> },
                  { key: 'development', label: 'Welfare & Works', icon: <TrendingUp className="w-4 h-4" /> },
                  { key: 'gallery', label: t.gallery, icon: <ImageIcon className="w-4 h-4" /> },
                  { key: 'downloads', label: t.downloads, icon: <Download className="w-4 h-4" /> },
                  { key: 'contact', label: t.contact, icon: <Phone className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveTab(item.key);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                      activeTab === item.key
                        ? 'bg-[#800000] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* PORTAL BODY CONTAINER WITH EMULATOR SPLIT IF ENABLED */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main App Content Grid Column */}
          <div className={`${showMobileEmulator ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-12 transition-all duration-300`}>
            
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <div className="space-y-12">
                {/* HERO CAROUSEL / PANEL (Panel 1) */}
                <div className="relative rounded-3xl overflow-hidden h-[450px] md:h-[500px] flex items-center shadow-md">
                  {/* Drone Image of green rural Indian village suburbs with overlays */}
                  <img
  src={aerialImage}
  alt="Godhani Village Aerial View"
  className="absolute inset-0 w-full h-full object-cover"
/>
                  {/* Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/25 to-transparent"></div>

                  <div className="relative z-10 max-w-2xl px-6 md:px-12 space-y-6">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#800000]/80 backdrop-blur-xs text-white rounded-full text-[10px] uppercase font-extrabold tracking-widest border border-[#C25050]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Empowered Digital Panchayat
                    </span>
                    
                    <div className="space-y-2">
                       <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                        {t.welcome}
                      </h2>
                      <p className="text-sm md:text-base text-rose-100 font-medium">
                        {t.tagline}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => triggerQuickLink('services')}
                        className="h-12 px-6 bg-[#800000] hover:bg-[#9B1A1A] text-white text-xs font-extrabold uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        Explore Services
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => triggerQuickLink('about')}
                        className="h-12 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white text-xs font-extrabold uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                      >
                        Know More
                      </button>
                    </div>
                  </div>
                </div>

                {/* FAST STATS COUNT BOARD (Panel 1 Stats) */}
                <div className="bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 rounded-2xl p-6 shadow-2xs">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#800000]" />
                    Panchayat Demographics Index (Census 2026 Live Updates)
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                    {[
                      { label: t.population, value: stats.population, color: 'text-[#800000] dark:text-[#C25050]', unit: '' },
                      { label: t.wards, value: stats.wards, color: 'text-blue-700 dark:text-blue-400', unit: 'Wards' },
                      { label: t.families, value: stats.families, color: 'text-amber-700 dark:text-amber-400', unit: '' },
                      { label: t.literacy, value: stats.literacy, color: 'text-indigo-700 dark:text-indigo-400', unit: '%' },
                      { label: 'Male Count', value: stats.male, color: 'text-teal-700 dark:text-teal-400', unit: '' },
                      { label: 'Female Count', value: stats.female, color: 'text-rose-700 dark:text-rose-400', unit: '' }
                    ].map((st, i) => (
                      <div key={i} className="text-center bg-[#FAF9F5] dark:bg-slate-800/50 p-4 rounded-xl border border-gray-150/50 dark:border-slate-800">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">{st.label}</span>
                        <span className={`block text-xl md:text-2xl font-black mt-1 ${st.color}`}>
                          {st.value.toLocaleString('en-IN')}{st.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QUICK NAV STRIP */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { label: 'Lodge Grievance', desc: 'Raise solid complaint ticket', icon: <AlertTriangle className="text-red-600" />, tab: 'services', scroll: 'lodge-complaint-sec' },
                    { label: 'Property Tax', desc: 'Search and clear dues', icon: <Landmark className="text-[#800000]" />, tab: 'services', scroll: 'prop-tax-portal-ui' },
                    { label: 'Water Bills', desc: 'Secure connection invoice', icon: <Droplet className="text-blue-600" />, tab: 'services', scroll: 'water-tax-portal-ui' },
                    { label: 'Map Navigation', desc: 'Locate local clinics & halts', icon: <Compass className="text-indigo-600" />, tab: 'home', scroll: 'home-interactive-map-anchor' },
                    { label: 'Schemes & Grants', desc: 'Central PM subsidy limits', icon: <Coins className="text-amber-600" />, tab: 'development' }
                  ].map((quick, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => triggerQuickLink(quick.tab, quick.scroll)}
                      className="bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 hover:border-[#800000] dark:hover:border-red-500 rounded-xl p-4 text-left transition-all hover:-translate-y-1 shadow-2xs group flex flex-col justify-between cursor-pointer"
                    >
                      <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-slate-800 w-fit group-hover:scale-110 transition-transform">
                        {quick.icon}
                      </div>
                      <div className="mt-4">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{quick.label}</h4>
                        <p className="text-[10px] text-gray-400 mt-1 leading-normal">{quick.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* BULLETIN FLASH & NEWS BOARD TEASER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                    <NewsSection />
                  </div>
                  <div className="lg:col-span-4 bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 p-6 rounded-2xl space-y-6">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-extrabold text-[#fffdfd] dark:text-[#f3f3f3] uppercase tracking-wide">
                        Useful Office Links
                      </h3>
                      <p className="text-xs text-gray-500">Quickly access acts, circular documents and tenders without navigation.</p>
                    </div>

                    <div className="space-y-3">
                      {DOWNLOAD_ITEMS.slice(0, 3).map((dl) => (
                        <div key={dl.id} className="bg-[#FAF9F5] dark:bg-slate-800 border border-gray-150 p-3 rounded-xl flex items-center justify-between text-xs">
                          <div className="truncate pr-4">
                            <span className="block font-bold text-gray-900 dark:text-white truncate">{dl.title}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{dl.fileType} • {dl.fileSize}</span>
                          </div>
                          <button
                            onClick={() => alert(`Dummy download initialized for file: ${dl.title}`)}
                            className="bg-[#800000] text-white p-1.5 rounded-md hover:bg-[#9B1A1A] transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTab('downloads')}
                      className="w-full h-11 border border-[#E5E3D8] dark:border-slate-700 hover:border-[#800000] text-gray-700 dark:text-gray-300 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
                    >
                      View All Downloads
                    </button>
                  </div>
                </div>

                {/* INTERACTIVE MAP COMPONENT AT THE BOTTOM OF HOME */}
                <div id="home-interactive-map-anchor" className="pt-4">
                  <InteractiveMap />
                </div>
              </div>
            )}

            {/* 2. ABOUT TAB (Panel 2 About Godhani) */}
            {activeTab === 'about' && (
              <div className="space-y-12 bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 rounded-3xl p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#800000] dark:text-[#C25050]">Historical Background</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      About Godhani Nagar Panchayat
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      Godhani is one of the fast-developing suburban zones situated in the Nagpur Rural taluka limits, Maharashtra. 
                      Originally established as a dense agriculture-dependent Gram Panchayat, Godhani underwent tremendous expansion due to its proximity to key Nagpur transport networks, academic institutes, and industrial projects.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      By notification from the Urban Development Department of Maharashtra, Godhani was officially upgraded into a Class-C Nagar Panchayat in late 2021, fostering high-capacity concrete roads, automated drinking water tanks, robust street lights, and strict Solid Waste disposal methods.
                    </p>
                  </div>

                  {/* Village sign rendering matching reference panel 2 */}
                  <div className="lg:col-span-5 bg-[#DCD9C9] border-4 border-[#C4C1B0] rounded-2xl p-6 text-center space-y-4 shadow-sm relative">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-6 bg-gray-500 rounded-t"></div>
                    <div className="bg-[#FFFFCC] border-2 border-gray-800 rounded-xl py-6 px-4 space-y-2 max-w-xs mx-auto text-black">
                      <span className="block text-xl font-bold font-sans tracking-wide">गोधनी</span>
                      <span className="block text-3xl font-black uppercase tracking-wider font-sans border-t border-b border-gray-700 py-1.5">GGDHANI</span>
                      <span className="block text-xs font-bold text-gray-600 tracking-widest">PIN: 441123</span>
                    </div>
                    <div className="text-xs font-mono font-extrabold text-[#800000] uppercase">
                      Godhani Junction Railway Board Mockup
                    </div>
                  </div>
                </div>

                {/* Chronology timeline of Godhani limits */}
                <div className="border-t border-[#E5E3D8] dark:border-slate-800 pt-8 space-y-6">
                  <h3 className="text-base font-extrabold uppercase tracking-wider text-[#800000] dark:text-[#C25050]">
                    Panchayat Timeline
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {[
                      { year: '1968', title: 'Gram Panchayat', desc: 'Establishment under local village council Act.' },
                      { year: '2002', title: 'Road Networks', desc: 'Integration of Nagpur-Godhani asphalt highways.' },
                      { year: '2016', title: 'Clean Tap Water', desc: 'Water pipeline layout and filtration tanks setup.' },
                      { year: '2021', title: 'Nagar Panchayat', desc: 'Class-C Municipal status upgrade by Maharashtra Govt.' },
                      { year: '2026', title: '100% Digitized', desc: 'Pristine paperless web grievance and tax platform.' }
                    ].map((time, idx) => (
                      <div key={idx} className="bg-[#FAF9F5] dark:bg-slate-800 p-4 rounded-xl border border-gray-150 relative">
                        <span className="text-xl font-black text-[#800000] dark:text-[#C25050] block">{time.year}</span>
                        <strong className="text-xs block text-gray-900 dark:text-white mt-1">{time.title}</strong>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-normal">{time.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Facts panel list */}
                <div className="border-t border-[#E5E3D8] dark:border-slate-800 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-base font-extrabold uppercase tracking-wider text-[#800000] dark:text-[#C25050]">
                      General Demographics (Census Index)
                    </h3>
                    <div className="divide-y divide-gray-100 dark:divide-slate-800 text-xs text-gray-700 dark:text-gray-300">
                      {[
                        { label: 'Registered Families', val: '2,178 Households' },
                        { label: 'Average Ward Density', val: '576 Citizens per Ward' },
                        { label: 'Standard ZIP Code', val: '441123' },
                        { label: 'Panchayat Area Limits', val: '12.45 Square Kilometers' },
                        { label: 'Geographic Taluka', val: 'Nagpur Rural taluka' },
                        { label: 'Collector District', val: 'Nagpur' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between py-2.5">
                          <span className="font-medium text-gray-400">{item.label}</span>
                          <span className="font-bold text-gray-900 dark:text-white">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-extrabold uppercase tracking-wider text-[#800000] dark:text-[#C25050]">
                      Administrative Profile
                    </h3>
                    <div className="divide-y divide-gray-100 dark:divide-slate-800 text-xs text-gray-700 dark:text-gray-300">
                      {[
                        { label: 'Governing Council Type', val: ' Nagar Panchayat (Class-C)' },
                        { label: 'Elected Wards', val: '17 Independent Wards' },
                        { label: 'Elected Term Limits', val: '5 Years (Active: 2022-2027)' },
                        { label: 'Nodal Chief Officer', val: 'Mrs. Sunita Bhalekar (Govt Appointed)' },
                        { label: 'Elected President', val: 'Mr. Nitin Ganvir' },
                        { label: 'Elected Vice President', val: 'Mr. Satish Patil' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between py-2.5">
                          <span className="font-medium text-gray-400">{item.label}</span>
                          <span className="font-bold text-gray-900 dark:text-white text-right">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ADMINISTRATION TAB */}
            {activeTab === 'administration' && (
              <div className="space-y-6">
                <AdministrationSection />
              </div>
            )}

            {/* 4. OVERVIEW DASHBOARD TAB (Panel 4 Overview) */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 rounded-3xl p-6 lg:p-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
                      <Landmark className="w-6 h-6" />
                      Infrastructure Overview Dashboard
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Live monitoring metric data compiled by ward inspectors across the Godhani municipal limits.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    {[
                      { title: 'Water Connections', count: '9,004', icon: <Droplet className="text-blue-500" />, pct: 85, color: 'bg-blue-500' },
                      { title: 'Elected Wards', count: '17', icon: <Users className="text-[#800000]" />, pct: 100, color: 'bg-[#9B1A1A]' },
                      { title: 'Concrete Road Length', count: '45.2 Km', icon: <Compass className="text-amber-500" />, pct: 75, color: 'bg-amber-500' },
                      { title: 'School Children Enrolled', count: '1,250', icon: <Building className="text-indigo-500" />, pct: 90, color: 'bg-indigo-500' },
                      { title: 'Wastewater Connections', count: '2,280', icon: <Droplet className="text-teal-500" />, pct: 60, color: 'bg-teal-500' },
                      { title: 'Total Households registered', count: '2,158', icon: <Users className="text-[#800000]" />, pct: 95, color: 'bg-[#800000]' },
                      { title: 'Zilla Parishad Schools', count: '8', icon: <Building className="text-cyan-500" />, pct: 100, color: 'bg-cyan-500' },
                      { title: 'Local Hospitals / Clinics', count: '3', icon: <Heart className="text-rose-500" />, pct: 100, color: 'bg-rose-500' },
                      { title: 'Public Parks & Tracks', count: '4', icon: <Compass className="text-rose-500" />, pct: 100, color: 'bg-[#800000]' },
                      { title: 'Nationalized Banks', count: '2', icon: <Coins className="text-amber-600" />, pct: 100, color: 'bg-amber-600' },
                      { title: 'Anganwadis registered', count: '5', icon: <Users className="text-rose-400" />, pct: 100, color: 'bg-rose-400' },
                      { title: 'Community Health Centers', count: '0', icon: <Heart className="text-red-500" />, pct: 0, color: 'bg-red-500' },
                    ].map((card, i) => (
                      <div key={i} className="bg-[#FAF9F5] dark:bg-slate-800 border border-gray-150 dark:border-slate-800 rounded-xl p-4.5 space-y-3.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-bold uppercase tracking-wide truncate pr-2">{card.title}</span>
                          <div className="p-1.5 rounded-md bg-[#FAF9F5] dark:bg-slate-700 shadow-3xs">{card.icon}</div>
                        </div>

                        <div>
                          <span className="text-xl font-black text-gray-900 dark:text-white block">{card.count}</span>
                        </div>

                        {/* Progress bar representing saturation status */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                            <span>Satiation Status</span>
                            <span>{card.pct}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div className={`${card.color} h-full rounded-full`} style={{ width: `${card.pct}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. CITIZEN SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-12">
                {/* Certificates selection */}
                <div>
                  <CertificateForms />
                </div>

                {/* Tax Portals search / checkouts */}
                <div>
                  <TaxPortals />
                </div>

                {/* Complaint registration desk */}
                <div>
                  <ComplaintForm />
                </div>
              </div>
            )}

            {/* 6. DEVELOPMENT & GOVERNMENT SCHEMES TAB */}
            {activeTab === 'development' && (
              <div className="space-y-12">
                {/* DEVELOPMENT WORKS (Panel 9) */}
                <div className="bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E3D8] dark:border-slate-800 pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
                        <TrendingUp className="w-6 h-6" />
                        Infrastructure Development Works
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">Real-time financial status audits of construction projects throughout Godhani wards.</p>
                    </div>

                    {/* Work Filters */}
                    <div className="flex bg-[#FAF9F5] dark:bg-slate-800 border border-[#E5E3D8] dark:border-slate-700 p-0.5 rounded-lg text-xs font-bold">
                      {['All', 'Completed', 'Ongoing', 'Upcoming'].map((fil) => (
                        <button
                          key={fil}
                          onClick={() => setProjectFilter(fil as any)}
                          className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                            projectFilter === fil
                              ? 'bg-[#800000] text-white'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {fil}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Works Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.filter((p) => projectFilter === 'All' || p.status === projectFilter).map((proj) => (
                      <div key={proj.id} className="bg-[#FAF9F5] dark:bg-slate-800 border border-gray-150 dark:border-slate-700/60 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between">
                        <div>
                          <img
                            src={proj.image}
                            alt={proj.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4 space-y-2">
                            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-400">
                              <span>Ward {proj.ward} Project</span>
                              <span className={`px-2 py-0.5 rounded-full text-white ${
                                proj.status === 'Completed' ? 'bg-[#800000]' :
                                proj.status === 'Ongoing' ? 'bg-amber-500' : 'bg-blue-500'
                              }`}>
                                {proj.status}
                              </span>
                            </div>

                            <h3 className="text-xs sm:text-sm font-bold text-gray-950 dark:text-white leading-snug">
                              {proj.name}
                            </h3>
                          </div>
                        </div>

                        <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-slate-700 text-xs space-y-2 font-mono">
                          <div className="flex justify-between text-gray-500">
                            <span>Approved Budget:</span>
                            <strong className="text-[#800000] dark:text-[#C25050]">{proj.budget}</strong>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-gray-400">
                              <span>Progress Rate:</span>
                              <strong>{proj.progress}%</strong>
                            </div>
                            <div className="w-full bg-gray-150 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                              <div className="bg-[#800000] dark:bg-[#C25050] h-full rounded-full" style={{ width: `${proj.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GOVERNMENT SCHEMES (Panel 10 Schemes) */}
                <div className="bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
                      <Coins className="w-6 h-6" />
                      Active Government Schemes & Direct Welfare Grants
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Official central and state-sponsored citizen subsidy schemes accessible in Godhani limits.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SCHEMES.map((sch) => (
                      <div key={sch.id} className="bg-[#FAF9F5] dark:bg-slate-800 border border-gray-150 dark:border-slate-700 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between">
                        <div>
                          <img
                            src={sch.image}
                            alt={sch.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4 space-y-2">
                            <span className="text-[10px] font-mono font-bold text-[#800000] dark:text-[#C25050] block truncate">{sch.ministry}</span>
                            <h3 className="text-xs sm:text-sm font-bold text-gray-950 dark:text-white">{sch.title}</h3>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{sch.description}</p>
                          </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 dark:border-slate-700">
                          <button
                            onClick={() => setSelectedScheme(sch)}
                            className="w-full py-2 bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-lg hover:bg-[#800000] hover:text-white transition-all cursor-pointer"
                          >
                            Learn More / Eligibility
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <GallerySection />
              </div>
            )}

            {/* 8. DOWNLOADS TAB (Panel 13 Downloads) */}
            {activeTab === 'downloads' && (
              <div className="bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
                    <Download className="w-6 h-6" />
                    Public Document & Application Forms Depot
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Search, locate, and download official application forms, reports, acts, and audit PDFs.</p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold w-full md:w-auto">
                    {['All', 'Forms', 'Acts', 'Reports', 'Budgets'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setDownloadCategory(cat)}
                        className={`flex-1 md:flex-initial px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                          downloadCategory === cat
                            ? 'bg-[#800000] text-white'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={downloadSearch}
                      onChange={(e) => setDownloadSearch(e.target.value)}
                      placeholder="Search files by keyword..."
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E5E3D8] dark:border-slate-700 text-xs bg-[#FAF9F5] dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#800000]"
                    />
                  </div>
                </div>

                {/* Public Downloads Table */}
                <div className="border border-gray-150 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
                    <thead className="bg-[#FAF9F5] dark:bg-slate-800 text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                      <tr>
                        <th className="px-6 py-4">Document Title</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Format • Size</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-slate-800 font-medium">
                      {DOWNLOAD_ITEMS.filter((dl) => {
                        const matchesCategory = downloadCategory === 'All' || dl.category === downloadCategory;
                        const matchesSearch = dl.title.toLowerCase().includes(downloadSearch.toLowerCase());
                        return matchesCategory && matchesSearch;
                      }).map((dl) => (
                        <tr key={dl.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="block font-bold text-gray-900 dark:text-white">{dl.title}</span>
                            <span className="text-[10px] text-gray-400 font-mono">Ref: GNP-DOC-{dl.id.toUpperCase()}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-slate-700">
                              {dl.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500 font-mono">
                            {dl.fileType} • {dl.fileSize}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => alert(`Your official PDF extract for "${dl.title}" has been successfully fetched from Godhani Municipal Depot!`)}
                              className="px-3.5 py-1.5 bg-[#800000] text-white hover:bg-[#9B1A1A] transition-colors rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. CONTACT TAB (Panel 14 Contact) */}
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Contact Form Column */}
                <div className="lg:col-span-7 bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#800000] dark:text-[#C25050] flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#9B1A1A]" />
                      Citizen Inquiry & Feedback Desk
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Submit non-emergency general questions or administrative inquiries to our help desk.</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {contactSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 0.95 }}
                        className="bg-red-50 dark:bg-red-950/20 border border-red-200 text-[#800000] dark:text-[#C25050] p-6 rounded-xl text-center space-y-3"
                      >
                        <CheckCircle2 className="w-10 h-10 text-[#9B1A1A] mx-auto" />
                        <h4 className="font-bold">Inquiry Transmitted Successfully!</h4>
                        <p className="text-xs text-red-700 dark:text-red-500 leading-normal">
                          Thank you. Your message has been safely recorded under reference log. We will reply to your registered contact within 48 hours.
                        </p>
                        <button
                          onClick={() => setContactSubmitted(false)}
                          className="px-4 py-1.5 bg-[#800000] text-white rounded text-xs font-bold uppercase hover:bg-[#9B1A1A]"
                        >
                          New Inquiry
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1" htmlFor="cont-name">Full Name *</label>
                          <input
                            id="cont-name"
                            type="text"
                            required
                            placeholder="Your complete name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E3D8] dark:border-slate-700 text-xs bg-[#FAF9F5] dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-[#800000]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1" htmlFor="cont-phone">Mobile Number *</label>
                          <input
                            id="cont-phone"
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E3D8] dark:border-slate-700 text-xs bg-[#FAF9F5] dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-[#800000]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1" htmlFor="cont-msg">Message / Inquiry Detail *</label>
                          <textarea
                            id="cont-msg"
                            required
                            rows={4}
                            placeholder="Please provide details about your administrative inquiry..."
                            value={contactForm.msg}
                            onChange={(e) => setContactForm(prev => ({ ...prev, msg: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E3D8] dark:border-slate-700 text-xs bg-[#FAF9F5] dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-[#800000]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full h-11 bg-[#800000] hover:bg-[#9B1A1A] text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
                        >
                          Send Inquiry Message
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>

                {/* Office address & emergency help desks column */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Address Details card */}
                  <div className="bg-[#FAF9F5] dark:bg-slate-900 border border-[#E5E3D8] dark:border-slate-800 rounded-3xl p-6 space-y-5">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#800000]">
                      Main Panchayat Office Address
                    </h3>

                    <div className="space-y-4 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-5 h-5 text-[#9B1A1A] shrink-0" />
                        <div>
                          <strong className="block text-gray-900 dark:text-white">Godhani Nagar Panchayat Administrative Building</strong>
                          <span>Main Bazar Square, Godhani Railway Limits, Nagpur Rural, Nagpur, Maharashtra, PIN: 441123</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Clock className="w-5 h-5 text-[#9B1A1A] shrink-0" />
                        <div>
                          <strong className="block text-gray-900 dark:text-white">Desk Working Hours</strong>
                          <span>Mon to Sat: 09:30 AM - 05:30 PM (Second and Fourth Sat are holidays)</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Phone className="w-5 h-5 text-[#9B1A1A] shrink-0" />
                        <div>
                          <strong className="block text-gray-900 dark:text-white">Civil Help Desk Phone</strong>
                          <a href="tel:+917112232623" className="hover:underline hover:text-[#800000] font-mono">+91 7112 232623</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EMERGENCY NUMBERS GRID (Panel 14) */}
                  <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-200/60 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-red-800 dark:text-red-400">Emergency Support Helpdesks</h4>
                    </div>

                    <div className="divide-y divide-red-200/40 text-xs text-gray-700 dark:text-gray-300">
                      {[
                        { service: 'Fire Brigade Response', call: '101 / +91 712 254 0101' },
                        { service: 'Ambulance & Ward Clinic', call: '108 / +91 98230 45678' },
                        { service: 'Rural Police Control Desk', call: '100 / +91 712 256 0000' },
                        { service: 'Disaster / Water Trunk Failure', call: '+91 7112 232623' }
                      ].map((em, idx) => (
                        <div key={idx} className="flex justify-between py-2 font-mono">
                          <span className="font-sans text-gray-500">{em.service}</span>
                          <strong className="text-red-700 dark:text-red-400">{em.call}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 10. PHONE EMULATOR PREVIEW (Panel 16 responsive mockup sidebar) */}
          {showMobileEmulator && (
            <div className="hidden lg:block lg:col-span-4 sticky top-24 transition-all duration-300">
              <div className="relative mx-auto w-[330px] h-[670px] bg-[#111827] rounded-[45px] p-3.5 shadow-2xl border-4 border-slate-700">
                {/* Speaker pill notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
                </div>

                {/* Live screen iframe preview emulator wrapper */}
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[34px] overflow-hidden relative border border-slate-900 flex flex-col justify-between">
                  {/* Emulator Inner Header */}
                  <div className="bg-[#800000] text-white p-4 pt-8 text-center text-xs font-bold border-b border-[#9B1A1A]">
                    <div className="flex items-center justify-between text-[10px] mb-1 font-mono text-[#FAF9F5]">
                      <span>09:41 AM</span>
                      <span className="bg-[#9B1A1A] px-1 py-0.5 rounded text-[8px] tracking-wide">MOBILE DEMO</span>
                      <span>100% 🔋</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <Landmark className="w-4 h-4 text-[#C25050]" />
                      <span className="text-[10px] tracking-wider font-extrabold uppercase truncate">GODHANI PANCHAYAT</span>
                    </div>
                  </div>

                  {/* Emulator Inner Scroll Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#FAF9F5] dark:bg-slate-900">
                    <div className="text-center space-y-2 py-4 bg-[#FAF9F5] dark:bg-slate-800 border border-[#E5E3D8] dark:border-slate-700 rounded-xl p-3 shadow-3xs">
                      <h4 className="text-[11px] font-bold text-gray-900 dark:text-white uppercase leading-tight">Welcome to Godhani Mobile</h4>
                      <p className="text-[10px] text-gray-400">Everything scaled and styled beautifully for touch inputs.</p>
                      
                      {/* Interactive Button */}
                      <button
                        onClick={() => alert('Mobile navigation simulated!')}
                        className="w-full py-1.5 bg-[#800000] text-white text-[9px] font-bold rounded-md uppercase cursor-pointer"
                      >
                        Launch QR Pay
                      </button>
                    </div>

                    {/* Quick Stats list in mobile */}
                    <div className="bg-[#FAF9F5] dark:bg-slate-800 border border-[#E5E3D8] dark:border-slate-700 rounded-xl p-3 space-y-2">
                      <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Fast Stats</h5>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg">
                          <span className="block text-[8px] text-gray-400">Population</span>
                          <span className="font-extrabold text-xs text-[#800000]">9,804</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg">
                          <span className="block text-[8px] text-gray-400">Active Wards</span>
                          <span className="font-extrabold text-xs text-[#800000]">17</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Mobile Complaint Status check */}
                    <div className="bg-[#FAF9F5] dark:bg-slate-800 border border-red-150 rounded-xl p-3 text-center space-y-2">
                      <FileCheck className="w-6 h-6 text-[#800000] mx-auto" />
                      <h5 className="text-[10px] font-bold text-red-950 dark:text-[#C25050]">Submit Mobile Grievance</h5>
                      <p className="text-[9px] text-gray-500 leading-normal">Submit solid trash reports with instant camera access.</p>
                      <button
                        onClick={() => {
                          setActiveTab('services');
                          setTimeout(() => {
                            const el = document.getElementById('lodge-complaint-sec');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }, 100);
                        }}
                        className="w-full py-1.5 bg-red-50 hover:bg-red-100 text-[#800000] text-[9px] font-bold rounded-lg cursor-pointer"
                      >
                        Go to Grievance Form
                      </button>
                    </div>
                  </div>

                  {/* Emulator bottom simulated button */}
                  
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER BLOCK */}
      <footer className="bg-slate-950 text-white mt-16 border-t-4 border-[#800000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1 Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#800000] flex items-center justify-center border border-[#9B1A1A]">
                  <Landmark className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-sm tracking-wide uppercase">Godhani Nagar Panchayat</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering the 17 wards of Godhani with accessible, secure, and digitized citizen services. Achieving transparent rural administration under the Maharashtra Nagar Panchayat Act.
              </p>
            </div>

            {/* Column 2 Services */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#C25050]">Citizen Services</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><button onClick={() => triggerQuickLink('services', 'citizen-serv-form-sec')} className="hover:text-white cursor-pointer">Birth Certificate Application</button></li>
                <li><button onClick={() => triggerQuickLink('services', 'citizen-serv-form-sec')} className="hover:text-white cursor-pointer">Death Extract Request</button></li>
                <li><button onClick={() => triggerQuickLink('services', 'prop-tax-portal-ui')} className="hover:text-white cursor-pointer">Property Tax Assessment</button></li>
                <li><button onClick={() => triggerQuickLink('services', 'water-tax-portal-ui')} className="hover:text-white cursor-pointer">Water Connection Bills</button></li>
                <li><button onClick={() => triggerQuickLink('services', 'lodge-complaint-sec')} className="hover:text-white cursor-pointer">Lodge Grievance Desk</button></li>
              </ul>
            </div>

            {/* Column 3 Resources */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#C25050]">Municipal Resources</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><button onClick={() => triggerQuickLink('downloads')} className="hover:text-white cursor-pointer">Acts & Municipal Statutes</button></li>
                <li><button onClick={() => triggerQuickLink('downloads')} className="hover:text-white cursor-pointer">Tenders & Infrastructure Bids</button></li>
                <li><button onClick={() => triggerQuickLink('downloads')} className="hover:text-white cursor-pointer">Annual Statements & Budgets</button></li>
                <li><button onClick={() => triggerQuickLink('gallery')} className="hover:text-white cursor-pointer">Photo Gallery & Events</button></li>
                <li><button onClick={() => triggerQuickLink('about')} className="hover:text-white cursor-pointer">Panchayat Chronology</button></li>
              </ul>
            </div>

            {/* Column 4 Help & Counter */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#C25050]">Emergency Contacts</h4>
              <div className="space-y-1 text-xs text-slate-400 font-mono">
                <span className="block text-white font-sans">Support Help Desk:</span>
                <span>+91 7112 232623</span>
                <span className="block text-white font-sans mt-3">Disaster Control:</span>
                <span>108 / 100</span>
              </div>

              {/* Secure Visitor counter */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1.5 font-mono">
                <span className="text-[9px] uppercase font-bold text-slate-400">Total Portal Visitors</span>
                <div className="flex gap-1">
                  {['0', '4', '9', '2', '0', '6'].map((num, idx) => (
                    <span key={idx} className="bg-[#800000] text-white px-2 py-1 rounded text-xs font-black shadow-xs">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col md:flex-row justify-between text-[11px] text-slate-400">
            <p>© 2026 Godhani Nagar Panchayat. Developed under Digital India initiative. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Notice: No personal records are leaked on our offline secure client portal.'); }} className="hover:text-white">Privacy Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms: Under strict digital Indian legal limits.'); }} className="hover:text-white">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* SCHEME DETAIL MODAL */}
      <AnimatePresence>
        {selectedScheme && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScheme(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF9F5] dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-[#E5E3D8] dark:border-slate-800 shadow-xl overflow-hidden relative z-10"
            >
              <img
                src={selectedScheme.image}
                alt={selectedScheme.title}
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover"
              />

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#800000] dark:text-[#C25050] uppercase">{selectedScheme.ministry}</span>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">{selectedScheme.title}</h4>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{selectedScheme.description}</p>

                <div className="space-y-2 border-t border-gray-100 dark:border-slate-800 pt-3">
                  <strong className="text-xs font-bold text-gray-900 dark:text-white block">Key Scheme Benefits:</strong>
                  <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {selectedScheme.benefits.map((b: string, bIdx: number) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <strong className="text-xs font-bold text-gray-900 dark:text-white block">Eligibility Criteria:</strong>
                  <p className="text-xs text-gray-500 dark:text-gray-400 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-gray-150">
                    {selectedScheme.eligibility}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <a
                  href={selectedScheme.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#800000] hover:bg-[#9B1A1A] text-white rounded-lg text-xs font-bold uppercase transition-colors"
                >
                  Apply on Central Portal
                </a>
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 rounded-lg text-xs font-bold uppercase hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Close Detail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
