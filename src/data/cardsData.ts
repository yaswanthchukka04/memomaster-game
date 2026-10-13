import { DifficultyConfig, DifficultyId, GameModeId } from '../types/game';

export interface CardSource {
  pairId: string;
  label: string;
  sublabel?: string;
  icon?: string;
  color?: string;
  bgGradient?: string;
  badge?: string;
}

export interface GameModeInfo {
  id: GameModeId;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  cardPreviewIcon: string;
  accentColor: string;
  badgeText: string;
}

export const GAME_MODES: GameModeInfo[] = [
  {
    id: 'emoji',
    name: 'Emoji Memory Match',
    shortName: 'Emoji',
    icon: '✨',
    description: 'Vibrant, expressive icons and symbols to test your quick visual reflexes.',
    cardPreviewIcon: '🚀',
    accentColor: 'from-purple-500 to-indigo-600',
    badgeText: 'Classic & Fun',
  },
  {
    id: 'animal',
    name: 'Animal Matching',
    shortName: 'Animals',
    icon: '🦁',
    description: 'Wild jungle predators, marine wonders, and exotic forest creatures.',
    cardPreviewIcon: '🐨',
    accentColor: 'from-amber-500 to-emerald-600',
    badgeText: 'Nature & Wildlife',
  },
  {
    id: 'fruit',
    name: 'Fruit Matching',
    shortName: 'Fruits',
    icon: '🍓',
    description: 'Juicy tropical fruits and sweet farm harvests with radiant colors.',
    cardPreviewIcon: '🍉',
    accentColor: 'from-rose-500 to-orange-500',
    badgeText: 'Vibrant & Sweet',
  },
  {
    id: 'number',
    name: 'Number Matching',
    shortName: 'Numbers',
    icon: '🔢',
    description: 'Bold geometric numerals featuring Roman numerals and mathematical elegance.',
    cardPreviewIcon: '42',
    accentColor: 'from-blue-600 to-cyan-500',
    badgeText: 'Cognitive & Math',
  },
  {
    id: 'picture',
    name: 'Picture Matching',
    shortName: 'Landmarks',
    icon: '🏛️',
    description: 'World landmarks, scenic wonders, and iconic cultural monuments.',
    cardPreviewIcon: '🗼',
    accentColor: 'from-fuchsia-600 to-pink-600',
    badgeText: 'Scenic & Cultural',
  },
];

export const DIFFICULTY_CONFIGS: Record<DifficultyId, DifficultyConfig> = {
  easy: {
    id: 'easy',
    name: 'Easy',
    pairs: 8,
    totalCards: 16,
    gridColsClass: 'grid-cols-4',
    hintCount: 3,
    timeTargetSec: 60,
    description: '8 pairs (16 cards). Relaxed pace for beginners and warm-ups.',
  },
  medium: {
    id: 'medium',
    name: 'Medium',
    pairs: 12,
    totalCards: 24,
    gridColsClass: 'grid-cols-4 sm:grid-cols-6',
    hintCount: 3,
    timeTargetSec: 90,
    description: '12 pairs (24 cards). Balanced challenge for standard play.',
  },
  hard: {
    id: 'hard',
    name: 'Hard',
    pairs: 18,
    totalCards: 36,
    gridColsClass: 'grid-cols-4 sm:grid-cols-6',
    hintCount: 3,
    timeTargetSec: 135,
    description: '18 pairs (36 cards). Serious mental workout for sharp minds.',
  },
  expert: {
    id: 'expert',
    name: 'Expert',
    pairs: 24,
    totalCards: 48,
    gridColsClass: 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8',
    hintCount: 2,
    timeTargetSec: 180,
    description: '24 pairs (48 cards). The ultimate brain training challenge.',
  },
};

