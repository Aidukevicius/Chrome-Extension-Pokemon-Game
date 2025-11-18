import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import pokemonData from "../data/pokemon-gen1.json";
import CompanionArea from "./CompanionArea";
import RightPanel from "./RightPanel";
import BottomTabs from "./BottomTabs";
import PokedexTab from "./tabs/PokedexTab";
import ItemsTab from "./tabs/ItemsTab";
import TradeShopTab from "./tabs/TradeShopTab";
import SettingsTab from "./tabs/SettingsTab";
import MyTeamTab from "./tabs/MyTeamTab"; // Assuming MyTeamTab component is added

export default function GameShell() {
  const {
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
  } = useGameState();

  const [activeTab, setActiveTab] = useState<"pokedex" | "items" | "trade" | "settings" | "team">("pokedex");
  const [activePanel, setActivePanel] = useState<"stats" | "evolutions" | "about">("stats");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-2xl font-pixel mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  const companionPokemon = pokemonData.find(p => p.id === gameState.companion.pokemonId);

  if (!companionPokemon) {
    return <div>Error: Companion Pokémon not found</div>;
  }

  // Determine background gradient based on companion's primary type
  let backgroundGradient = "from-blue-50 to-purple-50"; // Default
  if (companionPokemon.types.includes("Fire")) {
    backgroundGradient = "from-red-100 to-yellow-100";
  } else if (companionPokemon.types.includes("Water")) {
    backgroundGradient = "from-blue-100 to-cyan-100";
  } else if (companionPokemon.types.includes("Grass")) {
    backgroundGradient = "from-green-100 to-lime-100";
  } else if (companionPokemon.types.includes("Electric")) {
    backgroundGradient = "from-yellow-100 to-orange-100";
  } else if (companionPokemon.types.includes("Psychic")) {
    backgroundGradient = "from-purple-100 to-pink-100";
  } else if (companionPokemon.types.includes("Fighting")) {
    backgroundGradient = "from-red-100 to-orange-100";
  } else if (companionPokemon.types.includes("Rock")) {
    backgroundGradient = "from-gray-200 to-gray-400";
  } else if (companionPokemon.types.includes("Ice")) {
    backgroundGradient = "from-blue-100 to-white";
  } else if (companionPokemon.types.includes("Dragon")) {
    backgroundGradient = "from-indigo-500 to-purple-500";
  }


  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${backgroundGradient} p-4`}>
      <div
        className="w-full max-w-[420px] bg-card border-4 border-border rounded-lg shadow-2xl overflow-hidden"
        data-testid="game-shell"
      >
        {/* Main Content Area */}
        <div className="flex gap-2 p-4 bg-background">
          {/* Companion Area (Left) */}
          <div className="flex-1">
            <CompanionArea
              companion={gameState.companion}
              companionPokemon={companionPokemon}
            />
          </div>

          {/* Right Panel */}
          <div className="w-32">
            <RightPanel
              activePanel={activePanel}
              setActivePanel={setActivePanel}
              companion={gameState.companion}
              companionPokemon={companionPokemon}
              onEvolve={evolveCompanion}
            />
          </div>
        </div>

        {/* Bottom Tab Bar */}
        <BottomTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          companionPokemon={companionPokemon}
        />

        {/* Tab Content */}
        <div className="bg-card border-t-2 border-border" style={{ minHeight: "300px", maxHeight: "300px", overflowY: "auto" }}>
          {activeTab === "team" && (
            <MyTeamTab
              pokedex={gameState.pokedex}
              currentCompanionId={gameState.companion.pokemonId}
              onSetCompanion={setCompanion}
            />
          )}
          {activeTab === "pokedex" && (
            <PokedexTab
              pokedex={gameState.pokedex}
              currentCompanionId={gameState.companion.pokemonId}
              onSetCompanion={setCompanion}
            />
          )}
          {activeTab === "items" && (
            <ItemsTab inventory={gameState.inventory} />
          )}
          {activeTab === "trade" && (
            <TradeShopTab />
          )}
          {activeTab === "settings" && (
            <SettingsTab
              theme={gameState.theme}
              soundEnabled={gameState.soundEnabled}
              onToggleTheme={toggleTheme}
              onToggleSound={toggleSound}
              onResetGame={resetGame}
            />
          )}
        </div>
      </div>
    </div>
  );
}