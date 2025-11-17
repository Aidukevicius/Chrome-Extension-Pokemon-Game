import { DEFAULT_ITEMS } from "@shared/schema";
import { Badge } from "../ui/badge";

interface ItemsTabProps {
  inventory: Record<string, number>;
}

const ITEM_ICONS: Record<string, string> = {
  berry: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png",
  potion: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png"
};

export default function ItemsTab({ inventory }: ItemsTabProps) {
  return (
    <div className="p-4" data-testid="items-tab">
      <h2 className="font-pixel text-sm mb-4">Items</h2>
      
      {Object.keys(inventory).length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No items yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {DEFAULT_ITEMS.map((item) => {
            const count = inventory[item.id] || 0;
            
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-card rounded border border-border"
                data-testid={`item-${item.id}`}
              >
                {ITEM_ICONS[item.id] && (
                  <img 
                    src={ITEM_ICONS[item.id]} 
                    alt={item.name}
                    className="w-8 h-8 pixelated"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <Badge variant="secondary" className="text-xs" data-testid={`item-count-${item.id}`}>
                      x{count}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  <p className="text-xs text-primary mt-1">{item.effect}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
