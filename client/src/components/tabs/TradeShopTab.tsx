import { Lock } from "lucide-react";

export default function TradeShopTab() {
  return (
    <div className="p-4 flex items-center justify-center" style={{ minHeight: "250px" }} data-testid="trade-shop-tab">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-pixel text-sm mb-2">Coming Soon</h3>
        <p className="text-xs text-muted-foreground max-w-xs">
          Trade and shop features will be available in a future update. Stay tuned!
        </p>
      </div>
    </div>
  );
}
