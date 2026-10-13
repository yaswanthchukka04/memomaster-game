import React, { useState } from 'react';
import {
  GameModeId,
  DifficultyId,
  BoardThemeId,
  CardBackThemeId,
} from '../types/game';
import { GAME_MODES, DIFFICULTY_CONFIGS } from '../data/cardsData';
import { GameBoard } from '../components/GameBoard';
import { VictoryModal } from '../components/VictoryModal';
import { ThemeModal } from '../components/ThemeModal';
import { recordGameSession } from '../utils/storage';
import { ScoreBreakdown } from '../utils/scoring';
import { soundManager } from '../utils/audio';

interface PlayPageProps {
  initialModeId?: GameModeId;
  initialDifficulty?: DifficultyId;
  boardTheme: BoardThemeId;
  cardBackTheme: CardBackThemeId;
  soundEnabled: boolean;
  onUpdateBoardTheme: (id: BoardThemeId) => void;
  onUpdateCardBackTheme: (id: CardBackThemeId) => void;
  onToggleSound: () => void;
  onGoToStats: () => void;
}

export const PlayPage: React.FC<PlayPageProps> = ({
  initialModeId = 'emoji',
  initialDifficulty = 'easy',
  boardTheme,
  cardBackTheme,
  soundEnabled,
  onUpdateBoardTheme,
  onUpdateCardBackTheme,
  onToggleSound,
  onGoToStats,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameModeId>(initialModeId);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyId>(initialDifficulty);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Victory State
  const [victoryData, setVictoryData] = useState<{
    scoreBreakdown: ScoreBreakdown;
    timeSeconds: number;
    moves: number;
    isNewRecord: boolean;
    unlockedAchievements: string[];
  } | null>(null);

  // Handle game finish
  const handleGameComplete = (result: {
    score: number;
    timeSeconds: number;
    moves: number;
    accuracy: number;
    hintsUsed: number;
    maxStreak: number;
    scoreBreakdown: ScoreBreakdown;
  }) => {
    const recorded = recordGameSession({
      modeId: selectedMode,
      difficulty: selectedDifficulty,
      moves: result.moves,
      timeSeconds: result.timeSeconds,
      score: result.score,
      accuracy: result.accuracy,
      pairs: DIFFICULTY_CONFIGS[selectedDifficulty].pairs,
      hintsUsed: result.hintsUsed,
    });

    setVictoryData({
      scoreBreakdown: result.scoreBreakdown,
      timeSeconds: result.timeSeconds,
      moves: result.moves,
      isNewRecord: recorded.newRecord,
      unlockedAchievements: recorded.unlockedAchievements,
    });
  };

  const handlePlayAgain = () => {
    setVictoryData(null);
  };

  const handleNextDifficulty = () => {
    const diffOrder: DifficultyId[] = ['easy', 'medium', 'hard', 'expert'];
    const curIdx = diffOrder.indexOf(selectedDifficulty);
    if (curIdx < diffOrder.length - 1) {
      setSelectedDifficulty(diffOrder[curIdx + 1]);
    }
    setVictoryData(null);
  };

  return (
    <div className="py-4 space-y-6">
      {/* ================= CONTROLS TOOLBAR ================= */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        {/* Game Mode Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
            Mode:
          </span>
          {GAME_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedMode(mode.id);
                setVictoryData(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                selectedMode === mode.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{mode.icon}</span>
              <span>{mode.shortName}</span>
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
              Difficulty:
            </span>
            {(['easy', 'medium', 'hard', 'expert'] as DifficultyId[]).map((diffKey) => {
              const config = DIFFICULTY_CONFIGS[diffKey];
              const isSelected = selectedDifficulty === diffKey;
              return (
                <button
                  key={diffKey}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedDifficulty(diffKey);
                    setVictoryData(null);
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="capitalize">{config.name}</span>
                  <span className="text-[10px] opacity-75 ml-1 font-mono">({config.pairs}p)</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsThemeModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
              title="Customize Deck & Board"
            >
              🎨 <span className="hidden sm:inline">Theme</span>
            </button>
            <button
              type="button"
              onClick={onGoToStats}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
              title="View Leaderboard & Stats"
            >
              📊 <span className="hidden sm:inline">Stats</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= ACTIVE GAME ARENA ================= */}
      <GameBoard
        key={`${selectedMode}-${selectedDifficulty}`}
        modeId={selectedMode}
        difficulty={selectedDifficulty}
        boardTheme={boardTheme}
        cardBackTheme={cardBackTheme}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        onChangeSettings={() => setIsThemeModalOpen(true)}
        onGameComplete={handleGameComplete}
      />

      {/* ================= VICTORY MODAL ================= */}
      {victoryData && (
        <VictoryModal
          modeId={selectedMode}
          difficulty={selectedDifficulty}
          scoreBreakdown={victoryData.scoreBreakdown}
          timeSeconds={victoryData.timeSeconds}
          moves={victoryData.moves}
          isNewRecord={victoryData.isNewRecord}
          unlockedAchievements={victoryData.unlockedAchievements}
          onPlayAgain={handlePlayAgain}
          onNextDifficulty={handleNextDifficulty}
          onSelectNewGame={() => setVictoryData(null)}
        />
      )}

      {/* ================= THEME MODAL ================= */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        boardTheme={boardTheme}
        cardBackTheme={cardBackTheme}
        soundEnabled={soundEnabled}
        onSelectBoardTheme={onUpdateBoardTheme}
        onSelectCardBackTheme={onUpdateCardBackTheme}
        onToggleSound={onToggleSound}
      />
    </div>
  );
};
