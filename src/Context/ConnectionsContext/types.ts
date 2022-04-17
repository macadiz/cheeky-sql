import { ConnectionOptions as MySQLConnectionOptions, Pool as MySQLPool, MysqlError } from "mysql";

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

export type ConnectionConfiguration = MySQLConnectionOptions;

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

export type SQLErrorTypes = MysqlError | null;
export type SQLError = {
    errNo: number,
    code: string,
    message?: string,
    details?: string
}
export type ConnectionInterfacesTypes = MySQLPool | null;
export type ConnectionTypes = "MYSQL";