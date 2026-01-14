import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue } from 'framer-motion';
import { 
  Calculator, CalendarCheck, BookOpen, Bot, Download, GitBranch, CheckCircle2, 
  Github, Linkedin, Menu, X, Smartphone, GraduationCap, ArrowRight, ArrowUp, 
  WifiOff, Clock, ShieldCheck, ChevronLeft, ChevronRight, Mail, Instagram, Globe, 
  Loader2, FileText, Zap, Star, Users, TrendingUp, HelpCircle, Plus, Minus, Send, 
  MapPin, User, Lock, Eye, EyeOff, LogIn, LogOut, UserPlus, AlertTriangle, 
  XCircle, Check, ChevronDown, Sparkles, MessageSquare, Rocket, Lightbulb, Target, Play,
  Sun,
  Moon
} from 'lucide-react';

// --- GLOBAL DECLARATIONS ---
declare global {
  interface Window {
    google: any;
  }
}

// --- CONFIGURATION ---
const GOOGLE_CLIENT_ID = "121288006584-v29pm1j12deu29bpr2pfv6179tf7vn37.apps.googleusercontent.com";

const screenshots = {
  dashboard: "dashboard.png", 
  attendance: "attendance.png",
  marks: "marks.png",
  ai: "ai.png"
};

// --- HELPER FUNCTIONS ---
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

// --- ASSETS ---
const XLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
);

const SemBuddyLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="50%" stopColor="#2dd4bf" /><stop offset="100%" stopColor="#4ade80" /></linearGradient></defs>
    <motion.path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 Z" stroke="url(#logoGradient)" strokeWidth="6" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
    <motion.path d="M30 45 L50 35 L70 45 L50 55 L30 45 Z M70 45 V60 C70 60 60 65 50 65 M35 65 H65" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
  </svg>
);

const StoreButtons = () => (
  <div className="flex flex-wrap gap-4">
    <button className="flex items-center gap-3 px-5 py-2.5 bg-black border border-white/20 rounded-xl hover:bg-white/10 transition-colors text-left group">
      <div className="w-8 h-8 flex-shrink-0"><img src="/sembuddy/images/google-play.png" alt="Google Play" className="w-full h-full object-contain"/></div>
      <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none mb-1">Get it on</span><span className="text-sm font-bold text-white leading-none font-display">Google Play</span></div>
    </button>
    <button className="flex items-center gap-3 px-5 py-2.5 bg-black border border-white/20 rounded-xl hover:bg-white/10 transition-colors text-left group">
      <div className="w-8 h-8 flex-shrink-0"><img src="/sembuddy/images/apple.png"alt="App Store" className="w-full h-full object-contain"/></div>
      <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none mb-1">Download on the</span><span className="text-sm font-bold text-white leading-none font-display">App Store</span></div>
    </button>
  </div>
);

