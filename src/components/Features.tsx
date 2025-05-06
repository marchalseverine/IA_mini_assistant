import React from 'react';

type FeaturesProps = {
  t: {
    title: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
};

const Features: React.FC<FeaturesProps> = ({ t }) => (
  <section className="w-full py-16 bg-white dark:bg-[#23272f] flex flex-col items-center transition-colors">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">{t.title}</h2>
    <div className="flex flex-col md:flex-row gap-8 justify-center">
      {t.items.map((feature, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-slate-50 dark:bg-[#23272f] rounded-xl shadow-md p-8 w-72 hover:shadow-lg transition-shadow"
        >
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features; 