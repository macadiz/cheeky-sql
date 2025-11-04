import { DatabaseObject } from "../Components/DatabaseObjectTree/types";
import { ActiveConnection } from "../Context/ConnectionsContext/types";
import { getActiveDatabase, getDatabases, getDatabaseTables } from "./connections";

export const getDatabaseList = async (activeConnection: ActiveConnection): Promise<DatabaseObject[]> => {
    const databases = await getDatabases(activeConnection);
    // databases.rows is an array of arrays: [['db1'], ['db2'], ...]
    return databases.rows.map((row: any[]) => ({
        name: row[0],
        icon: "Database" as const,
        objects: [],
    }));
}

export const getSelectedDatabase = async (activeConnection: ActiveConnection): Promise<string> => {
    const selectedDatabaseRaw = await getActiveDatabase(activeConnection);
    // selectedDatabaseRaw.rows is [[database_name]]
    return selectedDatabaseRaw.rows[0][0] || '';
}

export const getDatabaseTablesNavigation = async (activeConnection: ActiveConnection, database: string): Promise<DatabaseObject[]> => {
    switch (activeConnection.type) {
        case "MYSQL": {
            const tables = await getDatabaseTables(activeConnection, database);
            // tables.rows is an array of arrays: [['table1'], ['table2'], ...]
            return tables.rows.map((row: any[]) => {
                return {
                    name: row[0],
                    icon: "Table" as const
                }
            });
        }
    }
}

export const getDatabaseObjectsNavigation = (activeConnection: ActiveConnection, database: string): DatabaseObject[] => {
    switch (activeConnection.type) {
        case "MYSQL":
            return [{
                name: "Tables",
                icon: "Table",
                onClick: async (setChildrenFunction: (treeProps: DatabaseObject[]) => void) => {
                    setChildrenFunction(await getDatabaseTablesNavigation(activeConnection, database))
                }
            }]
    }
}