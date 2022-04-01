/* eslint-disable @typescript-eslint/no-explicit-any */
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

const arrangeMySQLResults = (resultArray: any, fields: MySQLFieldInfo[]) => {
  if (Array.isArray(resultArray)) {
    const tableHeader: string[] = fields.map((field) => field.name);

    const dataRows = resultArray.map((resultObject) => {
      const dataRow = tableHeader.map((columnName) => resultObject[columnName]);
      return dataRow;
    });

    return [tableHeader, ...dataRows];
  }
  return resultArray;
}

const buildMySQLQueryResult = (
  resultArray: any[],
  fields: MySQLFieldInfo[] | MySQLFieldInfo[][] | undefined
): any[] => {
  const resultsMatrix: any[] = [];
  if (resultArray.some((result => Array.isArray(result)))) {
    resultArray.forEach((result, index) => {
      const parsedFields = fields as MySQLFieldInfo[][];
      resultsMatrix.push(arrangeMySQLResults(result, parsedFields[index]));
    })
  } else if (fields) {
    resultsMatrix.push(arrangeMySQLResults(resultArray, fields as MySQLFieldInfo[]));
  }
  return resultsMatrix;
};

const getConnection = (connectionPool: MySQLPool) => {
  return new Promise<MySQLPoolConnection>((resolve, reject) => {
    connectionPool.getConnection((error, connection: MySQLPoolConnection) => {
      if (error) {
        reject(error);
      }
      resolve(connection);
    });
  });
};

export const executeMySQLQuery = async (
  connectionPool: MySQLPool,
  query: string
) => {
  const connection = await getConnection(connectionPool);

  if (connection) {
    const queryPromise = new Promise<any>((resolve, reject) => {
      connection.query(
        {
          sql: query
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

export const createConnectionPool = async (
  connectionConfig: MySQLConnectionConfig
): Promise<MySQLPool> => {
  const connectionPool = mysql.createPool({ ...connectionConfig, multipleStatements: true });

  const connection = await getConnection(connectionPool);
  connection.release();

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
