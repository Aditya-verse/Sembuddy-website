import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue } from 'framer-motion';
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { 
  Calculator, 
  CalendarCheck, 
  BookOpen, 
  Bot, 
  Download, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  Menu, 
  X, 
  Smartphone,
  GraduationCap,
  ArrowRight,
  ArrowUp,
  WifiOff,
  Clock,
  ShieldCheck,
  ChevronRight,
  Mail,
  Instagram,
  Globe,
  Loader2,
  FileText,
  Zap,
  Star,
  Users,
  TrendingUp,
  HelpCircle,
  Plus,
  Minus,
  Send,
  MapPin,
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  AlertTriangle,
  XCircle,
  Check,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Rocket,
  Lightbulb,
  Target
} from 'lucide-react';

// --- Firebase Configuration ---
// 🚨 ACTION REQUIRED: 
// 1. Create a project at https://console.firebase.google.com/
// 2. Enable "Authentication" > "Sign-in method" > "Google"
// 3. Go to Project Settings, copy your config, and replace the object below.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",        // <-- Replace with your real keys
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase Logic (Modular SDK)
let auth: any = null;
let isFirebaseConfigured = false;

try {
  // Simple check to see if the user replaced the placeholder text
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
    // const app = initializeApp(firebaseConfig);
    // auth = getAuth(app);
    // isFirebaseConfigured = true;
    console.log("Firebase initialized successfully.");
  } else {
    console.warn("⚠️ Firebase Config is missing. App is running in DEMO mode.");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

// --- APP SCREENSHOT CONFIGURATION ---
// 🚨 ACTION REQUIRED: Replace these URLs with the actual paths to your uploaded images.
// If you are hosting this, put your images in an /assets folder.
const screenshots = {
  dashboard: "dashboard.png", 
  attendance: "attendance.png",
  marks: "marks.png",
  ai: "ai.png"
};


// --- Assets & Icons ---

const XLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const SemBuddyLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#2dd4bf" />
        <stop offset="100%" stopColor="#4ade80" />
      </linearGradient>
    </defs>
    {/* Abstract Bubble Layers */}
    <motion.path 
      d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 Z" 
      stroke="url(#logoGradient)" 
      strokeWidth="6"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    {/* Cap & Book Simplified */}
    <motion.path
      d="M30 45 L50 35 L70 45 L50 55 L30 45 Z M70 45 V60 C70 60 60 65 50 65 M35 65 H65"
      stroke="white"
      strokeWidth="4"
      strokeLinejoin="round"
      strokeLinecap="round"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    />
  </svg>
);

const GoogleLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// --- Utilities ---

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Navbar height approx
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// --- Shared Components ---

