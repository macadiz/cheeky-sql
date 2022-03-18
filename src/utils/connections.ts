import { ConnectionConfig as MySQLConnectionConfig, Connection as MySQLConnection } from "mysql";
import { ConnectionInterfacesTypes, ConnectionTypes } from "../Context/ConnectionsContext/types";

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

export const createMySQLConnection = (connectionConfig: MySQLConnectionConfig) => {
    const connection = mysql.createConnection(connectionConfig);

    return connection;
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
        }
    }
}