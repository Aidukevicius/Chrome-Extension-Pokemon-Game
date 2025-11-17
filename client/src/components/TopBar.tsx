import type { CompanionState, Pokemon } from "@shared/schema";
import { TYPE_COLORS } from "@shared/schema";

interface TopBarProps {
  companion: CompanionState;
  companionPokemon: Pokemon;
}

export default function TopBar({ companion, companionPokemon }: TopBarProps) {
  const hpPercentage = (companion.currentHP / companion.maxHP) * 100;
  const primaryType = companionPokemon.types[0];
  const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.Normal;
  
  return (
    <div 
      className="p-3 flex items-center justify-between" 
      style={{
        background: `linear-gradient(135deg, ${typeColor.from} 0%, ${typeColor.to} 100%)`
      }}
      data-testid="top-bar"
    >
      {/* Logo */}
      <div>
        <h1 className="font-pixel text-white text-sm leading-tight" data-testid="logo-title">
          Pocket Pal
        </h1>
        <p className="font-pixel text-white/80 text-xs mt-1" data-testid="logo-subtitle">
          Kanto
        </p>
      </div>

      {/* Companion Status */}
      <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-2 min-w-[160px]" data-testid="companion-status">
        <div className="flex items-center justify-between mb-1">
          <span className="font-pixel text-white text-xs" data-testid="text-companion-name">
            {companionPokemon.name}
          </span>
          <span className="font-pixel text-white text-xs" data-testid="text-companion-level">
            Lv.{companion.level}
          </span>
        </div>
        
        {/* HP Bar */}
        <div className="flex items-center gap-1">
          <span className="font-pixel text-white text-[10px]">HP:</span>
          <div className="flex-1 h-3 bg-black/30 rounded-sm border border-white/50 overflow-hidden" data-testid="hp-bar-container">
            <div
              className={`h-full transition-all duration-300 ${
                hpPercentage > 50 ? 'bg-green-400' :
                hpPercentage > 25 ? 'bg-yellow-400' :
                'bg-red-400'
              }`}
              style={{ width: `${hpPercentage}%` }}
              data-testid="hp-bar-fill"
            />
          </div>
        </div>
        <div className="text-center">
          <span className="font-pixel text-white text-[10px]" data-testid="text-hp-value">
            {companion.currentHP}/{companion.maxHP}
          </span>
        </div>
      </div>
    </div>
  );
}
