import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gaming-dark border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
               <div className="w-10 h-10 flex items-center justify-center bg-brand-500 rounded-lg text-white group-hover:rotate-12 transition-transform">
                 <i className="fa-solid fa-gamepad text-xl"></i>
               </div>
               <span className="font-titan text-2xl text-white">Free Games Online</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              {t('footer_desc')}
            </p>
            <div className="flex gap-4">
              {['twitter', 'discord', 'instagram', 'youtube'].map(icon => (
                <a key={icon} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all">
                  <i className={`fa-brands fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{t('discover')}</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              {[
                { key: 'games', path: '/games' },
                { key: 'new_releases', path: '/games' },
                { key: 'most_popular', path: '/games' },
                { key: 'surprise_me', path: '/' }
              ].map(item => (
                <li key={item.key}><Link to={item.path} className="hover:text-brand-400 transition-colors">{t(item.key)}</Link></li>
              ))}
            </ul>
          </div>
          
           <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{t('support')}</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              {[
                { key: 'about', path: '/about' },
                { key: 'contact', path: '/contact' },
                { key: 'privacy_policy', path: '/privacy-policy' },
                { key: 'help_center', path: '/contact' }
              ].map(item => (
                <li key={item.key}><Link to={item.path} className="hover:text-brand-400 transition-colors">{t(item.key)}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col items-center gap-3 text-slate-600 text-[10px] tracking-widest font-bold">
          <p className="uppercase">&copy; {new Date().getFullYear()} Free Games Online. All rights reserved.</p>
          <div className="flex items-center gap-1.5 group cursor-default">
            <span className="opacity-70 group-hover:opacity-100 transition-opacity lowercase">powered by</span>
            <span className="text-brand-500 group-hover:text-brand-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">
              Ahmed Ghazy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
