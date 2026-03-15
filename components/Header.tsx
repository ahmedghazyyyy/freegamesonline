import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { GAMES } from '../constants';

interface HeaderProps {
  onPlay: (game: Game) => void;
}

export const Header: React.FC<HeaderProps> = ({ onPlay }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'ru', name: 'Русский' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'th', name: 'ไทย' },
    { code: 'pl', name: 'Polski' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'el', name: 'Ελληνικά' }
  ];

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const results = query.trim() === '' 
    ? [] 
    : GAMES.filter(g => 
        g.title.toLowerCase().includes(query.toLowerCase()) || 
        g.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      const targetGame = selectedIndex >= 0 ? results[selectedIndex] : results[0];
      if (targetGame) {
        onPlay(targetGame);
        setIsFocused(false);
        setQuery('');
        setSelectedIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-gaming-dark/80 border-b border-white/10 shadow-neon">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform opacity-75 blur-md animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-accent-400 rounded-xl -rotate-6 group-hover:-rotate-12 transition-transform opacity-75 blur-md animate-pulse-slow animation-delay-2000"></div>
            <div className="relative bg-gaming-surface p-2 rounded-xl border border-white/20 shadow-xl">
              <i className="fa-solid fa-gamepad text-2xl text-transparent bg-clip-text bg-gradient-to-br from-brand-400 to-accent-400"></i>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="font-titan text-2xl leading-none tracking-wider uppercase relative">
              <span className="logo-text-base absolute inset-0 text-gaming-dark" aria-hidden="true">Free Games Online</span>
              <span className="logo-gradient-mix relative z-10 animate-title-glow">Free Games Online</span>
            </h1>
            <div className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse box-shadow-neon-green"></span>
              <span className="logo-inner-online opacity-90">Play Instantly</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { key: 'nav_home', path: '/' },
            { key: 'games', path: '/games' },
            { key: 'about', path: '/about' },
            { key: 'contact', path: '/contact' }
          ].map((item) => (
            <Link 
              key={item.key} 
              to={item.path} 
              className="font-display font-medium text-slate-300 hover:text-white hover:text-glow transition-all text-sm uppercase tracking-widest relative group"
            >
              {t(item.key)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Actions & Search */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all border border-white/10"
                title="Change Language"
                aria-label="Change Language"
              >
                <i className="fa-solid fa-globe"></i>
              </button>
              
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-gaming-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[110] animate-fade-in-up max-h-80 overflow-y-auto scrollbar-hide">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-white/5 last:border-0 flex items-center justify-between ${
                        i18n.language === lang.code ? 'bg-brand-500/20 text-brand-400 font-bold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{lang.name}</span>
                      {i18n.language === lang.code && <i className="fa-solid fa-check text-xs"></i>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={searchRef}>
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 w-40 md:w-64 transition-all"
                placeholder={t('search_placeholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              )}
            </div>
            
            {/* Search Dropdown Results */}
            {isFocused && query.trim().length > 0 && (
              <div className="absolute top-full right-0 mt-3 w-72 md:w-80 bg-gaming-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] animate-fade-in-up">
                {results.length > 0 ? (
                  results.map((game, index) => (
                    <div 
                      key={game.id}
                      className={`flex items-center gap-3 p-3 transition-colors cursor-pointer border-b border-white/5 last:border-0 ${
                        selectedIndex === index ? 'bg-brand-500/20 border-l-4 border-l-brand-500' : 'hover:bg-white/5'
                      }`}
                      onClick={() => {
                        onPlay(game);
                        setIsFocused(false);
                        setQuery('');
                        setSelectedIndex(-1);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <img src={game.imageUrl} alt={game.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-white text-sm line-clamp-1">{game.title}</h4>
                        <span className="text-[10px] text-brand-400 uppercase tracking-wider">{t(game.category.toLowerCase())}</span>
                      </div>
                      {selectedIndex === index && (
                        <i className="fa-solid fa-play text-brand-400 text-xs animate-pulse"></i>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-400 text-sm flex flex-col items-center gap-3 bg-gaming-dark/40">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <i className="fa-solid fa-magnifying-glass text-slate-600"></i>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-white">{t('no_games_found')}</span>
                      <span className="text-xs opacity-60">{t('try_different_category')}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};