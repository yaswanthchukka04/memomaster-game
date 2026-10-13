export type GameModeId = 'emoji' | 'animal' | 'fruit' | 'number' | 'picture';

export type DifficultyId = 'easy' | 'medium' | 'hard' | 'expert';

export interface DifficultyConfig {
  id: DifficultyId;
  name: string;
  pairs: number;
  totalCards: number;
  gridColsClass: string;
  hintCount: number;
  timeTargetSec: number;
  description: string;
}

export interface CardItem {
  id: string; // unique card instance ID (e.g., 'lion-1', 'lion-2')
  pairId: string; // matching identifier
  modeId: GameModeId;
  label: string;
  sublabel?: string;
  icon?: string;
  color?: string;
  bgGradient?: string;
  badge?: string;
  isFlipped: boolean;
  isMatched: boolean;
  isHinted?: boolean;
}

export type BoardThemeId = 'cosmic-nebula' | 'midnight-aurora' | 'cyber-slate' | 'royal-velvet' | 'deep-emerald';

export type CardBackThemeId = 'purple-galaxy' | 'neon-cyan' | 'golden-royal' | 'emerald-circuit' | 'sunset-radiance';

export interface GameSettings {
  soundEnabled: boolean;
  boardTheme: BoardThemeId;
  cardBackTheme: CardBackThemeId;
}

export interface GameRecord {
  id: string;
  date: string;
  modeId: GameModeId;
  difficulty: DifficultyId;
  moves: number;
  timeSeconds: number;
  score: number;
  accuracy: number; // percentage
  won: boolean;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  date: string;
  score: number;
  timeSeconds: number;
  moves: number;
  modeId: GameModeId;
  difficulty: DifficultyId;
}

export interface ModeBestStats {
  bestScore: number;
  bestTimeSeconds: number;
  fewestMoves: number;
  gamesPlayed: number;
  gamesWon: number;
}

export interface PlayerStats {
  totalGames: number;
  totalWins: number;
  totalPlayTimeSeconds: number;
  totalPairsMatched: number;
  totalMoves: number;
  records: Record<string, ModeBestStats>; // key: `${modeId}_${difficulty}`
  history: GameRecord[];
  leaderboard: LeaderboardEntry[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'gameplay' | 'modes' | 'skill' | 'dedication';
  unlockedAt: string | null;
  progress: number; // 0 to 100
  target: number;
  currentValue: number;
}
