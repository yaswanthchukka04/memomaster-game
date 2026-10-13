import { BoardThemeId, CardBackThemeId } from '../types/game';

export interface BoardThemeDef {
  id: BoardThemeId;
  name: string;
  bgClass: string;
  cardSlotBg: string;
  accentGlow: string;
}

export interface CardBackThemeDef {
  id: CardBackThemeId;
  name: string;
  gradientClass: string;
  borderClass: string;
  patternSvg: string;
  accentColor: string;
}

export const BOARD_THEMES: Record<BoardThemeId, BoardThemeDef> = {
  'cosmic-nebula': {
    id: 'cosmic-nebula',
    name: 'Cosmic Nebula',
    bgClass: 'bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950',
    cardSlotBg: 'bg-purple-950/20 border-purple-500/20',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
  },
  'midnight-aurora': {
    id: 'midnight-aurora',
    name: 'Midnight Aurora',
    bgClass: 'bg-gradient-to-br from-slate-950 via-teal-950/40 to-indigo-950/40',
    cardSlotBg: 'bg-teal-950/20 border-teal-500/20',
    accentGlow: 'rgba(45, 212, 191, 0.25)',
  },
  'cyber-slate': {
    id: 'cyber-slate',
    name: 'Cyber Slate',
    bgClass: 'bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950',
    cardSlotBg: 'bg-slate-900/40 border-slate-700/30',
    accentGlow: 'rgba(56, 189, 248, 0.25)',
  },
  'royal-velvet': {
    id: 'royal-velvet',
    name: 'Royal Velvet',
    bgClass: 'bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-950',
    cardSlotBg: 'bg-indigo-950/20 border-indigo-500/20',
    accentGlow: 'rgba(99, 102, 241, 0.25)',
  },
  'deep-emerald': {
    id: 'deep-emerald',
    name: 'Deep Emerald',
    bgClass: 'bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-950',
    cardSlotBg: 'bg-emerald-950/20 border-emerald-500/20',
    accentGlow: 'rgba(16, 185, 129, 0.25)',
  },
};

export const CARD_BACK_THEMES: Record<CardBackThemeId, CardBackThemeDef> = {
  'purple-galaxy': {
    id: 'purple-galaxy',
    name: 'Purple Galaxy',
    gradientClass: 'bg-gradient-to-br from-purple-700 via-indigo-800 to-slate-900',
    borderClass: 'border-purple-400/40 hover:border-purple-300',
    patternSvg: 'galaxy',
    accentColor: '#c084fc',
  },
  'neon-cyan': {
    id: 'neon-cyan',
    name: 'Neon Cyan',
    gradientClass: 'bg-gradient-to-br from-cyan-600 via-blue-800 to-slate-950',
    borderClass: 'border-cyan-400/40 hover:border-cyan-300',
    patternSvg: 'circuit',
    accentColor: '#22d3ee',
  },
  'golden-royal': {
    id: 'golden-royal',
    name: 'Golden Royal',
    gradientClass: 'bg-gradient-to-br from-amber-600 via-yellow-700 to-slate-900',
    borderClass: 'border-amber-400/40 hover:border-amber-300',
    patternSvg: 'diamond',
    accentColor: '#fbbf24',
  },
  'emerald-circuit': {
    id: 'emerald-circuit',
    name: 'Emerald Circuit',
    gradientClass: 'bg-gradient-to-br from-emerald-600 via-teal-800 to-slate-950',
    borderClass: 'border-emerald-400/40 hover:border-emerald-300',
    patternSvg: 'hexagon',
    accentColor: '#34d399',
  },
  'sunset-radiance': {
    id: 'sunset-radiance',
    name: 'Sunset Radiance',
    gradientClass: 'bg-gradient-to-br from-rose-600 via-purple-800 to-slate-950',
    borderClass: 'border-rose-400/40 hover:border-rose-300',
    patternSvg: 'prism',
    accentColor: '#fb7185',
  },
};
