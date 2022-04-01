export type WorkspaceState = {
    workspaces: Workspace[];
    selectedWorkspaceConnectionId: string;
}

export type Workspace = {
    connectionId: string;
    tabs: WorkspaceTab[];
    selectedTab: WorkspaceTab | null;
}

export type WorkspaceTab = {
    tabId: string;
    SQLQuery: string;
    resultSet: ResultSet[];
    queryHistory: string[];
}

export type ResultSet = unknown[][];

export type WorkspaceStateHook = {
    state: WorkspaceState,
    createNewTab: () => void;
    removeTab: (tabId: string) => void;
    setTabQuery: (query: string) => void;
    setQueryResults: (results: ResultSet[]) => void;
    setSelectedTab: (tabId: string) => void;
    openWorkspace: (connectionId: string) => void;
    closeWorkspace: (connectionId: string) => void;
}

export type WorkspaceReducerAction = {
    type: string;
    tabId?: string;
    tabData?: Partial<WorkspaceTab>;
    results?: unknown[][];
    connectionId?: string;
    workspaceData?: Workspace;
}