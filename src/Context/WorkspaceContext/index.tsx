import { createContext, FC, useContext } from "react";
import { WorkspaceStateHook } from "./types";
import useWorkspaceState from "./useWorkspaceState";

const WorkspaceContext = createContext<WorkspaceStateHook | null>(null);

const WorkspaceContextProvider: FC = ({ children }) => {
  const workspaceState = useWorkspaceState();

  return (
    <WorkspaceContext.Provider value={workspaceState}>
      {children}
    </WorkspaceContext.Provider>
  );
};

const useWorkspaceContext = (): WorkspaceStateHook => {
  const workspaceContext = useContext(WorkspaceContext);

  return workspaceContext as WorkspaceStateHook;
};

export { WorkspaceContextProvider, useWorkspaceContext, WorkspaceContext };
