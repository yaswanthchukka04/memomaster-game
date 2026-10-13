import React from 'react';
import { DIFFICULTY_CONFIGS, GAME_MODES } from '../data/cardsData';
import { soundManager } from '../utils/audio';

interface InstructionsPageProps {
  onPlayNow: () => void;
}

export const InstructionsPage: React.FC<InstructionsPageProps> = ({ onPlayNow }) => {
  return (
    <div className="py-6 sm:py-10 max-w-4xl mx-auto space-y-12">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold">
          <span>📖</span>
          <span>Game Rules & Strategic Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
          How to Play Memo Master
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Master the mechanics, understand the scoring algorithm, and train your working memory with proven cognitive techniques.
        </p>
      </div>

      {/* Core Rules Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>🎯</span>
          <span>Core Gameplay Mechanics</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="text-purple-400 font-mono">1.</span>
              <span>Flip Two Cards</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              At the start, all cards lie face down on the table. Click or tap any card to reveal its face.
              Then click a second card to see if they match.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">2.</span>
              <span>Matching & Clearing</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              If both cards share the same item, you have found a pair! They will stay revealed with a luminous emerald outline.
              If they do not match, they flip back after a brief glance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">3.</span>
              <span>Hints System</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Stuck on the last elusive pairs? Tap the <strong className="text-amber-300">Hint button</strong> to briefly peek
              at a random matching pair for 1.2 seconds. Hints are limited per game.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono">4.</span>
              <span>Pause & Controls</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              You can pause the timer anytime using the Pause button. Mute or unmute synthesized sound effects,
              or customize your card deck theme without leaving the game.
            </p>
          </div>
        </div>
      </section>

      {/* Scoring Engine Breakdown */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>🏆</span>
          <span>Transparent Scoring Formula</span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Memo Master rewards speed, spatial precision, and consecutive combo streaks. Here is exactly how your score is calculated:
        </p>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-purple-300">Base Match Points</span>
              <p className="text-slate-400 text-xs mt-0.5">Awarded for each successfully paired set of cards.</p>
            </div>
            <span className="font-mono font-bold text-white tabular-nums">+120 pts / pair</span>
          </div>

          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-cyan-300">Speed Bonus</span>
              <p className="text-slate-400 text-xs mt-0.5">Awarded when finishing under target time for the difficulty tier.</p>
            </div>
            <span className="font-mono font-bold text-white tabular-nums">+12 pts / second under par</span>
          </div>

          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-emerald-300">Move Efficiency Bonus</span>
              <p className="text-slate-400 text-xs mt-0.5">Fewer total turns taken increases your accuracy multiplier.</p>
            </div>
            <span className="font-mono font-bold text-white tabular-nums">Up to +500 pts</span>
          </div>

          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-amber-300">Streak Combo</span>
              <p className="text-slate-400 text-xs mt-0.5">Matching pairs consecutively without a mismatch builds huge combos.</p>
            </div>
            <span className="font-mono font-bold text-white tabular-nums">+45 pts / streak count</span>
          </div>

          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-rose-300">Hint Deduction</span>
              <p className="text-slate-400 text-xs mt-0.5">Using assistance peeks slightly reduces your final score.</p>
            </div>
            <span className="font-mono font-bold text-rose-400 tabular-nums">-60 pts / hint</span>
          </div>

          <div className="flex items-start justify-between p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
            <div>
              <span className="font-bold text-purple-200">Difficulty Multiplier</span>
              <p className="text-slate-400 text-xs mt-0.5">The total is scaled by the complexity of the grid.</p>
            </div>
            <span className="font-mono font-bold text-purple-300 tabular-nums">1.0x (Easy) → 2.4x (Expert)</span>
          </div>
        </div>
      </section>

      {/* Difficulty Comparison Matrix */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>📊</span>
          <span>Difficulty Specifications</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Pairs</th>
                <th className="py-3 px-4">Total Cards</th>
                <th className="py-3 px-4">Target Time</th>
                <th className="py-3 px-4">Hints</th>
                <th className="py-3 px-4">Multiplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {Object.values(DIFFICULTY_CONFIGS).map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white capitalize font-sans">{d.name}</td>
                  <td className="py-3 px-4 text-purple-300">{d.pairs}</td>
                  <td className="py-3 px-4">{d.totalCards}</td>
                  <td className="py-3 px-4 text-cyan-300">{d.timeTargetSec}s</td>
                  <td className="py-3 px-4 text-amber-300">{d.hintCount}</td>
                  <td className="py-3 px-4 text-emerald-300">
                    {d.id === 'easy' ? '1.0x' : d.id === 'medium' ? '1.35x' : d.id === 'hard' ? '1.8x' : '2.4x'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cognitive Science & Pro Tips */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>🧠</span>
          <span>Pro Memory Strategies</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-purple-300 mb-1">1. The Quadrant Method</h4>
            <p className="text-slate-400 leading-relaxed">
              Mentally divide the grid into top-left, top-right, bottom-left, and bottom-right sectors.
              Explore one quadrant systematically to localize cards before exploring the rest.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-cyan-300 mb-1">2. Verbal Association</h4>
            <p className="text-slate-400 leading-relaxed">
              When flipping a card (e.g. "Lion"), whisper its coordinate or color (e.g. "Lion corner left").
              Dual auditory and visual encoding drastically boosts recall durability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-emerald-300 mb-1">3. Don't Re-Check Too Fast</h4>
            <p className="text-slate-400 leading-relaxed">
              Random clicking degrades your move accuracy score. If you haven't seen a matching card yet,
              reveal untouched cards instead of guessing already checked ones.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="font-bold text-amber-300 mb-1">4. Save Hints for the End</h4>
            <p className="text-slate-400 leading-relaxed">
              Use hints when only 2 to 4 pairs remain and you are racing against the clock for a 3-star speed record!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/30 text-center space-y-4">
        <h3 className="text-2xl font-display font-bold text-white">Ready to Put Your Mind to the Test?</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Jump right into a game, beat your best records, and unlock prestigious achievements.
        </p>
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onPlayNow();
          }}
          className="py-3 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          Launch Memory Match Now ⚡
        </button>
      </div>
    </div>
  );
};
