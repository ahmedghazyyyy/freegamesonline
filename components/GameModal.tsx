import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Game } from '../types';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    // Trigger GameMonetize Ad if SDK is available
    if ((window as any).sdk && typeof (window as any).sdk.showBanner === 'function') {
      (window as any).sdk.showBanner();
    }
  };

  const toggleFullscreen = () => {
    if (!gameContainerRef.current) return;

    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl bg-gaming-surface border border-white/10 rounded-none md:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full md:h-[90vh] animate-blob-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gaming-dark">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10">
               <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
             </div>
             <div>
               <h3 className="text-white font-bold text-lg leading-tight">{game.title}</h3>
               <p className="text-brand-400 text-xs font-bold uppercase tracking-wider">{t(game.category.toLowerCase())}</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
              title={isPlaying ? "Stop" : "Play"}
            >
              <i className={`fa-solid ${isPlaying ? 'fa-stop' : 'fa-play'}`}></i>
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center text-white transition-all shadow-lg"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div 
          ref={gameContainerRef}
          className="flex-1 bg-black relative flex items-center justify-center overflow-y-auto"
        >
          {isPlaying && game.gameUrl ? (
            <div className="w-full h-full relative">
              <iframe 
                src={game.gameUrl}
                className="w-full h-full border-0 relative z-10"
                allow="autoplay; gamepad; fullscreen; keyboard; accelerometer; gyroscope"
                allowFullScreen
                scrolling="no"
                title={game.title}
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center -z-0">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 text-sm">{t('loading_game')}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 animate-fade-in">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-brand-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-full h-full bg-gaming-surface rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl transform rotate-3">
                  <i className="fa-solid fa-gamepad text-5xl text-brand-500"></i>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-titan text-white mb-4 tracking-tight">
                {game.title}
              </h2>
              
              <p className="text-slate-400 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed line-clamp-3">
                {game.description}
              </p>
              
              <button 
                onClick={handlePlay}
                className="group relative px-12 py-5 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 bg-[length:200%_auto] hover:bg-[right_center] text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-[0_20px_50px_rgba(139,92,246,0.4)] flex items-center gap-4 mx-auto overflow-hidden active:scale-95"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                
                <div className="relative flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <i className="fa-solid fa-play text-sm ml-0.5"></i>
                  </div>
                  <span className="text-lg">{t('play_now')}</span>
                </div>
                
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-accent-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              </button>
              
              {!game.gameUrl && (
                <p className="mt-6 text-xs text-slate-500 italic bg-white/5 p-3 rounded-lg border border-white/5">
                  <i className="fa-solid fa-circle-info mr-2"></i>
                  This game is currently in preview mode. Full integration coming soon.
                </p>
              )}
            </div>
          )}
          
          {/* Loading Bar (only if playing) */}
          {isPlaying && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-20">
              <div className="h-full bg-gradient-to-r from-brand-500 to-accent-400 animate-shimmer w-full"></div>
            </div>
          )}
        </div>

        {/* Controls / Info */}
        <div className="p-4 bg-gaming-dark border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-slate-400 text-sm">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><i className="fa-solid fa-arrows-up-down-left-right text-brand-500"></i> {t('move')}</span>
            <span className="flex items-center gap-2"><i className="fa-regular fa-keyboard text-brand-500"></i> {t('jump')}</span>
          </div>
          <div className="flex gap-4">
             {game.gameUrl && (
               <a 
                 href={game.gameUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="hover:text-white flex items-center gap-2 transition-colors px-3 py-1 rounded-lg bg-white/5 border border-white/5"
               >
                 <i className="fa-solid fa-up-right-from-square text-xs"></i> {t('open_new_tab')}
               </a>
             )}
             <button 
               onClick={toggleFullscreen}
               className="hover:text-white flex items-center gap-2 transition-colors"
             >
               <i className="fa-solid fa-expand"></i> {t('fullscreen')}
             </button>
             <button className="hover:text-white flex items-center gap-2 transition-colors"><i className="fa-solid fa-share-nodes"></i> {t('share')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
