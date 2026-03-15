import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { GameCard } from '../components/GameCard';
import { GAMES } from '../constants';
import { Game } from '../types';

interface HomeProps {
  onPlay: (game: Game) => void;
  recentlyPlayedGames: Game[];
  handleRandomPlay: () => void;
}

export const Home: React.FC<HomeProps> = ({ onPlay, recentlyPlayedGames, handleRandomPlay }) => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(24);
  const featuredGame = GAMES.find(g => g.isFeatured) || GAMES[0];
  
  const trendingGames = useMemo(() => {
    return [...GAMES].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }, []);

  const allGames = useMemo(() => {
    return GAMES.slice(0, 32);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, 32));
  };

  return (
    <div>
      <Hero featuredGame={featuredGame} onPlay={onPlay} />

      {recentlyPlayedGames.length > 0 && (
        <section className="py-12 bg-gaming-dark/50 border-b border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="font-titan text-2xl md:text-3xl text-white mb-8 flex items-center gap-3">
              <i className="fa-solid fa-clock-rotate-left text-brand-400"></i> {t('recently_played')}
            </h2>
            
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 snap-x">
              {recentlyPlayedGames.map((game) => (
                <div key={game.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                  <GameCard game={game} onPlay={onPlay} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Section */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="font-titan text-3xl text-white mb-8 flex items-center gap-3">
          <i className="fa-solid fa-bolt text-yellow-400"></i> {t('trending_now')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingGames.map((game) => (
            <div key={game.id} className="animate-fade-in">
              <GameCard game={game} onPlay={onPlay} />
            </div>
          ))}
        </div>
      </section>

      {/* All Games Grid with Load More */}
      <section className="py-12 container mx-auto px-4 border-t border-white/5">
        <h2 className="font-titan text-3xl text-white mb-8 flex items-center gap-3">
          <i className="fa-solid fa-gamepad text-brand-400"></i> {t('popular_games')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allGames.slice(0, visibleCount).map((game) => (
            <div key={game.id} className="animate-fade-in">
              <GameCard game={game} onPlay={onPlay} />
            </div>
          ))}
        </div>
        
        {visibleCount < 32 && (
          <div className="mt-12 text-center">
            <button 
              onClick={handleLoadMore}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all hover:scale-105 flex items-center gap-2 mx-auto group"
            >
              <i className="fa-solid fa-plus group-hover:rotate-90 transition-transform"></i>
              {t('load_more')}
            </button>
          </div>
        )}
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-900/50 to-gaming-dark border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-titan text-4xl mb-6 text-white">{t('no_registration_title')}</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            {t('no_registration_desc')}
          </p>
          <button 
            onClick={handleRandomPlay}
            className="px-10 py-4 bg-white text-gaming-dark font-black uppercase tracking-wider rounded-full hover:bg-brand-200 transition-colors transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 mx-auto"
          >
            <i className="fa-solid fa-shuffle"></i> {t('play_random')}
          </button>
        </div>
      </section>
    </div>
  );
};
