import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

export type PageId = 'home' | 'play' | 'instructions' | 'stats' | 'achievements' | 'about';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageId) => {
    soundManager.playClick();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 text-xl font-display font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 cursor-pointer group"
          >
            <span className="text-2xl transition-transform group-hover:scale-110">🧠</span>
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
              MEMO MASTER
            </span>
          </button>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300 whitespace-nowrap shrink-0">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentPage === 'home' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : ''
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNav('play')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentPage === 'play' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : ''
              }`}
            >
              Play Games
            </button>
            <button
              type="button"
              onClick={() => handleNav('instructions')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentPage === 'instructions' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : ''
              }`}
            >
              Instructions
            </button>
            <button
              type="button"
              onClick={() => handleNav('stats')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentPage === 'stats' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : ''
              }`}
            >
              My Statistics
            </button>
            <button
              type="button"
              onClick={() => handleNav('achievements')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentPage === 'achievements' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : ''
              }`}
            >
              Achievements
            </button>
            <button
              type="button"
              onClick={() => handleNav('about')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentPage === 'about' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : ''
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNav('play')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              Play Now
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-30 bg-slate-950/95 border-b border-slate-800 p-4 space-y-2 backdrop-blur-lg animate-in slide-in-from-top-2 duration-150">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'home' ? 'bg-purple-900/40 text-purple-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNav('play')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'play' ? 'bg-purple-900/40 text-purple-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Play Games
          </button>
          <button
            type="button"
            onClick={() => handleNav('instructions')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'instructions' ? 'bg-purple-900/40 text-purple-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Game Instructions
          </button>
          <button
            type="button"
            onClick={() => handleNav('stats')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'stats' ? 'bg-purple-900/40 text-purple-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            My Statistics
          </button>
          <button
            type="button"
            onClick={() => handleNav('achievements')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'achievements' ? 'bg-purple-900/40 text-purple-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Achievements
          </button>
          <button
            type="button"
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === 'about' ? 'bg-purple-900/40 text-purple-300' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            About
          </button>
        </div>
      )}
    </>
  );
};
