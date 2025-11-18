import type { CompanionState, Pokemon } from "@shared/schema";
import { TYPE_COLORS } from "@shared/schema";
import unknownSprite from "pokesprite-images/pokemon-gen7x/unknown.png";

interface CompanionAreaProps {
  companion: CompanionState;
  companionPokemon: Pokemon;
}

export default function CompanionArea({
  companion,
  companionPokemon
}: CompanionAreaProps) {
  // Get type-based gradient
  const primaryType = companionPokemon.types[0];
  const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.Normal;

  // Get Pokemon sprite URL from PokeAPI (cached CDN, reliable)
  const externalSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${companionPokemon.id}.png`;
  
  // Handle sprite loading error by switching to local fallback
  const handleSpriteError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = unknownSprite;
  };

  return (
    <div className="space-y-3">
      {/* Companion Display with Type Gradient */}
      <div
        className="relative rounded-md border-2 p-6 flex flex-col items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${typeColor.from} 0%, ${typeColor.to} 100%)`,
          minHeight: "240px",
          borderColor: typeColor.from
        }}
        data-testid="companion-display"
      >
        {/* Pokémon Sprite */}
        <img
          src={externalSpriteUrl}
          alt={companionPokemon.name}
          className="w-32 h-32 object-contain mb-3 pixelated"
          data-testid="pokemon-sprite"
          onError={handleSpriteError}
        />

        {/* Type Badge */}
        <div className="flex gap-1 mb-2">
          {companionPokemon.types.map((type) => (
            <span
              key={type}
              className="px-2 py-1 bg-white/90 rounded text-xs font-bold border border-white/40"
              data-testid={`type-badge-${type.toLowerCase()}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Mood Indicator */}
      <div
        className="text-center rounded border-2 p-2"
        style={{
          background: `linear-gradient(135deg, ${typeColor.from}15 0%, ${typeColor.to}15 100%)`,
          borderColor: typeColor.from
        }}
      >
        <span className="text-xs font-semibold text-muted-foreground">Mood: </span>
        <span className="text-xs font-bold" data-testid="text-mood">{companion.mood}</span>
      </div>
    </div>
  );
}