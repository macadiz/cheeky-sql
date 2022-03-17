import { createContext, FC, useContext } from "react";
import { ConnectionsStateHook } from "./types";
import useConnectionsState from "./useConnectionsState";

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

  return connectionsContext as ConnectionsStateHook;
};

export {
  ConnectionsContextProvider,
  useConnectionsContext,
  ConnectionsContext,
};
