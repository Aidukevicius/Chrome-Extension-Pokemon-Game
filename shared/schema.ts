import { z } from "zod";

// Pokémon data types
export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  spriteKey: string;
  evolvesTo?: number;
  minLevel?: number;
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  recommendedNatures: string[];
  description: string;
}

// Game state types
export interface CompanionState {
  pokemonId: number;
  level: number;
  currentHP: number;
  maxHP: number;
  xp: number;
  xpToNextLevel: number;
  friendship: number; // 0-100
  hunger: number; // 0-100
  energy: number; // 0-100
  mood: string; // Derived from stats
  nature: string;
}

export interface PokedexEntry {
  seen: boolean;
  caught: boolean;
}

export interface GameState {
  companion: CompanionState;
  pokedex: Record<number, PokedexEntry>;
  inventory: Record<string, number>;
  lastInteracted: number; // timestamp
  lastFed: number; // timestamp
  lastTrained: number; // timestamp
  theme: string;
  soundEnabled: boolean;
}

// Item types
export interface Item {
  id: string;
  name: string;
  description: string;
  effect: string;
}

// Helper to calculate XP needed for next level
export function getXPForLevel(level: number): number {
  return Math.floor(Math.pow(level, 3));
}

// Helper to calculate max HP based on level and base stats
export function calculateMaxHP(baseHP: number, level: number): number {
  return Math.floor(((2 * baseHP * level) / 100) + level + 10);
}

// Helper to derive mood from stats
export function deriveMood(companion: CompanionState): string {
  const avgStat = (companion.friendship + companion.hunger + companion.energy) / 3;
  
  if (avgStat >= 80) return "Happy";
  if (avgStat >= 60) return "Content";
  if (avgStat >= 40) return "Okay";
  if (avgStat >= 20) return "Unhappy";
  return "Sleepy";
}

// Type color mapping for gradients
export const TYPE_COLORS: Record<string, { from: string; to: string }> = {
  Normal: { from: "#A8A878", to: "#F5F5F5" },
  Fire: { from: "#F08030", to: "#FFF8DC" },
  Water: { from: "#6890F0", to: "#F0F8FF" },
  Electric: { from: "#F8D030", to: "#FFFACD" },
  Grass: { from: "#78C850", to: "#F0FFF0" },
  Ice: { from: "#98D8D8", to: "#F0FFFF" },
  Fighting: { from: "#C03028", to: "#FFF0F0" },
  Poison: { from: "#A040A0", to: "#FFF0FF" },
  Ground: { from: "#E0C068", to: "#FFFAF0" },
  Flying: { from: "#A890F0", to: "#F8F8FF" },
  Psychic: { from: "#F85888", to: "#FFF0F5" },
  Bug: { from: "#A8B820", to: "#F5FFF0" },
  Rock: { from: "#B8A038", to: "#FFF8DC" },
  Ghost: { from: "#705898", to: "#F5F0FF" },
  Dragon: { from: "#7038F8", to: "#F0F0FF" },
  Dark: { from: "#705848", to: "#FFF8F0" },
  Steel: { from: "#B8B8D0", to: "#F8F8FF" },
  Fairy: { from: "#EE99AC", to: "#FFF0F8" }
};

// Default items
export const DEFAULT_ITEMS: Item[] = [
  { id: "berry", name: "Berry", description: "A sweet fruit that Pokémon love", effect: "Restores hunger and HP" },
  { id: "potion", name: "Potion", description: "A spray-type medicine for wounds", effect: "Restores 20 HP" }
];
