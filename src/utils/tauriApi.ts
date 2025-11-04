import { invoke } from '@tauri-apps/api/tauri';
import { ConnectionConfiguration } from '../Context/ConnectionsContext/types';

export interface TauriConnectionConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database?: string | null;
}

export interface TauriQueryResult {
  columns: string[];
  rows: any[][];
  affected_rows?: number;
}

export interface TauriSqlError {
  code?: number;
  message: string;
  errno?: number;
}

// Convert our ConnectionConfiguration to Tauri's expected format
function toTauriConfig(config: ConnectionConfiguration): TauriConnectionConfig {
  return {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database || null,
  };
}

export async function testConnection(config: ConnectionConfiguration): Promise<boolean> {
  try {
    const result = await invoke<boolean>('test_connection', {
      config: toTauriConfig(config),
    });
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Connection test failed');
  }
}

export async function createConnectionPool(
  connectionId: string,
  config: ConnectionConfiguration
): Promise<boolean> {
  try {
    const result = await invoke<boolean>('create_connection_pool', {
      connectionId,
      config: toTauriConfig(config),
    });
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create connection pool');
  }
}

export async function executeQuery(
  connectionId: string,
  query: string,
  database?: string | null
): Promise<TauriQueryResult> {
  try {
    const result = await invoke<TauriQueryResult>('execute_query', {
      connectionId,
      query,
      database: database || null,
    });
    return result;
  } catch (error: any) {
    const sqlError: TauriSqlError = {
      message: error.message || 'Query execution failed',
      code: error.code,
      errno: error.errno,
    };
    throw sqlError;
  }
}

export async function getDatabases(connectionId: string): Promise<string[]> {
  try {
    const result = await invoke<string[]>('get_databases', {
      connectionId,
    });
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get databases');
  }
}

export async function getTables(connectionId: string, database: string): Promise<string[]> {
  try {
    const result = await invoke<string[]>('get_tables', {
      connectionId,
      database,
    });
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get tables');
  }
}

export async function getActiveDatabase(connectionId: string): Promise<string | null> {
  try {
    const result = await invoke<string | null>('get_active_database', {
      connectionId,
    });
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get active database');
  }
}

export async function closeConnection(connectionId: string): Promise<boolean> {
  try {
    const result = await invoke<boolean>('close_connection', {
      connectionId,
    });
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to close connection');
  }
}
