import { MysqlError, Pool as MySQLPool } from "mysql";
import { ConnectionInterfacesTypes, ConnectionConfiguration, ConnectionTypes, SQLErrorTypes, SQLError, ActiveConnection } from "../Context/ConnectionsContext/types";
import { executeMySQLQuery, testMySQLConnection, createConnectionPool, getConnectionFromPool } from "./mysqlConnection";

export const createSQLInterface = async (connectionType: ConnectionTypes, connectionConfig: ConnectionConfiguration): Promise<ConnectionInterfacesTypes> => {
    switch (connectionType) {
        case 'MYSQL': {
            return await createConnectionPool(connectionConfig);
        }
    }
}

export const executeQuery = async (connectionType: ConnectionTypes, connection: ConnectionInterfacesTypes, query: string, database?: string | null) => {
    switch (connectionType) {
        case 'MYSQL': {
            return await executeMySQLQuery(connection as MySQLPool, query, database);
        }
    }
}

export const testConnectionConfig = async (connectionType: ConnectionTypes, connectionConfig: ConnectionConfiguration) => {
    switch (connectionType) {
        case 'MYSQL': {
            return await testMySQLConnection(connectionConfig);
        }
    }
}

export const solveSQLError = (connectionType: ConnectionTypes, sqlError: SQLErrorTypes): SQLError => {
    switch (connectionType) {
        case 'MYSQL': {
            const mySQLError = (sqlError as MysqlError);

            return {
                code: mySQLError.code,
                message: mySQLError.sqlMessage ?? mySQLError.message,
                errNo: mySQLError.errno
            };
        }
    }
}

export const getDatabases = async (activeConnection: ActiveConnection) => {
    switch (activeConnection.type) {
        case "MYSQL": {
            const connectionPool = activeConnection.connection as MySQLPool;
            const databases = await executeQuery(activeConnection.type, connectionPool, "SHOW DATABASES;");
            return databases;
        }
    }
}

export const getDatabaseTables = async (activeConnection: ActiveConnection, database: string) => {
    switch (activeConnection.type) {
        case "MYSQL": {
            const connectionPool = activeConnection.connection as MySQLPool;
            const tables = await executeQuery(activeConnection.type, connectionPool, "SHOW TABLES;", database);
            return tables;
        }
    }
}

export const getActiveDatabase = async (activeConnection: ActiveConnection) => {
    switch (activeConnection.type) {
        case "MYSQL": {
            const connectionPool = activeConnection.connection as MySQLPool;
            const databases = await executeQuery(activeConnection.type, connectionPool, "SELECT DATABASE();");
            return databases;
        }
    }
}
