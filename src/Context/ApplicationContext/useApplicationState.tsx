import { useReducer } from "react";
import { AnyFunction } from "../../types";
import constants from "./constants";
import {
  AlertDialogType,
  ApplicationReducerAction,
  ApplicationState,
  ApplicationStateHook,
} from "./types";

const emptyFunction = () => {
  return;
};

export const initialState: ApplicationState = {
  alertDialogData: {
    isOpen: false,
    title: "",
    content: "",
    type: "alert",
    onConfirmAction: emptyFunction,
  },
};

const reducerFunction = (
  state: ApplicationState,
  action: ApplicationReducerAction
): ApplicationState => {
  const { TOGGLE_ALERT_DIALOG } = constants.applicationReducerActions;
  switch (action.type) {
    case TOGGLE_ALERT_DIALOG: {
      return {
        ...state,
        alertDialogData: action.alertDialogData,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const useApplicationState = (): ApplicationStateHook => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const showAlert = (
    title: string,
    content: string,
    type: AlertDialogType = "alert",
    onConfirm: AnyFunction = emptyFunction
  ) => {
    dispatch({
      type: constants.applicationReducerActions.TOGGLE_ALERT_DIALOG,
      alertDialogData: {
        isOpen: true,
        title,
        content,
        type,
        onConfirmAction: onConfirm,
      },
    });
  };

  const hideAlert = () => {
    dispatch({
      type: constants.applicationReducerActions.TOGGLE_ALERT_DIALOG,
      alertDialogData: initialState.alertDialogData,
    });
  };

  return {
    state,
    showAlert,
    hideAlert,
  };
};

export default useApplicationState;
