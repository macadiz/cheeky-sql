export type ConnectionsState = {
    connections: Connection[];
    showAddConnectionModal: boolean;
}

export type Connection = {
    connectionId?: string;
    name: string;
    type: ConnectionTypes;
    connectionString: string;
}

export type ConnectionsStateHook = {
    state: ConnectionsState,
    addNewConnection: (connection: Connection) => void;
    removeConnection: (connectionId: string) => void;
    toggleAddConnectionModal: () => void;
}

export type ConnectionReducerAction = { type: string; connection?: Connection; connectionId?: string };

export type ConnectionTypes = "MYSQL";