import React from 'react';

type FooterProps = {
  t: {
    builtBy: string;
  };
};

const Footer: React.FC<FooterProps> = ({ t }) => (
  <footer className="w-full py-6 bg-slate-100 dark:bg-[#23272f] text-center text-gray-500 dark:text-gray-400 text-sm mt-8 transition-colors">
    <div>
      IA Mini Assistant &copy; {new Date().getFullYear()} &middot; 
      <a
        href="https://github.com/marchalseverine/IA_mini_assistant"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        GitHub
      </a>
      {` | ${t.builtBy}`}
    </div>
  </footer>
);

export default Footer; 