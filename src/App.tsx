import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import translations from './translations';
import ProjectBoard from './components/ProjectBoard';
import TopBar from './components/TopBar';
// import Login from './pages/Login'; // Removed unused import
import Account from './pages/Account';

const App: React.FC = () => {
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
    <Router>
      <Routes>
        <Route path="/" element={
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
        } />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
};

export default App; 