import React from 'react';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16 text-white min-h-screen">
      <h1 className="font-titan text-4xl md:text-5xl mb-8 text-center">{t('contact_us')}</h1>
      <div className="max-w-xl mx-auto">
        <form className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-400 uppercase tracking-wider">{t('name')}</label>
            <input type="text" className="w-full bg-gaming-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-400 uppercase tracking-wider">{t('email')}</label>
            <input type="email" className="w-full bg-gaming-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-400 uppercase tracking-wider">{t('message')}</label>
            <textarea rows={5} className="w-full bg-gaming-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors"></textarea>
          </div>
          <button className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest rounded-lg transition-all shadow-neon">
            {t('send_message')}
          </button>
        </form>
      </div>
    </div>
  );
};
