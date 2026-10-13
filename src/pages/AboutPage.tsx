import React from 'react';
import { soundManager } from '../utils/audio';

interface AboutPageProps {
  onPlayNow: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onPlayNow }) => {
  return (
    <div className="py-6 sm:py-10 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold">
          <span>🧠</span>
          <span>About Memo Master</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
          Crafted for Play, Built for Mind
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Memo Master is an original, production-grade memory matching game inspired by timeless cognitive puzzles like Memozor,
          designed from the ground up for modern web browsers.
        </p>
      </div>

      {/* Story & Vision */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>✨</span>
          <span>Our Vision & Philosophy</span>
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Classic memory match games have helped generations develop pattern recognition, working memory retention,
          and concentration. However, many online memory games suffer from cluttered ads, dated visuals, and slow load times.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          <strong>Memo Master 🧠</strong> re-envisions the experience with clean aesthetic discipline:
          vibrant purple and neon palettes, GPU-accelerated 3D card flips, instantaneous synthesized audio,
          and zero intrusive tracking or server accounts. Everything runs directly on your device.
        </p>
      </section>

      {/* Cognitive Benefits Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>🔬</span>
          <span>Cognitive Science & Brain Training</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-purple-300">Working Memory Capacity</h4>
            <p className="text-slate-400 leading-relaxed">
              Holding the positions of multiple cards in mind while scanning the board actively stretches your short-term working memory buffer.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-cyan-300">Visuospatial Processing</h4>
            <p className="text-slate-400 leading-relaxed">
              Tracking spatial relationships between coordinates enhances visual navigation, mapping ability, and mental orientation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-emerald-300">Selective Attention & Focus</h4>
            <p className="text-slate-400 leading-relaxed">
              Filtering out already-matched cards to concentrate only on unrevealed candidates improves sustained attention span.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-amber-300">Executive Processing Speed</h4>
            <p className="text-slate-400 leading-relaxed">
              Rapidly decision-making against the timer fosters cognitive agility and neuroplasticity across all age groups.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>⚙️</span>
          <span>Technology & Architecture</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Framework</span>
            <span className="text-white font-bold font-sans">React 19 & Vite</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Language</span>
            <span className="text-white font-bold font-sans">TypeScript Strict</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Styling</span>
            <span className="text-white font-bold font-sans">Tailwind CSS v4</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Audio</span>
            <span className="text-white font-bold font-sans">Web Audio API</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed pt-2">
          All high scores, stats, and achievements are saved to browser <code className="text-purple-300 font-mono">localStorage</code>.
          Zero external cookies, zero analytics trackers, and zero mandatory signups.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onPlayNow();
          }}
          className="py-3.5 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          Start Playing Memo Master 🧠
        </button>
      </div>
    </div>
  );
};