// --- LEGAL PAGE COMPONENTS (Internal) ---
const TermsPage = () => {
  // Reusable Section Component for cleaner code
  const TermSection = ({ number, title, children }: { number: string, title: string, children: React.ReactNode }) => (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-teal/30 transition-colors">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blue text-sm font-bold border border-brand-blue/30">
          {number}
        </span>
        {title}
      </h2>
      <div className="text-slate-400 leading-relaxed space-y-3 pl-11">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 mb-6">
            <ShieldCheck size={14} className="text-brand-teal" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Legally Binding Agreement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">Service</span>
          </h1>
          <p className="text-slate-400 text-lg">Last updated: December 18, 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          
          <TermSection number="1" title="Acceptance of Terms">
            <p>
              By downloading, installing, or using the SemBuddy mobile application ("App") or accessing our services, 
              you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the App.
            </p>
          </TermSection>

          <TermSection number="2" title="Educational Aid Disclaimer">
            <p>
              <strong>SemBuddy is a utility tool, not an official university platform.</strong>
            </p>
            <p>
              The data provided by our Marks Calculator, Attendance Tracker, and Syllabus Viewer is for informational purposes only. 
              While we use the latest algorithms (e.g., 2024 Grading Scheme), we cannot guarantee 100% alignment with your university's official records due to potential edge cases, rounding differences, or policy changes.
            </p>
            <p className="text-amber-400/90 text-sm italic border-l-2 border-amber-500/50 pl-3 mt-2">
              Always verify your official results, hall ticket eligibility, and syllabus details with your college administration. SemBuddy is not liable for any academic loss resulting from reliance on our calculations.
            </p>
          </TermSection>

          <TermSection number="3" title="AI Assistant & Academic Integrity">
            <p>
              Our "AI Study Buddy" feature utilizes Google Gemini technology. By using this feature, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Use the AI for <strong>learning and conceptual understanding</strong> only.</li>
              <li>NOT use the AI to generate answers for exams, assignments, or plagiarism.</li>
              <li>Acknowledge that AI can "hallucinate" (generate incorrect facts). Always cross-check code snippets and theorems with standard textbooks.</li>
            </ul>
          </TermSection>

          <TermSection number="4" title="Attendance & 'Bunking' Risks">
            <p>
              The "Smart Attendance" and "Bunk Calculator" features are designed to help you manage your time effectively. 
              However, <strong>you are solely responsible</strong> for meeting your institution's minimum attendance criteria (e.g., 75%).
            </p>
            <p>
              SemBuddy is not responsible for detention, debarment from exams, or academic penalties incurred due to attendance shortages, even if the App indicated you were in the "Safe Zone."
            </p>
          </TermSection>

          <TermSection number="5" title="User Accounts & Security">
            <p>
              You are responsible for maintaining the confidentiality of your Google Login credentials. 
              SemBuddy does not store your passwords. Access to the app is facilitated via secure OAuth tokens provided by Google.
            </p>
            <p>
              You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </TermSection>

          <TermSection number="6" title="Data Privacy & Local Storage">
            <p>
              We prioritize your privacy. The majority of your academic data (marks entered, attendance logs, notes) is stored 
              <strong> locally on your device</strong>. 
            </p>
            <p>
              If you uninstall the app or clear app data without backing up (if cloud sync is not enabled), your manual entries may be permanently lost. 
              We are not liable for data loss due to device failure or uninstallation.
            </p>
          </TermSection>

          <TermSection number="7" title="Modifications to Service">
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the App (including free features moving to paid tiers) 
              at any time without prior notice. We are not liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
          </TermSection>

          <TermSection number="8" title="Limitation of Liability">
            <p>
              To the maximum extent permitted by law, SemBuddy and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of data, academic standing, or other intangible losses, resulting from your use of the App.
            </p>
          </TermSection>

          {/* Contact Footer in Terms */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-slate-400 mb-4">Have questions about these terms?</p>
            <a 
              href="mailto:mane.adityax@gmail.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-blue-600 rounded-xl font-bold transition-colors"
            >
              <Mail size={18} /> Contact Legal Support
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

const PrivacyPage = () => {
  // Reusable Section Component for consistent styling
  const PrivacySection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-teal/30 transition-colors">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-brand-blue/20 text-brand-blue">
          <Icon size={20} />
        </div>
        {title}
      </h2>
      <div className="text-slate-400 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 mb-6">
            <Lock size={14} className="text-brand-green" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">Your Data is Yours</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-green">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            At SemBuddy, we believe your academic data is personal. Here is exactly what we collect, where it is stored, and how our AI features work.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          
          <PrivacySection icon={User} title="1. Information We Collect">
            <p>
              We collect minimal personal information to provide you with a seamless experience:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>Account Info:</strong> When you sign in via Google, we receive your Name, Email Address, and Profile Picture to create your user profile.</li>
              <li><strong>Academic Inputs:</strong> Data you manually enter, such as Subject Names, Marks obtained, Total Marks, and Credits.</li>
              <li><strong>Attendance Logs:</strong> Data regarding classes conducted, attended, or missed.</li>
            </ul>
          </PrivacySection>

          <PrivacySection icon={ShieldCheck} title="2. Local Storage & Data Security">
            <p>
              <strong>We prioritize a "Local-First" approach.</strong>
            </p>
            <p>
              Your sensitive academic data (Marks, Grades, Attendance Logs) is stored locally on your device using encrypted storage. This means:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2 text-slate-300">
              <li>We do not sell your academic data to third-party advertisers.</li>
              <li>If you sign out or clear app data without cloud sync enabled, this local data may be lost.</li>
              <li>Authentication tokens provided by Google are stored securely to maintain your session.</li>
            </ul>
          </PrivacySection>

          <PrivacySection icon={Bot} title="3. AI Features & Gemini API">
            <p>
              SemBuddy uses Google's Gemini AI to power the "Study Assistant" feature. By using the AI chat:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>Data Transmission:</strong> The text queries you type are sent to Google's servers to generate a response.</li>
              <li><strong>No Personal Data:</strong> We do not automatically send your personal details (Name, Email) or Academic Records to the AI unless you explicitly paste them into the chat.</li>
              <li><strong>Usage:</strong> Please avoid sharing sensitive personally identifiable information (PII) or passwords in your AI conversations.</li>
            </ul>
          </PrivacySection>

          <PrivacySection icon={Globe} title="4. Third-Party Services">
            <p>We use trusted third-party services to keep the app running:</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-bold text-white mb-1">Google Firebase</h4>
                <p className="text-sm">Used for secure User Authentication and optional cloud data syncing.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-bold text-white mb-1">Google Gemini API</h4>
                <p className="text-sm">Used to generate responses for the AI Study Buddy.</p>
              </div>
            </div>
          </PrivacySection>

          <PrivacySection icon={FileText} title="5. Your Rights">
            <p>You have full control over your data:</p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>Access:</strong> You can view all your stored marks and attendance within the app dashboard.</li>
              <li><strong>Deletion:</strong> You can delete your account at any time. Deleting the app will remove locally stored data. To delete cloud data, use the "Delete Account" option in settings.</li>
            </ul>
          </PrivacySection>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-slate-400 mb-4">Questions about your privacy?</p>
            <a 
              href="mailto:mane.adityax@gmail.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-colors"
            >
              <Mail size={18} /> Contact Privacy Officer
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

const CookiesPage = () => {
  // Reusable Section for consistent styling
  const CookieSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-teal/30 transition-colors">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
          <Icon size={20} />
        </div>
        {title}
      </h2>
      <div className="text-slate-400 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Zap size={14} className="text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Transparency First</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We believe in keeping things light—both our app size and our cookie usage. Here is how SemBuddy uses cookies and local storage.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          
          <CookieSection icon={HelpCircle} title="1. What are Cookies?">
            <p>
              Cookies are small text files stored on your device when you use an app or visit a website. They act like a memory for the app, allowing it to recognize you when you come back.
            </p>
            <p>
              In modern apps like SemBuddy, we also use "Local Storage," which works similarly but is more secure and stays on your device.
            </p>
          </CookieSection>

          <CookieSection icon={ShieldCheck} title="2. Strictly Essential Cookies">
            <p>
              These are necessary for the app to function. Without them, you cannot log in.
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2">
              <li><strong>Authentication (Firebase):</strong> When you sign in with Google, we store a secure "token" to keep you logged in. This prevents you from having to enter your password every time you open the app.</li>
              <li><strong>Security:</strong> These cookies help us detect unauthorized access and protect your account.</li>
            </ul>
          </CookieSection>

          <CookieSection icon={User} title="3. Preference & Functionality">
            <p>
              These cookies remember the choices you make to give you a personalized experience.
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2 text-slate-300">
              <li><strong>User Settings:</strong> Remembering your selected Branch (Computer Engineering) and Semester.</li>
              <li><strong>Theme Preferences:</strong> Storing whether you prefer Dark Mode or Light Mode.</li>
              <li><strong>Calculator History:</strong> Temporarily saving your last calculated SGPA so you don't have to re-enter marks immediately.</li>
            </ul>
          </CookieSection>

          <CookieSection icon={EyeOff} title="4. No Tracking or Ads">
            <p>
              <strong>We respect your attention span.</strong>
            </p>
            <p>
              SemBuddy is an educational tool. We do <strong>NOT</strong> use:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-2 mt-2 text-red-400/80">
              <li>Third-party advertising cookies.</li>
              <li>Tracking pixels to follow your activity across other websites.</li>
              <li>Data mining cookies to sell your information.</li>
            </ul>
          </CookieSection>

          <CookieSection icon={CheckCircle2} title="5. Managing Your Cookies">
            <p>
              Since SemBuddy relies on Local Storage for its core features (like offline syllabus viewing), clearing your app data or cache will remove these stored items.
            </p>
            <p>
              <strong>Note:</strong> If you clear your storage, you will be logged out, and any unsynced attendance data may be lost.
            </p>
          </CookieSection>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-slate-400 mb-4">Still confused about cookies?</p>
            <a 
              href="mailto:mane.adityax@gmail.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-colors"
            >
              <Mail size={18} /> Ask Developer
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
// --- SHARED COMPONENTS ---
const Toast = ({ message, type = 'success', isVisible, onClose, progress }: any) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed bottom-10 right-6 md:right-10 z-[100] bg-white text-brand-dark px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-brand-teal/20 min-w-[300px] max-w-sm">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${type === 'loading' ? 'bg-blue-100' : type === 'info' ? 'bg-amber-100' : type === 'error' ? 'bg-red-100' : 'bg-brand-green'}`}>
          {type === 'loading' ? <Loader2 size={20} className="text-brand-blue animate-spin" /> : type === 'info' ? <Zap size={20} className="text-amber-600" /> : type === 'error' ? <AlertTriangle size={20} className="text-red-600" /> : <CheckCircle2 size={20} className="text-brand-dark" />}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm mb-0.5">{type === 'loading' ? 'Processing...' : type === 'info' ? 'Note' : type === 'error' ? 'Setup Required' : 'Success'}</h4>
          <p className="text-xs text-slate-600 font-medium">{message}</p>
          {type === 'loading' && progress !== undefined && (<div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden"><motion.div className="h-full bg-brand-blue" initial={{ width: 0 }} animate={{ width: `${progress}%` }} /></div>)}
        </div>
        <button onClick={onClose} className="ml-2 text-slate-400 hover:text-brand-dark self-start mt-1"><X size={16} /></button>
      </motion.div>
    )}
  </AnimatePresence>
);

const Mascot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  useEffect(() => { const interval = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 200); }, 4000); return () => clearInterval(interval); }, []);
  return (
    <motion.div className="fixed bottom-8 right-8 z-[80] hidden md:block cursor-pointer group" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2, duration: 1 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}>
      <motion.div animate={{ y: [0, -10, 0], rotate: isHovered ? [0, 5, -5, 0] : 0 }} transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 0.5 } }} className="relative w-20 h-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-teal rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/20 backdrop-blur-md overflow-hidden"><div className="absolute top-3 left-2 right-2 bottom-3 bg-[#0f172a] rounded-xl flex flex-col items-center justify-center border border-white/10"><div className="flex gap-2"><motion.div animate={{ scaleY: blink ? 0.1 : 1 }} className="w-3 h-3 bg-brand-green rounded-full shadow-[0_0_10px_#4ade80]" /><motion.div animate={{ scaleY: blink ? 0.1 : 1 }} className="w-3 h-3 bg-brand-green rounded-full shadow-[0_0_10px_#4ade80]" /></div><motion.div animate={{ width: isHovered ? 16 : 8, height: isHovered ? 6 : 2 }} className="mt-2 h-0.5 bg-brand-teal rounded-full" /></div></div>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-slate-400" /><div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
        <motion.div className="absolute top-10 -right-2 w-3 h-8 bg-brand-blue rounded-full origin-top" animate={{ rotate: isHovered ? [0, -45, 0, -45, 0] : 0 }} transition={{ duration: 1 }} /><motion.div className="absolute top-10 -left-2 w-3 h-8 bg-brand-blue rounded-full" />
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
    </motion.div>
  );
};

