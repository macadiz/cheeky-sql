import { MysqlError, Pool as MySQLPool } from "mysql";
import { ConnectionInterfacesTypes, ConnectionConfiguration, ConnectionTypes, SQLErrorTypes, SQLError } from "../Context/ConnectionsContext/types";
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
                message: mySQLError.sqlMessage,
                errNo: mySQLError.errno
            };
        }
    }
}