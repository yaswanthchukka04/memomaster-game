import React, { useState, useEffect } from 'react';
import { PlayerStats, GameModeId, DifficultyId } from '../types/game';
import { loadStats, resetAllData } from '../utils/storage';
import { GAME_MODES, DIFFICULTY_CONFIGS } from '../data/cardsData';
import { formatTime } from '../utils/scoring';
import { soundManager } from '../utils/audio';

interface StatsPageProps {
  onStartGame: (modeId: GameModeId, difficulty: DifficultyId) => void;
}

export const StatsPage: React.FC<StatsPageProps> = ({ onStartGame }) => {
  const [stats, setStats] = useState<PlayerStats>(loadStats());
  const [filterMode, setFilterMode] = useState<GameModeId | 'all'>('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const handleResetData = () => {
    soundManager.playClick();
    resetAllData();
    setStats(loadStats());
    setShowResetConfirm(false);
  };

  const filteredHistory = stats.history.filter(
    (h) => filterMode === 'all' || h.modeId === filterMode
  );

  const filteredLeaderboard = stats.leaderboard.filter(
    (entry) => filterMode === 'all' || entry.modeId === filterMode
  );

  return (
    <div className="py-6 sm:py-10 space-y-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-2">
            <span>📊</span>
            <span>Player Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            My Statistics & Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your cognitive improvements, personal best scores, and local leaderboard records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setShowResetConfirm(true);
          }}
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/30 text-xs font-medium transition-all cursor-pointer whitespace-nowrap"
        >
          Reset Local Data
        </button>
      </div>

      {/* ================= KEY METRICS TILES ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total Games</span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-purple-300 tabular-nums">
            {stats.totalGames}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Victories</span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300 tabular-nums">
            {stats.totalWins}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Win Rate</span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300 tabular-nums">
            {stats.totalGames > 0 ? `${Math.round((stats.totalWins / stats.totalGames) * 100)}%` : '0%'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Pairs Matched</span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 tabular-nums">
            {stats.totalPairsMatched}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total Moves</span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-rose-300 tabular-nums">
            {stats.totalMoves}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Time Played</span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-200 tabular-nums">
            {formatTime(stats.totalPlayTimeSeconds)}
          </span>
        </div>
      </div>

      {/* ================= LOCAL LEADERBOARD ================= */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                Local Leaderboard
              </h2>
              <span className="text-xs font-mono font-medium text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                Saved Locally on Device
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Top performances achieved on this browser. Online global ranking is not simulated.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setFilterMode('all');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Modes
            </button>
            {GAME_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setFilterMode(m.id);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === m.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {m.shortName}
              </button>
            ))}
          </div>
        </div>

        {filteredLeaderboard.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-slate-950/50 border border-slate-800/80">
            <span className="text-3xl block mb-2">🏆</span>
            <p className="text-slate-300 font-medium text-sm">No recorded scores yet</p>
            <p className="text-slate-500 text-xs mt-1">
              Play and complete any game to see your high scores featured on this device board.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Game Mode</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Moves</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {filteredLeaderboard.map((item, idx) => {
                  const modeInfo = GAME_MODES.find((m) => m.id === item.modeId);
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4">
                        {idx === 0 ? (
                          <span className="text-amber-400 font-bold">🥇 #1</span>
                        ) : idx === 1 ? (
                          <span className="text-slate-300 font-bold">🥈 #2</span>
                        ) : idx === 2 ? (
                          <span className="text-amber-600 font-bold">🥉 #3</span>
                        ) : (
                          <span className="text-slate-500">#{idx + 1}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-sans text-white font-medium flex items-center gap-1.5">
                        <span>{modeInfo?.icon}</span>
                        <span>{modeInfo?.name}</span>
                      </td>
                      <td className="py-3 px-4 text-cyan-400 capitalize">{item.difficulty}</td>
                      <td className="py-3 px-4 font-bold text-purple-300 tabular-nums">
                        {item.score.toLocaleString()} pts
                      </td>
                      <td className="py-3 px-4 tabular-nums">{formatTime(item.timeSeconds)}</td>
                      <td className="py-3 px-4 tabular-nums">{item.moves}</td>
                      <td className="py-3 px-4 text-slate-500 text-xs font-sans">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ================= PERSONAL BESTS BY MODE ================= */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
          Personal Bests by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_MODES.map((mode) => {
            // Find best records for this mode across difficulties
            const modeRecords = Object.entries(stats.records).filter(([key]) =>
              key.startsWith(`${mode.id}_`)
            );

            return (
              <div
                key={mode.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{mode.icon}</span>
                    <h3 className="font-bold text-white">{mode.name}</h3>
                  </div>

                  <div className="space-y-2 mt-4 text-xs font-mono">
                    {(['easy', 'medium', 'hard', 'expert'] as DifficultyId[]).map((d) => {
                      const rec = stats.records[`${mode.id}_${d}`];
                      return (
                        <div
                          key={d}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60"
                        >
                          <span className="capitalize text-slate-400 font-sans">{d}</span>
                          {rec && rec.gamesWon > 0 ? (
                            <div className="flex items-center gap-2 text-slate-200">
                              <span className="text-purple-300 font-bold">{rec.bestScore} pts</span>
                              <span className="text-slate-500">·</span>
                              <span className="text-cyan-300">{formatTime(rec.bestTimeSeconds)}</span>
                            </div>
                          ) : (
                            <span className="text-slate-600 font-sans text-[11px]">Unplayed</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onStartGame(mode.id, 'easy');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white font-semibold text-xs transition-colors cursor-pointer text-center"
                  >
                    Play {mode.shortName} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= RECENT GAMES HISTORY ================= */}
      <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-xl font-display font-bold text-white">Recent Match History</h2>
        {filteredHistory.length === 0 ? (
          <p className="text-xs text-slate-500">No match history available.</p>
        ) : (
          <div className="divide-y divide-slate-800 text-xs sm:text-sm">
            {filteredHistory.slice(0, 8).map((record) => {
              const modeInfo = GAME_MODES.find((m) => m.id === record.modeId);
              return (
                <div key={record.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{modeInfo?.icon}</span>
                    <div>
                      <span className="font-semibold text-white block">
                        {modeInfo?.name} ({record.difficulty})
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right font-mono">
                    <div>
                      <span className="text-purple-300 font-bold block">{record.score} pts</span>
                      <span className="text-slate-400 text-xs">{record.accuracy}% acc</span>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-cyan-300 block">{formatTime(record.timeSeconds)}</span>
                      <span className="text-slate-500 text-xs">{record.moves} moves</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= RESET CONFIRMATION MODAL ================= */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <span className="text-3xl block">⚠️</span>
            <h3 className="text-xl font-bold text-white">Clear All Local Records?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will erase all high scores, local leaderboard entries, and achievements stored on this device.
              This action cannot be undone.
            </p>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetData}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer shadow-md shadow-rose-600/30"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
