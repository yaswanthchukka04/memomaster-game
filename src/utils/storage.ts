import {
  Achievement,
  BoardThemeId,
  CardBackThemeId,
  DifficultyId,
  GameModeId,
  GameRecord,
  GameSettings,
  LeaderboardEntry,
  PlayerStats,
} from '../types/game';

const SETTINGS_KEY = 'memo_master_settings_v1';
const STATS_KEY = 'memo_master_stats_v1';
const ACHIEVEMENTS_KEY = 'memo_master_achievements_v1';

export const INITIAL_SETTINGS: GameSettings = {
  soundEnabled: true,
  boardTheme: 'cosmic-nebula',
  cardBackTheme: 'purple-galaxy',
};

export const INITIAL_STATS: PlayerStats = {
  totalGames: 0,
  totalWins: 0,
  totalPlayTimeSeconds: 0,
  totalPairsMatched: 0,
  totalMoves: 0,
  records: {},
  history: [],
  leaderboard: [],
};

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    title: 'First Match',
    description: 'Complete your first memory game and claim victory.',
    iconName: 'Trophy',
    category: 'gameplay',
    unlockedAt: null,
    progress: 0,
    target: 1,
    currentValue: 0,
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Finish any memory match in under 45 seconds.',
    iconName: 'Zap',
    category: 'skill',
    unlockedAt: null,
    progress: 0,
    target: 45,
    currentValue: 0,
  },
  {
    id: 'memory_prodigy',
    title: 'Memory Prodigy',
    description: 'Conquer the daunting 24-pair Expert difficulty.',
    iconName: 'Crown',
    category: 'skill',
    unlockedAt: null,
    progress: 0,
    target: 1,
    currentValue: 0,
  },
  {
    id: 'sharp_mind',
    title: 'Sharp Mind',
    description: 'Achieve 85% or higher accuracy on Medium, Hard, or Expert.',
    iconName: 'Target',
    category: 'skill',
    unlockedAt: null,
    progress: 0,
    target: 85,
    currentValue: 0,
  },
  {
    id: 'flawless',
    title: 'Flawless Recall',
    description: 'Complete a Hard or Expert game without using any hints.',
    iconName: 'Sparkles',
    category: 'skill',
    unlockedAt: null,
    progress: 0,
    target: 1,
    currentValue: 0,
  },
  {
    id: 'emoji_champ',
    title: 'Emoji Master',
    description: 'Win a game in Emoji Memory Match mode.',
    iconName: 'Smile',
    category: 'modes',
    unlockedAt: null,
    progress: 0,
    target: 1,
    currentValue: 0,
  },
  {
    id: 'animal_tracker',
    title: 'Safari Scout',
    description: 'Win a game in Animal Matching mode.',
    iconName: 'Compass',
    category: 'modes',
    unlockedAt: null,
    progress: 0,
    target: 1,
    currentValue: 0,
  },
  {
    id: 'fruit_collector',
    title: 'Fruit Harvest',
    description: 'Win a game in Fruit Matching mode.',
    iconName: 'Apple',
    category: 'modes',
    unlockedAt: null,
    progress: 0,
    target: 1,
    currentValue: 0,
  },
  {
    id: 'number_genius',
    title: 'Numerical Ace',
    description: 'Win a game in Number Matching mode.',
    iconName: 'Hash',
    category: 'modes',
    unlockedAt: null,
    progress: 0,
    target: 1,
    currentValue: 0,
  },
  {
    id: 'picture_voyager',
    title: 'World Explorer',
    description: 'Win a game in Picture Matching mode.',
    iconName: 'Landmark',
    category: 'modes',
    unlockedAt: null,
    progress: 0,
    target: 1,
    currentValue: 0,
  },
  {
    id: 'consistent_brain',
    title: 'Brain Athlete',
    description: 'Complete 5 full games across any mode.',
    iconName: 'Flame',
    category: 'dedication',
    unlockedAt: null,
    progress: 0,
    target: 5,
    currentValue: 0,
  },
  {
    id: 'grand_master',
    title: 'Grand Memo Master',
    description: 'Unlock at least 8 distinct achievements in Memo Master.',
    iconName: 'Award',
    category: 'dedication',
    unlockedAt: null,
    progress: 0,
    target: 8,
    currentValue: 0,
  },
];

