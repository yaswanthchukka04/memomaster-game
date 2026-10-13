import React from 'react';
import { GameModeId, DifficultyId } from '../types/game';
import { GAME_MODES, DIFFICULTY_CONFIGS } from '../data/cardsData';
import { soundManager } from '../utils/audio';

interface HomePageProps {
  onStartGame: (modeId: GameModeId, difficulty: DifficultyId) => void;
  onNavigateToInstructions: () => void;
  onNavigateToStats: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartGame,
  onNavigateToInstructions,
  onNavigateToStats,
}) => {
  return (
    <div className="space-y-20 py-6 sm:py-10">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-950 border border-purple-500/20 p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-6">
            <span>✨</span>
            <span>Brain Training & Cognitive Play</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight text-balance">
            Sharpen Your Focus with{' '}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
              MEMO MASTER
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            A premier memory match game inspired by the classics. Flip cards, discover hidden pairs,
            chain high streaks, and train your working memory across 5 thematic modes and 4 difficulty tiers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onStartGame('emoji', 'easy');
              }}
              className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              Play Now · Start Free
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateToInstructions();
              }}
              className="py-3.5 px-6 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              Game Instructions
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateToStats();
              }}
              className="py-3.5 px-6 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-purple-300 hover:text-white border border-purple-500/30 font-semibold text-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              📊 View My Records
            </button>
          </div>

          {/* Quick highlight metric bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-300">
            <div>
              <span className="block text-2xl font-bold font-mono text-purple-300 tabular-nums">5</span>
              <span className="text-xs text-slate-400">Game Modes</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-mono text-cyan-300 tabular-nums">4</span>
              <span className="text-xs text-slate-400">Difficulty Levels</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-mono text-emerald-300 tabular-nums">100%</span>
              <span className="text-xs text-slate-400">Offline & Free</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-mono text-amber-300 tabular-nums">3D</span>
              <span className="text-xs text-slate-400">Smooth Card Flips</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5 GAME MODES SHOWCASE ================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
              Select Your Arena
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Five Unique Game Modes
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Each mode provides dedicated card artwork, custom motifs, and distinct cognitive challenges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_MODES.map((mode) => (
            <div
              key={mode.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {mode.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {mode.badgeText}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {mode.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {mode.description}
                </p>

                {/* Miniature sample card row */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-around text-xl">
                  <span>{mode.cardPreviewIcon}</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs font-mono text-purple-400">24 Pairs Deck</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span>🧠</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onStartGame(mode.id, 'easy');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white font-semibold text-xs transition-all cursor-pointer whitespace-nowrap text-center"
                >
                  Play {mode.shortName} Mode →
                </button>
              </div>
            </div>
          ))}

          {/* Quick Random Match Card */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border border-purple-500/30 p-6 flex flex-col justify-between hover:border-purple-400/60 transition-all hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-2xl mb-4">
                🎲
              </div>
              <h3 className="text-xl font-bold text-white">Surprise Me!</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Can't decide? Let Memo Master select a random game mode and difficulty for you.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  const modes: GameModeId[] = ['emoji', 'animal', 'fruit', 'number', 'picture'];
                  const diffs: DifficultyId[] = ['easy', 'medium', 'hard'];
                  const randomMode = modes[Math.floor(Math.random() * modes.length)];
                  const randomDiff = diffs[Math.floor(Math.random() * diffs.length)];
                  onStartGame(randomMode, randomDiff);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap text-center"
              >
                Launch Random Match ⚡
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DIFFICULTY LEVELS ================= */}
      <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-10">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
            Skill Tiers
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Four Difficulty Levels
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Start light and work your way up to the intense 48-card Expert grid.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(DIFFICULTY_CONFIGS).map((diff) => (
            <div
              key={diff.id}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-white capitalize">{diff.name}</h4>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {diff.pairs} Pairs
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {diff.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                <span>{diff.totalCards} Total Cards</span>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onStartGame('emoji', diff.id);
                  }}
                  className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                >
                  Play {diff.name} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS (3 STEPS) ================= */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            How to Master the Game
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Simple to understand, deeply rewarding to master.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left">
            <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-mono font-bold flex items-center justify-center text-sm mb-4">
              01
            </span>
            <h3 className="text-lg font-bold text-white mb-2">Flip Two Cards</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Click or tap any two hidden cards on the grid. Memorize their location, face, and details.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm mb-4">
              02
            </span>
            <h3 className="text-lg font-bold text-white mb-2">Match the Pairs</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              If the cards match, they stay revealed and award points. Mismatched cards flip back after a brief glance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm mb-4">
              03
            </span>
            <h3 className="text-lg font-bold text-white mb-2">Claim High Scores</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Clear the entire board in the fewest moves and fastest time to unlock 3 stars and earn badges!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
