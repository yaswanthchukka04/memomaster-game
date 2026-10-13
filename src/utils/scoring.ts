import { DifficultyId } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/cardsData';

export interface ScoreBreakdown {
  baseScore: number;
  timeBonus: number;
  efficiencyBonus: number;
  streakBonus: number;
  hintPenalty: number;
  totalScore: number;
  stars: number; // 1, 2, or 3
  accuracy: number; // 0 - 100%
}

export function calculateGameScore(params: {
  difficulty: DifficultyId;
  pairs: number;
  moves: number;
  timeSeconds: number;
  hintsUsed: number;
  maxStreak: number;
}): ScoreBreakdown {
  const { difficulty, pairs, moves, timeSeconds, hintsUsed, maxStreak } = params;
  const config = DIFFICULTY_CONFIGS[difficulty];

  // 1. Base Score
  const baseScore = pairs * 120;

  // 2. Time Bonus (based on beating target time)
  const targetTime = config.timeTargetSec;
  const timeDifference = targetTime - timeSeconds;
  const timeBonus = Math.max(0, Math.round(timeDifference * 12));

  // 3. Efficiency Bonus
  // Ideal moves is exactly `pairs`. If moves <= pairs * 1.5, great efficiency!
  const idealMoves = pairs;
  const accuracy = Math.max(10, Math.min(100, Math.round((idealMoves / Math.max(idealMoves, moves)) * 100)));
  const efficiencyBonus = Math.max(0, Math.round((idealMoves * 2 - moves) * 25));

  // 4. Streak Bonus
  const streakBonus = Math.round(maxStreak * 45);

  // 5. Hint Penalty
  const hintPenalty = hintsUsed * 60;

  // Difficulty Multiplier
  const multipliers: Record<DifficultyId, number> = {
    easy: 1.0,
    medium: 1.35,
    hard: 1.8,
    expert: 2.4,
  };

  const rawTotal = (baseScore + timeBonus + efficiencyBonus + streakBonus - hintPenalty) * multipliers[difficulty];
  const totalScore = Math.max(100, Math.round(rawTotal));

  // Star Rating
  // 3 stars: high accuracy and under target time
  // 2 stars: moderate accuracy
  // 1 star: completed
  let stars = 1;
  if (accuracy >= 65 && timeSeconds <= targetTime * 1.2) {
    stars = 2;
  }
  if (accuracy >= 80 && timeSeconds <= targetTime) {
    stars = 3;
  }

  return {
    baseScore,
    timeBonus,
    efficiencyBonus,
    streakBonus,
    hintPenalty,
    totalScore,
    stars,
    accuracy,
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