// 24 unique items per mode
export const EMOJI_CARDS: CardSource[] = [
  { pairId: 'emoji-rocket', label: 'Rocket', icon: '🚀', bgGradient: 'from-violet-600/30 to-purple-600/30', color: '#a855f7' },
  { pairId: 'emoji-diamond', label: 'Diamond', icon: '💎', bgGradient: 'from-cyan-600/30 to-blue-600/30', color: '#06b6d4' },
  { pairId: 'emoji-fire', label: 'Flame', icon: '🔥', bgGradient: 'from-orange-600/30 to-amber-600/30', color: '#f97316' },
  { pairId: 'emoji-lightning', label: 'Lightning', icon: '⚡', bgGradient: 'from-yellow-600/30 to-amber-500/30', color: '#eab308' },
  { pairId: 'emoji-star', label: 'Star', icon: '🌟', bgGradient: 'from-amber-500/30 to-yellow-400/30', color: '#f59e0b' },
  { pairId: 'emoji-pizza', label: 'Pizza', icon: '🍕', bgGradient: 'from-red-600/30 to-orange-500/30', color: '#ef4444' },
  { pairId: 'emoji-gamepad', label: 'Arcade', icon: '🎮', bgGradient: 'from-indigo-600/30 to-purple-600/30', color: '#6366f1' },
  { pairId: 'emoji-palette', label: 'Art', icon: '🎨', bgGradient: 'from-pink-600/30 to-rose-500/30', color: '#ec4899' },
  { pairId: 'emoji-guitar', label: 'Guitar', icon: '🎸', bgGradient: 'from-rose-600/30 to-red-600/30', color: '#f43f5e' },
  { pairId: 'emoji-trophy', label: 'Trophy', icon: '🏆', bgGradient: 'from-yellow-600/30 to-amber-600/30', color: '#eab308' },
  { pairId: 'emoji-crystal', label: 'Crystal', icon: '🔮', bgGradient: 'from-purple-600/30 to-fuchsia-600/30', color: '#c084fc' },
  { pairId: 'emoji-ufo', label: 'UFO', icon: '🛸', bgGradient: 'from-emerald-600/30 to-teal-600/30', color: '#10b981' },
  { pairId: 'emoji-crown', label: 'Crown', icon: '👑', bgGradient: 'from-amber-600/30 to-yellow-500/30', color: '#f59e0b' },
  { pairId: 'emoji-unicorn', label: 'Unicorn', icon: '🦄', bgGradient: 'from-pink-500/30 to-purple-500/30', color: '#f472b6' },
  { pairId: 'emoji-rainbow', label: 'Rainbow', icon: '🌈', bgGradient: 'from-teal-500/30 to-cyan-500/30', color: '#14b8a6' },
  { pairId: 'emoji-target', label: 'Bullseye', icon: '🎯', bgGradient: 'from-red-500/30 to-rose-600/30', color: '#f43f5e' },
  { pairId: 'emoji-popcorn', label: 'Popcorn', icon: '🍿', bgGradient: 'from-amber-500/30 to-orange-400/30', color: '#fbbf24' },
  { pairId: 'emoji-donut', label: 'Donut', icon: '🍩', bgGradient: 'from-pink-600/30 to-rose-500/30', color: '#f472b6' },
  { pairId: 'emoji-headphones', label: 'Music', icon: '🎧', bgGradient: 'from-cyan-600/30 to-blue-500/30', color: '#38bdf8' },
  { pairId: 'emoji-skateboard', label: 'Skate', icon: '🛹', bgGradient: 'from-lime-600/30 to-emerald-500/30', color: '#84cc16' },
  { pairId: 'emoji-compass', label: 'Compass', icon: '🧭', bgGradient: 'from-sky-600/30 to-indigo-500/30', color: '#0ea5e9' },
  { pairId: 'emoji-balloon', label: 'Balloon', icon: '🎈', bgGradient: 'from-red-600/30 to-pink-500/30', color: '#f87171' },
  { pairId: 'emoji-lightbulb', label: 'Idea', icon: '💡', bgGradient: 'from-yellow-500/30 to-amber-400/30', color: '#fde047' },
  { pairId: 'emoji-flower', label: 'Lotus', icon: '🌺', bgGradient: 'from-rose-500/30 to-pink-600/30', color: '#fb7185' },
];

