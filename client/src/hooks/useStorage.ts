import { useState, useEffect } from "react";

// Storage abstraction: chrome.storage.sync for extension, localStorage for web
export function useStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Detect if we're in a Chrome extension environment
  const isChromeExtension = typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync;

  useEffect(() => {
    const loadValue = async () => {
      try {
        if (isChromeExtension) {
          // Use chrome.storage.sync
          chrome.storage.sync.get([key], (result) => {
            if (result[key] !== undefined) {
              setValue(result[key]);
            }
            setIsLoading(false);
          });
        } else {
          // Use localStorage
          const stored = localStorage.getItem(key);
          if (stored && stored !== "undefined") {
            try {
              setValue(JSON.parse(stored));
            } catch (e) {
              console.error("Failed to parse stored value:", e);
            }
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading storage:", error);
        setIsLoading(false);
      }
    };

    loadValue();
  }, [key, isChromeExtension]);

  const saveValue = async (newValue: T) => {
    try {
      setValue(newValue);
      
      if (isChromeExtension) {
        // Use chrome.storage.sync
        chrome.storage.sync.set({ [key]: newValue });
      } else {
        // Use localStorage
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.error("Error saving storage:", error);
    }
  };

  return { value, setValue: saveValue, isLoading };
}
