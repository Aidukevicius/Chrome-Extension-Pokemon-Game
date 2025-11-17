import { useEffect } from "react";
import { useStorage } from "./useStorage";
import type { GameState, CompanionState, PokedexEntry } from "@shared/schema";
import { getXPForLevel, calculateMaxHP, deriveMood } from "@shared/schema";
import pokemonData from "../data/pokemon-gen1.json";

const NATURES = ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile", "Relaxed", "Impish", "Lax", "Timid", "Hasty", "Serious", "Jolly", "Naive", "Modest", "Mild", "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky"];

function getRandomNature(): string {
  return NATURES[Math.floor(Math.random() * NATURES.length)];
}

function getDefaultGameState(): GameState {
  const bulbasaur = pokemonData[0]; // Bulbasaur as starter
  const level = 5;
  const maxHP = calculateMaxHP(bulbasaur.baseStats.hp, level);
  
  const companion: CompanionState = {
    pokemonId: 1,
    level,
    currentHP: maxHP,
    maxHP,
    xp: 0,
    xpToNextLevel: getXPForLevel(level + 1),
    friendship: 50,
    hunger: 70,
    energy: 80,
    mood: "Content",
    nature: getRandomNature()
  };
  
  const pokedex: Record<number, PokedexEntry> = {};
  pokemonData.forEach((p) => {
    pokedex[p.id] = { seen: p.id === 1, caught: p.id === 1 };
  });
  
  return {
    companion,
    pokedex,
    inventory: { berry: 5, potion: 3 },
    lastInteracted: Date.now(),
    lastFed: Date.now(),
    lastTrained: Date.now(),
    theme: "classic",
    soundEnabled: false
  };
}