export const ANIMAL_CARDS: CardSource[] = [
  { pairId: 'animal-lion', label: 'Lion', sublabel: 'King of Jungle', icon: '🦁', bgGradient: 'from-amber-600/30 to-yellow-600/30', color: '#f59e0b' },
  { pairId: 'animal-tiger', label: 'Tiger', sublabel: 'Bengal Hunter', icon: '🐯', bgGradient: 'from-orange-600/30 to-amber-700/30', color: '#ea580c' },
  { pairId: 'animal-panda', label: 'Panda', sublabel: 'Bamboo Giant', icon: '🐼', bgGradient: 'from-slate-600/30 to-zinc-700/30', color: '#e2e8f0' },
  { pairId: 'animal-koala', label: 'Koala', sublabel: 'Eucalyptus Dreamer', icon: '🐨', bgGradient: 'from-stone-600/30 to-slate-600/30', color: '#94a3b8' },
  { pairId: 'animal-fox', label: 'Fox', sublabel: 'Cunning Scout', icon: '🦊', bgGradient: 'from-orange-600/30 to-red-600/30', color: '#f97316' },
  { pairId: 'animal-owl', label: 'Owl', sublabel: 'Night Watcher', icon: '🦉', bgGradient: 'from-indigo-600/30 to-slate-700/30', color: '#818cf8' },
  { pairId: 'animal-elephant', label: 'Elephant', sublabel: 'Gentle Giant', icon: '🐘', bgGradient: 'from-slate-600/30 to-blue-800/30', color: '#93c5fd' },
  { pairId: 'animal-dolphin', label: 'Dolphin', sublabel: 'Ocean Acrobat', icon: '🐬', bgGradient: 'from-cyan-600/30 to-sky-600/30', color: '#38bdf8' },
  { pairId: 'animal-giraffe', label: 'Giraffe', sublabel: 'Canopy Feeder', icon: '🦒', bgGradient: 'from-amber-600/30 to-yellow-700/30', color: '#fbbf24' },
  { pairId: 'animal-flamingo', label: 'Flamingo', sublabel: 'Lagoon Dancer', icon: '🦩', bgGradient: 'from-pink-600/30 to-rose-600/30', color: '#f472b6' },
  { pairId: 'animal-penguin', label: 'Penguin', sublabel: 'Polar Explorer', icon: '🐧', bgGradient: 'from-sky-700/30 to-slate-800/30', color: '#bae6fd' },
  { pairId: 'animal-kangaroo', label: 'Kangaroo', sublabel: 'Outback Leaper', icon: '🦘', bgGradient: 'from-amber-700/30 to-stone-700/30', color: '#d97706' },
  { pairId: 'animal-hedgehog', label: 'Hedgehog', sublabel: 'Prickly Scout', icon: '🦔', bgGradient: 'from-stone-600/30 to-amber-800/30', color: '#a8a29e' },
  { pairId: 'animal-wolf', label: 'Wolf', sublabel: 'Alpha Howler', icon: '🐺', bgGradient: 'from-slate-600/30 to-zinc-800/30', color: '#cbd5e1' },
  { pairId: 'animal-turtle', label: 'Turtle', sublabel: 'Ancient Reef', icon: '🐢', bgGradient: 'from-emerald-600/30 to-teal-700/30', color: '#34d399' },
  { pairId: 'animal-octopus', label: 'Octopus', sublabel: 'Deep Sea Sage', icon: '🐙', bgGradient: 'from-purple-600/30 to-pink-700/30', color: '#c084fc' },
  { pairId: 'animal-butterfly', label: 'Butterfly', sublabel: 'Winged Jewel', icon: '🦋', bgGradient: 'from-cyan-500/30 to-blue-600/30', color: '#67e8f9' },
  { pairId: 'animal-peacock', label: 'Peacock', sublabel: 'Royal Plume', icon: '🦚', bgGradient: 'from-teal-600/30 to-emerald-700/30', color: '#2dd4bf' },
  { pairId: 'animal-leopard', label: 'Leopard', sublabel: 'Savannah Shadow', icon: '🐆', bgGradient: 'from-yellow-600/30 to-amber-700/30', color: '#facc15' },
  { pairId: 'animal-zebra', label: 'Zebra', sublabel: 'Striped Nomad', icon: '🦓', bgGradient: 'from-zinc-600/30 to-slate-700/30', color: '#f1f5f9' },
  { pairId: 'animal-frog', label: 'Tree Frog', sublabel: 'Rainforest Jewel', icon: '🐸', bgGradient: 'from-lime-600/30 to-emerald-600/30', color: '#4ade80' },
  { pairId: 'animal-bee', label: 'Honeybee', sublabel: 'Meadow Worker', icon: '🐝', bgGradient: 'from-amber-500/30 to-yellow-600/30', color: '#fde047' },
  { pairId: 'animal-whale', label: 'Blue Whale', sublabel: 'Monarch of Seas', icon: '🐳', bgGradient: 'from-blue-600/30 to-cyan-700/30', color: '#60a5fa' },
  { pairId: 'animal-sloth', label: 'Sloth', sublabel: 'Zen Master', icon: '🦥', bgGradient: 'from-stone-600/30 to-yellow-900/30', color: '#a8a29e' },
];

