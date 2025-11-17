import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface SettingsTabProps {
  theme: string;
  soundEnabled: boolean;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onResetGame: () => void;
}

export default function SettingsTab({
  theme,
  soundEnabled,
  onToggleTheme,
  onToggleSound,
  onResetGame
}: SettingsTabProps) {
  return (
    <div className="p-4" data-testid="settings-tab">
      <h2 className="font-pixel text-sm mb-4">Settings</h2>
      
      <div className="space-y-4">
        {/* Sound Toggle */}
        <div className="flex items-center justify-between p-3 bg-card rounded border border-border">
          <div>
            <h3 className="font-semibold text-sm mb-1">Sound Effects</h3>
            <p className="text-xs text-muted-foreground">Enable sound effects and music</p>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={onToggleSound}
            data-testid="switch-sound"
          />
        </div>

        {/* Theme Selector */}
        <div className="flex items-center justify-between p-3 bg-card rounded border border-border">
          <div>
            <h3 className="font-semibold text-sm mb-1">Theme</h3>
            <p className="text-xs text-muted-foreground">Current: {theme === "classic" ? "Classic" : "Night"}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleTheme}
            data-testid="button-toggle-theme"
          >
            Switch
          </Button>
        </div>

        {/* Reset Game */}
        <div className="p-3 bg-card rounded border border-destructive/50">
          <h3 className="font-semibold text-sm mb-1 text-destructive">Danger Zone</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Reset all game data and start fresh with a new companion
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                data-testid="button-reset-game"
              >
                Reset Game Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your current companion,
                  Pokédex progress, and inventory. You'll start fresh with a new Bulbasaur.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="button-cancel-reset">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onResetGame}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  data-testid="button-confirm-reset"
                >
                  Reset Game
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
