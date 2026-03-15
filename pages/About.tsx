import React from 'react';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16 text-white min-h-screen">
      <h1 className="font-titan text-4xl md:text-5xl mb-8 text-center">{t('about_us_title')}</h1>
      <div className="max-w-3xl mx-auto space-y-6 text-slate-300 leading-relaxed text-lg">
        <p>{t('about_us_p1')}</p>
        <p>{t('about_us_p2')}</p>
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mt-12">
          <h2 className="font-titan text-2xl mb-4 text-brand-400">{t('our_mission')}</h2>
          <p>{t('about_us_mission_desc')}</p>
        </div>
      </div>
    </div>
  );
};
