// Connection configuration interface for MySQL
export interface ConnectionConfiguration {
    host: string;
    port: number;
    user: string;
    password: string;
    database?: string | null;
}

export type ConnectionsState = {
    availableConnections: Connection[];
    showAddConnectionModal: boolean;
    activeConnection: ActiveConnection | null;
    defaultDatabase?: string | null;
}

export type Connection = {
    connectionId?: string;
    name: string;
    type: ConnectionTypes;
    connectionObject: ConnectionConfiguration;
}

export type ActiveConnection = Connection & {
    connection: ConnectionInterfacesTypes
};

export type ConnectionsStateHook = {
    state: ConnectionsState;
    addNewConnection: (connection: Connection | Connection[]) => void;
    removeConnection: (connectionId: string) => void;
    toggleAddConnectionModal: () => void;
    setActiveConnection: (connection?: ConnectionInterfacesTypes, connectionData?: Connection) => void;
    setAvailableConnections: (connection: Connection[]) => void;
    setDefaultDatabase: (database: string) => void;
}

export type ConnectionReducerAction = {
    type: string;
    connection?: Connection[];
    connectionId?: string;
    activeConnection?: ConnectionInterfacesTypes;
    connectionData?: Connection;
    database?: string;
};

// SQL Error types for Tauri
export interface TauriSqlError {
    code?: number;
    message: string;
    errno?: number;
}

export type SQLErrorTypes = TauriSqlError | Error | null;
export type SQLError = {
    errNo?: number,
    code?: string,
    message?: string,
    details?: string
}

// For Tauri, the connection interface is a string ID
// The actual pool is managed on the Rust side
export type ConnectionInterfacesTypes = string | null;
export type ConnectionTypes = "MYSQL";