export const FRUIT_CARDS: CardSource[] = [
  { pairId: 'fruit-strawberry', label: 'Strawberry', sublabel: 'Berry Sweet', icon: '🍓', bgGradient: 'from-rose-600/30 to-red-600/30', color: '#f43f5e' },
  { pairId: 'fruit-watermelon', label: 'Watermelon', sublabel: 'Crisp & Cool', icon: '🍉', bgGradient: 'from-red-600/30 to-emerald-600/30', color: '#fb7185' },
  { pairId: 'fruit-avocado', label: 'Avocado', sublabel: 'Creamy Rich', icon: '🥑', bgGradient: 'from-emerald-700/30 to-lime-600/30', color: '#84cc16' },
  { pairId: 'fruit-pineapple', label: 'Pineapple', sublabel: 'Tropical Gold', icon: '🍍', bgGradient: 'from-amber-600/30 to-yellow-600/30', color: '#eab308' },
  { pairId: 'fruit-cherries', label: 'Cherries', sublabel: 'Ruby Duo', icon: '🍒', bgGradient: 'from-red-700/30 to-rose-700/30', color: '#dc2626' },
  { pairId: 'fruit-peach', label: 'Peach', sublabel: 'Velvet Sunset', icon: '🍑', bgGradient: 'from-orange-500/30 to-amber-500/30', color: '#fb923c' },
  { pairId: 'fruit-kiwi', label: 'Kiwi', sublabel: 'Tangy Emerald', icon: '🥝', bgGradient: 'from-lime-600/30 to-emerald-700/30', color: '#65a30d' },
  { pairId: 'fruit-mango', label: 'Mango', sublabel: 'Tropical Honey', icon: '🥭', bgGradient: 'from-amber-500/30 to-orange-600/30', color: '#f59e0b' },
  { pairId: 'fruit-grapes', label: 'Grapes', sublabel: 'Royal Cluster', icon: '🍇', bgGradient: 'from-purple-700/30 to-violet-600/30', color: '#a855f7' },
  { pairId: 'fruit-banana', label: 'Banana', sublabel: 'Energy Power', icon: '🍌', bgGradient: 'from-yellow-500/30 to-amber-400/30', color: '#facc15' },
  { pairId: 'fruit-apple', label: 'Red Apple', sublabel: 'Crisp Orchard', icon: '🍎', bgGradient: 'from-red-600/30 to-rose-600/30', color: '#ef4444' },
  { pairId: 'fruit-lemon', label: 'Lemon', sublabel: 'Zesty Spark', icon: '🍋', bgGradient: 'from-yellow-400/30 to-lime-400/30', color: '#fef08a' },
  { pairId: 'fruit-orange', label: 'Orange', sublabel: 'Citrus Boost', icon: '🍊', bgGradient: 'from-orange-500/30 to-amber-600/30', color: '#ea580c' },
  { pairId: 'fruit-blueberries', label: 'Blueberries', sublabel: 'Wild Indigo', icon: '🫐', bgGradient: 'from-blue-600/30 to-indigo-700/30', color: '#60a5fa' },
  { pairId: 'fruit-coconut', label: 'Coconut', sublabel: 'Island Breeze', icon: '🥥', bgGradient: 'from-stone-600/30 to-neutral-700/30', color: '#d6d3d1' },
  { pairId: 'fruit-melon', label: 'Cantaloupe', sublabel: 'Melon Glow', icon: '🍈', bgGradient: 'from-green-600/30 to-emerald-600/30', color: '#86efac' },
  { pairId: 'fruit-pear', label: 'Pear', sublabel: 'Sweet Anjou', icon: '🍐', bgGradient: 'from-lime-500/30 to-green-600/30', color: '#bef264' },
  { pairId: 'fruit-greenapple', label: 'Green Apple', sublabel: 'Granny Tart', icon: '🍏', bgGradient: 'from-emerald-500/30 to-lime-600/30', color: '#4ade80' },
  { pairId: 'fruit-pomegranate', label: 'Pomegranate', sublabel: 'Ruby Seed', icon: '🍅', bgGradient: 'from-rose-700/30 to-red-800/30', color: '#e11d48' },
  { pairId: 'fruit-corn', label: 'Sweet Corn', sublabel: 'Golden Cob', icon: '🌽', bgGradient: 'from-yellow-500/30 to-amber-600/30', color: '#fde047' },
  { pairId: 'fruit-carrot', label: 'Carrot', sublabel: 'Garden Root', icon: '🥕', bgGradient: 'from-orange-600/30 to-amber-700/30', color: '#fb923c' },
  { pairId: 'fruit-plum', label: 'Purple Plum', sublabel: 'Deep Velvet', icon: '🍆', bgGradient: 'from-purple-800/30 to-indigo-800/30', color: '#c084fc' },
  { pairId: 'fruit-fig', label: 'Sweet Fig', sublabel: 'Honey Blossom', icon: '🌰', bgGradient: 'from-amber-800/30 to-stone-800/30', color: '#d97706' },
  { pairId: 'fruit-dragonfruit', label: 'Pitaya', sublabel: 'Dragon Jewel', icon: '🌸', bgGradient: 'from-pink-600/30 to-rose-700/30', color: '#ec4899' },
];

