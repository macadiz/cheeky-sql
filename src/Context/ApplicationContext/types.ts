import { AnyFunction } from "../../types";

export type ApplicationState = {
    alertDialogData: AlertDialogData;
}

type AlertDialogData = {
    isOpen: boolean;
    title: string;
    content: string;
    type: AlertDialogType;
    onConfirmAction: AnyFunction;
}

export type ApplicationReducerAction = {
    type: string;
    alertDialogData: AlertDialogData
}

export type ApplicationStateHook = {
    state: ApplicationState;
    showAlert: (title: string, content: string, type?: AlertDialogType, onConfirm?: AnyFunction) => void;
    hideAlert: () => void;
}

export type AlertDialogType = "alert" | "confirm";