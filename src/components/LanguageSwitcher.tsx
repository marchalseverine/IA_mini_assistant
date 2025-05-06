import React, { useState, useRef, useEffect } from 'react';

const flags = [
  { code: 'en', label: <img src="https://flagcdn.com/gb.svg" alt="English" className="h-8 w-8 object-cover rounded-full border border-slate-300 shadow-sm" /> },
  { code: 'es', label: <img src="https://flagcdn.com/es.svg" alt="Español" className="h-8 w-8 object-cover rounded-full border border-slate-300 shadow-sm" /> },
  { code: 'fr', label: <img src="https://flagcdn.com/fr.svg" alt="Français" className="h-8 w-8 object-cover rounded-full border border-slate-300 shadow-sm" /> },
];

interface LanguageSwitcherProps {
  current: 'en' | 'es' | 'fr';
  onChange: (lang: 'en' | 'es' | 'fr') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ current, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const currentFlag = flags.find(f => f.code === current)!;
  const otherFlags = flags.filter(f => f.code !== current);

  return (
    <div ref={ref} className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 focus:outline-none hover:scale-105 transition-transform"
        aria-label="Change language"
      >
        {currentFlag.label}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col py-2 w-14 gap-2 animate-fade-in">
          {otherFlags.map(flag => (
            <button
              key={flag.code}
              onClick={() => { onChange(flag.code as 'en' | 'es' | 'fr'); setOpen(false); }}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none mx-auto transition-transform hover:scale-110"
              aria-label={flag.code}
            >
              {flag.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 