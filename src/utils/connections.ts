import { ConnectionConfig as MySQLConnectionConfig, Connection as MySQLConnection } from "mysql";
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
        const queryPromise = new Promise<any>(() => {
            connection.query({
                sql: query
            }, (error, results, fields) => {
                console.log(error, results, fields);
            })
        });

        queryPromise.then();
    }
}

export const executeQuery = (connectionType: ConnectionTypes, connection: ConnectionInterfacesTypes, query: string) => {
    switch (connectionType) {
        case 'MYSQL': {
            executeMySQLQuery(connection as MySQLConnection, query);
            break;
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