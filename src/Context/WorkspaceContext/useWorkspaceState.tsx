import { useReducer } from "react";
import {
  WorkspaceReducerAction,
  WorkspaceState,
  WorkspaceStateHook,
  WorkspaceTab,
} from "./types";
import { v4 as getUUIDD } from "uuid";
import constants from "./constants";

const initialState: WorkspaceState = {
  workspaces: [],
  selectedWorkspaceConnectionId: "",
};

const getCurrentWorkspace = (state: WorkspaceState) => {
  const currentWorkspaceIndex = state.workspaces.findIndex((workspace) => {
    return workspace.connectionId === state.selectedWorkspaceConnectionId;
  });
  return state.workspaces[currentWorkspaceIndex];
};

const reducerFunction = (
  state: WorkspaceState,
  action: WorkspaceReducerAction
) => {
  const {
    CREATE_NEW_TAB,
    REMOVE_TAB,
    SET_CURRENT_TAB_DATA,
    SET_SELECTED_TAB,
    OPEN_WORKSPACE,
    CLOSE_WORKSPACE,
  } = constants.reducerActions;

  const newState = { ...state };
  const currentWorkspace = getCurrentWorkspace(newState);

  switch (action.type) {
    case CREATE_NEW_TAB: {
      currentWorkspace.tabs.push(action.tabData as WorkspaceTab);
      return newState as WorkspaceState;
    }
    case REMOVE_TAB: {
      const currentTabs = currentWorkspace.tabs;
      const tabToRemoveIndex = currentTabs.findIndex(
        (tab) => tab.tabId === action.tabId
      );
      currentTabs.splice(tabToRemoveIndex, 1);

      return newState as WorkspaceState;
    }
    case SET_CURRENT_TAB_DATA: {
      currentWorkspace.selectedTab = {
        ...(currentWorkspace.selectedTab as WorkspaceTab),
        ...action.tabData,
      };

      return newState as WorkspaceState;
    }
    case SET_SELECTED_TAB: {
      const currentSelectedTabIndex = currentWorkspace.tabs.findIndex(
        (tab) => tab.tabId === currentWorkspace.selectedTab?.tabId
      );
      const currentTabs = currentWorkspace.tabs;
      currentTabs[currentSelectedTabIndex] =
        currentWorkspace.selectedTab as WorkspaceTab;

      const selectedTab =
        currentWorkspace.tabs.find((tab) => tab.tabId === action.tabId) ?? null;
      currentWorkspace.selectedTab = selectedTab;

      return newState as WorkspaceState;
    }
    case OPEN_WORKSPACE: {
      if (!action.workspaceData) {
        const foundWorkspace = newState.workspaces.find(
          (workspace) => workspace.connectionId === action.connectionId
        );
        if (foundWorkspace) {
          newState.selectedWorkspaceConnectionId =
            action.connectionId as string;
        }
      } else {
        newState.workspaces.push(action.workspaceData);
        newState.selectedWorkspaceConnectionId =
          action.workspaceData.connectionId;
      }
      return newState as WorkspaceState;
    }
    case CLOSE_WORKSPACE: {
      const foundWorkspaceIndex = newState.workspaces.findIndex(
        (workspace) => workspace.connectionId === action.connectionId
      );
      newState.workspaces.splice(foundWorkspaceIndex, 1);
      if (newState.selectedWorkspaceConnectionId === action.connectionId) {
        newState.selectedWorkspaceConnectionId = "";
      }
      return newState as WorkspaceState;
    }
    default: {
      return newState as WorkspaceState;
    }
  }
};

const useWorkspaceState = (): WorkspaceStateHook => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const createNewTab = () => {
    const tabToCreate = {
      tabId: getUUIDD(),
      SQLQuery: "",
      resultsToDisplay: [],
      queryHistory: [],
    };
    dispatch({
      type: constants.reducerActions.CREATE_NEW_TAB,
      tabData: tabToCreate,
    });
    setSelectedTab(tabToCreate.tabId);
  };

  const removeTab = (tabId: string) => {
    const currentWorkspace = getCurrentWorkspace({ ...state });
    if (currentWorkspace.tabs.length > 1) {
      const tabToRemoveIndex = currentWorkspace.tabs.findIndex(
        (tab) => tab.tabId === tabId
      );

      if (tabId === currentWorkspace.selectedTab?.tabId) {
        let nextSelectedTab;

        if (
          tabToRemoveIndex === 0 &&
          tabToRemoveIndex !== currentWorkspace.tabs.length - 1
        ) {
          nextSelectedTab = currentWorkspace.tabs[tabToRemoveIndex + 1];
        } else {
          nextSelectedTab = currentWorkspace.tabs[tabToRemoveIndex - 1];
        }

        setSelectedTab(nextSelectedTab?.tabId);
      }

      dispatch({
        type: constants.reducerActions.REMOVE_TAB,
        tabId: tabId,
      });
    }
  };

  const setTabQuery = (SQLQuery: string) => {
    dispatch({
      type: constants.reducerActions.SET_CURRENT_TAB_DATA,
      tabData: {
        SQLQuery,
      },
    });
  };

  const setQueryResults = (queryResults: unknown[][]) => {
    dispatch({
      type: constants.reducerActions.SET_CURRENT_TAB_DATA,
      tabData: {
        resultsToDisplay: queryResults,
      },
    });
  };

  const setSelectedTab = (tabId: string) => {
    dispatch({
      type: constants.reducerActions.SET_SELECTED_TAB,
      tabId,
    });
  };

  const openWorkspace = (connectionId: string) => {
    const foundWorkspace = state.workspaces.find((workspace) => workspace.connectionId === connectionId);
    if (foundWorkspace) {
      dispatch({ type: constants.reducerActions.OPEN_WORKSPACE, connectionId });
    } else {
      dispatch({
        type: constants.reducerActions.OPEN_WORKSPACE,
        workspaceData: {
          connectionId,
          tabs: [],
          selectedTab: null,
        },
      });
    }
  };

  const closeWorkspace = (connectionId: string) => {
    dispatch({ type: constants.reducerActions.CLOSE_WORKSPACE, connectionId });
  };

  return {
    state,
    createNewTab,
    removeTab,
    setTabQuery,
    setQueryResults,
    setSelectedTab,
    openWorkspace,
    closeWorkspace,
  };
};

export default useWorkspaceState;
