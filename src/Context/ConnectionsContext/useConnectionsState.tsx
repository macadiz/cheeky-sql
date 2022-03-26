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

const reducerFunction = (
  state: ConnectionsState,
  action: ConnectionReducerAction
) => {
  const {
    ADD_CONNECTION,
    REMOVE_CONNECTION,
    TOGGLE_ADD_CONNECTION_DIALOG,
    SET_ACTIVE_CONNECTION,
    SET_AVAILABLE_CONNECTIONS,
  } = constants.reducerActions;
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
        activeConnection: {
          ...action.connectionData,
          connection: action.activeConnection,
        },
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
      type: constants.reducerActions.ADD_CONNECTION,
      connection: connectionsToAdd,
    });
  };

  const removeConnection = (connectionId: string) => {
    dispatch({
      type: constants.reducerActions.REMOVE_CONNECTION,
      connectionId,
    });
  };

  const toggleAddConnectionModal = () => {
    dispatch({ type: constants.reducerActions.TOGGLE_ADD_CONNECTION_DIALOG });
  };

  const setActiveConnection = (
    activeConnection: ConnectionInterfacesTypes,
    connectionData: Connection
  ) => {
    dispatch({
      type: constants.reducerActions.SET_ACTIVE_CONNECTION,
      activeConnection,
      connectionData,
    });
  };

  const setAvailableConnections = (connection: Connection[]) => {
    dispatch({
      type: constants.reducerActions.SET_AVAILABLE_CONNECTIONS,
      connection,
    });
  };

  return {
    state,
    addNewConnection,
    removeConnection,
    toggleAddConnectionModal,
    setActiveConnection,
    setAvailableConnections,
  };
};

export default useConnectionsState;
