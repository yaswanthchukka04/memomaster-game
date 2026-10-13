import React from 'react';
import { CardItem, CardBackThemeId } from '../types/game';
import { CARD_BACK_THEMES } from '../utils/themeConfig';

interface CardProps {
  card: CardItem;
  onClick: () => void;
  disabled: boolean;
  cardBackTheme: CardBackThemeId;
  cardIndex: number;
}

export const Card: React.FC<CardProps> = ({
  card,
  onClick,
  disabled,
  cardBackTheme,
  cardIndex,
}) => {
  const isRevealed = card.isFlipped || card.isMatched;
  const backTheme = CARD_BACK_THEMES[cardBackTheme] || CARD_BACK_THEMES['purple-galaxy'];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && !isRevealed) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="perspective-1000 w-full aspect-[3/4] select-none"
      style={{ minHeight: '85px' }}
    >
      <button
        type="button"
        onClick={() => {
          if (!disabled && !isRevealed) {
            onClick();
          }
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled || card.isMatched}
        aria-label={
          isRevealed
            ? `${card.label}${card.isMatched ? ', Matched' : ''}`
            : `Card ${cardIndex + 1}, hidden`
        }
        className={`w-full h-full relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-xl transition-transform duration-200 ${
          card.isMatched ? 'cursor-default' : 'hover:-translate-y-1 active:scale-95'
        }`}
      >
        <div
          className={`w-full h-full relative transform-style-3d card-inner ${
            isRevealed ? 'rotate-y-180' : ''
          } ${card.isMatched ? 'animate-match-pulse' : ''}`}
        >
          {/* ================= CARD BACK ================= */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border p-2 flex flex-col items-center justify-between shadow-lg overflow-hidden transition-all duration-300 ${
              backTheme.gradientClass
            } ${backTheme.borderClass} ${
              card.isHinted ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-slate-900 animate-pulse' : ''
            }`}
          >
            {/* Geometric watermark pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="38" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="26" strokeWidth="1.5" />
                <path d="M 50 14 L 86 50 L 50 86 L 14 50 Z" strokeWidth="1.5" />
                <path d="M 50 26 L 74 50 L 50 74 L 26 50 Z" strokeWidth="1" />
              </svg>
            </div>

            {/* Corner Accent Dots */}
            <div className="w-full flex justify-between items-center z-10 opacity-70">
              <span className="text-[10px] font-mono tracking-widest text-white/60">MM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            </div>

            {/* Center Monogram / Brain Emblem */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-inner transition-transform group-hover:scale-110"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.3) 100%)',
                  border: `1px solid ${backTheme.accentColor}55`,
                }}
              >
                <span className="text-xl sm:text-2xl filter drop-shadow">🧠</span>
              </div>
            </div>

            {/* Bottom corner */}
            <div className="w-full flex justify-between items-center z-10 opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="text-[10px] font-mono tracking-widest text-white/60">MM</span>
            </div>
          </div>

          {/* ================= CARD FRONT ================= */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl border p-2 sm:p-2.5 flex flex-col items-center justify-between shadow-xl transition-all duration-300 ${
              card.isMatched
                ? 'bg-slate-900/95 border-emerald-500/70 shadow-emerald-500/20 shadow-md'
                : 'bg-slate-900 border-purple-500/40 shadow-purple-500/10'
            } ${
              card.isHinted ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900' : ''
            }`}
            style={{
              background: card.isMatched
                ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.95))'
                : 'linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.98))',
            }}
          >
            {/* Top Bar on Front: Badge or Matching tick */}
            <div className="w-full flex justify-between items-center z-10 text-[10px]">
              {card.badge ? (
                <span className="font-mono text-[9px] tracking-wider text-slate-400 font-semibold px-1 py-0.5 rounded bg-white/5 border border-white/10">
                  {card.badge}
                </span>
              ) : (
                <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
                  {card.modeId.substring(0, 3)}
                </span>
              )}
              {card.isMatched && (
                <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[10px]">
                  ✓
                </span>
              )}
            </div>

            {/* Center Visual Art */}
            <div className="flex-1 flex flex-col items-center justify-center my-0.5 w-full">
              {card.modeId === 'number' ? (
                <div className="flex flex-col items-center justify-center">
                  <span
                    className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
                    style={{ color: card.color || '#38bdf8' }}
                  >
                    {card.icon || card.label}
                  </span>
                  {card.sublabel && (
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {card.sublabel}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl filter drop-shadow-md select-none transform transition-transform hover:scale-110">
                    {card.icon || '✨'}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Label on Front */}
            <div className="w-full text-center z-10 pt-0.5 border-t border-white/5">
              <p className="text-[11px] sm:text-xs font-semibold text-slate-200 truncate leading-tight">
                {card.label}
              </p>
              {card.sublabel && card.modeId !== 'number' && (
                <p className="text-[9px] text-slate-400 truncate leading-none mt-0.5">
                  {card.sublabel}
                </p>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
