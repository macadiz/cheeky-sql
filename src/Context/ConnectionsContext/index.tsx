import { createContext, FC, useContext, useEffect, useState } from "react";
import { loadConnections, saveConnections } from "../../utils/storage";
import { Connection, ConnectionsStateHook } from "./types";
import useConnectionsState from "./useConnectionsState";

const remote = window.require('@electron/remote');

const ConnectionsContext = createContext<ConnectionsStateHook | null>(null);

const ConnectionsContextProvider: FC = ({ children }) => {
  const connectionsState = useConnectionsState();

  return (
    <ConnectionsContext.Provider value={connectionsState}>
      {children}
    </ConnectionsContext.Provider>
  );
};

const useConnectionsContext = (): ConnectionsStateHook => {
  const connectionsContext = useContext(ConnectionsContext);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (connectionsContext) {
      if (connectionsContext.state.availableConnections.length > 0 && isMounted) {
        saveConnections(connectionsContext.state.availableConnections);
      } else if (!isMounted) {
        connectionsContext.setAvailableConnections(loadConnections());
      }
      setMounted(true);
    }
  }, [connectionsContext, connectionsContext?.state.availableConnections]);

  return connectionsContext as ConnectionsStateHook;
};

export {
  ConnectionsContextProvider,
  useConnectionsContext,
  ConnectionsContext,
};
