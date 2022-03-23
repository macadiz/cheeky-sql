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

export const loadConnections = () => {
  const encryptedConnections = localStorage.getItem("connections");
  if (encryptedConnections) {
    return JSON.parse(
      safeStorage.decryptString(Buffer.from(JSON.parse(encryptedConnections)))
    );
  }
  return [];
};
