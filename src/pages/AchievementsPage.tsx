import React, { useState, useEffect } from 'react';
import { Achievement } from '../types/game';
import { loadAchievements } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface AchievementsPageProps {
  onPlayNow: () => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onPlayNow }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(loadAchievements());
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  useEffect(() => {
    setAchievements(loadAchievements());
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlockedAt !== null).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const filtered = achievements.filter((a) => {
    if (activeFilter === 'unlocked') return a.unlockedAt !== null;
    if (activeFilter === 'locked') return a.unlockedAt === null;
    return true;
  });

  return (
    <div className="py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
          <span>🎖️</span>
          <span>Hall of Trophies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
          Achievements & Medals
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Prove your cognitive prowess by unlocking trophies across speed, accuracy, game modes, and mastery.
        </p>

        {/* Global Progress Bar */}
        <div className="max-w-md mx-auto pt-4">
          <div className="flex justify-between items-center text-xs font-mono mb-2 text-slate-400">
            <span>Overall Progress</span>
            <span className="text-amber-400 font-bold">{unlockedCount} / {totalCount} ({completionPercentage}%)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-purple-500 to-indigo-500 transition-all duration-500 shadow-sm"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setActiveFilter('all');
          }}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          All ({totalCount})
        </button>
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setActiveFilter('unlocked');
          }}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeFilter === 'unlocked'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Unlocked ({unlockedCount})
        </button>
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setActiveFilter('locked');
          }}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeFilter === 'locked'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Locked ({totalCount - unlockedCount})
        </button>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ach) => {
          const isUnlocked = ach.unlockedAt !== null;

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5 hover:border-amber-400/70'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-70 hover:opacity-90'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border shadow-inner ${
                      isUnlocked
                        ? 'bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? '🏆' : '🔒'}
                  </div>

                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400">
                    {ach.category}
                  </span>
                </div>

                <h3
                  className={`text-base font-bold transition-colors ${
                    isUnlocked ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5">
                {isUnlocked ? (
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-medium">
                    <span className="flex items-center gap-1">
                      <span>✓</span>
                      <span>Unlocked</span>
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">
                      {new Date(ach.unlockedAt!).toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>{ach.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-purple-500/50 rounded-full"
                        style={{ width: `${ach.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Play Prompt */}
      <div className="text-center pt-6">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onPlayNow();
          }}
          className="py-3 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          Play Game to Earn More Badges →
        </button>
      </div>
    </div>
  );
};
