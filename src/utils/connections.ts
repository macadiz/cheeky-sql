import { ConnectionConfig as MySQLConnectionConfig, Connection as MySQLConnection, FieldInfo as MySQLFieldInfo } from "mysql";
import { ConnectionInterfacesTypes, ConnectionObject, ConnectionTypes } from "../Context/ConnectionsContext/types";

const mysql = window.require('mysql');

export const buildMySQLConnectionConfig = (host: string, port: number, userName: string, password: string, database: string): MySQLConnectionConfig => {
    return {
        host,
        port,
        user: userName,
        password,
        database
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildMySQLQueryResult = (results: any[], fields: MySQLFieldInfo[] | undefined) => {
    const tableMatrix = [];
    const tableHeader: string[] = [];

    if (fields) {
        fields.forEach((field) => tableHeader.push(field.name));
        tableMatrix.push(tableHeader);

        results.forEach((result) => {
            const tableRow = Array(tableHeader.length);
            Object.keys(result).forEach((key) => {
                const keyIndex = tableHeader.findIndex((header) => header === key);
                tableRow[keyIndex] = result[key];
            });
            tableMatrix.push(tableRow);
        });
    }
    return tableMatrix;
}

export const createMySQLConnection = (connectionConfig: MySQLConnectionConfig): MySQLConnection => {
    const connection = mysql.createConnection(connectionConfig);

    return connection;
}

export const testMySQLConnection = async (connection: MySQLConnection) => {
    const connectionPromise = new Promise<boolean>((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                reject(error);
            }
            resolve(true);
        });
    });

    return await connectionPromise;

}

const executeMySQLQuery = async (connection: MySQLConnection, query: string) => {
    const connectionPromise = new Promise<boolean>((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.log(err);
                reject(false);
            }
            resolve(true);
        });
    });

    if (await connectionPromise) {
        const queryPromise = new Promise<any>((resolve, reject) => {
            connection.query({
                sql: query
            }, (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                resolve(buildMySQLQueryResult(results, fields))
            })
        });

        return await queryPromise;
    }
}

export const executeQuery = async (connectionType: ConnectionTypes, connection: ConnectionInterfacesTypes, query: string) => {
    switch (connectionType) {
        case 'MYSQL': {
            return await executeMySQLQuery(connection as MySQLConnection, query);
        }
    }
}

export const TestConnectionConfig = async (connectionType: ConnectionTypes, connectionConfig: ConnectionObject) => {
    switch (connectionType) {
        case 'MYSQL': {
            const connection = mysql.createConnection(connectionConfig);
            return await testMySQLConnection(connection as MySQLConnection);
        }
    }
}