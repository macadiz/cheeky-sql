export const buildMySQLConnectionString = (host: string, port: number, userName: string, password: string, database: string) => {
    return `mysql://${userName}:${password}@${host}:${port}${database ? `/${database}` : ''}`;
}