export const NUMBER_CARDS: CardSource[] = [
  { pairId: 'num-01', label: 'One', sublabel: 'I · Solo', icon: '1', bgGradient: 'from-blue-600/30 to-indigo-600/30', color: '#60a5fa', badge: 'PRIME' },
  { pairId: 'num-02', label: 'Two', sublabel: 'II · Pair', icon: '2', bgGradient: 'from-cyan-600/30 to-blue-600/30', color: '#38bdf8', badge: 'EVEN' },
  { pairId: 'num-03', label: 'Three', sublabel: 'III · Trio', icon: '3', bgGradient: 'from-teal-600/30 to-emerald-600/30', color: '#2dd4bf', badge: 'PRIME' },
  { pairId: 'num-04', label: 'Four', sublabel: 'IV · Quad', icon: '4', bgGradient: 'from-emerald-600/30 to-green-600/30', color: '#34d399', badge: 'SQUARE' },
  { pairId: 'num-05', label: 'Five', sublabel: 'V · Penta', icon: '5', bgGradient: 'from-lime-600/30 to-emerald-600/30', color: '#a3e635', badge: 'PRIME' },
  { pairId: 'num-06', label: 'Six', sublabel: 'VI · Hexa', icon: '6', bgGradient: 'from-amber-600/30 to-yellow-600/30', color: '#facc15', badge: 'PERFECT' },
  { pairId: 'num-07', label: 'Seven', sublabel: 'VII · Lucky', icon: '7', bgGradient: 'from-orange-600/30 to-amber-600/30', color: '#fb923c', badge: 'PRIME' },
  { pairId: 'num-08', label: 'Eight', sublabel: 'VIII · Octa', icon: '8', bgGradient: 'from-rose-600/30 to-orange-600/30', color: '#f87171', badge: 'CUBE' },
  { pairId: 'num-09', label: 'Nine', sublabel: 'IX · Nona', icon: '9', bgGradient: 'from-red-600/30 to-pink-600/30', color: '#f43f5e', badge: 'SQUARE' },
  { pairId: 'num-10', label: 'Ten', sublabel: 'X · Deca', icon: '10', bgGradient: 'from-pink-600/30 to-purple-600/30', color: '#f472b6', badge: 'BASE-10' },
  { pairId: 'num-11', label: 'Eleven', sublabel: 'XI · Twin', icon: '11', bgGradient: 'from-purple-600/30 to-violet-600/30', color: '#c084fc', badge: 'PRIME' },
  { pairId: 'num-12', label: 'Twelve', sublabel: 'XII · Dozen', icon: '12', bgGradient: 'from-indigo-600/30 to-blue-600/30', color: '#818cf8', badge: 'DOZEN' },
  { pairId: 'num-13', label: 'Thirteen', sublabel: 'XIII · Baker', icon: '13', bgGradient: 'from-sky-600/30 to-cyan-600/30', color: '#38bdf8', badge: 'PRIME' },
  { pairId: 'num-14', label: 'Fourteen', sublabel: 'XIV · Fortnight', icon: '14', bgGradient: 'from-teal-600/30 to-cyan-600/30', color: '#2dd4bf', badge: 'EVEN' },
  { pairId: 'num-15', label: 'Fifteen', sublabel: 'XV · Quarter', icon: '15', bgGradient: 'from-emerald-600/30 to-teal-600/30', color: '#4ade80', badge: 'TRIANGLE' },
  { pairId: 'num-16', label: 'Sixteen', sublabel: 'XVI · Byte', icon: '16', bgGradient: 'from-lime-600/30 to-yellow-600/30', color: '#a3e635', badge: 'SQUARE' },
  { pairId: 'num-17', label: 'Seventeen', sublabel: 'XVII · Unique', icon: '17', bgGradient: 'from-amber-600/30 to-orange-600/30', color: '#fbbf24', badge: 'PRIME' },
  { pairId: 'num-18', label: 'Eighteen', sublabel: 'XVIII · Major', icon: '18', bgGradient: 'from-orange-600/30 to-red-600/30', color: '#fb923c', badge: 'EVEN' },
  { pairId: 'num-19', label: 'Nineteen', sublabel: 'XIX · Final Teen', icon: '19', bgGradient: 'from-rose-600/30 to-pink-600/30', color: '#f43f5e', badge: 'PRIME' },
  { pairId: 'num-20', label: 'Twenty', sublabel: 'XX · Score', icon: '20', bgGradient: 'from-fuchsia-600/30 to-purple-600/30', color: '#e879f9', badge: 'SCORE' },
  { pairId: 'num-21', label: 'Twenty-One', sublabel: 'XXI · Blackjack', icon: '21', bgGradient: 'from-violet-600/30 to-indigo-600/30', color: '#a78bfa', badge: 'FIBONACCI' },
  { pairId: 'num-22', label: 'Twenty-Two', sublabel: 'XXII · Master', icon: '22', bgGradient: 'from-indigo-600/30 to-sky-600/30', color: '#818cf8', badge: 'DOUBLE' },
  { pairId: 'num-23', label: 'Twenty-Three', sublabel: 'XXIII · Enigma', icon: '23', bgGradient: 'from-cyan-600/30 to-teal-600/30', color: '#22d3ee', badge: 'PRIME' },
  { pairId: 'num-24', label: 'Twenty-Four', sublabel: 'XXIV · Day Clock', icon: '24', bgGradient: 'from-teal-600/30 to-emerald-600/30', color: '#2dd4bf', badge: 'FACTORIAL' },
];

