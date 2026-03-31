import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryFilter } from '../components/CategoryFilter';
import { GameCard } from '../components/GameCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { GAMES } from '../constants';
import { SEO } from '../components/SEO';
import { Game, GameCategory } from '../types';

interface GamesProps {
  onPlay: (game: Game) => void;
  games: Game[];
  isLoading: boolean;
}

export const Games: React.FC<GamesProps> = ({ onPlay, games, isLoading }) => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>(() => {
    const saved = localStorage.getItem('selectedCategory');
    if (saved && Object.values(GameCategory).includes(saved as GameCategory)) {
      return saved as GameCategory;
    }
    return GameCategory.ALL;
  });

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
    setVisibleCount(12); // Reset count when category changes
  }, [selectedCategory]);

  const filteredGames = useMemo(() => {
    if (selectedCategory === GameCategory.ALL) return games;
    return games.filter(g => g.category === selectedCategory);
  }, [selectedCategory, games]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, filteredGames.length));
  };

  // Infinite scroll observer
  const observerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredGames.length) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredGames.length]);

  return (
    <section className="py-12 container mx-auto px-4 min-h-screen">
      <SEO 
        title={t('popular_games')} 
        description={`Browse our collection of ${selectedCategory !== GameCategory.ALL ? selectedCategory : 'all'} games. Play instantly in your browser!`}
        canonical="/games"
      />
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          filteredGames.slice(0, visibleCount).map((game) => (
            <div key={game.id} className="animate-fade-in">
              <GameCard game={game} onPlay={onPlay} />
            </div>
          ))
        )}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={observerRef} className="h-10 mt-4"></div>

      {visibleCount < filteredGames.length && (
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

      {filteredGames.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">👾</div>
          <h3 className="text-2xl font-bold text-white mb-2">{t('no_games_found')}</h3>
          <p className="text-slate-400">{t('try_different_category')}</p>
        </div>
      )}
    </section>
  );
};