const Toast = ({ 
  message, 
  type = 'success', 
  isVisible, 
  onClose,
  progress 
}: { 
  message: string, 
  type?: 'success' | 'loading' | 'info' | 'error', 
  isVisible: boolean, 
  onClose: () => void,
  progress?: number 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-10 right-6 md:right-10 z-[100] bg-white text-brand-dark px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-brand-teal/20 min-w-[300px] max-w-sm"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            type === 'loading' ? 'bg-blue-100' : 
            type === 'info' ? 'bg-amber-100' : 
            type === 'error' ? 'bg-red-100' : 
            'bg-brand-green'
          }`}>
            {type === 'loading' ? (
              <Loader2 size={20} className="text-brand-blue animate-spin" />
            ) : type === 'info' ? (
              <Zap size={20} className="text-amber-600" />
            ) : type === 'error' ? (
              <AlertTriangle size={20} className="text-red-600" />
            ) : (
              <CheckCircle2 size={20} className="text-brand-dark" />
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-0.5">
              {type === 'loading' ? 'Processing...' : 
               type === 'info' ? 'Note' : 
               type === 'error' ? 'Setup Required' : 
               'Success'}
            </h4>
            <p className="text-xs text-slate-600 font-medium">{message}</p>
            {type === 'loading' && progress !== undefined && (
               <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-blue" 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
               </div>
            )}
          </div>
          <button onClick={onClose} className="ml-2 text-slate-400 hover:text-brand-dark self-start mt-1">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Mascot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-[80] hidden md:block cursor-pointer group"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    >
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          rotate: isHovered ? [0, 5, -5, 0] : 0
        }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0.5 }
        }}
        className="relative w-20 h-24"
      >
        {/* Robot Body */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-teal rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/20 backdrop-blur-md overflow-hidden">
          {/* Face Screen */}
          <div className="absolute top-3 left-2 right-2 bottom-3 bg-[#0f172a] rounded-xl flex flex-col items-center justify-center border border-white/10">
            {/* Eyes Container */}
            <div className="flex gap-2">
              <motion.div 
                animate={{ scaleY: blink ? 0.1 : 1 }}
                className="w-3 h-3 bg-brand-green rounded-full shadow-[0_0_10px_#4ade80]" 
              />
              <motion.div 
                animate={{ scaleY: blink ? 0.1 : 1 }}
                className="w-3 h-3 bg-brand-green rounded-full shadow-[0_0_10px_#4ade80]" 
              />
            </div>
            {/* Mouth */}
            <motion.div 
              animate={{ width: isHovered ? 16 : 8, height: isHovered ? 6 : 2 }}
              className="mt-2 h-0.5 bg-brand-teal rounded-full" 
            />
          </div>
        </div>

        {/* Antenna */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-slate-400" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-teal animate-pulse" />

        {/* Arm (Waving) */}
        <motion.div 
          className="absolute top-10 -right-2 w-3 h-8 bg-brand-blue rounded-full origin-top"
          animate={{ rotate: isHovered ? [0, -45, 0, -45, 0] : 0 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
           className="absolute top-10 -left-2 w-3 h-8 bg-brand-blue rounded-full"
        />
      </motion.div>
      
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: -120, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            className="absolute top-4 left-0 bg-white text-brand-dark px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg pointer-events-none"
          >
            Hi, I'm SemBuddy! 👋
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white rotate-45 -translate-y-1/2"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FeatureModal = ({ feature, onClose }: { feature: any, onClose: () => void }) => {
  if (!feature) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10">
            <X className="text-slate-400" />
          </button>
          
          <div className={`h-32 bg-gradient-to-r ${feature.gradient} flex items-center justify-center relative overflow-hidden`}>
             <div className="absolute inset-0 bg-black/20" />
            <feature.icon size={64} className="text-white drop-shadow-lg relative z-10" />
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold font-display mb-4">{feature.title}</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              {feature.fullDesc || feature.desc}
            </p>
            
            <ul className="space-y-3 mb-8">
              {feature.details.map((detail: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                   <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={12} className="text-brand-teal" />
                   </div>
                   {detail}
                </li>
              ))}
            </ul>

            <button onClick={onClose} className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-semibold transition-colors">
              Got it
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AuthModal = ({ isOpen, onClose, onAuth }: { isOpen: boolean, onClose: () => void, onAuth: (mode: 'login' | 'signup' | 'google') => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSignUp(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(isSignUp ? 'signup' : 'login');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0f172a] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative p-8"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10">
            <X className="text-slate-400" />
          </button>

          <div className="text-center mb-6">
             <div className="inline-block p-4 rounded-2xl bg-brand-blue/10 mb-4">
                {isSignUp ? <UserPlus size={32} className="text-brand-blue" /> : <LogIn size={32} className="text-brand-blue" />}
             </div>
             <h3 className="text-2xl font-bold font-display text-white">
               {isSignUp ? "Create Account" : "Welcome Back"}
             </h3>
             <p className="text-slate-400 text-sm mt-2">
               {isSignUp ? "Join SemBuddy to boost your grades." : "Log in to sync your attendance and marks."}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Google Login Button */}
            <button 
              type="button"
              onClick={() => onAuth('google')}
              className="w-full py-3 rounded-xl bg-white text-slate-800 font-semibold shadow-md hover:bg-slate-50 transition-all flex items-center justify-center gap-3 mb-4 active:scale-[0.98]"
            >
              <GoogleLogo className="w-5 h-5" />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 py-2">
               <div className="h-[1px] bg-white/10 flex-1"></div>
               <span className="text-xs text-slate-500 font-medium">OR</span>
               <div className="h-[1px] bg-white/10 flex-1"></div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Aditya Mane" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-blue transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="student@college.edu" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-blue transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-brand-blue transition-colors"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-between items-center text-sm pt-2">
                 <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                   <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                   Remember me
                 </label>
                 <a href="#" className="text-brand-teal hover:underline">Forgot password?</a>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-teal font-bold text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-slate-400">
             {isSignUp ? "Already have an account? " : "Don't have an account? "}
             <button onClick={() => setIsSignUp(!isSignUp)} className="text-brand-teal font-semibold hover:underline">
               {isSignUp ? "Log In" : "Sign up"}
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[90] p-4 rounded-full bg-brand-blue/10 hover:bg-brand-blue border border-brand-blue/30 text-brand-blue hover:text-white backdrop-blur-md shadow-lg transition-colors duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="group-hover:animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Components ---

const Navbar = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Demo', id: 'demo' },
    { name: 'AI Chat', id: 'ai-demo' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Why SemBuddy', id: 'why' },
    { name: 'Reviews', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass border-b border-white/10 shadow-lg shadow-black/20' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-2 group">
          <SemBuddyLogo className="w-8 h-8" />
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-brand-teal transition-colors">
            SemBuddy
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-medium text-slate-300 hover:text-brand-teal transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-teal transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <button 
            onClick={onLoginClick}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-brand-blue/20 hover:text-brand-blue border border-white/10 hover:border-brand-blue/30 transition-all text-sm font-semibold hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <User size={16} /> Log In
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2 z-[60]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.id)}
                  className="text-2xl font-bold text-slate-300 hover:text-brand-teal transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => { setIsOpen(false); onLoginClick(); }}
                className="mt-4 px-8 py-4 rounded-full bg-brand-blue font-bold text-white shadow-lg flex items-center justify-center gap-2 mx-auto"
              >
                <User size={20} /> Log In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FloatingElement = ({ delay, xOffset, yOffset, icon: Icon, color, mouseX, mouseY, factor = 1 }: any) => {
  const xMouse = useTransform(mouseX, [-0.5, 0.5], [-30 * factor, 30 * factor]);
  const yMouse = useTransform(mouseY, [-0.5, 0.5], [-30 * factor, 30 * factor]);
  
  return (
    <motion.div
      style={{ x: xMouse, y: yMouse, zIndex: 10, left: '50%', top: '50%', position: 'absolute' }}
    >
      <motion.div
        initial={{ x: xOffset, y: yOffset }}
        animate={{ 
          y: [yOffset, yOffset - 15, yOffset + 15, yOffset],
          x: [xOffset, xOffset + 10, xOffset - 10, xOffset],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          duration: 8 + delay, 
          repeat: Infinity, 
          ease: "easeInOut",
        }}
        className="ml-[-2rem] mt-[-2rem] p-4 rounded-2xl glass border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl"
      >
        <Icon className={`${color} w-8 h-8`} />
      </motion.div>
    </motion.div>
  );
};

const HeroSection = ({ onDownloadClick }: { onDownloadClick: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const xBack = useTransform(smoothMouseX, [-0.5, 0.5], [-50, 50]);
  const yBack = useTransform(smoothMouseY, [-0.5, 0.5], [-50, 50]);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  return (
    <section 
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1, x: xBack }} 
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[100px] animate-blob mix-blend-screen" 
        />
        <motion.div 
          style={{ y: y2, x: useTransform(xBack, v => -v) }} 
          className="absolute bottom-[0%] right-[-10%] w-[700px] h-[700px] bg-brand-teal/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" 
        />
        <motion.div 
          style={{ x: useTransform(xBack, v => v * 0.5), y: useTransform(yBack, v => v * 0.5) }}
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[80px] animate-blob animation-delay-4000" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
        <div className="space-y-10 text-center lg:text-left relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              <span className="text-sm font-medium text-brand-teal uppercase tracking-wider">v2.0 Now Available</span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight">
              Your Smart <br />
              <span className="text-gradient">Engineering</span> <br />
              Companion
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            SemBuddy streamlines your academic life. Calculate marks, track attendance, view syllabus, and get AI study help—all in one beautiful app.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-2"
          >
            <button 
              onClick={onDownloadClick}
              className="group relative px-10 py-5 bg-brand-blue rounded-full font-bold text-lg text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] overflow-hidden transition-all active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center justify-center gap-3">
                Download APK <Download size={24} />
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="px-10 py-5 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              Explore Features <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>

        <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center hidden md:flex perspective-1000 -ml-10 lg:-ml-20">
           <motion.div 
              style={{ rotateX, rotateY, z: 100 }}
              className="relative z-20 preserve-3d w-full h-full flex items-center justify-center"
           >
            <motion.div 
  animate={{ 
    y: [0, -12, 0],       // gentle vertical float
    scale: [1, 1.015, 1]  // very subtle breathing
  }}
  transition={{
    y: {
      duration: 8,
      ease: [0.22, 0.8, 0.2, 1],
      repeat: Infinity,
      repeatType: "loop"
    },
    scale: {
      duration: 6.5,
      ease: [0.22, 0.8, 0.2, 1],
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.2
    }
  }}
  style={{ willChange: "transform" }}
  className="relative w-[14rem] h-[30rem] lg:w-[16rem] lg:h-[34rem] rounded-[2.2rem] bg-[#0f172a] border-[5px] border-slate-800 shadow-[0_15px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl flex items-center justify-center group"
>
  {/* Top notch */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-xl z-30"></div>

  {/* PHONE SCREEN CONTENT */}
  <div className="absolute inset-0 p-2">
    <div className="w-full h-full bg-[#1e293b]/90 rounded-[1.7rem] overflow-hidden border border-white/10 relative flex items-center justify-center">

      {/* Gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-green/20 opacity-60"></div>

      {/* Sheen */}
      <div className="absolute -top-[150%] -left-[50%] w-[200%] h-[200%] 
        bg-gradient-to-br from-transparent via-white/20 to-transparent rotate-45 
        pointer-events-none group-hover:top-[100%] transition-all duration-1000"></div>

      {/* Logo */}
      <SemBuddyLogo className="w-28 h-28 drop-shadow-[0_0_40px_rgba(45,212,191,0.6)] z-10" />

      {/* Grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] 
        opacity-10 mix-blend-overlay pointer-events-none"></div>

    </div>
  </div>

  {/* Home indicator */}
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full"></div>
</motion.div>


             <FloatingElement 
               delay={0} 
               xOffset={-180} yOffset={-120} 
               icon={Calculator} color="text-brand-blue" 
               mouseFactor={1.8} mouseX={smoothMouseX} mouseY={smoothMouseY}
             />
             <FloatingElement 
               delay={1.5} 
               xOffset={200} yOffset={90} 
               icon={Bot} color="text-brand-green" 
               mouseFactor={2.5} mouseX={smoothMouseX} mouseY={smoothMouseY}
             />
             <FloatingElement 
               delay={0.8} 
               xOffset={180} yOffset={-160} 
               icon={GraduationCap} color="text-brand-teal" 
               mouseFactor={1.5} mouseX={smoothMouseX} mouseY={smoothMouseY}
             />
             <FloatingElement 
               delay={2.2} 
               xOffset={-160} yOffset={150} 
               icon={CalendarCheck} color="text-purple-400" 
               mouseFactor={2.0} mouseX={smoothMouseX} mouseY={smoothMouseY}
             />

             <motion.div 
              style={{ 
                x: useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]),
                y: useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]),
                z: 60
              }}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, -2, 2, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 -left-12 lg:-left-4 p-5 rounded-2xl bg-brand-card/90 backdrop-blur-xl border border-brand-teal/40 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
             >
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-brand-teal animate-ping absolute opacity-75"></div>
                    <div className="w-4 h-4 rounded-full bg-brand-teal relative border-2 border-white/20"></div>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Accuracy</span>
                    <span className="text-base font-bold text-white">99.9% Verified</span>
                  </div>
                </div>
             </motion.div>
           </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 cursor-pointer p-4 z-20"
        onClick={() => scrollToSection('features')}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-500 to-transparent mx-auto mb-3"></div>
        <span className="text-xs font-bold uppercase tracking-widest hover:text-brand-teal transition-colors">Scroll</span>
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay, color, onClick }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:border-brand-teal/30 transition-all duration-300 cursor-pointer h-full z-10"
    >
      <div className={`absolute top-0 right-0 p-32 bg-gradient-to-br ${color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity`}></div>
      
      <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 ${color.replace('from-', 'text-').split(' ')[0]}`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-xl font-bold font-display mb-3 group-hover:text-brand-teal transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed mb-6">
        {desc}
      </p>

      <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:text-brand-teal transition-colors">
        Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};

const FeaturesSection = ({ onFeatureClick }: { onFeatureClick: (f: any) => void }) => {
  const features = [
    {
      icon: Calculator,
      title: "Marks Calculator",
      desc: "Calculate your CGPA & SGPA instantly with 99.9% accuracy based on the latest university algorithms.",
      fullDesc: "Stop wrestling with complex formulas. Our Marks Calculator is tailored for engineering curriculums, handling split-credits, electives, and grace marks automatically. Just enter your raw scores, and let SemBuddy do the math.",
      details: ["Supports latest 2024 Grading Scheme", "Save calculations history", "Predict required marks for target CGPA"],
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      icon: CalendarCheck,
      title: "Smart Attendance",
      desc: "Track your attendance effortlessly. Get alerts when you're running low and need to attend classes.",
      fullDesc: "Never fall below the 75% threshold again. The Smart Attendance tracker visualizes your presence in every subject, predicting how many classes you can safely skip or must attend to stay safe.",
      details: ["Visual progress bars", "Low attendance alerts", "Holiday integration"],
      color: "from-teal-500 to-emerald-500",
      gradient: "from-teal-600 to-emerald-500"
    },
    {
      icon: BookOpen,
      title: "Syllabus Viewer",
      desc: "Access the latest MSBTE syllabus organized by semester and branch. Works perfectly offline.",
      fullDesc: "Carry your entire academic curriculum in your pocket. The Syllabus Viewer parses complex PDF structures into clean, readable mobile views. Mark topics as done as you study.",
      details: ["Offline access", "Topic completion tracking", "Branch-specific filters"],
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-600 to-pink-500"
    },
    {
      icon: Bot,
      title: "AI Study Buddy",
      desc: "Stuck on a concept? Ask our AI assistant for simplified explanations, code snippets, and study tips.",
      fullDesc: "Powered by advanced Gemini models, your AI Study Buddy understands engineering context. Ask for code fixes, theorem explanations, or exam preparation strategies instantly.",
      details: ["Code generation & debugging", "Concept simplification", "24/7 Availability"],
      color: "from-amber-500 to-orange-500",
      gradient: "from-amber-600 to-orange-500"
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Power-Packed <span className="text-gradient">Features</span></h2>
          <p className="text-slate-400 text-lg">Everything you need to excel in your engineering journey, all in one place.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard 
              key={idx} 
              {...feature} 
              delay={idx} 
              onClick={() => onFeatureClick(feature)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AIDemoSection = () => {
  type Msg = { role: 'bot' | 'user', text: string, cta?: { label: string, href: string } | null }

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text: 'Hi! I can help you calculate marks, explain topics, or find syllabus. Try asking me "How to calculate CGPA?"',
      cta: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Demo scope keywords — queries we can answer fully in-demo
  const allowedKeywords = [
    'cgpa', 'calculate', 'marks', 'syllabus', 'attendance', 'how to calculate', 'calculate cgpa',
    'how many classes', 'bunk', 'marksheet', 'exam'
  ];

  // A friendly install message (customize href to your APK or Play Store)
  const installCta = {
    label: 'Install SemBuddy to continue',
    href: '/download/sembuddy.apk' // <- replace with your actual download/playstore link
  };

  // Small polished helper to determine if question is inside demo scope
  const isInDemoScope = (text: string) => {
    const t = text.toLowerCase();
    return allowedKeywords.some(k => t.includes(k));
  };

  // Helpful quick suggestion chips
  const suggestions = [
    'How to calculate CGPA?',
    'Show my syllabus for CE sem 5',
    'How many classes I can bunk?',
    'What is the marks breakup?'
  ];

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault?.();
    const trimmed = input.trim();
    if (!trimmed) return;

    // push user message
    setMessages(prev => [...prev, { role: 'user', text: trimmed, cta: null }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response (demo)
    setTimeout(() => {
      let reply = "That's a great question! SemBuddy's full AI can explain that in detail.";
      let cta = null;

      if (isInDemoScope(trimmed)) {
        if (trimmed.toLowerCase().includes('cgpa') || trimmed.toLowerCase().includes('calculate')) {
          reply = "To calculate CGPA, enter your credits and grade points in the Marks tab. SemBuddy will compute the rest and give subject-wise marksheet.";
        } else if (trimmed.toLowerCase().includes('syllabus')) {
          reply = "Open the Syllabus tab, select your scheme and semester — you can view and download PDFs for offline use.";
        } else if (trimmed.toLowerCase().includes('attendance')) {
          reply = "Log classes conducted and classes attended per subject. SemBuddy shows current %, bunkable lectures, and required attendance to reach your target.";
        } else if (trimmed.toLowerCase().includes('marks')) {
          reply = "Enter internal, unit test, external and practical marks. Tap 'Calculate' to see subject totals and semester percentage in MSBTE-style marksheet.";
        } else {
          reply = "Nice! SemBuddy can show step-by-step answers inside the app. Try installing for full interactive help.";
          cta = installCta;
        }
      } else {
        // OUTSIDE demo-scope -> polite install CTA + persuasive copy
        reply = "SemBuddy's full AI assistant provides complete, personalized explanations, step-by-step solutions, and context-aware guidance. To proceed with detailed answers, please install our app.";
        cta = installCta;
      }

      setMessages(prev => [...prev, { role: 'bot', text: reply, cta }]);
      setIsTyping(false);
    }, 1200);
  };

  // small handler for suggestion chips
  const handleSuggestion = (text: string) => {
    setInput(text);
    // auto-send after a small delay for smoother UX
    setTimeout(() => handleSend(undefined), 250);
  };

  return (
    <section id="ai-demo" className="py-24 relative bg-brand-dark/50 border-t border-white/5">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-semibold mb-6 flex items-center gap-2">
            <Sparkles size={14} /> AI-Powered
          </div>
          <h2 className="text-4xl font-display font-bold mb-6">
            Meet Your Personal <br />
            <span className="text-gradient from-amber-500 to-orange-500">Study Assistant</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Experience the power of Gemini AI tailored for engineering. Ask questions, get code solutions, and clarify concepts instantly.
          </p>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-3 mb-6">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(s)}
                className="text-sm px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-4 text-sm text-slate-500">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500"></div> Online
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500"></div> Fast Response
             </div>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden max-w-md w-full mx-auto">
          {/* Header */}
          <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                <Bot size={20} />
             </div>
             <div>
                <h4 className="font-bold text-white text-sm">SemBuddy AI</h4>
                <span className="text-xs text-brand-green">Always active</span>
             </div>
          </div>

          {/* Chat Area */}
          <div className="h-80 bg-black/20 p-4 overflow-y-auto space-y-4" ref={scrollRef}>
             {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                   <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-br-none' : 'bg-white/10 text-slate-200 rounded-bl-none'}`}>
                      {msg.text}
                      {/* Render CTA button inline when message has cta */}
                      {msg.cta && (
                        <div className="mt-3">
                          <a
                            href={msg.cta.href}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-xs shadow"
                            // Download attribute if pointing to APK, optional:
                            // download
                          >
                            {msg.cta.label}
                          </a>
                          <div className="mt-2 text-xs text-slate-400">Install the app to unlock the full AI assistant and advanced features.</div>
                        </div>
                      )}
                   </div>
                </motion.div>
             ))}
             {isTyping && (
               <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex gap-1">
                     <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                     <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100"></span>
                     <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200"></span>
                  </div>
               </div>
             )}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { handleSend(e); }} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Ask anything..." 
               className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
             />
             <button type="submit" className="p-2 bg-amber-500 hover:bg-amber-600 rounded-xl text-white transition-colors">
                <Send size={18} />
             </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const DemoSection = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [
    { src: screenshots.dashboard, label: "Dashboard" },
    { src: screenshots.attendance, label: "Attendance" },
    { src: screenshots.marks, label: "Calculators" },
    { src: screenshots.ai, label: "AI Assistant" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="demo" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-brand-blue/5 -skew-y-6 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 lg:order-1 relative flex justify-center perspective-1000">
          <motion.div 
             initial={{ rotateY: -15, rotateX: 5 }}
             animate={{ rotateY: [-15, -5, -15], rotateX: [5, 0, 5] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden z-20 preserve-3d group"
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-800 rounded-b-xl z-30"></div>
             
             {/* Phone Screen Content Carousel */}
             <div className="w-full h-full bg-black relative">
               <AnimatePresence mode='wait'>
                 <motion.img 
                   key={activeScreen}
                   src={screens[activeScreen].src}
                   alt={screens[activeScreen].label}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.5 }}
                   className="w-full h-full object-cover"
                 />
               </AnimatePresence>
               
               {/* Overlay Text */}
               <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <motion.div 
                    key={activeScreen}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white font-bold text-center"
                  >
                    {screens[activeScreen].label}
                  </motion.div>
               </div>
             </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-brand-blue/20 to-brand-green/20 rounded-full blur-[60px] -z-10 animate-pulse"></div>
        </div>
        
        <div className="order-1 lg:order-2 space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-sm font-semibold mb-2">
            Interactive Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            Experience the <br />
            <span className="text-gradient">Smoothest UI</span> Ever
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
             We believe engineering tools shouldn't look like spreadsheets from the 90s. SemBuddy features a modern, fluid interface designed for the speed of student life.
          </p>
          
          <ul className="space-y-4 pt-4">
            {[
              "Dark mode by default for late-night study",
              "Gesture-based navigation",
              "Instant offline syncing",
              "Zero-clutter minimalist design"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="text-brand-green flex-shrink-0" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    { title: "Install App", desc: "Download the APK and install it on your Android device." },
    { title: "Select Branch", desc: "Choose your engineering branch and semester." },
    { title: "Automate", desc: "SemBuddy instantly syncs syllabus and calculates your stats." }
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
       <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It <span className="text-gradient">Works</span></h2>
             <p className="text-slate-400">Get started in seconds. No complex setup required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
             {/* Connecting Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-blue/50 to-brand-green/50 -z-10"></div>

             {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                   <div className="w-24 h-24 rounded-full glass flex items-center justify-center border border-white/10 mb-6 group-hover:border-brand-teal/50 group-hover:scale-110 transition-all duration-300 bg-[#020617] z-10">
                      <span className="text-3xl font-bold text-white group-hover:text-brand-teal transition-colors">{idx + 1}</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                   <p className="text-slate-400 text-sm max-w-xs">{step.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const ComparisonSection = () => {
  const features = [
    { name: "Attendance Tracker", sembuddy: true, others: false },
    { name: "GPA Calculator", sembuddy: true, others: false },
    { name: "AI Assistant", sembuddy: true, others: false },
    { name: "Offline Support", sembuddy: true, others: true },
    { name: "Notes Manager", sembuddy: true, others: false },
  ];

  return (
    <section id="comparison" className="py-24 relative container mx-auto px-6">
       <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Why Choose <span className="text-gradient">SemBuddy?</span></h2>
       </div>

       <div className="max-w-4xl mx-auto glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="grid grid-cols-3 bg-white/5 p-6 border-b border-white/10 font-display font-bold text-sm md:text-base">
             <div className="text-slate-400">Feature</div>
             <div className="text-center text-brand-teal">SemBuddy</div>
             <div className="text-center text-slate-500">Other Apps</div>
          </div>
          {features.map((item, idx) => (
             <div key={idx} className={`grid grid-cols-3 p-6 border-b border-white/5 items-center ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                <div className="font-medium text-slate-200">{item.name}</div>
                <div className="flex justify-center">
                   {item.sembuddy ? (
                      <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center">
                         <Check size={18} className="text-brand-teal" />
                      </div>
                   ) : <X size={18} className="text-slate-600" />}
                </div>
                <div className="flex justify-center">
                   {item.others ? (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                         <Check size={18} className="text-slate-400" />
                      </div>
                   ) : <X size={18} className="text-slate-600" />}
                </div>
             </div>
          ))}
       </div>
    </section>
  );
};

const RoadmapSection = () => {
  const steps = [
    { year: "2023", title: "The Spark", desc: "Concept validation & UI Prototyping.", status: "done", icon: Lightbulb },
    { year: "Q1 2024", title: "v1.0 Launch", desc: "Core Marks & Attendance features released.", status: "done", icon: Rocket },
    { year: "Now", title: "AI Integration", desc: "Gemini AI Study Assistant & Chatbot.", status: "current", icon: Zap },
    { year: "Q3 2025", title: "University Expansion", desc: "Support for SPPU & GTU curriculums.", status: "next", icon: Target },
    { year: "2026", title: "The Ecosystem", desc: "Web Portal, iOS App, and Notes Marketplace.", status: "future", icon: Globe }
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden">
       {/* Background line */}
       <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-brand-blue/30 to-transparent -translate-x-1/2"></div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our <span className="text-gradient">Journey</span></h2>
            <p className="text-slate-400">From a simple calculator to a complete academic ecosystem.</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
             {steps.map((step, idx) => (
                <div key={idx} className={`relative flex items-center mb-16 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                   
                   {/* Central Node */}
                   <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 z-10 flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
                      step.status === 'current' ? 'bg-brand-dark border-brand-teal shadow-[0_0_20px_#2dd4bf] scale-110' : 
                      step.status === 'done' ? 'bg-brand-dark border-brand-blue' : 'bg-brand-dark border-slate-700'
                   }`}>
                      {step.status === 'current' && <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></div>}
                   </div>
                   
                   {/* Spacer for Desktop alternating */}
                   <div className="hidden md:block w-1/2"></div>
                   
                   {/* Content Card */}
                   <div className={`pl-20 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <motion.div 
                        initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`p-6 rounded-2xl border relative group transition-all hover:-translate-y-1 ${
                            step.status === 'current' ? 'bg-brand-teal/5 border-brand-teal/30 shadow-[0_0_30px_-10px_rgba(45,212,191,0.2)]' : 
                            'bg-white/5 border-white/5 hover:border-white/10'
                        }`}
                      >
                         <div className="flex justify-between items-start mb-2">
                             <span className={`text-xs font-bold px-2 py-1 rounded-md inline-block mb-2 ${
                                step.status === 'current' ? 'bg-brand-teal/20 text-brand-teal' : 'bg-white/10 text-slate-400'
                             }`}>{step.year}</span>
                             <step.icon size={16} className={step.status === 'current' ? 'text-brand-teal' : 'text-slate-500'} />
                         </div>
                         <h3 className={`text-xl font-bold mb-2 ${step.status === 'current' ? 'text-white' : 'text-slate-200'}`}>{step.title}</h3>
                         <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const WhySection = () => {
  const faqs = [
    {
       q: "Is SemBuddy really free?",
       a: "Yes! SemBuddy is free for all engineering students. We believe education tools should be accessible. Some advanced AI features may have usage limits in the future, but core features are forever free."
    },
    {
       q: "Does it work without internet?",
       a: "Absolutely. We know college wifi can be spotty. Syllabus, timetable, and attendance tracking work 100% offline. You only need internet for AI chat and syncing data."
    },
    {
       q: "Is my data safe?",
       a: "Your academic data (marks, attendance) is stored locally on your device by default. We prioritize your privacy and do not sell student data to third parties."
    },
    {
       q: "Which universities are supported?",
       a: "Currently, we are optimized for Mumbai University and MSBTE curriculums. We are rapidly expanding to support Pune University (SPPU) and others soon."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="why" className="py-24 relative">
       <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
             <div className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-semibold mb-6">
                FAQ & Benefits
             </div>
             <h2 className="text-4xl font-display font-bold mb-6">
                Frequently Asked <br />
                <span className="text-gradient">Questions</span>
             </h2>
             <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Got questions? We've got answers. See why thousands of students trust SemBuddy as their daily driver for college success.
             </p>
          </div>

          <div className="space-y-4">
             {faqs.map((faq, idx) => (
                <div 
                   key={idx}
                   onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                   className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 border ${activeIndex === idx ? 'border-brand-teal/50 bg-brand-teal/5' : 'border-white/5 hover:border-white/10'}`}
                >
                   <div className="flex justify-between items-center gap-4">
                      <h3 className={`font-semibold text-lg ${activeIndex === idx ? 'text-brand-teal' : 'text-slate-200'}`}>
                         {faq.q}
                      </h3>
                      <ChevronDown size={20} className={`transition-transform duration-300 ${activeIndex === idx ? 'rotate-180 text-brand-teal' : 'text-slate-500'}`} />
                   </div>
                   <AnimatePresence>
                      {activeIndex === idx && (
                         <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                         >
                            <p className="pt-4 text-slate-400 leading-relaxed">
                               {faq.a}
                            </p>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const reviews = [
    { name: "Rohan D.", college: "COEP", text: "Finally an app that accurately calculates pointer for engineering! The UI is so much better than the official college site." },
    { name: "Sriya M.", college: "VJTI", text: "The attendance tracker saved me from a defaulter list. The 'bunk calculator' feature is a lifesaver honestly." },
    { name: "Amit K.", college: "SPIT", text: "I use the AI feature to understand complex concepts before exams. It explains things way better than my textbooks." },
    { name: "Neha S.", college: "MIT", text: "SemBuddy makes tracking my syllabus progress so satisfying. The offline support is a huge plus." },
    { name: "Vikram R.", college: "PICT", text: "Best engineering companion app. Simple, fast, and no ads. Highly recommended!" },
  ];

  // Duplicate for seamless loop
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section id="testimonials" className="py-24 bg-brand-dark border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
          Loved by <span className="text-brand-teal">Students</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none"></div>
        
        <motion.div 
          className="flex gap-8 w-max"
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {marqueeReviews.map((review, i) => (
            <div 
              key={i}
              className="glass p-8 rounded-3xl border border-white/10 relative w-[400px] flex-shrink-0"
            >
              <div className="text-brand-blue mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} className="inline-block mr-1 fill-brand-blue" />)}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center font-bold text-white">
                  {review.name[0]}
                </div>
                <div>
                  <div className="font-bold text-white">{review.name}</div>
                  <div className="text-xs text-slate-500 font-semibold">{review.college}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
const AboutDevSection = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/aditya_devx/", color: "hover:text-pink-500" },
    { icon: Github, href: "https://github.com/Aditya-verse", color: "hover:text-white" },
    { icon: XLogo, href: "https://x.com/Adity_5424Mane", color: "hover:text-white" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/adityamane-software-dev/", color: "hover:text-blue-500" }
  ];

  return (
    <section id="about-dev" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-16">Meet the <span className="text-gradient">Creator</span></h2>
        
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-green rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
           
           <div className="relative bg-[#0f172a] rounded-2xl p-8 max-w-md w-full border border-white/10 flex flex-col items-center">
             <div className="w-24 h-24 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 border-4 border-[#0f172a] shadow-xl mb-6 flex items-center justify-center">
                <span className="text-3xl">👨‍💻</span>
             </div>
             
             <h3 className="text-2xl font-bold font-display text-white">Aditya Mane</h3>
             <p className="text-brand-teal font-medium mb-4">Computer Engineering Student</p>
             
             <p className="text-slate-400 mb-6 text-sm leading-relaxed">
               "I built SemBuddy to solve the daily chaos of engineering life. What started as a personal tool is now helping thousands of students study smarter, not harder."
             </p>
             
             <div className="flex gap-4">
               {socialLinks.map((social, i) => (
                 <a 
                   key={i} 
                   href={social.href} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors ${social.color}`}
                 >
                   <social.icon size={20} />
                 </a>
               ))}
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ showToast }: { showToast: (msg: string, type?: 'success' | 'info' | 'loading' | 'error') => void }) => {
  const footerLinks = {
    "Product": ["Features", "Download", "Updates", "Beta Program"],
    "Company": ["About", "Careers", "Press Kit"],
    "Legal": ["Privacy Policy", "Terms of Service", "Cookie Policy"]
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/aditya_devx/" },
    { icon: XLogo, href: "https://x.com/Adity_5424Mane" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/adityamane-software-dev/" },
    { icon: Github, href: "https://github.com/Aditya-verse" }
  ];

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (link === "Features" || link === "Download") {
       const section = document.getElementById(link.toLowerCase());
       if (section) section.scrollIntoView({ behavior: 'smooth' });
    } else {
       showToast(`${link} page is coming soon!`, 'info');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Sending message...", 'loading');
    setTimeout(() => {
       showToast("Message sent! We'll reply shortly.", 'success');
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-[#020617] border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10">
         <div className="grid lg:grid-cols-12 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <SemBuddyLogo className="w-10 h-10" />
                <span className="font-display font-bold text-2xl text-white">SemBuddy</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Empowering the next generation of engineers with smart tools for smarter results. Built with ❤️ by students, for students.
              </p>
              <div className="flex gap-4 pt-2">
                {socialLinks.map((social, i) => (
                  <motion.a 
                    key={i} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-brand-blue transition-colors"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
               {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-bold text-white mb-6">{category}</h4>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link}>
                        <a 
                           href="#" 
                           onClick={(e) => handleLinkClick(e, link)}
                           className="text-slate-400 hover:text-brand-teal transition-colors text-sm"
                        >
                           {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/10">
               <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Mail size={18} className="text-brand-teal" /> Get in Touch
               </h4>
               <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                     <input 
                        type="email" 
                        placeholder="Your email address" 
                        required
                        className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                     />
                  </div>
                  <div>
                     <textarea 
                        placeholder="What's your query?" 
                        rows={3}
                        required
                        className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"
                     ></textarea>
                  </div>
                  <button 
                     type="submit"
                     className="w-full py-3 rounded-lg bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                     Send Message <Send size={16} />
                  </button>
               </form>
            </div>

         </div>

         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
           <p>© 2024 SemBuddy. All rights reserved.</p>
           <div className="flex gap-6">
             <a href="#" onClick={(e) => handleLinkClick(e, 'Privacy')} className="hover:text-white transition-colors">Privacy</a>
             <a href="#" onClick={(e) => handleLinkClick(e, 'Terms')} className="hover:text-white transition-colors">Terms</a>
             <a href="#" onClick={(e) => handleLinkClick(e, 'Sitemap')} className="hover:text-white transition-colors">Sitemap</a>
           </div>
         </div>
       </div>
    </footer>
  );
};


// --- Main App Component ---

const App = () => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    type: 'success' | 'loading' | 'info' | 'error';
    message: string;
    progress: number;
  }>({ isVisible: false, type: 'success', message: '', progress: 0 });

  const showToast = (message: string, type: 'success' | 'loading' | 'info' | 'error' = 'success') => {
      setToast({ isVisible: true, type, message, progress: 0 });
      if (type !== 'loading') {
         setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 4000);
      }
  };

  useEffect(() => {
    // Check if Firebase Config is missing on mount
    if (!isFirebaseConfigured) {
      setTimeout(() => {
        showToast("Dev Mode: Add Firebase Config in index.tsx", 'error');
      }, 1000);
    }
  }, []);

  const handleDownload = () => {
    // Start Loading
    setToast({ isVisible: true, type: 'loading', message: 'Starting download...', progress: 0 });
    
    // Simulate Progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setToast(prev => ({ ...prev, progress }));
      
      if (progress >= 100) {
        clearInterval(interval);
        // Show Success
        showToast('SemBuddy APK downloaded successfully!', 'success');
      }
    }, 200);
  };

  const handleAuth = (mode: 'login' | 'signup' | 'google') => {
    
    if (mode === 'google') {
      // Logic: If Firebase is not configured, fallback to DEMO MODE
      if (!auth) {
         setIsAuthOpen(false);
         showToast("Opening Demo Login (Firebase Missing)...", 'loading');
         setTimeout(() => {
           showToast("Demo Login Successful!", 'success');
         }, 1500);
         return;
      }
      
      // 🚨 UNCOMMENT BELOW TO ENABLE GOOGLE SIGN IN
      /*
      const provider = new GoogleAuthProvider();
      setIsAuthOpen(false);
      showToast("Opening Google Sign-In...", 'loading');
      
      signInWithPopup(auth, provider)
      .then((result: any) => {
         const user = result.user;
         showToast(`Welcome back, ${user.displayName}!`, 'success');
         console.log("Logged in user:", user);
      })
      .catch((error: any) => {
         console.error("Login Failed:", error);
         showToast(`Login failed: ${error.message}`, 'error');
         setIsAuthOpen(true); // Re-open modal on error
      });
      */

    } else if (mode === 'signup') {
      setIsAuthOpen(false);
      showToast("Creating account...", 'loading');
      setTimeout(() => {
        showToast("Account created! Welcome to SemBuddy.", 'success');
      }, 1500);
    } else {
      setIsAuthOpen(false);
      showToast("Signing in...", 'loading');
      setTimeout(() => {
        showToast("Welcome back, Student!", 'success');
      }, 1500);
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white overflow-hidden selection:bg-brand-teal selection:text-brand-dark">
      <Navbar onLoginClick={() => setIsAuthOpen(true)} />
      
      <main>
        <HeroSection onDownloadClick={handleDownload} />
        <FeaturesSection onFeatureClick={setSelectedFeature} />
        <DemoSection />
        <AIDemoSection />
        <HowItWorksSection />
        <ComparisonSection />
        <RoadmapSection />
        <WhySection />
        <TestimonialsSection />
        
        <div className="flex justify-center py-20 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl rounded-[3rem] bg-gradient-to-r from-brand-blue to-brand-teal p-[1px]"
          >
            <div className="bg-[#0f172a] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/20 blur-[100px] group-hover:bg-brand-teal/20 transition-colors duration-1000"></div>

               <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 relative z-10">Ready to get <br /> Smarter?</h2>
               <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto relative z-10">Download SemBuddy today and join the community of high-achieving engineering students.</p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                 <button 
                   onClick={handleDownload}
                   className="px-10 py-5 rounded-full bg-white text-brand-dark font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-xl flex items-center justify-center gap-2"
                 >
                   Download Now <Download size={20} />
                 </button>
                 <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mt-4 sm:mt-0">
                    <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center overflow-hidden">
                       <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://sembuddy.app" 
                          alt="Scan to Download"
                          className="w-full h-full object-contain"
                       />
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
        <AboutDevSection />
      </main>

      <Footer showToast={showToast} />
      
      <ScrollToTop />
      <Mascot />
      
      <FeatureModal 
        feature={selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuth={handleAuth}
      />
      
      <Toast 
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        progress={toast.progress}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
      
  
    </div>
  );
};

// --- Render ---

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
