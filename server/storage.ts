import { type GameState } from "@shared/schema";

// Storage interface for game state persistence
// This application uses client-side storage (localStorage/chrome.storage)
// Backend storage is kept minimal as a placeholder

export interface IStorage {
  // Add backend storage methods here if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // Placeholder for future backend storage needs
  }
}

export const storage = new MemStorage();
