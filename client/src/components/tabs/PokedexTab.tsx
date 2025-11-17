import { useState } from "react";
import type { PokedexEntry } from "@shared/schema";
import pokemonData from "../../data/pokemon-gen1.json";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft } from "lucide-react";

interface PokedexTabProps {
  pokedex: Record<number, PokedexEntry>;
  currentCompanionId: number;
  onSetCompanion: (pokemonId: number) => void;
}

export default function PokedexTab({ pokedex, currentCompanionId, onSetCompanion }: PokedexTabProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);

  const getPokemonImageUrl = (spriteKey: string) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${spriteKey}.png`;
  };

  if (selectedPokemon !== null) {
    const pokemon = pokemonData.find(p => p.id === selectedPokemon);
    if (!pokemon) return null;

    const entry = pokedex[selectedPokemon];

    // Build evolution chain
    const chain: typeof pokemonData = [];
    let current = pokemon;

    // Find the base form
    while (true) {
      const prevForm = pokemonData.find(p => p.evolvesTo === current.id);
      if (prevForm) {
        current = prevForm;
      } else {
        break;
      }
    }

    // Build chain from base
    chain.push(current);
    while (current.evolvesTo) {
      const next = pokemonData.find(p => p.id === current.evolvesTo);
      if (next) {
        chain.push(next);
        current = next;
      } else {
        break;
      }
    }

    return (
      <div className="p-4" data-testid="pokemon-detail">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedPokemon(null)}
          className="mb-3"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-pixel text-lg" data-testid="text-pokemon-name">
                #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
              </h2>
              <div className="flex gap-1 mt-2">
                {pokemon.types.map(type => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {entry.caught && currentCompanionId !== pokemon.id && (
              <Button
                onClick={() => {
                  onSetCompanion(pokemon.id);
                  setSelectedPokemon(null);
                }}
                variant="default"
                size="sm"
                data-testid="button-set-companion"
              >
                Set as Companion
              </Button>
            )}
            {!entry.caught && (
              <Badge variant="secondary" className="text-xs">
                Not Caught
              </Badge>
            )}
          </div>

          <div className="bg-muted rounded p-3">
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <p className="text-xs text-muted-foreground">{pokemon.description}</p>
          </div>

          <div className="bg-muted rounded p-3">
            <h3 className="text-sm font-semibold mb-2">Evolution Chain</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {chain.map((evo, idx) => (
                <div key={evo.id} className="flex items-center gap-2">
                  <div className="text-center">
                    <div className="text-xs font-semibold">{evo.name}</div>
                    {evo.minLevel && evo.minLevel < 99 && (
                      <div className="text-[10px] text-muted-foreground">Lv. {evo.minLevel}</div>
                    )}
                  </div>
                  {idx < chain.length - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted rounded p-3">
            <h3 className="text-sm font-semibold mb-2">Recommended Natures</h3>
            <div className="flex flex-wrap gap-1">
              {pokemon.recommendedNatures.map(nature => (
                <Badge key={nature} variant="outline" className="text-xs">
                  {nature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4" data-testid="pokedex-grid">

      <div className="grid grid-cols-3 gap-2">
        {pokemonData.map((pokemon) => {
          const entry = pokedex[pokemon.id] || { seen: false, caught: false };

          return (
            <button
              key={pokemon.id}
              onClick={() => entry.seen && setSelectedPokemon(pokemon.id)}
              disabled={!entry.seen}
              className={`p-2 rounded border-2 transition-all text-center ${
                entry.caught
                  ? "bg-card border-border hover-elevate cursor-pointer"
                  : entry.seen
                  ? "bg-muted border-border/50 hover-elevate cursor-pointer"
                  : "bg-muted/50 border-border/30 cursor-not-allowed opacity-50"
              }`}
              data-testid={`pokemon-entry-${pokemon.id}`}
            >
              <div className="font-pixel text-[10px] text-muted-foreground mb-1">
                #{pokemon.id.toString().padStart(3, '0')}
              </div>
              <div className="text-xs font-semibold mb-1">
                {entry.seen ? pokemon.name : "???"}
              </div>
              <div className="flex justify-center gap-1">
                {entry.caught && (
                  <Badge variant="default" className="text-[8px] px-1 py-0">
                    Caught
                  </Badge>
                )}
                {entry.seen && !entry.caught && (
                  <Badge variant="secondary" className="text-[8px] px-1 py-0">
                    Seen
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}