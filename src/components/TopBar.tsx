import React from 'react';
import { useLocation } from 'react-router-dom';

interface TopBarProps {
  onHome: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  lang: 'en' | 'es' | 'fr';
  onLangChange: (lang: 'en' | 'es' | 'fr') => void;
}

const flags = {
  en: <img src="https://flagcdn.com/gb.svg" alt="English" className="h-7 w-7 object-cover rounded-full border border-slate-300 shadow-sm" />,
  es: <img src="https://flagcdn.com/es.svg" alt="Español" className="h-7 w-7 object-cover rounded-full border border-slate-300 shadow-sm" />,
  fr: <img src="https://flagcdn.com/fr.svg" alt="Français" className="h-7 w-7 object-cover rounded-full border border-slate-300 shadow-sm" />,
};

const TopBar: React.FC<TopBarProps> = ({ onHome, darkMode, onToggleDark, lang, onLangChange }) => {
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langOpen]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-row gap-2 sm:gap-3 items-center">
      {/* Home button: show on all pages except home */}
      {location.pathname !== '/' && (
        <button
          onClick={onHome}
          aria-label="Go to landing page"
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none transition"
        >
          <span role="img" aria-label="Home" className="text-2xl">🏠</span>
        </button>
      )}
      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        aria-label="Toggle dark mode"
        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none transition"
      >
        {darkMode ? <span role="img" aria-label="Light" className="text-2xl">🌞</span> : <span role="img" aria-label="Dark" className="text-2xl">🌙</span>}
      </button>
      {/* Language switcher */}
      <div ref={langRef} className="relative">
        <button
          onClick={() => setLangOpen(o => !o)}
          aria-label="Change language"
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none transition"
        >
          {flags[lang]}
        </button>
        {langOpen && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col py-2 w-14 gap-2 animate-fade-in">
            {(['en', 'es', 'fr'] as const).filter(code => code !== lang).map(code => (
              <button
                key={code}
                onClick={() => { onLangChange(code); setLangOpen(false); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none mx-auto transition-transform hover:scale-110"
                aria-label={code}
              >
                {flags[code]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar; 