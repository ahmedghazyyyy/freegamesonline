import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Game } from '../types';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = React.useState(false);

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
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          {isPlaying && game.gameUrl ? (
            <iframe 
              src={game.gameUrl}
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              title={game.title}
            ></iframe>
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
              
              <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg leading-relaxed">
                {game.description}
              </p>
              
              <button 
                onClick={handlePlay}
                className="px-12 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-black uppercase tracking-widest transition-all transform hover:scale-110 shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center gap-3 mx-auto"
              >
                <i className="fa-solid fa-play"></i> {t('play_now')}
              </button>
              
              {!game.gameUrl && (
                <p className="mt-4 text-xs text-slate-500 italic">
                  * This is a demo placeholder. GameMonetize integration active.
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
             <button className="hover:text-white flex items-center gap-2 transition-colors"><i className="fa-solid fa-expand"></i> {t('fullscreen')}</button>
             <button className="hover:text-white flex items-center gap-2 transition-colors"><i className="fa-solid fa-share-nodes"></i> {t('share')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
