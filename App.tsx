import React, { useState, useMemo, Suspense, lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { GAMES as STATIC_GAMES } from './constants';
import { Game } from './types';
import { fetchGames } from './services/gameService';

// Pages
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { GameDetail } from './pages/GameDetail';

// Lazy load components
const GameModal = lazy(() => import('./components/GameModal').then(module => ({ default: module.GameModal })));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const { t } = useTranslation();
  const [games, setGames] = useState<Game[]>(STATIC_GAMES);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentlyPlayed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse recently played games', e);
        return [];
      }
    }
    return [];
  });

  // Fetch games from GameMonetize
  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      const dynamicGames = await fetchGames();
      if (dynamicGames && dynamicGames.length > 0) {
        setGames(dynamicGames);
      }
      setIsLoading(false);
    };
    loadGames();
  }, []);

  // Persist recently played to localStorage
  useEffect(() => {
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const handlePlayGame = (game: Game) => {
    setActiveGame(game);
    
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(id => id !== game.id);
      return [game.id, ...filtered].slice(0, 4);
    });
  };

  // Recently Played Games
  const recentlyPlayedGames = useMemo(() => {
    return recentlyPlayed
      .map(id => games.find(g => g.id === id))
      .filter((g): g is Game => !!g);
  }, [recentlyPlayed, games]);

  const handleRandomPlay = () => {
    if (games.length === 0) return;
    const randomGame = games[Math.floor(Math.random() * games.length)];
    handlePlayGame(randomGame);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gaming-dark">
      <ScrollToTop />
      <SEO gameData={activeGame || undefined} />
      <Header onPlay={handlePlayGame} games={games} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <Home 
              onPlay={handlePlayGame} 
              recentlyPlayedGames={recentlyPlayedGames} 
              handleRandomPlay={handleRandomPlay} 
              games={games}
              isLoading={isLoading}
            />
          } />
          <Route path="/games" element={<Games onPlay={handlePlayGame} games={games} isLoading={isLoading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/game/:id" element={<GameDetail onPlay={handlePlayGame} games={games} />} />
        </Routes>
      </main>

      <Footer />

      {/* Game Modal */}
      {activeGame && (
        <Suspense fallback={
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-brand-400 font-bold animate-pulse">{t('loading_game')}</p>
            </div>
          </div>
        }>
          <GameModal game={activeGame} onClose={() => setActiveGame(null)} />
        </Suspense>
      )}

      {/* Global Loading Indicator for initial fetch */}
      {isLoading && (
        <div className="fixed bottom-4 right-4 z-[200] bg-gaming-surface border border-white/10 px-4 py-2 rounded-full shadow-neon flex items-center gap-3 animate-fade-in">
          <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-white font-bold uppercase tracking-widest">{t('syncing_games')}</span>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
