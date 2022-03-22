import { ConnectionOptions as MySQLConnectionOptions, Pool as MySQLPool } from "mysql";

export type ConnectionsState = {
    availableConnections: Connection[];
    showAddConnectionModal: boolean;
    activeConnection: ActiveConnection | null
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
    addNewConnection: (connection: Connection) => void;
    removeConnection: (connectionId: string) => void;
    toggleAddConnectionModal: () => void;
    setActiveConnection: (connection: ConnectionInterfacesTypes, connectionData: Connection) => void;
}

export type ConnectionReducerAction = {
    type: string;
    connection?: Connection;
    connectionId?: string;
    activeConnection?: ConnectionInterfacesTypes;
    connectionData?: Connection;
};

export type ConnectionInterfacesTypes = MySQLPool | null;
export type ConnectionTypes = "MYSQL";