const FeatureModal = ({ feature, onClose }: { feature: any, onClose: () => void }) => {

  if (!feature) return null;

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}

        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"

        onClick={onClose}

      >

        <motion.div

          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}

          onClick={(e) => e.stopPropagation()}

          className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"

        >

          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"><X className="text-slate-400" /></button>

          <div className={`h-32 bg-gradient-to-r ${feature.gradient} flex items-center justify-center relative overflow-hidden`}>

             <div className="absolute inset-0 bg-black/20" />

            <feature.icon size={64} className="text-white drop-shadow-lg relative z-10" />

          </div>

          <div className="p-8">

            <h3 className="text-2xl font-bold font-display mb-4">{feature.title}</h3>

            <p className="text-slate-300 mb-6 leading-relaxed">{feature.fullDesc || feature.desc}</p>

            <ul className="space-y-3 mb-8">

              {feature.details.map((detail: string, i: number) => (

                <li key={i} className="flex items-center gap-3 text-sm text-slate-400">

                   <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0"><CheckCircle2 size={12} className="text-brand-teal" /></div>

                   {detail}

                </li>

              ))}

            </ul>

            <button onClick={onClose} className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-semibold transition-colors">Got it</button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

};


const AuthModal = ({ isOpen, onClose, onAuth }: { isOpen: boolean, onClose: () => void, onAuth: (data: any) => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Google Init (Unchanged from your code)
  useEffect(() => {
    if (!isOpen) return;
    const initializeGoogleButton = () => {
      if (!window.google || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({ 
        client_id: GOOGLE_CLIENT_ID, 
        callback: (response: any) => { 
            // Decode Google Token here to get name immediately
            const decoded = decodeJwt(response.credential);
            if(decoded) {
                onAuth({ ...decoded, method: 'google' }); 
            }
        } 
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, { theme: "outline", size: "large", text: "continue_with", shape: "pill", width: "320", logo_alignment: "left" });
    };
    if (window.google) { initializeGoogleButton(); } else { const script = document.createElement("script"); script.src = "https://accounts.google.com/gsi/client"; script.async = true; script.defer = true; script.onload = initializeGoogleButton; document.body.appendChild(script); }
  }, [isOpen, onAuth]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    setError("");

    // 1. Validation: Password Length
    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    // 2. Name Logic: If name is empty, extract from email
    let finalName = name;
    if (!finalName || finalName.trim() === "") {
        // Example: aditya.mane@gmail.com -> Aditya Mane
        const namePart = email.split('@')[0];
        // Remove numbers and special chars for a cleaner name
        finalName = namePart.replace(/[0-9._]/g, " "); 
        // Capitalize first letters
        finalName = finalName.replace(/\b\w/g, l => l.toUpperCase());
    }

    // 3. Pass data back to App
    onAuth({ 
        name: finalName, 
        email: email, 
        password: password, 
        method: isSignUp ? 'signup' : 'login' 
    }); 
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-[#0f172a] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative p-8">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"><X className="text-slate-400" /></button>
          
          <div className="text-center mb-6">
             <div className="inline-block p-4 rounded-2xl bg-brand-blue/10 mb-4">{isSignUp ? <UserPlus size={32} className="text-brand-blue" /> : <LogIn size={32} className="text-brand-blue" />}</div>
             <h3 className="text-2xl font-bold font-display text-white">{isSignUp ? "Create Account" : "Welcome Back"}</h3>
             <p className="text-slate-400 text-sm mt-2">{isSignUp ? "Join SemBuddy to boost your grades." : "Log in to sync your attendance and marks."}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full flex justify-center mb-4 min-h-[44px]"><div ref={googleButtonRef}></div></div>
            <div className="flex items-center gap-4 py-2"><div className="h-[1px] bg-white/10 flex-1"></div><span className="text-xs text-slate-500 font-medium">OR</span><div className="h-[1px] bg-white/10 flex-1"></div></div>
            
            {/* Name Input - Always visible as requested */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                    Full Name 
                    {!isSignUp && <span className="text-brand-teal/80 normal-case font-normal text-[10px]">(Optional - we'll auto-fill from email)</span>}
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aditya Mane" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-blue transition-colors" 
                        required={isSignUp} // Only required on sign up, optional on login (auto-fill logic)
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="•••••••• (Min 6 chars)" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-brand-blue transition-colors" 
                        required 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
                {error && <p className="text-red-400 text-xs font-medium flex items-center gap-1"><AlertTriangle size={12}/> {error}</p>}
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-teal font-bold text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4">
                {isSignUp ? "Create Account" : "Sign In & Dashboard"}
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
  useEffect(() => { const toggleVisibility = () => { if (window.scrollY > 500) setIsVisible(true); else setIsVisible(false); }; window.addEventListener("scroll", toggleVisibility); return () => window.removeEventListener("scroll", toggleVisibility); }, []);
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };
  return ( <AnimatePresence>{isVisible && (<motion.button initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop} className="fixed bottom-8 left-8 z-[90] p-4 rounded-full bg-brand-blue/10 hover:bg-brand-blue border border-brand-blue/30 text-brand-blue hover:text-white backdrop-blur-md shadow-lg transition-colors duration-300 group" aria-label="Scroll to top"><ArrowUp size={24} className="group-hover:animate-pulse" /></motion.button>)}</AnimatePresence> );
};

// --- SECTIONS ---

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
        <motion.div style={{ y: y1, x: xBack }} className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[100px] animate-blob mix-blend-screen" />
        <motion.div style={{ y: y2, x: useTransform(xBack, v => -v) }} className="absolute bottom-[0%] right-[-10%] w-[700px] h-[700px] bg-brand-teal/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
        <motion.div style={{ x: useTransform(xBack, v => v * 0.5), y: useTransform(yBack, v => v * 0.5) }} className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[80px] animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
        <div className="space-y-10 text-center lg:text-left relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            SemBuddy streamlines your academic life. Calculate marks, track attendance, view syllabus, and get AI study help—all in one beautiful app.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col items-center lg:items-start pt-2">
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start w-full">
              <button onClick={onDownloadClick} className="group relative px-10 py-5 bg-brand-blue rounded-full font-bold text-lg text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] overflow-hidden transition-all active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center justify-center gap-3">
                  Download APK <Download size={24} />
                </span>
              </button>
              <button onClick={() => scrollToSection('features')} className="px-10 py-5 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                Explore Features <ChevronRight size={20} />
              </button>
            </div>
            
            {/* NEW: Added Updates and Beta Program Links */}
            <div className="flex items-center gap-6 mt-6 pl-2 text-sm text-slate-400 font-medium">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-teal"></div>
                    View Updates
                </button>
                <button className="flex items-center gap-2 hover:text-white transition-colors group">
                    <Sparkles size={14} className="text-amber-500 group-hover:animate-pulse"/>
                    Join Beta Program
                </button>
            </div>
          </motion.div>
        </div>

        {/* ... Rest of Hero Phone Animation (kept the same) ... */}
        <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center hidden md:flex perspective-1000 -ml-10 lg:-ml-20">
           <motion.div style={{ rotateX, rotateY, z: 100 }} className="relative z-20 preserve-3d w-full h-full flex items-center justify-center">
            <motion.div animate={{ y: [0, -12, 0], scale: [1, 1.015, 1] }} transition={{ y: { duration: 8, ease: [0.22, 0.8, 0.2, 1], repeat: Infinity, repeatType: "loop" }, scale: { duration: 6.5, ease: [0.22, 0.8, 0.2, 1], repeat: Infinity, repeatType: "loop", repeatDelay: 0.2 } }} style={{ willChange: "transform" }} className="relative w-[14rem] h-[30rem] lg:w-[16rem] lg:h-[34rem] rounded-[2.2rem] bg-[#0f172a] border-[5px] border-slate-800 shadow-[0_15px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl flex items-center justify-center group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-xl z-30"></div>
              <div className="absolute inset-0 p-2">
                <div className="w-full h-full bg-[#1e293b]/90 rounded-[1.7rem] overflow-hidden border border-white/10 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-green/20 opacity-60"></div>
                  <div className="absolute -top-[150%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/20 to-transparent rotate-45 pointer-events-none group-hover:top-[100%] transition-all duration-1000"></div>
                  <SemBuddyLogo className="w-28 h-28 drop-shadow-[0_0_40px_rgba(45,212,191,0.6)] z-10" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full"></div>
            </motion.div>
             <FloatingElement delay={0} xOffset={-180} yOffset={-120} icon={Calculator} color="text-brand-blue" mouseFactor={1.8} mouseX={smoothMouseX} mouseY={smoothMouseY} />
             <FloatingElement delay={1.5} xOffset={200} yOffset={90} icon={Bot} color="text-brand-green" mouseFactor={2.5} mouseX={smoothMouseX} mouseY={smoothMouseY} />
             <FloatingElement delay={0.8} xOffset={180} yOffset={-160} icon={GraduationCap} color="text-brand-teal" mouseFactor={1.5} mouseX={smoothMouseX} mouseY={smoothMouseY} />
             <FloatingElement delay={2.2} xOffset={-160} yOffset={150} icon={CalendarCheck} color="text-purple-400" mouseFactor={2.0} mouseX={smoothMouseX} mouseY={smoothMouseY} />
             <motion.div style={{ x: useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]), y: useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]), z: 60 }} animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 -left-12 lg:-left-4 p-5 rounded-2xl bg-brand-card/90 backdrop-blur-xl border border-brand-teal/40 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
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
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 2, duration: 2, repeat: Infinity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 cursor-pointer p-4 z-20" onClick={() => scrollToSection('features')}>
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
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: delay * 0.1 }} whileHover={{ y: -10 }} onClick={onClick} className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:border-brand-teal/30 transition-all duration-300 cursor-pointer h-full z-10">
      <div className={`absolute top-0 right-0 p-32 bg-gradient-to-br ${color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity`}></div>
      <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 ${color.replace('from-', 'text-').split(' ')[0]}`}><Icon size={28} /></div>
      <h3 className="text-xl font-bold font-display mb-3 group-hover:text-brand-teal transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:text-brand-teal transition-colors">Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></div>
    </motion.div>
  );
};

const FeaturesSection = ({ onFeatureClick }: { onFeatureClick: (f: any) => void }) => {
  const features = [
    { icon: Calculator, title: "Marks Calculator", desc: "Calculate your CGPA & SGPA instantly with 99.9% accuracy based on the latest university algorithms.", fullDesc: "Stop wrestling with complex formulas. Our Marks Calculator is tailored for engineering curriculums.", details: ["Supports latest 2024 Grading Scheme", "Save calculations history", "Predict required marks for target CGPA"], color: "from-blue-500 to-cyan-500", gradient: "from-blue-600 to-cyan-500" },
    { icon: CalendarCheck, title: "Smart Attendance", desc: "Track your attendance effortlessly. Get alerts when you're running low and need to attend classes.", fullDesc: "Never fall below the 75% threshold again. The Smart Attendance tracker visualizes your presence in every subject.", details: ["Visual progress bars", "Low attendance alerts", "Holiday integration"], color: "from-teal-500 to-emerald-500", gradient: "from-teal-600 to-emerald-500" },
    { icon: BookOpen, title: "Syllabus Viewer", desc: "Access the latest MSBTE syllabus organized by semester and branch. Works perfectly offline.", fullDesc: "Carry your entire academic curriculum in your pocket. The Syllabus Viewer parses complex PDF structures.", details: ["Offline access", "Topic completion tracking", "Branch-specific filters"], color: "from-purple-500 to-pink-500", gradient: "from-purple-600 to-pink-500" },
    { icon: Bot, title: "AI Study Buddy", desc: "Stuck on a concept? Ask our AI assistant for simplified explanations, code snippets, and study tips.", fullDesc: "Powered by advanced Gemini models, your AI Study Buddy understands engineering context.", details: ["Code generation & debugging", "Concept simplification", "24/7 Availability"], color: "from-amber-500 to-orange-500", gradient: "from-amber-600 to-orange-500" }
  ];
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20"><h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Power-Packed <span className="text-gradient">Features</span></h2><p className="text-slate-400 text-lg">Everything you need to excel in your engineering journey, all in one place.</p></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{features.map((feature, idx) => (<FeatureCard key={idx} {...feature} delay={idx} onClick={() => onFeatureClick(feature)} />))}</div>
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
  href: '/sembuddy/SemBuddy.apk'
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



  const publicBase =

    typeof process !== "undefined" && process.env && process.env.PUBLIC_URL

      ? process.env.PUBLIC_URL

      : "";



  const screens = [
    { src: "./images/dashboard.jpg", label: "Dashboard" },
    { src: "./images/attendance.jpg", label: "Attendance" },
    { src: "./images/marks.jpg", label: "Calculators" },
    { src: "./images/ai.jpg", label: "AI Assistant" }
];

  useEffect(() => {

    const interval = setInterval(() => {

      setActiveScreen((prev) => (prev + 1) % screens.length);

    }, 4000);

    return () => clearInterval(interval);

  }, []);



  const imgAnim = {

    initial: { opacity: 0, scale: 1.04 },

    animate: { opacity: 1, scale: 1 },

    exit: { opacity: 0, scale: 0.98 }

  };



  return (

    <section id="demo" className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">

      <div className="absolute inset-y-0 left-0 w-full h-[450px] md:h-[550px] bg-brand-blue/5 -skew-y-6 pointer-events-none -z-10"></div>



      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

        <motion.div

          className="order-2 lg:order-1 relative flex justify-center overflow-visible"

          initial={{ opacity: 0, x: -25 }}

          whileInView={{ opacity: 1, x: 0 }}

          transition={{ duration: 0.7 }}

          viewport={{ once: true }}

          style={{ willChange: "transform" }}

        >

          <div className="relative" style={{ perspective: "1000px" }}>

            <motion.div

              initial={{ rotateY: -12, rotateX: 4, translateZ: 0 }}

              animate={{ rotateY: [-12, -4, -12], rotateX: [4, 0, 4] }}

              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}

              // CHANGED: Slightly less rounded corners (2.5rem) and thinner border (8px) for a sleeker look

              className="relative w-72 sm:w-[300px] h-[520px] sm:h-[620px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.85)] overflow-hidden z-20"

            >

              {/* CHANGED: Replaced big Notch with tiny "Punch Hole" camera */}

              {/* This is just a small dot that won't cover your text */}

              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-30 border border-slate-800/50"></div>



              <div className="w-full h-full bg-black relative">

                <AnimatePresence mode="wait">

                  <motion.img

                    key={activeScreen}

                    src={screens[activeScreen].src}

                    alt={`${screens[activeScreen].label} screen demo`}

                    className="w-full h-full object-cover"

                    initial={imgAnim.initial}

                    animate={imgAnim.animate}

                    exit={imgAnim.exit}

                    transition={{ duration: 0.45, ease: "easeInOut" }}

                    style={{ willChange: "opacity, transform" }}

                  />

                </AnimatePresence>



                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-black/95 to-transparent">

                  <motion.div

                    key={activeScreen + "-label"}

                    initial={{ y: 20, opacity: 0 }}

                    animate={{ y: 0, opacity: 1 }}

                    exit={{ y: 12, opacity: 0 }}

                    transition={{ duration: 0.32, ease: "easeOut" }}

                    className="text-white font-semibold text-center text-base sm:text-lg"

                  >

                    {screens[activeScreen].label}

                  </motion.div>

                </div>

              </div>

            </motion.div>



            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[550px] h-[480px] sm:h-[550px] bg-gradient-to-tr from-brand-blue/25 to-brand-green/25 rounded-full blur-[70px] -z-10 opacity-90"></div>

          </div>

        </motion.div>



        <motion.div

          className="order-1 lg:order-2 space-y-8 z-30 px-4 sm:px-6 lg:px-0"

          initial={{ opacity: 0, x: 25 }}

          whileInView={{ opacity: 1, x: 0 }}

          transition={{ duration: 0.7, delay: 0.05 }}

          viewport={{ once: true }}

        >

          <div className="inline-block px-5 py-2 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-sm md:text-base font-semibold shadow-sm">

            Interactive Demo

          </div>



          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight tracking-tight">

            Experience the <br />

            <span className="text-gradient">Smoothest UI</span> Ever

          </h2>



          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg pt-1">

            We believe engineering tools shouldn't look like spreadsheets from the 90s.

          </p>



          <ul className="space-y-4 pt-4">

            {[

              "Dark mode by default",

              "Gesture-based navigation",

              "Instant offline syncing",

              "Zero-clutter minimalist design"

            ].map((item, i) => (

              <li key={i} className="flex items-start gap-4 text-slate-300 text-lg">

                <CheckCircle2 size={22} className="text-brand-green flex-shrink-0 mt-1" />

                <span>{item}</span>

              </li>

            ))}

          </ul>

        </motion.div>

      </div>

    </section>

  );

};
const HowItWorksSection = () => {

  const steps = [

    { title: "Download & Install", desc: "One-tap APK install", icon: Download },

    { title: "Select Your Branch", desc: "Choose branch & semester", icon: GitBranch },

    { title: "Start Using Instantly", desc: "Auto-sync. Zero setup.", icon: Sparkles },

  ];



  return (

    <section id="how-it-works" className="py-24 lg:py-32">

      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">

            How It <span className="text-brand-teal">Works</span>

          </h2>

          <p className="mt-4 text-lg text-slate-400">Three steps. That’s it.</p>

        </div>



        {/* Steps */}

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">

          {steps.map((step, i) => {

            const Icon = step.icon;

            return (

              <div key={i} className="group text-center">

                {/* Simple connecting line – subtle & clean */}

                {i < 2 && (

                  <div className="hidden md:block absolute top-10 left-[100%] w-full h-px bg-white/10 -z-10" />

                )}



                {/* Icon Circle – minimal, sharp, no glow */}

                <div className="relative mb-8 flex justify-center">

                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-teal/10 group-hover:border-brand-teal/40 transition-all duration-300">

                    <Icon size={32} className="text-brand-teal" />

                  </div>

                  <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-brand-teal text-white text-sm font-bold flex items-center justify-center">

                    {i + 1}

                  </div>

                </div>



                {/* Text */}

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-teal transition-colors duration-300">

                  {step.title}

                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">

                  {step.desc}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

};




const ComparisonSection = () => {
  const features = [{ name: "Attendance Tracker", sembuddy: true, others: false }, { name: "GPA Calculator", sembuddy: true, others: false }, { name: "AI Assistant", sembuddy: true, others: false }, { name: "Offline Support", sembuddy: true, others: true }, { name: "Notes Manager", sembuddy: true, others: false }];
  return (
    <section id="comparison" className="py-24 relative container mx-auto px-6">
       <div className="text-center mb-16"><h2 className="text-3xl font-display font-bold mb-4">Why Choose <span className="text-gradient">SemBuddy?</span></h2></div>
       <div className="max-w-4xl mx-auto glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="grid grid-cols-3 bg-white/5 p-6 border-b border-white/10 font-display font-bold text-sm md:text-base"><div className="text-slate-400">Feature</div><div className="text-center text-brand-teal">SemBuddy</div><div className="text-center text-slate-500">Other Apps</div></div>
          {features.map((item, idx) => (<div key={idx} className={`grid grid-cols-3 p-6 border-b border-white/5 items-center ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}><div className="font-medium text-slate-200">{item.name}</div><div className="flex justify-center">{item.sembuddy ? (<div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center"><Check size={18} className="text-brand-teal" /></div>) : <X size={18} className="text-slate-600" />}</div><div className="flex justify-center">{item.others ? (<div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Check size={18} className="text-slate-400" /></div>) : <X size={18} className="text-slate-600" />}</div></div>))}
       </div>
    </section>
  );
};

