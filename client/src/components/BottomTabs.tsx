import type { Pokemon } from "@shared/schema";
import { TYPE_COLORS } from "@shared/schema";
import pokeBallIcon from "pokesprite-images/items/ball/poke.png";
import pokedexIcon from "pokesprite-images/items/key-item/adventure-guide.png";
import bagIcon from "pokesprite-images/items/key-item/forage-bag.png";
import coinIcon from "pokesprite-images/items/key-item/coin-case.png";
import townMapIcon from "pokesprite-images/items/key-item/town-map.png";

interface BottomTabsProps {
  activeTab: "team" | "pokedex" | "items" | "trade" | "settings";
  setActiveTab: (tab: "team" | "pokedex" | "items" | "trade" | "settings") => void;
  companionPokemon: Pokemon;
}

const TAB_ICONS: Record<string, string> = {
  team: pokeBallIcon,
  pokedex: pokedexIcon,
  items: bagIcon,
  trade: coinIcon,
  settings: townMapIcon
};

const TabIcon = ({ id }: { id: string }) => {
  return (
    <img 
      src={TAB_ICONS[id]} 
      alt={id}
      className="w-5 h-5 pixelated"
    />
  );
};

export default function BottomTabs({ activeTab, setActiveTab, companionPokemon }: BottomTabsProps) {
  const primaryType = companionPokemon?.types?.[0] || "Normal";
  const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.Normal;
  const tabs = [
    { id: "team" as const, label: "My Team" },
    { id: "pokedex" as const, label: "Pokédex" },
    { id: "items" as const, label: "Items" },
    { id: "trade" as const, label: "Shop" },
    { id: "settings" as const, label: "Settings" }
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
          <TabIcon id={tab.id} />
          <span className="text-[10px] font-pixel">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}