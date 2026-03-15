import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface HeroProps {
  featuredGame: Game;
  onPlay: (game: Game) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredGame, onPlay }) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={featuredGame.imageUrl} 
          alt={featuredGame.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-gaming-dark/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gaming-dark/90 via-gaming-dark/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/50 backdrop-blur-md text-brand-300 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            {t('featured_game_week')}
          </div>
          
          <h2 className="font-titan text-5xl md:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 drop-shadow-lg">
            {featuredGame.title}
          </h2>
          
          <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed max-w-xl text-shadow-sm">
            {featuredGame.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => onPlay(featuredGame)}
              className="relative px-8 py-4 bg-cta-600 rounded-full font-bold text-white uppercase tracking-wider overflow-hidden group/btn shadow-neon-orange hover:shadow-orange-500/50 transition-all transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cta-gradientStart to-cta-gradientEnd opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                <i className="fa-solid fa-play"></i> {t('play_now')}
              </span>
            </button>
            
            <Link 
              to={`/game/${featuredGame.id}`}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-white uppercase tracking-wider backdrop-blur-md transition-all flex items-center justify-center"
            >
              {t('more_info')}
            </Link>
          </div>
          
          <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
             <div className="flex items-center gap-2">
               <i className="fa-solid fa-star text-yellow-400"></i>
               <span className="text-white font-bold">{featuredGame.rating}</span> {t('rating')}
             </div>
             <div className="flex items-center gap-2">
               <i className="fa-solid fa-users text-brand-400"></i>
               <span className="text-white font-bold">{featuredGame.players}</span> {t('players')}
             </div>
             <div className="flex items-center gap-2">
               <i className="fa-solid fa-gamepad text-accent-400"></i>
               <span className="text-white font-bold">{t(featuredGame.category.toLowerCase())}</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gaming-dark to-transparent"></div>
    </div>
  );
};
