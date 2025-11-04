/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConnectionConfig as MySQLConnectionConfig,
  Connection as MySQLConnection,
  PoolConnection as MySQLPoolConnection,
  FieldInfo as MySQLFieldInfo,
  Pool as MySQLPool,
  OkPacket,
  MysqlError,
} from "mysql";
import { ConnectionConfiguration } from "../Context/ConnectionsContext/types";

const mysql = window.require("mysql");

export const buildMySQLConnectionConfig = (
  host: string,
  port: number,
  user: string,
  password: string,
  database?: string
): MySQLConnectionConfig => {
  return {
    host,
    port,
    user,
    password,
    database,
    multipleStatements: true,
  };
};

const buildMySQLQueryResult = (
  results: any,
  fields: MySQLFieldInfo[] | undefined
) => {
  const resultsMatrix: any[] = [];

  if (Array.isArray(results)) {
    const headers = fields?.map((field) => field.name);

    resultsMatrix.push(headers);

    results.forEach((result: any) => {
      const row: any[] = [];
      headers?.forEach((header) => {
        row.push(result[header]);
      });
      resultsMatrix.push(row);
    });
  } else if ((results as OkPacket).affectedRows) {
    // For INSERT, UPDATE, DELETE queries
    const okPacket = results as OkPacket;
    return {
      affectedRows: okPacket.affectedRows,
      insertId: okPacket.insertId,
    };
  }
  return resultsMatrix;
};

export const getConnectionFromPool = (connectionPool: MySQLPool) => {
  return new Promise<MySQLPoolConnection>((resolve, reject) => {
    connectionPool.getConnection((error: MysqlError | null, connection: MySQLPoolConnection) => {
      if (error) {
        reject(error);
      }
      resolve(connection);
    });
  });
};

export const executeMySQLQuery = async (
  connectionPool: MySQLPool,
  query: string,
  database?: string | null
) => {
  const connection = await getConnectionFromPool(connectionPool);

  if (database) {
    await new Promise<void>((resolve) => {
      connection.changeUser({
        database
      }, () => {
        resolve();
      })
    })
  }

  if (connection) {
    const queryPromise = new Promise<any>((resolve, reject) => {
      connection.query(
        {
          sql: query
        },
        (error: MysqlError | null, results: any, fields: any) => {
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

  const connection = await getConnectionFromPool(connectionPool);
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
    connection.connect((error: MysqlError | null) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });

  return await connectionPromise;
};
