import React from 'react';
import { useTranslation } from 'react-i18next';
import { GameCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <h2 className="font-titan text-3xl md:text-4xl text-white drop-shadow-lg flex items-center gap-3">
        <i className="fa-solid fa-fire text-orange-500 animate-pulse"></i> {t('popular_games')}
      </h2>
      
      <div className="flex flex-wrap gap-2">
        {Object.values(GameCategory).map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              selectedCategory === cat 
                ? 'bg-brand-600 text-white shadow-neon scale-105' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {t(cat.toLowerCase())}
          </button>
        ))}
      </div>
    </div>
  );
};
