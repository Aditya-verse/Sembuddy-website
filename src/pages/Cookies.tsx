import React from 'react';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-display">Cookie Policy</h1>
        
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p className="text-lg">We use cookies to improve your experience on SemBuddy.</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. What are cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help us remember your login state and preferences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Essential Cookies</h2>
            <p>We use essential cookies for Authentication (to keep you logged in via Google) and Security (to prevent fraudulent use of login credentials).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. No Tracking Cookies</h2>
            <p>We do not use third-party advertising cookies or tracking pixels on this educational platform.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies;