import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  CardItem,
  CardBackThemeId,
  BoardThemeId,
  DifficultyId,
  GameModeId,
} from '../types/game';
import { DIFFICULTY_CONFIGS, GAME_MODES, getCardSourcesByMode } from '../data/cardsData';
import { Card } from './Card';
import { soundManager } from '../utils/audio';
import { calculateGameScore, formatTime } from '../utils/scoring';
import { BOARD_THEMES } from '../utils/themeConfig';

interface GameBoardProps {
  modeId: GameModeId;
  difficulty: DifficultyId;
  boardTheme: BoardThemeId;
  cardBackTheme: CardBackThemeId;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onChangeSettings: () => void;
  onGameComplete: (result: {
    score: number;
    timeSeconds: number;
    moves: number;
    accuracy: number;
    hintsUsed: number;
    maxStreak: number;
    scoreBreakdown: ReturnType<typeof calculateGameScore>;
  }) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  modeId,
  difficulty,
  boardTheme,
  cardBackTheme,
  soundEnabled,
  onToggleSound,
  onChangeSettings,
  onGameComplete,
}) => {
  const diffConfig = DIFFICULTY_CONFIGS[difficulty];
  const modeInfo = GAME_MODES.find((m) => m.id === modeId) || GAME_MODES[0];
  const themeConfig = BOARD_THEMES[boardTheme] || BOARD_THEMES['cosmic-nebula'];

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [hintsLeft, setHintsLeft] = useState<number>(diffConfig.hintCount);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [liveScore, setLiveScore] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  // Initialize or reset card deck
  const initGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    const sources = getCardSourcesByMode(modeId);
    const selectedSources = sources.slice(0, diffConfig.pairs);

    // Duplicate each card to create pairs
    const deck: CardItem[] = [];
    selectedSources.forEach((src) => {
      deck.push({
        id: `${src.pairId}-1`,
        pairId: src.pairId,
        modeId,
        label: src.label,
        sublabel: src.sublabel,
        icon: src.icon,
        color: src.color,
        bgGradient: src.bgGradient,
        badge: src.badge,
        isFlipped: false,
        isMatched: false,
        isHinted: false,
      });
      deck.push({
        id: `${src.pairId}-2`,
        pairId: src.pairId,
        modeId,
        label: src.label,
        sublabel: src.sublabel,
        icon: src.icon,
        color: src.color,
        bgGradient: src.bgGradient,
        badge: src.badge,
        isFlipped: false,
        isMatched: false,
        isHinted: false,
      });
    });

    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setIsEvaluating(false);
    setIsPaused(false);
    setMoves(0);
    setMatchedPairsCount(0);
    setTimeSeconds(0);
    setHasStarted(false);
    setHintsLeft(diffConfig.hintCount);
    setHintsUsedCount(0);
    setStreak(0);
    setMaxStreak(0);
    setLiveScore(0);
  }, [modeId, diffConfig.pairs, diffConfig.hintCount]);

  // Restart on mode or difficulty change
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer loop
  useEffect(() => {
    if (hasStarted && !isPaused && matchedPairsCount < diffConfig.pairs) {
      timerRef.current = window.setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStarted, isPaused, matchedPairsCount, diffConfig.pairs]);

  // Check game victory condition
  useEffect(() => {
    if (matchedPairsCount > 0 && matchedPairsCount === diffConfig.pairs) {
      const breakdown = calculateGameScore({
        difficulty,
        pairs: diffConfig.pairs,
        moves,
        timeSeconds,
        hintsUsed: hintsUsedCount,
        maxStreak,
      });

      // Small delay before celebration modal for last card animation to settle
      const timer = setTimeout(() => {
        onGameComplete({
          score: breakdown.totalScore,
          timeSeconds,
          moves,
          accuracy: breakdown.accuracy,
          hintsUsed: hintsUsedCount,
          maxStreak,
          scoreBreakdown: breakdown,
        });
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [
    matchedPairsCount,
    diffConfig.pairs,
    difficulty,
    moves,
    timeSeconds,
    hintsUsedCount,
    maxStreak,
    onGameComplete,
  ]);

  // Handle Card Click
  const handleCardClick = (index: number) => {
    if (isPaused || isEvaluating) return;
    if (cards[index].isMatched || cards[index].isFlipped) return;
    if (flippedIndices.length >= 2) return;

    if (!hasStarted) {
      setHasStarted(true);
    }

    soundManager.playFlip();

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true, isHinted: false };
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If second card flipped, evaluate match
    if (newFlipped.length === 2) {
      const firstIdx = newFlipped[0];
      const secondIdx = index;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      setMoves((m) => m + 1);
      setIsEvaluating(true);

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        setTimeout(() => {
          soundManager.playMatch();
          setCards((prevCards) =>
            prevCards.map((c, i) =>
              i === firstIdx || i === secondIdx
                ? { ...c, isMatched: true, isFlipped: false }
                : c
            )
          );

          setMatchedPairsCount((p) => p + 1);
          setFlippedIndices([]);
          setIsEvaluating(false);

          setStreak((s) => {
            const next = s + 1;
            setMaxStreak((ms) => Math.max(ms, next));
            return next;
          });

          // Add live score
          setLiveScore((prev) => prev + 120 + streak * 25);
        }, 400);
      } else {
        // MISMATCH
        setTimeout(() => {
          soundManager.playMismatch();
          setCards((prevCards) =>
            prevCards.map((c, i) =>
              i === firstIdx || i === secondIdx
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedIndices([]);
          setIsEvaluating(false);
          setStreak(0);
        }, 900);
      }
    }
  };

  // Hint feature: Reveal a matching pair for 1.2 seconds
  const handleUseHint = () => {
    if (hintsLeft <= 0 || isPaused || isEvaluating || matchedPairsCount >= diffConfig.pairs) return;

    // Find unmatched cards
    const unmatchedPairsMap = new Map<string, number[]>();
    cards.forEach((card, idx) => {
      if (!card.isMatched && !card.isFlipped) {
        const list = unmatchedPairsMap.get(card.pairId) || [];
        list.push(idx);
        unmatchedPairsMap.set(card.pairId, list);
      }
    });

    const candidatePairs = Array.from(unmatchedPairsMap.values()).filter((list) => list.length === 2);
    if (candidatePairs.length === 0) return;

    soundManager.playHint();
    setHintsLeft((prev) => prev - 1);
    setHintsUsedCount((prev) => prev + 1);

    // Pick one pair to reveal briefly
    const targetPairIndices = candidatePairs[Math.floor(Math.random() * candidatePairs.length)];

    setCards((prev) =>
      prev.map((card, idx) =>
        targetPairIndices.includes(idx)
          ? { ...card, isFlipped: true, isHinted: true }
          : card
      )
    );

    setIsEvaluating(true);

    setTimeout(() => {
      setCards((prev) =>
        prev.map((card, idx) =>
          targetPairIndices.includes(idx)
            ? { ...card, isFlipped: false, isHinted: false }
            : card
        )
      );
      setIsEvaluating(false);
    }, 1200);
  };

  // Toggle Pause
  const togglePause = () => {
    soundManager.playClick();
    setIsPaused((p) => !p);
  };

  return (
    <div
      className={`w-full rounded-2xl border border-slate-800 p-4 sm:p-6 transition-colors duration-300 shadow-2xl relative ${themeConfig.bgClass}`}
    >
      {/* ================= TOP HUD: METRICS & CONTROLS ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        {/* Left: Mode & Difficulty Badge */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xl shadow-inner">
            {modeInfo.icon}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
              {modeInfo.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-purple-400 capitalize">{diffConfig.name}</span>
              <span aria-hidden="true">·</span>
              <span>{diffConfig.pairs} Pairs ({diffConfig.totalCards} Cards)</span>
            </div>
          </div>
        </div>

        {/* Center: Live Stats HUD */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {/* Timer */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
            <span className="text-xs text-slate-400">⏱️ Time</span>
            <span className="font-mono font-bold text-sm sm:text-base text-cyan-300 tabular-nums">
              {formatTime(timeSeconds)}
            </span>
          </div>

          {/* Moves */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
            <span className="text-xs text-slate-400">🎯 Moves</span>
            <span className="font-mono font-bold text-sm sm:text-base text-emerald-300 tabular-nums">
              {moves}
            </span>
          </div>

          {/* Matches */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
            <span className="text-xs text-slate-400">✨ Pairs</span>
            <span className="font-mono font-bold text-sm sm:text-base text-purple-300 tabular-nums">
              {matchedPairsCount} / {diffConfig.pairs}
            </span>
          </div>

          {/* Score */}
          <div className="hidden md:flex px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 items-center gap-2">
            <span className="text-xs text-slate-400">🏆 Score</span>
            <span className="font-mono font-bold text-sm sm:text-base text-amber-300 tabular-nums">
              {liveScore}
            </span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Hint Button */}
          <button
            type="button"
            onClick={handleUseHint}
            disabled={hintsLeft <= 0 || isPaused || isEvaluating}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              hintsLeft > 0 && !isPaused && !isEvaluating
                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30 active:scale-95'
                : 'bg-slate-900/50 text-slate-500 border-slate-800 cursor-not-allowed opacity-60'
            }`}
            title="Reveal a matching pair briefly (limited uses)"
          >
            <span>💡</span>
            <span>Hint ({hintsLeft})</span>
          </button>

          {/* Pause / Resume Button */}
          <button
            type="button"
            onClick={togglePause}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-colors cursor-pointer text-xs font-medium flex items-center gap-1"
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            <span>{isPaused ? '▶️' : '⏸️'}</span>
            <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Restart Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              initGame();
            }}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-colors cursor-pointer text-xs font-medium flex items-center gap-1"
            title="Restart Game with fresh shuffle"
          >
            <span>🔄</span>
            <span className="hidden sm:inline">Restart</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-colors cursor-pointer text-xs"
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Theme Quick Toggle */}
          <button
            type="button"
            onClick={onChangeSettings}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-colors cursor-pointer text-xs"
            title="Customise card deck and board theme"
          >
            🎨
          </button>
        </div>
      </div>

      {/* ================= STREAK BANNER (if > 1) ================= */}
      {streak > 1 && (
        <div className="mb-3 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent border border-purple-500/30 flex items-center gap-2 text-xs text-purple-300 animate-pulse">
          <span>🔥</span>
          <span className="font-semibold">{streak} Matches in a row! Combo Multiplier active!</span>
        </div>
      )}

      {/* ================= ACTIVE CARD GRID ================= */}
      <div className="relative min-h-[380px] flex items-center justify-center">
        {/* Paused Overlay */}
        {isPaused && (
          <div className="absolute inset-0 z-30 rounded-xl bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
            <span className="text-4xl mb-3">⏸️</span>
            <h3 className="text-2xl font-display font-bold text-white mb-2">Game Paused</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-sm">
              Take a breath! Your elapsed time and progress are safely preserved.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={togglePause}
                className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                Resume Game
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  initGame();
                }}
                className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-semibold text-sm transition-all cursor-pointer"
              >
                Restart Fresh
              </button>
            </div>
          </div>
        )}

        {/* Responsive Grid Layout */}
        <div
          className={`w-full grid gap-2.5 sm:gap-3.5 md:gap-4 ${diffConfig.gridColsClass} transition-opacity duration-200 ${
            isPaused ? 'opacity-20 pointer-events-none' : 'opacity-100'
          }`}
        >
          {cards.map((card, idx) => (
            <Card
              key={card.id}
              card={card}
              cardIndex={idx}
              cardBackTheme={cardBackTheme}
              disabled={isEvaluating || isPaused}
              onClick={() => handleCardClick(idx)}
            />
          ))}
        </div>
      </div>

      {/* ================= BOTTOM HELPER BAR ================= */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Click any two cards to discover pairs.</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Consecutive matches build streak bonus points!</span>
        </div>
        <div>
          <span>Accuracy: </span>
          <span className="font-mono text-slate-300 font-semibold tabular-nums">
            {moves === 0 ? '100%' : `${Math.min(100, Math.round(((matchedPairsCount) / moves) * 100))}%`}
          </span>
        </div>
      </div>
    </div>
  );
};
