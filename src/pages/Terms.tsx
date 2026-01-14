import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ShieldCheck, 
  Scale, 
  UserCheck, 
  AlertTriangle, 
  Copyright, 
  Terminal, 
  ArrowLeft, 
  FileText,
  Lock,
  Zap,
  CheckCircle2
} from 'lucide-react';

// --- Type Declaration ---
declare global {
  interface Window {
    google: any;
  }
}

// --- Components ---

const Section = ({ id, title, icon: Icon, children, isActive }: any) => {
  return (
    <motion.div 
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`scroll-mt-32 mb-12 p-8 rounded-3xl border transition-all duration-300 ${
        isActive 
        ? 'bg-white/[0.03] border-brand-teal/30 shadow-[0_0_30px_-10px_rgba(45,212,191,0.1)]' 
        : 'bg-transparent border-transparent hover:bg-white/[0.02]'
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl ${isActive ? 'bg-brand-teal/20 text-brand-teal' : 'bg-white/5 text-slate-400'}`}>
          <Icon size={24} />
        </div>
        <h3 className={`text-2xl font-bold font-display ${isActive ? 'text-white' : 'text-slate-200'}`}>
          {title}
        </h3>
      </div>
      <div className="text-slate-400 leading-relaxed space-y-4 text-lg">
        {children}
      </div>
    </motion.div>
  );
};

const TocItem = ({ id, label, activeId, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all ${
      activeId === id 
      ? 'bg-brand-blue/10 text-brand-blue font-semibold' 
      : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
    }`}
  >
    <div className={`w-1.5 h-1.5 rounded-full transition-all ${
      activeId === id ? 'bg-brand-blue scale-125' : 'bg-slate-600 group-hover:bg-slate-500'
    }`} />
    {label}
  </button>
);

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'services', 'accounts', 'liability', 'ai-policy', 'termination'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-brand-teal selection:text-[#020617] font-sans">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-green origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Simple Text Logo or Import your Logo Component */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center font-bold text-white">S</div>
            <span className="font-display font-bold text-xl tracking-tight">SemBuddy</span>
          </div>
          {/* Note: In your real app, replace the href below to trigger your router's "go back" function */}
          <a href="/" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to App
          </a>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <ShieldCheck size={14} className="text-brand-teal" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Last Updated: December 2025</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">Service</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Please read these terms carefully before using the SemBuddy application. 
            We've tried to keep them as simple as possible.
          </motion.p>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Sticky Sidebar (Table of Contents) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-2">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">Table of Contents</h5>
              <TocItem id="intro" label="Introduction" activeId={activeSection} onClick={scrollTo} />
              <TocItem id="services" label="Our Services" activeId={activeSection} onClick={scrollTo} />
              <TocItem id="accounts" label="User Accounts" activeId={activeSection} onClick={scrollTo} />
              <TocItem id="liability" label="Liability & Accuracy" activeId={activeSection} onClick={scrollTo} />
              <TocItem id="ai-policy" label="AI Usage Policy" activeId={activeSection} onClick={scrollTo} />
              <TocItem id="termination" label="Termination" activeId={activeSection} onClick={scrollTo} />
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9 max-w-3xl">
            
            <Section id="intro" title="1. Introduction" icon={FileText} isActive={activeSection === 'intro'}>
              <p>
                Welcome to <strong className="text-white">SemBuddy</strong> ("we," "our," or "us"). By accessing or using our mobile application, website, and services, you agree to be bound by these Terms of Service.
              </p>
              <p>
                If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </Section>

            <Section id="services" title="2. Services Provided" icon={Zap} isActive={activeSection === 'services'}>
              <p>
                SemBuddy is an educational utility tool designed for engineering students. Our services include, but are not limited to:
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "Calculation of CGPA/SGPA based on university algorithms.",
                  "Attendance tracking and prediction.",
                  "Viewing and downloading syllabus PDFs.",
                  "AI-powered study assistance via Gemini integration."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-brand-teal mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="accounts" title="3. User Accounts" icon={UserCheck} isActive={activeSection === 'accounts'}>
              <p>
                To access certain features (like syncing data), you may be required to login using your Google Account.
              </p>
              <div className="bg-brand-blue/5 border border-brand-blue/20 p-5 rounded-2xl mt-4">
                <h4 className="flex items-center gap-2 text-brand-blue font-bold mb-2">
                  <Lock size={18} /> Data Privacy
                </h4>
                <p className="text-sm">
                  We only access your name, email address, and profile picture provided by Google. Your academic data (marks, attendance logs) is stored locally on your device unless you explicitly enable cloud sync.
                </p>
              </div>
            </Section>

            <Section id="liability" title="4. Accuracy & Liability" icon={Scale} isActive={activeSection === 'liability'}>
              <p>
                While we strive for <strong>99.9% accuracy</strong> in our calculators and syllabus data, SemBuddy is a tool for guidance only.
              </p>
              <p className="p-4 border-l-4 border-amber-500 bg-amber-500/5 text-slate-300 rounded-r-xl">
                <strong className="text-amber-500 block mb-1">Disclaimer:</strong>
                We are not responsible for any discrepancies in actual university results, attendance shortfalls, or outdated syllabus information. Always verify critical academic data with your official college administration.
              </p>
            </Section>

            <Section id="ai-policy" title="5. AI Assistant Usage" icon={Terminal} isActive={activeSection === 'ai-policy'}>
              <p>
                Our "AI Study Buddy" uses Google's Gemini models. By using this feature, you acknowledge that:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-brand-teal">
                <li>AI responses may occasionally be inaccurate or hallucinated.</li>
                <li>The AI should be used as a study aid, not a replacement for textbooks or professors.</li>
                <li>You will not use the AI to generate content that violates academic integrity policies (cheating).</li>
              </ul>
            </Section>

            <Section id="termination" title="6. Termination" icon={AlertTriangle} isActive={activeSection === 'termination'}>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms (e.g., attempting to reverse engineer the app).
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Copyright size={14} /> 2025 SemBuddy. All rights reserved.
                </div>
                <a href="mailto:mane.adityax@gmail.com" className="hover:text-brand-teal transition-colors">
                  Contact Support
                </a>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;