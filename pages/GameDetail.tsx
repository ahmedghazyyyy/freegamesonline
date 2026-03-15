import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GAMES } from '../constants';
import { GameCard } from '../components/GameCard';
import { Game } from '../types';

interface GameDetailProps {
  onPlay: (game: Game) => void;
}

export const GameDetail: React.FC<GameDetailProps> = ({ onPlay }) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const game = useMemo(() => GAMES.find(g => g.id === id), [id]);

  const relatedGames = useMemo(() => {
    if (!game) return [];
    return GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 4);
  }, [game]);

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-3xl font-titan mb-4">{t('game_not_found')}</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-brand-500 rounded-full font-bold"
        >
          {t('back_to_home')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gaming-dark text-white pb-20">
      {/* Hero Section for Game Detail */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={game.imageUrl} 
          alt={game.title}
          className="w-full h-full object-cover opacity-40 blur-sm"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark to-transparent"></div>
        
        <div className="container mx-auto px-4 absolute inset-0 flex flex-col justify-center items-center text-center">
          <img 
            src={game.imageUrl} 
            alt={game.title}
            className="w-48 h-48 md:w-64 md:h-64 rounded-3xl object-cover shadow-neon mb-6 border-4 border-white/10"
            referrerPolicy="no-referrer"
          />
          <h1 className="font-titan text-4xl md:text-6xl mb-2">{game.title}</h1>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="px-3 py-1 bg-brand-500/20 rounded-full text-brand-400 text-sm font-bold uppercase">
              {t(game.category.toLowerCase())}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <i className="fa-solid fa-star"></i>
              <span className="font-bold">{game.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-users"></i>
              <span>{game.players} {t('players')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h2 className="font-titan text-2xl mb-4 text-brand-400">{t('about_game')}</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {game.description}
              </p>
            </section>

            <section>
              <h2 className="font-titan text-2xl mb-6 flex items-center gap-3">
                <i className="fa-solid fa-gamepad text-accent-400"></i> {t('related_games')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedGames.map(g => (
                  <GameCard key={g.id} game={g} onPlay={() => navigate(`/game/${g.id}`)} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-brand-600 to-brand-900 p-8 rounded-3xl shadow-neon text-center">
              <h3 className="font-titan text-2xl mb-4">{t('ready_to_play')}</h3>
              <p className="text-brand-100 mb-6">{t('no_download_required')}</p>
              <button 
                className="w-full py-4 bg-white text-brand-900 font-black uppercase tracking-widest rounded-xl hover:bg-brand-100 transition-all transform hover:scale-105 shadow-xl"
                onClick={() => onPlay(game)}
              >
                {t('play_now')}
              </button>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h3 className="font-bold mb-4 uppercase tracking-wider text-sm text-slate-400">{t('game_info')}</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-500">{t('category')}</span>
                  <span className="text-white font-bold">{t(game.category.toLowerCase())}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">{t('rating')}</span>
                  <span className="text-yellow-400 font-bold">{game.rating}/5.0</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">{t('platform')}</span>
                  <span className="text-white font-bold">Web Browser</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
