import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface HeroProps {
  featuredGame: Game;
  onPlay: (game: Game) => void;
  onRandomPlay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredGame, onPlay, onRandomPlay }) => {
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
              className="group/btn relative px-10 py-5 bg-gradient-to-r from-cta-gradientStart to-cta-gradientEnd rounded-2xl font-black text-white uppercase tracking-[0.2em] transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-[0_20px_50px_rgba(245,158,11,0.4)] flex items-center gap-4 overflow-hidden active:scale-95"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
              
              <div className="relative flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover/btn:scale-110 transition-transform duration-300">
                  <i className="fa-solid fa-play text-sm ml-0.5"></i>
                </div>
                <span className="text-lg">{t('play_now')}</span>
              </div>
              
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500 -z-10"></div>
            </button>
            
            <Link 
              to={`/game/${featuredGame.id}`}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-white uppercase tracking-wider backdrop-blur-md transition-all flex items-center justify-center"
            >
              {t('more_info')}
            </Link>

            <button 
              onClick={onRandomPlay}
              className="px-8 py-4 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 rounded-full font-bold text-brand-300 uppercase tracking-wider backdrop-blur-md transition-all flex items-center justify-center gap-2 group/random"
            >
              <i className="fa-solid fa-shuffle group-hover/random:rotate-180 transition-transform duration-500"></i>
              {t('play_random')}
            </button>
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
