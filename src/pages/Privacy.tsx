import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-display">Privacy Policy</h1>
        
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p className="text-lg">Your privacy is critically important to us.</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Data Collection</h2>
            <p>We collect basic profile information (Name, Email, Profile Picture) when you sign in via Google. We do NOT collect or store sensitive academic passwords.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Local Storage</h2>
            <p>Your academic data, including entered marks, attendance logs, and notes, is stored locally on your device or synced to your own Firebase account. We do not sell this data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. AI Interactions</h2>
            <p>When you use the AI Study Buddy, your queries are sent to Google Gemini APIs to generate responses. Do not share personally identifiable information (PII) in your AI chat queries.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;