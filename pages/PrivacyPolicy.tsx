import React from 'react';
import { useTranslation } from 'react-i18next';

export const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16 text-white min-h-screen">
      <h1 className="font-titan text-4xl md:text-5xl mb-8 text-center">{t('privacy_policy')}</h1>
      <div className="max-w-3xl mx-auto space-y-8 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">{t('pp_section1_title')}</h2>
          <p>{t('pp_section1_desc')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">{t('pp_section2_title')}</h2>
          <p>{t('pp_section2_desc')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">{t('pp_section3_title')}</h2>
          <p>{t('pp_section3_desc')}</p>
        </section>
      </div>
    </div>
  );
};
