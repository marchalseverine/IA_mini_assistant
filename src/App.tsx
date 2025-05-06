import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import translations from './translations';
import ProjectBoard from './components/ProjectBoard';
import TopBar from './components/TopBar';

function App() {
  const [lang, setLang] = useState<'en' | 'es' | 'fr'>('en');
  const [showTaskBoard, setShowTaskBoard] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const t = translations[lang];

  // Apply dark mode class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  const DarkModeButton = () => (
    <button
      className="fixed bottom-4 right-4 z-50 bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-2"
      onClick={() => setDarkMode(d => !d)}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <span role="img" aria-label="Light">🌞</span>
      ) : (
        <span role="img" aria-label="Dark">🌙</span>
      )}
      {darkMode ? 'Light' : 'Dark'}
    </button>
  );

  if (showTaskBoard) {
    return (
      <div className="bg-slate-50 dark:bg-[#181a20] min-h-screen flex flex-col transition-colors">
        <TopBar
          onHome={() => setShowTaskBoard(false)}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
          lang={lang}
          onLangChange={setLang}
        />
        <ProjectBoard t={{ ...t.projectBoard, taskBoard: t.taskBoard }} />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#181a20] min-h-screen flex flex-col transition-colors">
      <TopBar
        onHome={() => setShowTaskBoard(true)}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        lang={lang}
        onLangChange={setLang}
      />
      <Hero t={t.hero} onStart={() => setShowTaskBoard(true)} />
      <Features t={t.features} />
      <HowItWorks t={t.howItWorks} />
      <Footer t={t.footer} />
    </div>
  );
}

export default App; 