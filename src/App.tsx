/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GameModeId, DifficultyId, GameSettings, BoardThemeId, CardBackThemeId } from './types/game';
import { loadSettings, saveSettings } from './utils/storage';
import { soundManager } from './utils/audio';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PlayPage } from './pages/PlayPage';
import { InstructionsPage } from './pages/InstructionsPage';
import { StatsPage } from './pages/StatsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { AboutPage } from './pages/AboutPage';
import { BOARD_THEMES } from './utils/themeConfig';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeMode, setActiveMode] = useState<GameModeId>('emoji');
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyId>('easy');
  const [settings, setSettings] = useState<GameSettings>(() => loadSettings());

  // Sync sound settings with audio manager
  useEffect(() => {
    soundManager.setMuted(!settings.soundEnabled);
    saveSettings(settings);
  }, [settings]);

  const handleStartGame = (modeId: GameModeId, difficulty: DifficultyId) => {
    setActiveMode(modeId);
    setActiveDifficulty(difficulty);
    setCurrentPage('play');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    setSettings((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const handleUpdateBoardTheme = (boardTheme: BoardThemeId) => {
    setSettings((prev) => ({
      ...prev,
      boardTheme,
    }));
  };

  const handleUpdateCardBackTheme = (cardBackTheme: CardBackThemeId) => {
    setSettings((prev) => ({
      ...prev,
      cardBackTheme,
    }));
  };

  const currentBoardDef = BOARD_THEMES[settings.boardTheme] || BOARD_THEMES['cosmic-nebula'];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${currentBoardDef.bgClass}`}>
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar currentPage={currentPage} onNavigate={(p) => setCurrentPage(p)} />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentPage === 'home' && (
          <HomePage
            onStartGame={handleStartGame}
            onNavigateToInstructions={() => {
              setCurrentPage('instructions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToStats={() => {
              setCurrentPage('stats');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'play' && (
          <PlayPage
            initialModeId={activeMode}
            initialDifficulty={activeDifficulty}
            boardTheme={settings.boardTheme}
            cardBackTheme={settings.cardBackTheme}
            soundEnabled={settings.soundEnabled}
            onUpdateBoardTheme={handleUpdateBoardTheme}
            onUpdateCardBackTheme={handleUpdateCardBackTheme}
            onToggleSound={handleToggleSound}
            onGoToStats={() => {
              setCurrentPage('stats');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'instructions' && (
          <InstructionsPage
            onPlayNow={() => {
              setCurrentPage('play');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'stats' && (
          <StatsPage onStartGame={handleStartGame} />
        )}

        {currentPage === 'achievements' && (
          <AchievementsPage
            onPlayNow={() => {
              setCurrentPage('play');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onPlayNow={() => {
              setCurrentPage('play');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(p) => setCurrentPage(p)} />
    </div>
  );
}
