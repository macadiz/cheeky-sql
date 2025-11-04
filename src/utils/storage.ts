import { Connection } from "../Context/ConnectionsContext/types";

const { safeStorage } = window.require("@electron/remote");

export const saveConnections = (connections: Connection[]) => {
  const stringifiedConnections = JSON.stringify(connections);
  const loadedConnections = loadConnections();
  if (stringifiedConnections !== JSON.stringify(loadedConnections)) {
    const encryptedConnections = safeStorage.encryptString(
      stringifiedConnections
    );
    localStorage.setItem(
      "connections",
      JSON.stringify(encryptedConnections.toJSON())
    );
  }
};

export const loadConnections = (): Connection[] => {
  const encryptedConnections = localStorage.getItem("connections");
  if (encryptedConnections) {
    try {
      return JSON.parse(
        safeStorage.decryptString(Buffer.from(JSON.parse(encryptedConnections)))
      );
    } catch (error) {
      console.error("Failed to decrypt connections:", error);
      return [];
    }
  }
  return [];
};