export function loadSettings(): GameSettings {
  if (typeof window === 'undefined') return INITIAL_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return INITIAL_SETTINGS;
    return { ...INITIAL_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // LocalStorage quota/safety
  }
}

export function loadStats(): PlayerStats {
  if (typeof window === 'undefined') return INITIAL_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return INITIAL_STATS;
    return { ...INITIAL_STATS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_STATS;
  }
}

export function saveStats(stats: PlayerStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // LocalStorage quota/safety
  }
}

export function loadAchievements(): Achievement[] {
  if (typeof window === 'undefined') return DEFAULT_ACHIEVEMENTS;
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) return DEFAULT_ACHIEVEMENTS;
    const stored = JSON.parse(raw) as Achievement[];
    // Merge in case defaults added new items
    return DEFAULT_ACHIEVEMENTS.map((def) => {
      const match = stored.find((s) => s.id === def.id);
      return match || def;
    });
  } catch {
    return DEFAULT_ACHIEVEMENTS;
  }
}

export function saveAchievements(achievements: Achievement[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  } catch {
    // LocalStorage quota/safety
  }
}

export function recordGameSession(params: {
  modeId: GameModeId;
  difficulty: DifficultyId;
  moves: number;
  timeSeconds: number;
  score: number;
  accuracy: number;
  pairs: number;
  hintsUsed: number;
  playerName?: string;
}): { newRecord: boolean; unlockedAchievements: string[] } {
  const currentStats = loadStats();
  const achievements = loadAchievements();
  const recordKey = `${params.modeId}_${params.difficulty}`;

  const currentBest = currentStats.records[recordKey] || {
    bestScore: 0,
    bestTimeSeconds: 9999,
    fewestMoves: 9999,
    gamesPlayed: 0,
    gamesWon: 0,
  };

  const isNewHighScore = params.score > currentBest.bestScore;
  const isNewBestTime = params.timeSeconds < currentBest.bestTimeSeconds;
  const isNewBestMoves = params.moves < currentBest.fewestMoves;
  const isNewRecord = isNewHighScore || isNewBestTime || isNewBestMoves;

  const updatedBest = {
    bestScore: Math.max(currentBest.bestScore, params.score),
    bestTimeSeconds: Math.min(currentBest.bestTimeSeconds, params.timeSeconds),
    fewestMoves: Math.min(currentBest.fewestMoves, params.moves),
    gamesPlayed: currentBest.gamesPlayed + 1,
    gamesWon: currentBest.gamesWon + 1,
  };

  const newSessionRecord: GameRecord = {
    id: `rec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    date: new Date().toISOString(),
    modeId: params.modeId,
    difficulty: params.difficulty,
    moves: params.moves,
    timeSeconds: params.timeSeconds,
    score: params.score,
    accuracy: params.accuracy,
    won: true,
  };

  const newLeaderboardEntry: LeaderboardEntry = {
    id: newSessionRecord.id,
    playerName: params.playerName || 'Player',
    date: newSessionRecord.date,
    score: params.score,
    timeSeconds: params.timeSeconds,
    moves: params.moves,
    modeId: params.modeId,
    difficulty: params.difficulty,
  };

  // Keep top 20 leaderboard entries sorted by score desc
  const updatedLeaderboard = [...currentStats.leaderboard, newLeaderboardEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  const updatedStats: PlayerStats = {
    totalGames: currentStats.totalGames + 1,
    totalWins: currentStats.totalWins + 1,
    totalPlayTimeSeconds: currentStats.totalPlayTimeSeconds + params.timeSeconds,
    totalPairsMatched: currentStats.totalPairsMatched + params.pairs,
    totalMoves: currentStats.totalMoves + params.moves,
    records: {
      ...currentStats.records,
      [recordKey]: updatedBest,
    },
    history: [newSessionRecord, ...currentStats.history].slice(0, 30),
    leaderboard: updatedLeaderboard,
  };

  saveStats(updatedStats);

  // Evaluate Achievements
  const nowStr = new Date().toISOString();
  const newlyUnlocked: string[] = [];

  const updatedAchievements = achievements.map((ach) => {
    if (ach.unlockedAt) return ach; // Already unlocked

    let shouldUnlock = false;
    let newProgress = ach.progress;
    let newValue = ach.currentValue;

    switch (ach.id) {
      case 'first_win':
        shouldUnlock = true;
        newValue = 1;
        newProgress = 100;
        break;

      case 'speed_demon':
        newValue = params.timeSeconds;
        if (params.timeSeconds <= 45) {
          shouldUnlock = true;
          newProgress = 100;
        } else {
          newProgress = Math.min(99, Math.round(((60 - params.timeSeconds) / 15) * 100));
        }
        break;

      case 'memory_prodigy':
        if (params.difficulty === 'expert') {
          shouldUnlock = true;
          newValue = 1;
          newProgress = 100;
        }
        break;

      case 'sharp_mind':
        newValue = params.accuracy;
        if (params.accuracy >= 85 && params.difficulty !== 'easy') {
          shouldUnlock = true;
          newProgress = 100;
        } else {
          newProgress = Math.min(99, params.accuracy);
        }
        break;

      case 'flawless':
        if (params.hintsUsed === 0 && (params.difficulty === 'hard' || params.difficulty === 'expert')) {
          shouldUnlock = true;
          newValue = 1;
          newProgress = 100;
        }
        break;

      case 'emoji_champ':
        if (params.modeId === 'emoji') {
          shouldUnlock = true;
          newValue = 1;
          newProgress = 100;
        }
        break;

      case 'animal_tracker':
        if (params.modeId === 'animal') {
          shouldUnlock = true;
          newValue = 1;
          newProgress = 100;
        }
        break;

      case 'fruit_collector':
        if (params.modeId === 'fruit') {
          shouldUnlock = true;
          newValue = 1;
          newProgress = 100;
        }
        break;

      case 'number_genius':
        if (params.modeId === 'number') {
          shouldUnlock = true;
          newValue = 1;
          newProgress = 100;
        }
        break;

      case 'picture_voyager':
        if (params.modeId === 'picture') {
          shouldUnlock = true;
          newValue = 1;
          newProgress = 100;
        }
        break;

      case 'consistent_brain':
        newValue = updatedStats.totalGames;
        newProgress = Math.min(100, Math.round((updatedStats.totalGames / 5) * 100));
        if (updatedStats.totalGames >= 5) {
          shouldUnlock = true;
        }
        break;

      case 'grand_master': {
        const currentlyUnlockedCount = achievements.filter((a) => a.unlockedAt !== null).length;
        newValue = currentlyUnlockedCount;
        newProgress = Math.min(100, Math.round((currentlyUnlockedCount / 8) * 100));
        if (currentlyUnlockedCount >= 8) {
          shouldUnlock = true;
        }
        break;
      }
    }

    if (shouldUnlock && !ach.unlockedAt) {
      newlyUnlocked.push(ach.title);
      return {
        ...ach,
        unlockedAt: nowStr,
        progress: 100,
        currentValue: newValue,
      };
    }

    return {
      ...ach,
      progress: Math.max(ach.progress, newProgress),
      currentValue: newValue,
    };
  });

  saveAchievements(updatedAchievements);

  return {
    newRecord: isNewRecord,
    unlockedAchievements: newlyUnlocked,
  };
}

export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(ACHIEVEMENTS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  } catch {
    // safety
  }
}
