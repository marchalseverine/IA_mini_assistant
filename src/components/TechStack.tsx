import React from 'react';

type TechStackProps = {
  t: {
    title: string;
  };
};

const TechStack: React.FC<TechStackProps> = ({ t }) => (
  <section className="w-full py-10 bg-white dark:bg-[#23272f] flex flex-col items-center transition-colors">
    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">{t.title}</h2>
    <div className="flex flex-row gap-10 items-center justify-center text-gray-800 dark:text-white">
      {/* OpenAI */}
      <span title="OpenAI">
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
          <path fill="currentColor" d="M128 0a128 128 0 100 256 128 128 0 000-256zm-3.44 51.52c13.52-7.88 30.88-7.88 44.4 0 13.92 8.12 22 23.72 21.44 39.64v3.56c12.36 3.52 22.36 12.72 26.88 24.72 6.36 16.28 1.44 34.8-12.28 46.04l-3 2.52c5.28 12.36 4.8 26.28-1.28 38.2-8.12 16.12-25.28 26.28-43.24 25.56h-3.6c-3.52 12.36-12.72 22.36-24.72 26.88-16.28 6.36-34.8 1.44-46.04-12.28l-2.52-3c-12.36 5.28-26.28 4.8-38.2-1.28-16.12-8.12-26.28-25.28-25.56-43.24v-3.6c-12.36-3.52-22.36-12.72-26.88-24.72-6.36-16.28-1.44-34.8 12.28-46.04l3-2.52c-5.28-12.36-4.8-26.28 1.28-38.2 8.12-16.12 25.28-26.28 43.24-25.56h3.6c3.52-12.36 12.72-22.36 24.72-26.88z"/>
        </svg>
      </span>
      {/* Tailwind CSS */}
      <span title="Tailwind CSS">
        <svg viewBox="0 0 256 154" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
          <path fill="currentColor" d="M128 0c-32 0-52 16-60 48 12-16 28-24 48-24 18.67 0 31.33 9.33 37.99 28 6.66 18.66 18.66 28 35.99 28 24 0 40-16 48-48-12 16-28 24-48 24-18.66 0-31.33-9.33-37.99-28C153.33 9.34 141.33 0 128 0zM60 56c-32 0-52 16-60 48 12-16 28-24 48-24 18.67 0 31.33 9.33 37.99 28 6.66 18.66 18.66 28 35.99 28 24 0 40-16 48-48-12 16-28 24-48 24-18.66 0-31.33-9.33-37.99-28C85.33 65.34 73.33 56 60 56z"/>
        </svg>
      </span>
      {/* React */}
      <span title="React">
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
          <circle cx="128" cy="128" r="16" fill="currentColor"/>
          <path stroke="currentColor" strokeWidth="12" fill="none" d="M128 20c29.8 0 57.2 10.2 79.8 28.2C206 64 212 79.6 212 96c0 16.4-6 32-16.2 47.8C185.2 225.8 128 236 128 236s-57.2-10.2-67.8-92.2C50 128 44 112.4 44 96c0-16.4 6-32 16.2-47.8C70.8 30.2 98.2 20 128 20z"/>
          <ellipse cx="128" cy="128" rx="86" ry="32" stroke="currentColor" strokeWidth="12" fill="none"/>
          <ellipse cx="128" cy="128" rx="32" ry="86" stroke="currentColor" strokeWidth="12" fill="none"/>
        </svg>
      </span>
    </div>
  </section>
);

export default TechStack; 