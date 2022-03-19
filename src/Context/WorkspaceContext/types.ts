export type WorkspaceState = {
    tabs: WorkspaceTab[];
    selectedTab: WorkspaceTab | null;
}

export type WorkspaceTab = {
    tabId: string;
    SQLQuery: string;
    resultsToDisplay: unknown[][];
    queryHistory: string[];
}

export type WorkspaceStateHook = {
    state: WorkspaceState,
    createNewTab: () => void;
    removeTab: (tabId: string) => void;
    setTabQuery: (query: string) => void;
    setQueryResults: (results: unknown[][]) => void;
    setSelectedTab: (tabId: string) => void;
}

export type WorkspaceReducerAction = {
    type: string;
    tabId?: string;
    tabData?: Partial<WorkspaceTab>;
    results?: unknown[][];
}