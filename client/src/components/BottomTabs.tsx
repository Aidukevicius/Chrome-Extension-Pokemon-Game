import type { Pokemon } from "@shared/schema";
import { TYPE_COLORS } from "@shared/schema";

interface BottomTabsProps {
  activeTab: "team" | "pokedex" | "items" | "trade" | "settings";
  setActiveTab: (tab: "team" | "pokedex" | "items" | "trade" | "settings") => void;
  companionPokemon: Pokemon;
}

export default function BottomTabs({ activeTab, setActiveTab, companionPokemon }: BottomTabsProps) {
  const primaryType = companionPokemon?.types?.[0] || "Normal";
  const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.Normal;
  const tabs = [
    { id: "team" as const, icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png", label: "My Team" },
    { id: "pokedex" as const, icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pokedex.png", label: "Pokédex" },
    { id: "items" as const, icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/bag.png", label: "Items" },
    { id: "trade" as const, icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/coin.png", label: "Shop" },
    { id: "settings" as const, icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png", label: "Settings" }
  ];

  return (
    <div className="bg-muted border-t-2 border-border grid grid-cols-5" data-testid="bottom-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 py-3 transition-all hover-elevate ${
            activeTab === tab.id
              ? "text-white"
              : "text-muted-foreground"
          }`}
          style={activeTab === tab.id ? {
            background: `linear-gradient(135deg, ${typeColor.from} 0%, ${typeColor.to} 100%)`
          } : {}}
          data-testid={`tab-${tab.id}`}
        >
          <img
            src={tab.icon}
            alt={tab.label}
            className="w-5 h-5 pixelated"
          />
          <span className="text-[10px] font-pixel">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}