export function useGameState() {
  const { value: gameState, setValue: setGameState, isLoading } = useStorage<GameState>(
    "pocket-pal-state",
    getDefaultGameState()
  );

  // Apply passive decay on load and periodically
  useEffect(() => {
    if (isLoading) return;
    
    const applyDecay = () => {
      setGameState((prevState) => {
        const now = Date.now();
        const timeSinceInteraction = now - prevState.lastInteracted;
        const hoursPassed = timeSinceInteraction / (1000 * 60 * 60);
        
        if (hoursPassed > 0.1) { // Only decay if more than 6 minutes passed
          const decayAmount = Math.min(Math.floor(hoursPassed * 5), 30);
          
          const newCompanion = {
            ...prevState.companion,
            friendship: Math.max(0, prevState.companion.friendship - decayAmount),
            hunger: Math.max(0, prevState.companion.hunger - decayAmount),
            energy: Math.max(0, prevState.companion.energy - decayAmount),
            currentHP: Math.max(1, prevState.companion.currentHP - Math.floor(decayAmount / 2))
          };
          
          newCompanion.mood = deriveMood(newCompanion);
          
          return {
            ...prevState,
            companion: newCompanion,
            lastInteracted: now
          };
        }
        return prevState;
      });
    };
    
    // Apply decay on mount
    applyDecay();
    
    // Apply decay every 5 minutes
    const interval = setInterval(applyDecay, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  const petCompanion = () => {
    const now = Date.now();
    setGameState((prevState) => {
      const xpGain = 10;
      let newXP = prevState.companion.xp + xpGain;
      let newLevel = prevState.companion.level;
      let newMaxHP = prevState.companion.maxHP;
      let newCurrentHP = prevState.companion.currentHP;
      let newXPToNextLevel = prevState.companion.xpToNextLevel;
      
      // Check for level up (cap at 100)
      while (newXP >= newXPToNextLevel && newLevel < 100) {
        newXP -= newXPToNextLevel;
        newLevel++;
        newXPToNextLevel = getXPForLevel(newLevel + 1);
        const pokemon = pokemonData.find(p => p.id === prevState.companion.pokemonId);
        if (pokemon) {
          newMaxHP = calculateMaxHP(pokemon.baseStats.hp, newLevel);
          newCurrentHP = newMaxHP; // Full heal on level up
        }
      }
      
      const newCompanion = {
        ...prevState.companion,
        level: newLevel,
        currentHP: Math.min(newMaxHP, newCurrentHP),
        maxHP: newMaxHP,
        xp: newXP,
        xpToNextLevel: newXPToNextLevel,
        friendship: Math.min(100, Math.max(0, prevState.companion.friendship + 5)),
        hunger: Math.min(100, Math.max(0, prevState.companion.hunger)),
        energy: Math.min(100, Math.max(0, prevState.companion.energy))
      };
      
      newCompanion.mood = deriveMood(newCompanion);
      
      return {
        ...prevState,
        companion: newCompanion,
        lastInteracted: now
      };
    });
  };

  const feedCompanion = () => {
    const now = Date.now();
    setGameState((prevState) => {
      // Guard against insufficient berries
      if (!prevState.inventory.berry || prevState.inventory.berry < 1) return prevState;
      
      const newCompanion = {
        ...prevState.companion,
        hunger: Math.min(100, Math.max(0, prevState.companion.hunger + 30)),
        currentHP: Math.min(prevState.companion.maxHP, Math.max(0, prevState.companion.currentHP + 10)),
        friendship: Math.min(100, Math.max(0, prevState.companion.friendship + 3)),
        energy: Math.min(100, Math.max(0, prevState.companion.energy))
      };
      
      newCompanion.mood = deriveMood(newCompanion);
      
      return {
        ...prevState,
        companion: newCompanion,
        inventory: {
          ...prevState.inventory,
          berry: Math.max(0, prevState.inventory.berry - 1)
        },
        lastFed: now,
        lastInteracted: now
      };
    });
  };

  const trainCompanion = () => {
    const now = Date.now();
    setGameState((prevState) => {
      const xpGain = 25;
      let newXP = prevState.companion.xp + xpGain;
      let newLevel = prevState.companion.level;
      let newMaxHP = prevState.companion.maxHP;
      let newCurrentHP = prevState.companion.currentHP;
      let newXPToNextLevel = prevState.companion.xpToNextLevel;
      
      // Check for level up (cap at 100)
      while (newXP >= newXPToNextLevel && newLevel < 100) {
        newXP -= newXPToNextLevel;
        newLevel++;
        newXPToNextLevel = getXPForLevel(newLevel + 1);
        const pokemon = pokemonData.find(p => p.id === prevState.companion.pokemonId);
        if (pokemon) {
          newMaxHP = calculateMaxHP(pokemon.baseStats.hp, newLevel);
          newCurrentHP = newMaxHP; // Full heal on level up
        }
      }
      
      const newCompanion = {
        ...prevState.companion,
        level: newLevel,
        currentHP: Math.min(newMaxHP, newCurrentHP),
        maxHP: newMaxHP,
        xp: newXP,
        xpToNextLevel: newXPToNextLevel,
        hunger: Math.min(100, Math.max(0, prevState.companion.hunger - 10)),
        energy: Math.min(100, Math.max(0, prevState.companion.energy - 15)),
        friendship: Math.min(100, Math.max(0, prevState.companion.friendship + 2))
      };
      
      newCompanion.mood = deriveMood(newCompanion);
      
      return {
        ...prevState,
        companion: newCompanion,
        lastTrained: now,
        lastInteracted: now
      };
    });
  };

  const setCompanion = (pokemonId: number) => {
    const pokemon = pokemonData.find(p => p.id === pokemonId);
    if (!pokemon) return;
    
    setGameState((prevState) => {
      const level = 5;
      const maxHP = calculateMaxHP(pokemon.baseStats.hp, level);
      const newCompanion: CompanionState = {
        pokemonId,
        level,
        currentHP: maxHP,
        maxHP,
        xp: 0,
        xpToNextLevel: getXPForLevel(level + 1),
        friendship: 50,
        hunger: 70,
        energy: 80,
        mood: "Content",
        nature: getRandomNature()
      };
      
      return {
        ...prevState,
        companion: newCompanion,
        lastInteracted: Date.now()
      };
    });
  };

  const evolveCompanion = () => {
    setGameState((prevState) => {
      const currentPokemon = pokemonData.find(p => p.id === prevState.companion.pokemonId);
      if (!currentPokemon || !currentPokemon.evolvesTo) return prevState;
      
      // Check if evolution requirements are met
      if (currentPokemon.minLevel && prevState.companion.level < currentPokemon.minLevel) {
        return prevState;
      }
      
      const evolvedPokemon = pokemonData.find(p => p.id === currentPokemon.evolvesTo);
      if (!evolvedPokemon) return prevState;
      
      // Keep current level and stats, but change species
      const newMaxHP = calculateMaxHP(evolvedPokemon.baseStats.hp, prevState.companion.level);
      
      const newCompanion = {
        ...prevState.companion,
        pokemonId: evolvedPokemon.id,
        maxHP: newMaxHP,
        currentHP: newMaxHP, // Full heal on evolution
      };
      
      // Update Pokédex to mark evolved form as seen and caught
      const newPokedex = {
        ...prevState.pokedex,
        [evolvedPokemon.id]: { seen: true, caught: true }
      };
      
      return {
        ...prevState,
        companion: newCompanion,
        pokedex: newPokedex,
        lastInteracted: Date.now()
      };
    });
  };

  const resetGame = () => {
    setGameState(getDefaultGameState());
  };

  const toggleTheme = () => {
    setGameState((prevState) => ({
      ...prevState,
      theme: prevState.theme === "classic" ? "night" : "classic"
    }));
  };

  const toggleSound = () => {
    setGameState((prevState) => ({
      ...prevState,
      soundEnabled: !prevState.soundEnabled
    }));
  };

  return {
    gameState,
    isLoading,
    petCompanion,
    feedCompanion,
    trainCompanion,
    setCompanion,
    evolveCompanion,
    resetGame,
    toggleTheme,
    toggleSound
  };
}