const RoadmapSection = () => {
  const steps = [{ year: "2023", title: "The Spark", desc: "Concept validation & UI Prototyping.", status: "done", icon: Lightbulb }, { year: "Q1 2024", title: "v1.0 Launch", desc: "Core Marks & Attendance features released.", status: "done", icon: Rocket }, { year: "Now", title: "AI Integration", desc: "Gemini AI Study Assistant & Chatbot.", status: "current", icon: Zap }, { year: "Q3 2025", title: "University Expansion", desc: "Support for SPPU & GTU curriculums.", status: "next", icon: Target }, { year: "2026", title: "The Ecosystem", desc: "Web Portal, iOS App, and Notes Marketplace.", status: "future", icon: Globe }];
  return (
    <section id="roadmap" className="py-24 relative overflow-hidden">
       <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-brand-blue/30 to-transparent -translate-x-1/2"></div>
       <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our <span className="text-gradient">Journey</span></h2><p className="text-slate-400">From a simple calculator to a complete academic ecosystem.</p></div>
          <div className="max-w-4xl mx-auto relative">{steps.map((step, idx) => (<div key={idx} className={`relative flex items-center mb-16 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}><div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 z-10 flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${step.status === 'current' ? 'bg-brand-dark border-brand-teal shadow-[0_0_20px_#2dd4bf] scale-110' : step.status === 'done' ? 'bg-brand-dark border-brand-blue' : 'bg-brand-dark border-slate-700'}`}>{step.status === 'current' && <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></div>}</div><div className="hidden md:block w-1/2"></div><div className={`pl-20 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}><motion.div initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} className={`p-6 rounded-2xl border relative group transition-all hover:-translate-y-1 ${step.status === 'current' ? 'bg-brand-teal/5 border-brand-teal/30 shadow-[0_0_30px_-10px_rgba(45,212,191,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/10'}`}><div className="flex justify-between items-start mb-2"><span className={`text-xs font-bold px-2 py-1 rounded-md inline-block mb-2 ${step.status === 'current' ? 'bg-brand-teal/20 text-brand-teal' : 'bg-white/10 text-slate-400'}`}>{step.year}</span><step.icon size={16} className={step.status === 'current' ? 'text-brand-teal' : 'text-slate-500'} /></div><h3 className={`text-xl font-bold mb-2 ${step.status === 'current' ? 'text-white' : 'text-slate-200'}`}>{step.title}</h3><p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p></motion.div></div></div>))}</div>
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

};const TestimonialsSection = () => {

  const reviews = [

    { name: "Rohan D.", college: "COEP", text: "Finally an app that accurately calculates pointer for engineering! The UI is so much better than the official college site." },

    { name: "Sriya M.", college: "VJTI", text: "The attendance tracker saved me from a defaulter list. The 'bunk calculator' feature is a lifesaver honestly." },

    { name: "Amit K.", college: "SPIT", text: "I use the AI feature to understand complex concepts before exams. It explains things way better than my textbooks." },

    { name: "Neha S.", college: "MIT", text: "SemBuddy makes tracking my syllabus progress so satisfying. The offline support is a huge plus." },

    { name: "Vikram R.", college: "PICT", text: "Best engineering companion app. Simple, fast, and no ads. Highly recommended!" },

  ];



  const [activeIndex, setActiveIndex] = useState(0);



  // Auto-scroll functionality

  useEffect(() => {

    const timer = setInterval(() => {

      setActiveIndex((prev) => (prev + 1) % reviews.length);

    }, 4000); // Wait 4 seconds before moving

    return () => clearInterval(timer);

  }, []);



  const handleNext = () => {

    setActiveIndex((prev) => (prev + 1) % reviews.length);

  };



  const handlePrev = () => {

    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  };



  // Determine the position of a card relative to the active index

  const getCardStatus = (index) => {

    if (index === activeIndex) return "active";

    // Previous card logic (circular)

    if (index === (activeIndex - 1 + reviews.length) % reviews.length) return "prev";

    // Next card logic (circular)

    if (index === (activeIndex + 1) % reviews.length) return "next";

    return "inactive";

  };



  return (

    <section id="testimonials" className="py-24 bg-brand-dark border-t border-white/5 relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10 mb-12 text-center">

        <h2 className="text-3xl md:text-4xl font-display font-bold">

          Loved by <span className="text-brand-teal">Students</span>

        </h2>

      </div>



      <div className="relative w-full max-w-6xl mx-auto h-[400px] flex items-center justify-center">

        

        {/* Left Arrow */}

        <button 

          onClick={handlePrev}

          className="absolute left-4 md:left-10 z-40 p-3 rounded-full bg-white/10 hover:bg-brand-blue hover:text-white transition-all backdrop-blur-md border border-white/10"

        >

          <ChevronLeft size={24} />

        </button>



        {/* Right Arrow */}

        <button 

          onClick={handleNext}

          className="absolute right-4 md:right-10 z-40 p-3 rounded-full bg-white/10 hover:bg-brand-blue hover:text-white transition-all backdrop-blur-md border border-white/10"

        >

          <ChevronRight size={24} />

        </button>



        {/* Cards Container */}

        <div className="relative w-full h-full flex items-center justify-center perspective-1000">

          {reviews.map((review, index) => {

            const status = getCardStatus(index);

            

            // Animation Variants

            const variants = {

              active: { 

                x: "0%", 

                scale: 1, 

                opacity: 1, 

                zIndex: 20,

                filter: "blur(0px)" 

              },

              prev: { 

                x: "-55%", // Show half on left

                scale: 0.85, 

                opacity: 0.4, 

                zIndex: 10,

                filter: "blur(2px)" 

              },

              next: { 

                x: "55%", // Show half on right

                scale: 0.85, 

                opacity: 0.4, 

                zIndex: 10,

                filter: "blur(2px)" 

              },

              inactive: { 

                x: "0%", 

                scale: 0.5, 

                opacity: 0, 

                zIndex: 0,

                filter: "blur(10px)" 

              }

            };



            return (

              <motion.div

                key={index}

                initial={false}

                animate={status}

                variants={variants}

                transition={{ duration: 1, ease: "easeInOut" }} // <--- 1 Second Duration here

                className="absolute w-[90%] md:w-[60%] lg:w-[40%] max-w-lg glass p-8 rounded-3xl border border-white/10 shadow-2xl cursor-pointer"

                onClick={() => setActiveIndex(index)} // Click side card to make it active

              >

                <div className="absolute top-6 right-6 text-brand-blue/10">

                   <MessageSquare size={48} />

                </div>

                

                <div className="text-brand-blue mb-4 flex gap-1">

                   {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-brand-blue text-brand-blue" />)}

                </div>



                <p className="text-slate-300 text-lg leading-relaxed italic mb-6">"{review.text}"</p>

                

                <div className="flex items-center gap-4">

                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center font-bold text-white shadow-lg">

                      {review.name[0]}

                   </div>

                   <div>

                      <div className="font-bold text-white">{review.name}</div>

                      <div className="text-xs text-slate-500 font-semibold">{review.college}</div>

                   </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>

  );

};


const AboutDevSection = () => {

  const socialLinks = [

    { icon: Instagram, href: "https://www.instagram.com/aditya_devx/" },

    { icon: Github, href: "https://github.com/Aditya-verse" },

    { icon: X, href: "https://x.com/Adity_5424Mane" },

    { icon: Linkedin, href: "https://www.linkedin.com/in/adityamane-software-dev/" },

  ];



  return (

    <section className="py-28 lg:py-36">

      <div className="container mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Meet the <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">Creator</span></h2>

          <p className="text-lg text-slate-400">

            The student behind SemBuddy

          </p>

        </div>



        <motion.div

          initial={{ opacity: 0, y: 20 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: 0.5 }}

          className="max-w-2xl mx-auto"

        >

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">

            <div className="flex flex-col items-center text-center space-y-8">



              {/* Larger professional gradient avatar */}

             <div className="w-40 h-40 rounded-full bg-gradient-to-br from-brand-teal to-brand-blue p-1">

  <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden">

    <img 

        src="/sembuddy/images/worker.png"

      alt="Creator" 

      className="w-28 h-28 object-contain"

    />

  </div>

</div>





              <div>

                <h3 className="text-2xl font-display font-bold text-white">

                  Aditya Mane

                </h3>

                <p className="text-brand-teal font-medium text-lg mt-1">

                  Final Year • Computer Engineering

                </p>

              </div>



              <p className="text-slate-300 text-base leading-relaxed max-w-lg">

                I’m a final-year engineering student who spent too many nights calculating percentages, 

                tracking attendance, and hunting for syllabus updates.  

                SemBuddy is the tool I built for myself — and now for every engineering student who deserves a simpler way.

              </p>



              {/* Social icons with subtle hover animation */}

              <div className="flex gap-4">

                {socialLinks.map((link, i) => {

                  const Icon = link.icon;

                  return (

                    <motion.a

                      key={i}

                      href={link.href}

                      target="_blank"

                      rel="noopener noreferrer"

                      whileHover={{ scale: 1.1 }}

                      transition={{ type: "spring", stiffness: 300 }}

                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"

                    >

                      <Icon size={20} className="text-slate-400" />

                    </motion.a>

                  );

                })}

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

};



export default AboutDevSection;






// --- LAYOUT COMPONENTS ---
const Navbar = ({ onLoginClick, user, onLogoutClick, onNavigate, currentPage }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
  const handleNavClick = (id: string) => { setIsOpen(false); if (currentPage !== 'home') { onNavigate('home'); setTimeout(() => scrollToSection(id), 100); } else { scrollToSection(id); } };
  const navLinks = [ { name: 'Features', id: 'features' }, { name: 'Demo', id: 'demo' }, { name: 'AI Chat', id: 'ai-demo' }, { name: 'How It Works', id: 'how-it-works' }, { name: 'Why SemBuddy', id: 'why' }, { name: 'Reviews', id: 'testimonials' }, { name: 'Contact', id: 'contact' } ];
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass border-b border-white/10 shadow-lg shadow-black/20' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 group"><SemBuddyLogo className="w-8 h-8" /><span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-brand-teal transition-colors">SemBuddy</span></a>
        <div className="hidden lg:flex items-center gap-6">
          {currentPage === 'home' ? navLinks.map((link) => (<button key={link.name} onClick={() => handleNavClick(link.id)} className="text-sm font-medium text-slate-300 hover:text-brand-teal transition-colors relative group">{link.name}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-teal transition-all duration-300 group-hover:w-full"></span></button>)) : (<button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-sm font-bold text-brand-teal hover:text-white px-4 py-2 border border-brand-teal/30 rounded-full"><ChevronLeft size={16} /> Back to Home</button>)}
          {user ? (<div className="flex items-center gap-4 pl-2 border-l border-white/10"><div className="flex items-center gap-3">{user.picture ? (<img src={user.picture} alt={user.name} className="w-9 h-9 rounded-full border border-white/20" />) : (<div className="w-9 h-9 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold">{user.name ? user.name.charAt(0) : "U"}</div>)}<div className="flex flex-col"><span className="text-sm font-bold text-white leading-none">{user.name}</span><span className="text-[10px] text-slate-400">Student</span></div></div><button onClick={onLogoutClick} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors" title="Logout"><LogOut size={18} /></button></div>) : (<button onClick={onLoginClick} className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-brand-blue/20 hover:text-brand-blue border border-white/10 hover:border-brand-blue/30 transition-all text-sm font-semibold hover:scale-105 active:scale-95 flex items-center gap-2"><User size={16} /> Log In</button>)}
        </div>
        <button className="lg:hidden text-white p-2 z-[60]" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{isOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center"><div className="flex flex-col gap-8 text-center">{currentPage === 'home' && navLinks.map((link) => (<button key={link.name} onClick={() => handleNavClick(link.id)} className="text-2xl font-bold text-slate-300 hover:text-brand-teal transition-colors">{link.name}</button>))}{currentPage !== 'home' && (<button onClick={() => { setIsOpen(false); onNavigate('home'); }} className="text-2xl font-bold text-brand-teal">Back to Home</button>)}{user ? (<div className="flex flex-col items-center gap-4 mt-4 p-6 bg-white/5 rounded-2xl"><img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full border-2 border-brand-teal" /><div className="text-xl font-bold text-white">Hi, {user.name}</div><button onClick={() => { setIsOpen(false); onLogoutClick(); }} className="px-6 py-3 rounded-full bg-red-500/10 text-red-400 font-bold flex items-center gap-2"><LogOut size={20} /> Logout</button></div>) : (<button onClick={() => { setIsOpen(false); onLoginClick(); }} className="mt-4 px-8 py-4 rounded-full bg-brand-blue font-bold text-white shadow-lg flex items-center justify-center gap-2 mx-auto"><User size={20} /> Log In</button>)}</div></motion.div>)}</AnimatePresence>
    </nav>
  );
};

const Footer = ({ showToast, onNavigate }: any) => {
  const footerLinks = {
    "Product": ["Features", "Download", "Updates", "Beta Program"],
    "Company": ["About", "Careers", "Press Kit"],
    "Legal": ["Privacy Policy", "Terms of Service", "Cookie Policy"]
  };
  const socialLinks = [ { icon: Instagram, href: "https://www.instagram.com/aditya_devx/" }, { icon: XLogo, href: "https://x.com/Adity_5424Mane" }, { icon: Linkedin, href: "https://www.linkedin.com/in/adityamane-software-dev/" }, { icon: Github, href: "https://github.com/Aditya-verse" } ];
  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (link === "Privacy Policy") { onNavigate('privacy'); } 
    else if (link === "Terms of Service") { onNavigate('terms'); } 
    else if (link === "Cookie Policy") { onNavigate('cookies'); } 
    else if (link === "Features" || link === "Download") { onNavigate('home'); setTimeout(() => scrollToSection(link.toLowerCase()), 100); } 
    else { showToast(`${link} page is coming soon!`, 'info'); }
  };
  const handleContactSubmit = (e: React.FormEvent) => { e.preventDefault(); showToast("Sending message...", 'loading'); setTimeout(() => { showToast("Message sent! We'll reply shortly.", 'success'); }, 1500); };
  return (
    <footer id="contact" className="bg-[#020617] border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
       <div className="container mx-auto px-6 relative z-10">
         <div className="grid lg:grid-cols-12 gap-12 mb-16">
           <div className="lg:col-span-4 space-y-6"><div className="flex items-center gap-2 mb-4"><SemBuddyLogo className="w-10 h-10" /><span className="font-display font-bold text-2xl text-white">SemBuddy</span></div><p className="text-slate-400 max-w-sm leading-relaxed">Empowering the next generation of engineers with smart tools for smarter results. Built with ❤️ by students, for students.</p><div className="flex flex-col gap-4"><h5 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Download App</h5><StoreButtons /></div><div className="flex gap-4 pt-2">{socialLinks.map((social, i) => (<motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-brand-blue transition-colors"><social.icon size={18} /></motion.a>))}</div></div>
           <div className="lg:col-span-4 grid grid-cols-2 gap-8">{Object.entries(footerLinks).map(([category, links]) => (<div key={category}><h4 className="font-bold text-white mb-6">{category}</h4><ul className="space-y-4">{links.map((link) => (<li key={link}><a href="#" onClick={(e) => handleLinkClick(e, link)} className="text-slate-400 hover:text-brand-teal transition-colors text-sm">{link}</a></li>))}</ul></div>))}</div>
           <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/10"><h4 className="font-bold text-white mb-4 flex items-center gap-2"><Mail size={18} className="text-brand-teal" /> Get in Touch</h4><ul className="space-y-4 text-sm text-slate-400 mb-6"><li className="flex items-center gap-3"><Mail size={16} className="text-brand-teal" /> <a href="mailto:mane.adityax@gmail.com">mane.adityax@gmail.com</a></li><li className="flex items-start gap-3"><MapPin size={16} className="text-brand-teal mt-1" /> <span>India, Maharashtra IN</span></li></ul><form onSubmit={handleContactSubmit} className="space-y-4"><input type="email" placeholder="Your email address" required className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue" /><textarea placeholder="What's your query?" rows={3} required className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue resize-none" /><button type="submit" className="w-full py-3 rounded-lg bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">Send Message <Send size={16} /></button></form></div>
         </div>
         <div className="border-t border-white/10 pt-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500"><p>© 2025 SemBuddy. All rights reserved.</p><div className="flex gap-6"><a href="#" onClick={(e) => handleLinkClick(e, "Privacy Policy")} className="hover:text-white transition-colors">Privacy Policy</a><a href="#" onClick={(e) => handleLinkClick(e, "Terms of Service")} className="hover:text-white transition-colors">Terms of Service</a><a href="#" onClick={(e) => handleLinkClick(e, "Cookie Policy")} className="hover:text-white transition-colors">Cookie Policy</a></div></div>
       </div>
    </footer>
  );
};
const UserDashboard = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Studying for exams 📚");
  const [isDark, setIsDark] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Toggle Theme Simulation
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <section className={`py-24 px-6 min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#020617]' : 'bg-slate-100'}`}>
      <div className="container mx-auto max-w-4xl">
        
        {/* Header / Profile Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className={`p-8 rounded-3xl border shadow-xl mb-8 flex flex-col md:flex-row items-center gap-8 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
        >
          {/* Avatar */}
          <div className="relative">
            {user.picture ? (
              <img src={user.picture} alt="Profile" className="w-24 h-24 rounded-full border-4 border-brand-blue" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#0f172a] rounded-full"></div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className={`text-3xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Hello, {user.name} 👋
            </h2>
            
            {/* Editable Status */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-transparent border-b border-brand-teal focus:outline-none text-slate-400 w-48"
                    autoFocus
                  />
                  <button onClick={() => setIsEditing(false)} className="text-green-400 hover:text-green-300"><Check size={16}/></button>
                </div>
              ) : (
                <p className="text-slate-400 italic cursor-pointer hover:text-brand-teal transition-colors" onClick={() => setIsEditing(true)}>
                  "{status}" <span className="text-[10px] not-italic opacity-50 ml-1">(Click to edit)</span>
                </p>
              )}
            </div>
            <p className="text-slate-500 text-xs mt-1">{user.email}</p>
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`p-4 rounded-2xl transition-all ${isDark ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Activity 1: The "Dropbox" / Scratchpad */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className={`p-6 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400"><FileText size={20} /></div>
              <h3 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-slate-800'}`}>Quick Notes</h3>
            </div>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type something cool here... (Ideas, formulas, reminders)"
              className={`w-full h-40 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${isDark ? 'bg-black/20 text-slate-300 placeholder:text-slate-600' : 'bg-slate-50 text-slate-700 placeholder:text-slate-400'}`}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-slate-500">{note.length} characters</span>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-colors">Save Note</button>
            </div>
          </motion.div>

          {/* Activity 2: Dashboard stats */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className={`p-6 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-brand-blue/20 text-brand-blue"><TrendingUp size={20} /></div>
              <h3 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-slate-800'}`}>Your Activity</h3>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl flex justify-between items-center ${isDark ? 'bg-black/20' : 'bg-slate-50'}`}>
                <span className="text-slate-400 text-sm">Current Streak</span>
                <span className="text-brand-teal font-bold text-lg">🔥 12 Days</span>
              </div>
              <div className={`p-4 rounded-xl flex justify-between items-center ${isDark ? 'bg-black/20' : 'bg-slate-50'}`}>
                <span className="text-slate-400 text-sm">Assignments Due</span>
                <span className="text-amber-500 font-bold text-lg">3 Pending</span>
              </div>
              <button onClick={onLogout} className="w-full py-3 mt-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors font-bold text-sm flex items-center justify-center gap-2">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// --- APP COMPONENT ---
// --- APP COMPONENT ---
// --- APP COMPONENT ---
const App = () => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('home');
  
  // State to remember where the user was on the home page
  const [homeScrollPos, setHomeScrollPos] = useState(0);

  // UPDATED: Navigation Logic (Scroll Restoration + Dashboard)
  const navigateTo = (page: string) => {
    if (currentPage === 'home') {
      setHomeScrollPos(window.scrollY);
    }

    setCurrentPage(page);

    if (page === 'home') {
      setTimeout(() => {
        window.scrollTo({ top: homeScrollPos, behavior: 'auto' });
      }, 10);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [toast, setToast] = useState<{ isVisible: boolean; type: 'success' | 'loading' | 'info' | 'error'; message: string; progress: number; }>({ isVisible: false, type: 'success', message: '', progress: 0 });
  const showToast = (message: string, type: 'success' | 'loading' | 'info' | 'error' = 'success') => { setToast({ isVisible: true, type, message, progress: 0 }); if (type !== 'loading') { setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 4000); } };

  // UPDATED: Real Download Logic
  const handleDownload = () => {
    if (!user) {
      showToast("Please login to download the app", "info");
      setIsAuthOpen(true);
      return;
    }

    setToast({ isVisible: true, type: 'loading', message: 'Starting download...', progress: 0 });
    
  const link = document.createElement("a");
link.href = "/sembuddy/SemBuddy.apk"; // ✅ correct path
link.download = "SemBuddy.apk";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);


    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setToast(prev => ({ ...prev, progress }));
      if (progress >= 100) {
        clearInterval(interval);
        showToast('SemBuddy APK downloading...', 'success');
      }
    }, 200);
  };

  const handleFeatureClick = (feature: any) => { if (!user) { showToast("Login to explore features details", "info"); setIsAuthOpen(true); return; } setSelectedFeature(feature); };

  // UPDATED: Auth Handler (Connects to Dashboard)
  const handleAuth = (data: any) => {
    // 1. Google Auth
    if (data.method === 'google') {
        setUser({ 
            name: data.name, 
            email: data.email,
            picture: data.picture 
        });
        setIsAuthOpen(false);
        showToast(`Welcome back, ${data.name}!`, 'success');
        navigateTo('dashboard'); // GO TO DASHBOARD
    } 
    // 2. Manual Auth (Login/Signup)
    else {
        setIsAuthOpen(false);
        showToast("Authenticating...", 'loading');
        
        setTimeout(() => {
            setUser({ 
                name: data.name, 
                email: data.email,
                picture: null 
            });
            showToast(`Success! Welcome ${data.name}.`, 'success');
            navigateTo('dashboard'); // GO TO DASHBOARD
        }, 1500);
    }
  };

  const handleLogout = () => { 
      setUser(null); 
      showToast("Logged out successfully", "info"); 
      navigateTo('home'); // Return to home on logout
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white overflow-hidden selection:bg-brand-teal selection:text-brand-dark">
      <Navbar onLoginClick={() => setIsAuthOpen(true)} user={user} onLogoutClick={handleLogout} onNavigate={navigateTo} currentPage={currentPage} />
      <main>
        {currentPage === 'home' && (
          <>
            <HeroSection onDownloadClick={handleDownload} />
            <FeaturesSection onFeatureClick={handleFeatureClick} />
            <DemoSection />
            <AIDemoSection />
            <HowItWorksSection />
            <ComparisonSection />
            <RoadmapSection />
            <WhySection />
            <TestimonialsSection />
            
            {/* UPDATED Bottom Download Section */}
            <section className="py-20 px-4 md:px-6">
              <div className="container mx-auto max-w-5xl">
                <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="relative z-10 max-w-lg text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">Download the <br/> app now!</h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">You’re just a step away from starting your smarter engineering journey.</p>
                    
                    <div className="flex flex-col gap-6">
  {/* Main APK Download Button */}
  <button
    onClick={handleDownload}
    className="px-8 py-4 bg-brand-blue rounded-xl font-bold text-white hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:-translate-y-1"
  >
    <Download size={22} />
    Download APK Directly
  </button>

  {/* Store Buttons (Coming Soon) */}
  <div className="flex flex-wrap justify-center md:justify-start gap-4">
    <button
      onClick={() => showToast("Coming soon to Google Play Store!", "info")}
      className="flex items-center gap-3 px-5 py-2.5 bg-black border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all group"
    >
    <div className="w-7 h-7 flex-shrink-0">
  <img
    src="/sembuddy/images/google-play.png"
    alt="Google Play"
    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
  />
</div>

      <div className="flex flex-col text-left">
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none mb-1">
          Get it on
        </span>
        <span className="text-sm font-bold text-slate-300 group-hover:text-white leading-none font-display transition-colors">
          Google Play
        </span>
      </div>
    </button>

    <button
      onClick={() => showToast("Coming soon to Apple App Store!", "info")}
      className="flex items-center gap-3 px-5 py-2.5 bg-black border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all group"
    >
      <div className="w-7 h-7 flex-shrink-0">
       <img
  src="/sembuddy/images/apple.png"
  alt="App Store"
  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
/>

      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none mb-1">
          Download on the
        </span>
        <span className="text-sm font-bold text-slate-300 group-hover:text-white leading-none font-display transition-colors">
          App Store
        </span>
      </div>
    </button>
  </div>

  {/* Links */}
  <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium pt-2">
    <span className="flex items-center gap-1 hover:text-brand-teal cursor-pointer transition-colors">
      <Sparkles size={14} /> Beta Program
    </span>
    <span>•</span>
    <span className="hover:text-brand-teal cursor-pointer transition-colors">
      See Updates (v2.0)
    </span>
  </div>
</div>

  </div>

  <div className="relative z-10 flex-shrink-0">
  <div className="relative w-[280px] h-[550px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl flex flex-col items-center justify-center p-6">
    <div className="absolute top-0 w-32 h-6 bg-slate-800 rounded-b-xl"></div>

    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-indigo-50 rounded-[2rem] flex flex-col items-center justify-center text-center p-6">
      <p className="text-slate-500 font-medium mb-8">
        Scan QR to download APK
      </p>

      <div className="bg-white p-3 rounded-xl shadow-lg mb-8">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://aditya-verse.github.io/sembuddy/SemBuddy.apk"
          alt="SemBuddy APK QR"
          className="w-40 h-40 mix-blend-multiply"
        />
      </div>

      <SemBuddyLogo className="w-12 h-12" />
    </div>
  </div>
</div>

                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
                </div>
              </div>
            </section>
            <AboutDevSection />
          </>
        )}

        {/* DASHBOARD PAGE */}
        {currentPage === 'dashboard' && user && (
            <UserDashboard user={user} onLogout={handleLogout} />
        )}

        {currentPage === 'privacy' && <PrivacyPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'cookies' && <CookiesPage />}
      </main>
      <Footer showToast={showToast} onNavigate={navigateTo} />
      <ScrollToTop />
      <Mascot />
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuth={handleAuth} />
      <Toast isVisible={toast.isVisible} message={toast.message} type={toast.type} progress={toast.progress} onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} />
    </div>
  );
};
const rootElement = document.getElementById('root');
if (rootElement) { const root = createRoot(rootElement); root.render(<App />); }