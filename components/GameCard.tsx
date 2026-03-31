import React from 'react';
import { useTranslation } from 'react-i18next';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div 
      className="group relative bg-gaming-surface rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/50 transition-all duration-300 hover:shadow-neon hover:-translate-y-2 cursor-pointer"
      onClick={() => onPlay(game)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-surface via-transparent to-transparent opacity-80"></div>
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center shadow-neon animate-play-bounce text-white text-2xl">
            <i className="fa-solid fa-play ml-1"></i>
          </div>
        </div>
        
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
            {t(game.category.toLowerCase())}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-300 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">
            <i className="fa-solid fa-star text-[10px]"></i>
            {game.rating}
          </div>
        </div>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-user-group text-brand-500"></i> {game.players}
          </span>
          <button className="px-4 py-1.5 bg-brand-500/10 hover:bg-brand-500 text-brand-400 hover:text-white rounded-lg transition-all duration-300 uppercase tracking-widest font-bold text-[10px] border border-brand-500/20 hover:border-brand-500 shadow-lg hover:shadow-neon flex items-center gap-2">
            {t('play_now')} <i className="fa-solid fa-play text-[8px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};