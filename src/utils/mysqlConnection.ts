import {
  ConnectionConfig as MySQLConnectionConfig,
  Connection as MySQLConnection,
  PoolConnection as MySQLPoolConnection,
  FieldInfo as MySQLFieldInfo,
  Pool as MySQLPool,
} from "mysql";
import { ConnectionConfiguration } from "../Context/ConnectionsContext/types";

const mysql = window.require("mysql");

export const buildMySQLConnectionConfig = (
  host: string,
  port: number,
  userName: string,
  password: string,
  database: string
): MySQLConnectionConfig => {
  return {
    host,
    port,
    user: userName,
    password,
    database,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildMySQLQueryResult = (
  results: any[],
  fields: MySQLFieldInfo[] | undefined
) => {
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
};

export const executeMySQLQuery = async (
  connectionPool: MySQLPool,
  query: string
) => {
  const connectionPromise = new Promise<MySQLPoolConnection>((resolve, reject) => {
    connectionPool.getConnection((error, connection: MySQLPoolConnection) => {
      if (error) {
        reject(error);
      }
      resolve(connection);
    });
  });

  const connection = await connectionPromise;

  if (connection) {
    const queryPromise = new Promise<any>((resolve, reject) => {
      connection.query(
        {
          sql: query,
        },
        (error, results, fields) => {
          connection.release();
          if (error) {
            reject(error);
          }
          resolve(buildMySQLQueryResult(results, fields));
        }
      );
    });

    return await queryPromise;
  }
};

export const createConnectionPool = (
  connectionConfig: MySQLConnectionConfig
): MySQLPool => {
  const connectionPool = mysql.createPool(connectionConfig);

  return connectionPool;
};

export const testMySQLConnection = async (
  connectionConfig: ConnectionConfiguration
) => {
  const connection = mysql.createConnection(
    connectionConfig
  ) as MySQLConnection;
  const connectionPromise = new Promise<boolean>((resolve, reject) => {
    connection.connect((error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });

  return await connectionPromise;
};
