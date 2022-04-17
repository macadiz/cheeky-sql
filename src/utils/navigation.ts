import { DatabaseObject } from "../Components/DatabaseObjectTree/types";
import { ActiveConnection } from "../Context/ConnectionsContext/types";
import { getActiveDatabase, getDatabases, getDatabaseTables } from "./connections";

export const getDatabaseList = async (activeConnection: ActiveConnection): Promise<DatabaseObject[]> => {
    const databases = await getDatabases(activeConnection)
    databases[0].splice(0, 1);
    return databases[0].map((database: string[]) => ({
        name: database[0],
        icon: "Database",
        objects: [],
    }))
}

export const getSelectedDatabase = async (activeConnection: ActiveConnection): Promise<string> => {
    const selectedDatabaseRaw = await getActiveDatabase(activeConnection);
    return selectedDatabaseRaw[0][1][0];
}

export const getDatabaseTablesNavigation = async (activeConnection: ActiveConnection, database: string): Promise<DatabaseObject[]> => {
    switch (activeConnection.type) {
        case "MYSQL": {
            const tables = await getDatabaseTables(activeConnection, database);
            tables[0].splice(0, 1);
            return tables[0].map((table: string[]) => {
                return {
                    name: table[0],
                    icon: "Table"
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