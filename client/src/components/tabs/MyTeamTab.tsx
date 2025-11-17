import type { PokedexEntry } from "@shared/schema";
import pokemonData from "../../data/pokemon-gen1.json";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface MyTeamTabProps {
  pokedex: Record<number, PokedexEntry>;
  currentCompanionId: number;
  onSetCompanion: (pokemonId: number) => void;
}

export default function MyTeamTab({ pokedex, currentCompanionId, onSetCompanion }: MyTeamTabProps) {
  const caughtPokemon = pokemonData.filter(pokemon => pokedex[pokemon.id]?.caught);

  const getPokemonImageUrl = (spriteKey: string) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${spriteKey}.png`;
  };

  if (caughtPokemon.length === 0) {
    return (
      <div className="p-4 text-center" data-testid="my-team-empty">
        <p className="text-sm text-muted-foreground">No Pokémon caught yet!</p>
        <p className="text-xs text-muted-foreground mt-2">Catch Pokémon by viewing them in the Pokédex.</p>
      </div>
    );
  }

  return (
    <div className="p-4" data-testid="my-team-grid">
      <h2 className="font-pixel text-sm mb-4">My Team ({caughtPokemon.length})</h2>
      <div className="grid grid-cols-2 gap-3">
        {caughtPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`p-3 rounded border-2 transition-all ${
              currentCompanionId === pokemon.id
                ? "bg-primary/10 border-primary"
                : "bg-card border-border hover-elevate"
            }`}
            data-testid={`team-pokemon-${pokemon.id}`}
          >
            <div className="flex flex-col items-center">
              <img
                src={getPokemonImageUrl(pokemon.spriteKey)}
                alt={pokemon.name}
                className="w-16 h-16 object-contain mb-2 pixelated"
              />
              <div className="font-pixel text-xs mb-1">
                #{pokemon.id.toString().padStart(3, '0')}
              </div>
              <div className="text-xs font-semibold mb-2">{pokemon.name}</div>
              <div className="flex gap-1 mb-2 flex-wrap justify-center">
                {pokemon.types.map(type => (
                  <Badge key={type} variant="secondary" className="text-[8px] px-1 py-0">
                    {type}
                  </Badge>
                ))}
              </div>
              {currentCompanionId !== pokemon.id && (
                <Button
                  onClick={() => onSetCompanion(pokemon.id)}
                  size="sm"
                  variant="outline"
                  className="text-[10px] px-2 py-1 h-auto w-full"
                  data-testid={`button-set-companion-${pokemon.id}`}
                >
                  Set as Companion
                </Button>
              )}
              {currentCompanionId === pokemon.id && (
                <Badge variant="default" className="text-[8px] px-2 py-1">
                  Current
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}