import { createContext, FC, useContext } from "react";
import { ApplicationStateHook } from "./types";
import useApplicationState, { initialState } from "./useApplicationState";

const defaultValue: ApplicationStateHook = {
  state: initialState,
  showAlert: () => {
    return;
  },
  hideAlert: () => {
    return;
  },
};

const ApplicationContext = createContext<ApplicationStateHook>(defaultValue);

const ApplcationContextProvider: FC = ({ children }) => {
  const applicationStateHook = useApplicationState();

  return (
    <ApplicationContext.Provider value={applicationStateHook}>
      {children}
    </ApplicationContext.Provider>
  );
};

const useApplicationContext = (): ApplicationStateHook => {
  const applicationContext = useContext(ApplicationContext);

  return applicationContext;
};

export { ApplicationContext, ApplcationContextProvider, useApplicationContext };
