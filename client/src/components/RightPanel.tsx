import type { CompanionState, Pokemon } from "@shared/schema";
import { TYPE_COLORS } from "@shared/schema";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import expShareIcon from "pokesprite-images/items/key-item/exp-share.png";
import fireStoneIcon from "pokesprite-images/items/evo-item/fire-stone.png";
import pokedexIcon from "pokesprite-images/items/key-item/adventure-guide.png";
import pokemonData from "../data/pokemon-gen1.json";

interface RightPanelProps {
  activePanel: "stats" | "evolutions" | "about";
  setActivePanel: (panel: "stats" | "evolutions" | "about") => void;
  companion: CompanionState;
  companionPokemon: Pokemon;
  onEvolve: () => void;
}

export default function RightPanel({
  activePanel,
  setActivePanel,
  companion,
  companionPokemon,
  onEvolve
}: RightPanelProps) {
  const primaryType = companionPokemon.types[0];
  const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.Normal;

  return (
    <div className="space-y-3">
      {/* 3-Dot Selector */}
      <div
        className="flex flex-col gap-2 rounded border-2 p-2"
        style={{
          background: `linear-gradient(135deg, ${typeColor.from}15 0%, ${typeColor.to}15 100%)`,
          borderColor: typeColor.from
        }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePanel("stats")}
            className={`w-6 h-6 rounded-full border-2 transition-all flex-shrink-0 ${
              activePanel === "stats"
                ? "scale-110"
                : "bg-secondary border-secondary-border hover-elevate"
            }`}
            style={activePanel === "stats" ? {
              background: typeColor.from,
              borderColor: typeColor.from
            } : {}}
            data-testid="button-panel-stats"
            aria-label="Stats panel"
          />
          <span className="font-pixel text-[10px]">Stats</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePanel("evolutions")}
            className={`w-6 h-6 rounded-full border-2 transition-all flex-shrink-0 ${
              activePanel === "evolutions"
                ? "scale-110"
                : "bg-secondary border-secondary-border hover-elevate"
            }`}
            style={activePanel === "evolutions" ? {
              background: typeColor.from,
              borderColor: typeColor.from
            } : {}}
            data-testid="button-panel-evolutions"
            aria-label="Evolutions panel"
          />
          <span className="font-pixel text-[10px]">EVO</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePanel("about")}
            className={`w-6 h-6 rounded-full border-2 transition-all flex-shrink-0 ${
              activePanel === "about"
                ? "scale-110"
                : "bg-secondary border-secondary-border hover-elevate"
            }`}
            style={activePanel === "about" ? {
              background: typeColor.from,
              borderColor: typeColor.from
            } : {}}
            data-testid="button-panel-about"
            aria-label="About panel"
          />
          <span className="font-pixel text-[10px]">About</span>
        </div>
      </div>

      {/* Panel Content */}
      <div
        className="rounded border-2 p-3 text-xs space-y-2"
        style={{
          height: "217px",
          background: `linear-gradient(135deg, ${typeColor.from}15 0%, ${typeColor.to}15 100%)`,
          borderColor: typeColor.from
        }}
      >
        {activePanel === "stats" && (
          <div data-testid="panel-stats">
            <h3 className="font-pixel text-[10px] mb-3 text-foreground">Stats</h3>
            <div className="space-y-2">
              <div>
                <div className="text-muted-foreground text-[10px]">Nature</div>
                <div className="text-[10px] font-semibold" data-testid="text-nature">{companion.nature}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-muted-foreground text-[8px]">HP</div>
                  <div className="text-[10px] font-semibold">{companionPokemon.baseStats.hp}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[8px]">Attack</div>
                  <div className="text-[10px] font-semibold">{companionPokemon.baseStats.attack}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[8px]">Defense</div>
                  <div className="text-[10px] font-semibold">{companionPokemon.baseStats.defense}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[8px]">Sp. Atk</div>
                  <div className="text-[10px] font-semibold">{companionPokemon.baseStats.spAttack}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[8px]">Sp. Def</div>
                  <div className="text-[10px] font-semibold">{companionPokemon.baseStats.spDefense}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[8px]">Speed</div>
                  <div className="text-[10px] font-semibold">{companionPokemon.baseStats.speed}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === "evolutions" && (
          <div data-testid="panel-evolutions">
            <h3 className="font-pixel text-[10px] mb-3 text-foreground">Evolution</h3>
            <div className="space-y-2">
              {(() => {
                // Build evolution chain
                const chain: Pokemon[] = [];
                let current = companionPokemon;

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

                // Check if evolution is ready (match logic in evolveCompanion)
                const canEvolve = companionPokemon.evolvesTo &&
                  (!companionPokemon.minLevel || companion.level >= companionPokemon.minLevel);

                return (
                  <>
                    {chain.map((pokemon, idx) => (
                      <div key={pokemon.id} className="text-[10px]">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            pokemon.id === companionPokemon.id ? 'bg-primary' : 'bg-muted'
                          }`} />
                          <span className={pokemon.id === companionPokemon.id ? 'font-bold' : ''}>
                            {pokemon.name}
                          </span>
                        </div>
                        {pokemon.minLevel && (
                          <div className="text-[8px] text-muted-foreground ml-3">
                            {pokemon.minLevel < 99 ? `Lv. ${pokemon.minLevel}` : "Special"}
                            {companion.level >= pokemon.minLevel && pokemon.id === companionPokemon.id && (
                              <Badge variant="default" className="ml-1 text-[6px] px-1 py-0">Ready!</Badge>
                            )}
                          </div>
                        )}
                        {idx < chain.length - 1 && (
                          <div className="text-[8px] text-muted-foreground ml-3">↓</div>
                        )}
                      </div>
                    ))}

                    {canEvolve && (
                      <Button
                        onClick={onEvolve}
                        size="sm"
                        className="w-full mt-2 text-[10px] font-pixel border-2"
                        style={{
                          background: `linear-gradient(135deg, ${typeColor.from} 0%, ${typeColor.to} 100%)`,
                          borderColor: typeColor.from,
                          color: 'white'
                        }}
                        data-testid="button-evolve"
                      >
                        Evolve Now!
                      </Button>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {activePanel === "about" && (
          <div data-testid="panel-about">
            <h3 className="font-pixel text-[10px] mb-3 text-foreground">About</h3>
            <div className="space-y-2">
              <div>
                <div className="text-muted-foreground text-[10px] mb-1">Best Natures</div>
                <div className="flex flex-wrap gap-1">
                  {companionPokemon.recommendedNatures.slice(0, 3).map(nature => (
                    <Badge key={nature} variant="secondary" className="text-[8px] px-1 py-0">
                      {nature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}