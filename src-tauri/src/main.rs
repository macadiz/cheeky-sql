// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use mysql::*;
use mysql::prelude::*;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use std::collections::HashMap;
use tauri::State;

// State management for connection pools
type ConnectionPools = Mutex<HashMap<String, Pool>>;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct ConnectionConfig {
    host: String,
    port: u16,
    user: String,
    password: String,
    database: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct QueryResult {
    columns: Vec<String>,
    rows: Vec<Vec<serde_json::Value>>,
    affected_rows: Option<u64>,
}

#[derive(Debug, Serialize, Deserialize)]
struct SqlError {
    code: Option<u16>,
    message: String,
    errno: Option<u16>,
}

impl From<mysql::Error> for SqlError {
    fn from(err: mysql::Error) -> Self {
        SqlError {
            code: None,
            message: err.to_string(),
            errno: None,
        }
    }
}

// Convert MySQL value to JSON value
fn mysql_value_to_json(value: mysql::Value) -> serde_json::Value {
    match value {
        mysql::Value::NULL => serde_json::Value::Null,
        mysql::Value::Bytes(bytes) => {
            serde_json::Value::String(String::from_utf8_lossy(&bytes).to_string())
        }
        mysql::Value::Int(i) => serde_json::Value::Number(i.into()),
        mysql::Value::UInt(u) => serde_json::Value::Number(u.into()),
        mysql::Value::Float(f) => {
            serde_json::Number::from_f64(f as f64)
                .map(serde_json::Value::Number)
                .unwrap_or(serde_json::Value::Null)
        }
        mysql::Value::Double(d) => {
            serde_json::Number::from_f64(d)
                .map(serde_json::Value::Number)
                .unwrap_or(serde_json::Value::Null)
        }
        mysql::Value::Date(year, month, day, hour, minute, second, _) => {
            serde_json::Value::String(format!(
                "{:04}-{:02}-{:02} {:02}:{:02}:{:02}",
                year, month, day, hour, minute, second
            ))
        }
        mysql::Value::Time(_, _, _, _, _, _) => {
            serde_json::Value::String(value.as_sql(false))
        }
    }
}

#[tauri::command]
async fn test_connection(config: ConnectionConfig) -> Result<bool, SqlError> {
    let opts = OptsBuilder::new()
        .ip_or_hostname(Some(config.host))
        .tcp_port(config.port)
        .user(Some(config.user))
        .pass(Some(config.password))
        .db_name(config.database);

    let pool = Pool::new(opts)?;
    let mut conn = pool.get_conn()?;

    // Test the connection by running a simple query
    conn.query_drop("SELECT 1")?;

    Ok(true)
}

#[tauri::command]
async fn create_connection_pool(
    connection_id: String,
    config: ConnectionConfig,
    pools: State<'_, ConnectionPools>,
) -> Result<bool, SqlError> {
    let opts = OptsBuilder::new()
        .ip_or_hostname(Some(config.host))
        .tcp_port(config.port)
        .user(Some(config.user))
        .pass(Some(config.password))
        .db_name(config.database);

    let pool = Pool::new(opts)?;

    // Test the connection
    let mut conn = pool.get_conn()?;
    conn.query_drop("SELECT 1")?;

    // Store the pool
    let mut pools_map = pools.lock().unwrap();
    pools_map.insert(connection_id, pool);

    Ok(true)
}

#[tauri::command]
async fn execute_query(
    connection_id: String,
    query: String,
    database: Option<String>,
    pools: State<'_, ConnectionPools>,
) -> Result<QueryResult, SqlError> {
    let pools_map = pools.lock().unwrap();
    let pool = pools_map.get(&connection_id)
        .ok_or_else(|| SqlError {
            code: None,
            message: "Connection not found".to_string(),
            errno: None,
        })?;

    let mut conn = pool.get_conn()?;

    // Change database if specified
    if let Some(db) = database {
        conn.query_drop(format!("USE `{}`", db))?;
    }

    // Execute the query
    let result: Vec<mysql::Row> = conn.query(&query)?;

    if result.is_empty() {
        // For queries that don't return rows (INSERT, UPDATE, DELETE, etc.)
        return Ok(QueryResult {
            columns: vec![],
            rows: vec![],
            affected_rows: Some(conn.affected_rows()),
        });
    }

    // Get column names
    let columns: Vec<String> = result[0]
        .columns_ref()
        .iter()
        .map(|col| col.name_str().to_string())
        .collect();

    // Convert rows to JSON
    let rows: Vec<Vec<serde_json::Value>> = result
        .into_iter()
        .map(|row| {
            let mut values = Vec::new();
            for i in 0..columns.len() {
                let value: mysql::Value = row.get(i).unwrap();
                values.push(mysql_value_to_json(value));
            }
            values
        })
        .collect();

    Ok(QueryResult {
        columns,
        rows,
        affected_rows: None,
    })
}

#[tauri::command]
async fn get_databases(
    connection_id: String,
    pools: State<'_, ConnectionPools>,
) -> Result<Vec<String>, SqlError> {
    let pools_map = pools.lock().unwrap();
    let pool = pools_map.get(&connection_id)
        .ok_or_else(|| SqlError {
            code: None,
            message: "Connection not found".to_string(),
            errno: None,
        })?;

    let mut conn = pool.get_conn()?;
    let databases: Vec<String> = conn.query_map("SHOW DATABASES", |db: String| db)?;

    Ok(databases)
}

#[tauri::command]
async fn get_tables(
    connection_id: String,
    database: String,
    pools: State<'_, ConnectionPools>,
) -> Result<Vec<String>, SqlError> {
    let pools_map = pools.lock().unwrap();
    let pool = pools_map.get(&connection_id)
        .ok_or_else(|| SqlError {
            code: None,
            message: "Connection not found".to_string(),
            errno: None,
        })?;

    let mut conn = pool.get_conn()?;
    conn.query_drop(format!("USE `{}`", database))?;
    let tables: Vec<String> = conn.query_map("SHOW TABLES", |table: String| table)?;

    Ok(tables)
}

#[tauri::command]
async fn get_active_database(
    connection_id: String,
    pools: State<'_, ConnectionPools>,
) -> Result<Option<String>, SqlError> {
    let pools_map = pools.lock().unwrap();
    let pool = pools_map.get(&connection_id)
        .ok_or_else(|| SqlError {
            code: None,
            message: "Connection not found".to_string(),
            errno: None,
        })?;

    let mut conn = pool.get_conn()?;
    let database: Option<String> = conn.query_first("SELECT DATABASE()")?;

    Ok(database)
}

#[tauri::command]
async fn close_connection(
    connection_id: String,
    pools: State<'_, ConnectionPools>,
) -> Result<bool, SqlError> {
    let mut pools_map = pools.lock().unwrap();
    pools_map.remove(&connection_id);

    Ok(true)
}

fn main() {
    tauri::Builder::default()
        .manage(ConnectionPools::default())
        .invoke_handler(tauri::generate_handler![
            test_connection,
            create_connection_pool,
            execute_query,
            get_databases,
            get_tables,
            get_active_database,
            close_connection,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
