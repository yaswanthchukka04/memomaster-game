import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { DifficultyId, GameModeId } from '../types/game';
import { DIFFICULTY_CONFIGS, GAME_MODES } from '../data/cardsData';
import { ScoreBreakdown, formatTime } from '../utils/scoring';
import { soundManager } from '../utils/audio';

interface VictoryModalProps {
  modeId: GameModeId;
  difficulty: DifficultyId;
  scoreBreakdown: ScoreBreakdown;
  timeSeconds: number;
  moves: number;
  isNewRecord: boolean;
  unlockedAchievements: string[];
  onPlayAgain: () => void;
  onNextDifficulty: () => void;
  onSelectNewGame: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  modeId,
  difficulty,
  scoreBreakdown,
  timeSeconds,
  moves,
  isNewRecord,
  unlockedAchievements,
  onPlayAgain,
  onNextDifficulty,
  onSelectNewGame,
}) => {
  const [copied, setCopied] = useState(false);
  const modeInfo = GAME_MODES.find((m) => m.id === modeId) || GAME_MODES[0];
  const diffConfig = DIFFICULTY_CONFIGS[difficulty];

  useEffect(() => {
    // Sound & Confetti trigger
    soundManager.playVictory();

    // Trigger dual cannon confetti
    try {
      const end = Date.now() + 1200;
      const colors = ['#a855f7', '#3b82f6', '#ec4899', '#10b981', '#f59e0b'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // fallback
    }
  }, []);

  const handleShare = () => {
    soundManager.playClick();
    const starsEmoji = '⭐'.repeat(scoreBreakdown.stars) + '☆'.repeat(3 - scoreBreakdown.stars);
    const text = `🧠 MEMO MASTER Victory!\nMode: ${modeInfo.name} (${diffConfig.name})\nScore: ${scoreBreakdown.totalScore.toLocaleString()} pts | Rating: ${starsEmoji}\nTime: ${formatTime(timeSeconds)} | Moves: ${moves} (${scoreBreakdown.accuracy}% accuracy)\nPlay online: ${window.location.origin}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const hasNextDifficulty = difficulty !== 'expert';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-500/20 text-center">
        {/* Glowing aura */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />

        {/* Top Celebration Icon & Stars */}
        <div className="relative mb-3 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/40 mb-3 text-3xl">
            🏆
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Puzzle Solved!
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {modeInfo.name} · {diffConfig.name} ({diffConfig.pairs} Pairs)
          </p>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {[1, 2, 3].map((starIndex) => (
              <span
                key={starIndex}
                className={`text-2xl sm:text-3xl transition-transform ${
                  starIndex <= scoreBreakdown.stars
                    ? 'text-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                    : 'text-slate-700'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Record Badge */}
        {isNewRecord && (
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <span>✨</span>
            <span>New Personal Best Record!</span>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5 text-left">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
            <span className="block text-[11px] font-medium text-slate-400">Total Score</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-purple-300 tabular-nums">
              {scoreBreakdown.totalScore.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
            <span className="block text-[11px] font-medium text-slate-400">Time Taken</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300 tabular-nums">
              {formatTime(timeSeconds)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
            <span className="block text-[11px] font-medium text-slate-400">Total Moves</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-300 tabular-nums">
              {moves}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50">
            <span className="block text-[11px] font-medium text-slate-400">Accuracy</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-rose-300 tabular-nums">
              {scoreBreakdown.accuracy}%
            </span>
          </div>
        </div>

        {/* Score Details Drawer */}
        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 mb-5 text-xs text-slate-300 space-y-1 text-left">
          <div className="flex justify-between">
            <span className="text-slate-400">Base Match Points:</span>
            <span className="font-mono tabular-nums text-slate-200">+{scoreBreakdown.baseScore}</span>
          </div>
          {scoreBreakdown.timeBonus > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-400">Speed Bonus:</span>
              <span className="font-mono tabular-nums text-cyan-400">+{scoreBreakdown.timeBonus}</span>
            </div>
          )}
          {scoreBreakdown.streakBonus > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-400">Streak Bonus:</span>
              <span className="font-mono tabular-nums text-emerald-400">+{scoreBreakdown.streakBonus}</span>
            </div>
          )}
          {scoreBreakdown.hintPenalty > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-400">Hints Penalty:</span>
              <span className="font-mono tabular-nums text-rose-400">-{scoreBreakdown.hintPenalty}</span>
            </div>
          )}
        </div>

        {/* Unlocked Achievements list */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left">
            <span className="block text-xs font-semibold text-amber-300 mb-1">
              🎖️ Unlocked Achievement:
            </span>
            <div className="space-y-1">
              {unlockedAchievements.map((title) => (
                <div key={title} className="text-xs text-slate-200 flex items-center gap-1.5">
                  <span className="text-amber-400">★</span>
                  <span className="font-medium">{title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onPlayAgain();
            }}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            Play Again
          </button>

          {hasNextDifficulty && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNextDifficulty();
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white border border-purple-500/30 font-semibold text-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              Next Difficulty →
            </button>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-semibold text-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
            title="Copy score card to clipboard"
          >
            {copied ? '✓ Copied!' : '📋 Share'}
          </button>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onSelectNewGame();
            }}
            className="text-xs text-slate-400 hover:text-slate-200 underline transition-colors cursor-pointer"
          >
            Choose Different Mode or Difficulty
          </button>
        </div>
      </div>
    </div>
  );
};
