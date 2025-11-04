import { ConnectionInterfacesTypes, ConnectionConfiguration, ConnectionTypes, SQLErrorTypes, SQLError, ActiveConnection } from "../Context/ConnectionsContext/types";
import * as tauriApi from "./tauriApi";
import { v4 as uuidv4 } from 'uuid';

// For Tauri, the "connection interface" is just a unique ID string
// The actual connection pool is managed on the Rust side
export const createSQLInterface = async (connectionType: ConnectionTypes, connectionConfig: ConnectionConfiguration): Promise<ConnectionInterfacesTypes> => {
    switch (connectionType) {
        case 'MYSQL': {
            const connectionId = uuidv4();
            await tauriApi.createConnectionPool(connectionId, connectionConfig);
            // Return the connection ID as the interface
            return connectionId as any;
        }
    }
}

export const executeQuery = async (connectionType: ConnectionTypes, connection: ConnectionInterfacesTypes, query: string, database?: string | null) => {
    switch (connectionType) {
        case 'MYSQL': {
            const connectionId = connection as unknown as string;
            const result = await tauriApi.executeQuery(connectionId, query, database);

            // Transform the result to match the expected format (ResultSet[])
            // The old format was an array where first element is headers, rest are data rows
            if (result.columns.length === 0) {
                // For non-SELECT queries (INSERT, UPDATE, DELETE), return empty array
                return [];
            }

            // For SELECT queries, return array with headers as first element
            return [[result.columns, ...result.rows]];
        }
    }
}

export const testConnectionConfig = async (connectionType: ConnectionTypes, connectionConfig: ConnectionConfiguration) => {
    switch (connectionType) {
        case 'MYSQL': {
            return await tauriApi.testConnection(connectionConfig);
        }
    }
}

export const solveSQLError = (connectionType: ConnectionTypes, sqlError: SQLErrorTypes): SQLError => {
    switch (connectionType) {
        case 'MYSQL': {
            const error = sqlError as tauriApi.TauriSqlError;

            return {
                code: error.code?.toString(),
                message: error.message,
                errNo: error.errno
            };
        }
    }
}

export const getDatabases = async (activeConnection: ActiveConnection) => {
    switch (activeConnection.type) {
        case "MYSQL": {
            const connectionId = activeConnection.connection as unknown as string;
            const databases = await tauriApi.getDatabases(connectionId);

            // Transform to match expected format (array of objects with Database property)
            return {
                columns: ['Database'],
                rows: databases.map(db => [db]),
            };
        }
    }
}

export const getDatabaseTables = async (activeConnection: ActiveConnection, database: string) => {
    switch (activeConnection.type) {
        case "MYSQL": {
            const connectionId = activeConnection.connection as unknown as string;
            const tables = await tauriApi.getTables(connectionId, database);

            // Transform to match expected format
            return {
                columns: [`Tables_in_${database}`],
                rows: tables.map(table => [table]),
            };
        }
    }
}

export const getActiveDatabase = async (activeConnection: ActiveConnection) => {
    switch (activeConnection.type) {
        case "MYSQL": {
            const connectionId = activeConnection.connection as unknown as string;
            const database = await tauriApi.getActiveDatabase(connectionId);

            // Transform to match expected format
            return {
                columns: ['DATABASE()'],
                rows: [[database]],
            };
        }
    }
}

export const closeConnection = async (connectionId: string) => {
    return await tauriApi.closeConnection(connectionId);
}