export const PICTURE_CARDS: CardSource[] = [
  { pairId: 'pic-eiffel', label: 'Eiffel Tower', sublabel: 'Paris, France', icon: '🗼', bgGradient: 'from-blue-600/30 to-purple-700/30', color: '#818cf8', badge: 'WONDER' },
  { pairId: 'pic-liberty', label: 'Statue of Liberty', sublabel: 'New York, USA', icon: '🗽', bgGradient: 'from-emerald-600/30 to-teal-700/30', color: '#34d399', badge: 'FREEDOM' },
  { pairId: 'pic-fuji', label: 'Mount Fuji', sublabel: 'Honshu, Japan', icon: '🏔️', bgGradient: 'from-sky-600/30 to-indigo-700/30', color: '#38bdf8', badge: 'SUMMIT' },
  { pairId: 'pic-pyramids', label: 'Great Pyramids', sublabel: 'Giza, Egypt', icon: '🏜️', bgGradient: 'from-amber-600/30 to-orange-700/30', color: '#fbbf24', badge: 'ANCIENT' },
  { pairId: 'pic-aurora', label: 'Northern Lights', sublabel: 'Arctic Circle', icon: '🌌', bgGradient: 'from-teal-500/30 to-fuchsia-600/30', color: '#2dd4bf', badge: 'NATURE' },
  { pairId: 'pic-goldengate', label: 'Golden Gate', sublabel: 'San Francisco, USA', icon: '🌉', bgGradient: 'from-orange-600/30 to-red-600/30', color: '#f97316', badge: 'BRIDGE' },
  { pairId: 'pic-colosseum', label: 'Colosseum', sublabel: 'Rome, Italy', icon: '🏛️', bgGradient: 'from-stone-600/30 to-amber-800/30', color: '#f59e0b', badge: 'HISTORY' },
  { pairId: 'pic-apollo', label: 'Apollo Lunar', sublabel: 'Sea of Tranquility', icon: '🚀', bgGradient: 'from-indigo-700/30 to-slate-800/30', color: '#a5b4fc', badge: 'SPACE' },
  { pairId: 'pic-island', label: 'Tropical Island', sublabel: 'South Pacific', icon: '🏝️', bgGradient: 'from-cyan-600/30 to-emerald-600/30', color: '#22d3ee', badge: 'ESCAPE' },
  { pairId: 'pic-balloon', label: 'Hot Air Balloon', sublabel: 'Cappadocia, Turkey', icon: '🎈', bgGradient: 'from-pink-600/30 to-rose-600/30', color: '#f472b6', badge: 'SKY' },
  { pairId: 'pic-pagoda', label: 'Kyoto Pagoda', sublabel: 'Kyoto, Japan', icon: '🏯', bgGradient: 'from-red-600/30 to-amber-700/30', color: '#ef4444', badge: 'HERITAGE' },
  { pairId: 'pic-lighthouse', label: 'Coastal Beacon', sublabel: 'Cape Hatteras', icon: '⚓', bgGradient: 'from-sky-700/30 to-slate-800/30', color: '#38bdf8', badge: 'NAUTICAL' },
  { pairId: 'pic-volcano', label: 'Volcanic Caldera', sublabel: 'Krakatoa Rim', icon: '🌋', bgGradient: 'from-orange-700/30 to-red-800/30', color: '#ea580c', badge: 'GEOLOGY' },
  { pairId: 'pic-castle', label: 'Fairytale Citadel', sublabel: 'Bavaria, Germany', icon: '🏰', bgGradient: 'from-purple-700/30 to-slate-800/30', color: '#c084fc', badge: 'ROYAL' },
  { pairId: 'pic-camp', label: 'Alpine Camp', sublabel: 'Zermatt Ridge', icon: '⛺', bgGradient: 'from-emerald-700/30 to-cyan-800/30', color: '#4ade80', badge: 'TRAIL' },
  { pairId: 'pic-circus', label: 'Grand Big Top', sublabel: 'Cirque Spectacle', icon: '🎪', bgGradient: 'from-rose-600/30 to-amber-600/30', color: '#f43f5e', badge: 'SHOW' },
  { pairId: 'pic-telescope', label: 'Deep Space Array', sublabel: 'Atacama Desert', icon: '🔭', bgGradient: 'from-blue-700/30 to-indigo-900/30', color: '#93c5fd', badge: 'COSMOS' },
  { pairId: 'pic-sailboat', label: 'Royal Sailboat', sublabel: 'Monaco Coast', icon: '⛵', bgGradient: 'from-cyan-600/30 to-sky-700/30', color: '#67e8f9', badge: 'VOYAGE' },
  { pairId: 'pic-racecar', label: 'Grand Prix Racer', sublabel: 'Silverstone Track', icon: '🏎️', bgGradient: 'from-red-600/30 to-orange-600/30', color: '#ef4444', badge: 'SPEED' },
  { pairId: 'pic-torii', label: 'Torii Sanctuary', sublabel: 'Miyajima Shrine', icon: '⛩️', bgGradient: 'from-amber-600/30 to-red-700/30', color: '#f97316', badge: 'SACRED' },
  { pairId: 'pic-helicopter', label: 'Alpine Rescue', sublabel: 'Everest Base', icon: '🚁', bgGradient: 'from-yellow-600/30 to-amber-700/30', color: '#facc15', badge: 'AERIAL' },
  { pairId: 'pic-ferris', label: 'Ferris Wheel', sublabel: 'London Promenade', icon: '🎡', bgGradient: 'from-violet-600/30 to-pink-600/30', color: '#c084fc', badge: 'CARNIVAL' },
  { pairId: 'pic-crystal', label: 'Geode Cavern', sublabel: 'Naica Caves', icon: '💎', bgGradient: 'from-purple-600/30 to-cyan-600/30', color: '#a855f7', badge: 'MINERAL' },
  { pairId: 'pic-windmill', label: 'Zaanse Windmill', sublabel: 'North Holland', icon: '🌾', bgGradient: 'from-emerald-600/30 to-amber-600/30', color: '#84cc16', badge: 'RUSTIC' },
];

export function getCardSourcesByMode(modeId: GameModeId): CardSource[] {
  switch (modeId) {
    case 'emoji':
      return EMOJI_CARDS;
    case 'animal':
      return ANIMAL_CARDS;
    case 'fruit':
      return FRUIT_CARDS;
    case 'number':
      return NUMBER_CARDS;
    case 'picture':
      return PICTURE_CARDS;
  }
}
