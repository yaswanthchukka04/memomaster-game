import React from 'react';
import { BoardThemeId, CardBackThemeId } from '../types/game';
import { BOARD_THEMES, CARD_BACK_THEMES } from '../utils/themeConfig';
import { soundManager } from '../utils/audio';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  boardTheme: BoardThemeId;
  cardBackTheme: CardBackThemeId;
  soundEnabled: boolean;
  onSelectBoardTheme: (id: BoardThemeId) => void;
  onSelectCardBackTheme: (id: CardBackThemeId) => void;
  onToggleSound: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  boardTheme,
  cardBackTheme,
  soundEnabled,
  onSelectBoardTheme,
  onSelectCardBackTheme,
  onToggleSound,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-display font-bold text-white">Board & Card Customizer</h3>
            <p className="text-xs text-slate-400 mt-0.5">Customize your visual and audio memory experience</p>
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Section 1: Card Back Styles */}
        <div className="my-5">
          <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2.5">
            Card Back Designs
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {Object.values(CARD_BACK_THEMES).map((theme) => {
              const isSelected = cardBackTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectCardBackTheme(theme.id);
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-purple-400 bg-purple-950/30 shadow-md shadow-purple-500/20 ring-1 ring-purple-400'
                      : 'border-slate-800 bg-slate-800/50 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {/* Miniature card preview */}
                  <div
                    className={`w-full h-12 rounded-lg border flex items-center justify-center relative overflow-hidden ${theme.gradientClass} ${theme.borderClass}`}
                  >
                    <span className="text-base">🧠</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-200">{theme.name}</span>
                    {isSelected && <span className="text-xs text-purple-400 font-bold">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Board Atmosphere */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2.5">
            Board Atmosphere Themes
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.values(BOARD_THEMES).map((theme) => {
              const isSelected = boardTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectBoardTheme(theme.id);
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/20 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                      : 'border-slate-800 bg-slate-800/50 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-full border border-white/20 ${theme.bgClass}`}
                    />
                    <span className="text-xs font-medium text-slate-200">{theme.name}</span>
                  </div>
                  {isSelected && <span className="text-xs text-cyan-400 font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Audio Preferences */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-white block">Sound Effects</span>
            <span className="text-xs text-slate-400">Card flips, chimes, and victory fanfares</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
              soundEnabled ? 'bg-purple-600 justify-end' : 'bg-slate-800 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        {/* Footer Close */}
        <div className="mt-6 pt-3 flex justify-end">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="py-2 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs cursor-pointer shadow-md shadow-purple-600/30 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
