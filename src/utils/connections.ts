import { Pool as MySQLPool } from "mysql";
import { ConnectionInterfacesTypes, ConnectionConfiguration, ConnectionTypes } from "../Context/ConnectionsContext/types";
import { executeMySQLQuery, testMySQLConnection, createConnectionPool } from "./mysqlConnection";

export const createSQLInterface = async (connectionType: ConnectionTypes, connectionConfig: ConnectionConfiguration): Promise<ConnectionInterfacesTypes> => {
    switch (connectionType) {
        case 'MYSQL': {
            return await createConnectionPool(connectionConfig);
        }
    }
}

export const executeQuery = async (connectionType: ConnectionTypes, connection: ConnectionInterfacesTypes, query: string) => {
    switch (connectionType) {
        case 'MYSQL': {
            return await executeMySQLQuery(connection as MySQLPool, query);
        }
    }
}

export const TestConnectionConfig = async (connectionType: ConnectionTypes, connectionConfig: ConnectionConfiguration) => {
    switch (connectionType) {
        case 'MYSQL': {
            return await testMySQLConnection(connectionConfig);
        }
    }
}