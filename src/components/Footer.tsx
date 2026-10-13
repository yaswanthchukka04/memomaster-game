import React from 'react';
import { PageId } from './Navbar';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (p: PageId) => {
    soundManager.playClick();
    onNavigate(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 mt-16 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <span className="text-base font-display font-bold text-white tracking-tight">
                MEMO MASTER
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Cognitive memory match game with five distinct thematic modes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNav('play')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Play Games
            </button>
            <button
              type="button"
              onClick={() => handleNav('instructions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Instructions
            </button>
            <button
              type="button"
              onClick={() => handleNav('stats')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Statistics
            </button>
            <button
              type="button"
              onClick={() => handleNav('achievements')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Achievements
            </button>
            <button
              type="button"
              onClick={() => handleNav('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Memo Master</span>
            <span aria-hidden="true">·</span>
            <span>Inspired by classic memory match logic</span>
            <span aria-hidden="true">·</span>
            <span>Local Device Storage</span>
          </div>
          <div>
            <span>100% Free & Private · No Account Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
