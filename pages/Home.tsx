import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { GameCard } from '../components/GameCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { GAMES } from '../constants';
import { SEO } from '../components/SEO';
import { Game } from '../types';

interface HomeProps {
  onPlay: (game: Game) => void;
  recentlyPlayedGames: Game[];
  handleRandomPlay: () => void;
  games: Game[];
  isLoading: boolean;
}

export const Home: React.FC<HomeProps> = ({ onPlay, recentlyPlayedGames, handleRandomPlay, games, isLoading }) => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(12);
  const featuredGame = games.find(g => g.isFeatured) || games[0];
  
  const trendingGames = useMemo(() => {
    return [...games].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }, [games]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, games.length));
  };

  // Infinite scroll observer
  const observerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < games.length) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, games.length]);

  return (
    <div>
      <SEO />
      <Hero featuredGame={featuredGame} onPlay={onPlay} onRandomPlay={handleRandomPlay} />

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
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            games.slice(0, visibleCount).map((game) => (
              <div key={game.id} className="animate-fade-in">
                <GameCard game={game} onPlay={onPlay} />
              </div>
            ))
          )}
        </div>
        
        {/* Sentinel for infinite scroll */}
        <div ref={observerRef} className="h-10 mt-4"></div>
        
        {visibleCount < games.length && (
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
            className="group relative px-12 py-5 bg-white text-gaming-dark font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-[0_20px_50px_rgba(255,255,255,0.2)] flex items-center gap-4 mx-auto overflow-hidden active:scale-95"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-brand-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
            
            <div className="relative flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gaming-dark/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-shuffle text-sm"></i>
              </div>
              <span className="text-lg">{t('play_random')}</span>
            </div>
            
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-white rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
          </button>
        </div>
      </section>
    </div>
  );
};
