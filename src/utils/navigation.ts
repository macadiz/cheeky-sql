import { DatabaseObject } from "../Components/DatabaseObjectTree/types";
import { ActiveConnection } from "../Context/ConnectionsContext/types";
import { getActiveDatabase, getDatabases, setActiveDatabase } from "./connections";

export const getDatabaseList = async (activeConnection: ActiveConnection): Promise<DatabaseObject[]> => {
    const databases = await getDatabases(activeConnection)
    databases[0].splice(0, 1);
    return databases[0].map((database: string) => ({
        name: database[0],
        icon: "Database",
        objects: [],
    }))
}

export const getSelectedDatabase = async (activeConnection: ActiveConnection): Promise<string> => {
    const selectedDatabaseRaw = await getActiveDatabase(activeConnection);
    return selectedDatabaseRaw[0][1][0];
}

export const setSelectedDatabase = async (activeConnection: ActiveConnection, databaseToSelect: string): Promise<string> => {
    await setActiveDatabase(activeConnection, databaseToSelect);
    return databaseToSelect;
}