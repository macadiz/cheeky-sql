import { useReducer } from "react";
import {
  ConnectionsState,
  ConnectionsStateHook,
  Connection,
  ConnectionReducerAction,
  ConnectionInterfacesTypes,
} from "./types";
import { v4 as getUUIDD } from "uuid";
import constants from "./constants";

const initialState: ConnectionsState = {
  availableConnections: [],
  showAddConnectionModal: false,
  activeConnection: null,
};

const {
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  TOGGLE_ADD_CONNECTION_DIALOG,
  SET_ACTIVE_CONNECTION,
  SET_AVAILABLE_CONNECTIONS,
  SET_ACTIVE_DATABASE,
} = constants.reducerActions;

const reducerFunction = (
  state: ConnectionsState,
  action: ConnectionReducerAction
) => {
  switch (action.type) {
    case ADD_CONNECTION: {
      return {
        ...state,
        availableConnections: [
          ...state.availableConnections,
          ...(action.connection ?? []),
        ],
      } as ConnectionsState;
    }
    case SET_AVAILABLE_CONNECTIONS: {
      return {
        ...state,
        availableConnections: action.connection,
      } as ConnectionsState;
    }
    case REMOVE_CONNECTION: {
      return {
        ...state,
        availableConnections: [...state.availableConnections].filter(
          (connection) => connection.connectionId !== action.connectionId
        ),
      } as ConnectionsState;
    }
    case TOGGLE_ADD_CONNECTION_DIALOG: {
      return {
        ...state,
        showAddConnectionModal: !state.showAddConnectionModal,
      } as ConnectionsState;
    }
    case SET_ACTIVE_CONNECTION: {
      return {
        ...state,
        activeConnection: action.activeConnection
          ? {
              ...action.connectionData,
              connection: action.activeConnection,
            }
          : null,
      } as ConnectionsState;
    }
    case SET_ACTIVE_DATABASE: {
      return {
        ...state,
        defaultDatabase: action.database,
      } as ConnectionsState;
    }
    default: {
      return { ...state };
    }
  }
};

const useConnectionsState = (): ConnectionsStateHook => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const addNewConnection = (connection: Connection | Connection[]) => {
    let connectionsToAdd: Connection[] = [];
    if (Array.isArray(connection)) {
      connectionsToAdd = connection.map((connection) => ({
        ...connection,
        connectionId: getUUIDD(),
      }));
    } else {
      connection.connectionId = getUUIDD();
      connectionsToAdd.push(connection);
    }

    dispatch({
      type: ADD_CONNECTION,
      connection: connectionsToAdd,
    });
  };

  const removeConnection = (connectionId: string) => {
    dispatch({
      type: REMOVE_CONNECTION,
      connectionId,
    });
  };

  const toggleAddConnectionModal = () => {
    dispatch({ type: TOGGLE_ADD_CONNECTION_DIALOG });
  };

  const setActiveConnection = (
    activeConnection?: ConnectionInterfacesTypes,
    connectionData?: Connection
  ) => {
    dispatch({
      type: SET_ACTIVE_CONNECTION,
      activeConnection,
      connectionData,
    });
  };

  const setAvailableConnections = (connection: Connection[]) => {
    dispatch({
      type: SET_AVAILABLE_CONNECTIONS,
      connection,
    });
  };

  const setDefaultDatabase = (database: string) => {
    dispatch({
      type: SET_ACTIVE_DATABASE,
      database,
    });
  };

  return {
    state,
    addNewConnection,
    removeConnection,
    toggleAddConnectionModal,
    setActiveConnection,
    setAvailableConnections,
    setDefaultDatabase,
  };
};

export default useConnectionsState;
