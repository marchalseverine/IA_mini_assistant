import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type HeroProps = {
  t: {
    headline: string;
    subtext: string;
    cta: string;
  };
  onStart?: () => void;
};

const Hero: React.FC<HeroProps> = ({ t, onStart }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (onStart) {
      onStart();
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate('/account');
    } else {
      // Not logged in, start Google login
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/account`
        }
      });
    }
  };

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-100 dark:from-[#23272f] dark:to-[#181a20] py-16 px-4 text-center transition-colors">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
        {t.headline}
      </h1>
      <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        {t.subtext}
      </p>
      <button
        onClick={handleClick}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-3 shadow-lg transition-colors duration-200 text-lg"
      >
        {t.cta}
      </button>
    </section>
  );
};

export default Hero; 