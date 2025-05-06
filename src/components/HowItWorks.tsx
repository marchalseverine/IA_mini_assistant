import React from 'react';

type HowItWorksProps = {
  t: {
    title: string;
    steps: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
};

const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => (
  <section className="w-full py-16 bg-slate-50 dark:bg-[#181a20] flex flex-col items-center transition-colors">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">{t.title}</h2>
    <div className="flex flex-col md:flex-row gap-8 justify-center">
      {t.steps.map((step, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white dark:bg-[#23272f] rounded-xl shadow p-8 w-64 border-t-4 border-blue-500 dark:border-blue-400"
        >
          <div className="text-4xl mb-4">{step.icon}</div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{step.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks; 