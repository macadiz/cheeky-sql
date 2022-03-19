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
  tabs: [],
  selectedTab: null,
};

const reducerFunction = (
  state: WorkspaceState,
  action: WorkspaceReducerAction
) => {
  const { CREATE_NEW_TAB, REMOVE_TAB, SET_CURRENT_TAB_DATA, SET_SELECTED_TAB } =
    constants.reducerActions;
  switch (action.type) {
    case CREATE_NEW_TAB: {
      return {
        ...state,
        tabs: [...state.tabs, action.tabData],
      } as WorkspaceState;
    }
    case REMOVE_TAB: {
      const currentTabs = [...state.tabs];
      const tabToRemoveIndex = currentTabs.findIndex(
        (tab) => tab.tabId === action.tabId
      );
      currentTabs.splice(tabToRemoveIndex, 1);

      return {
        ...state,
        tabs: [...currentTabs],
      } as WorkspaceState;
    }
    case SET_CURRENT_TAB_DATA: {
      return {
        ...state,
        selectedTab: {
          ...state.selectedTab,
          ...action.tabData,
        },
      } as WorkspaceState;
    }
    case SET_SELECTED_TAB: {
      const currentSelectedTabIndex = state.tabs.findIndex(
        (tab) => tab.tabId === state.selectedTab?.tabId
      );
      const currentTabs = [...state.tabs];
      currentTabs[currentSelectedTabIndex] = state.selectedTab as WorkspaceTab;

      const selectedTab = state.tabs.find((tab) => tab.tabId === action.tabId);

      return {
        ...state,
        tabs: currentTabs,
        selectedTab,
      } as WorkspaceState;
    }
    default: {
      return { ...state };
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
    if (state.tabs.length > 1) {
      const tabToRemoveIndex = state.tabs.findIndex(
        (tab) => tab.tabId === tabId
      );

      if (tabId === state.selectedTab?.tabId) {
        let nextSelectedTab;

        if (
          tabToRemoveIndex === 0 &&
          tabToRemoveIndex !== state.tabs.length - 1
        ) {
          nextSelectedTab = state.tabs[tabToRemoveIndex + 1];
        } else {
          nextSelectedTab = state.tabs[tabToRemoveIndex - 1];
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

  return {
    state,
    createNewTab,
    removeTab,
    setTabQuery,
    setQueryResults,
    setSelectedTab,
  };
};

export default useWorkspaceState;
