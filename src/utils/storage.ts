import { Connection } from "../Context/ConnectionsContext/types";

// Simple base64 encoding/decoding for basic obfuscation
// Note: This is NOT secure encryption, just basic obfuscation
// For production, consider using a Tauri plugin for secure storage
function encode(str: string): string {
  return btoa(encodeURIComponent(str));
}

function decode(str: string): string {
  try {
    return decodeURIComponent(atob(str));
  } catch {
    return "";
  }
}

export const saveConnections = (connections: Connection[]) => {
  const stringifiedConnections = JSON.stringify(connections);
  const loadedConnections = loadConnections();
  if (stringifiedConnections !== JSON.stringify(loadedConnections)) {
    const encoded = encode(stringifiedConnections);
    localStorage.setItem("connections", encoded);
  }
};

export const loadConnections = (): Connection[] => {
  const encoded = localStorage.getItem("connections");
  if (encoded) {
    try {
      const decoded = decode(encoded);
      return decoded ? JSON.parse(decoded) : [];
    } catch (error) {
      console.error("Failed to load connections:", error);
      return [];
    }
  }
  return [];
};
