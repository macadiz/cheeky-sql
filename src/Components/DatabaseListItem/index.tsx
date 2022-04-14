import {
  Collapse,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import DatabaseIcon from "../DatabaseIcon";
import { DatabaseListItemProps } from "./types";
import { makeStyles } from "@mui/styles";
import DatabaseObjectTree from "../DatabaseObjectTree";
import { useConnectionsContext } from "../../Context/ConnectionsContext";
import { DatabaseObject } from "../DatabaseObjectTree/types";
import { getDatabaseList, getSelectedDatabase } from "../../utils/navigation";
import { ActiveConnection } from "../../Context/ConnectionsContext/types";
import useWorkspaceState from "../../Context/WorkspaceContext/useWorkspaceState";

const useStyles = makeStyles({
  deleteIcon: {
    width: 24,
    height: 24,
    "& svg": {
      width: 20,
      height: 20,
    },
  },
});

const DatabaseListItem: FC<DatabaseListItemProps> = ({
  isSelected = false,
  connection,
  onItemClick,
  showDeleteIcon = false,
  onDeleteClick = () => {
    return;
  },
}) => {
  const classes = useStyles();

  const { state: connectionState } = useConnectionsContext();
  const { state: worskpaceState } = useWorkspaceState();

  const [databasesItems, setDatabasesItems] = useState<DatabaseObject[]>([]);
  const [activeDatabase, setActiveDatabase] = useState<string | null>(null);

  const getActiveDatabaseFunction = async (
    activeConnection: ActiveConnection
  ) => {
    const selectedDatabase = await getSelectedDatabase(activeConnection);
    setActiveDatabase(selectedDatabase);
  };

  useEffect(() => {
    if (connectionState.activeConnection && isSelected) {
      const activeConnection =
        connectionState.activeConnection as ActiveConnection;
      getActiveDatabaseFunction(activeConnection);
    }
  }, [connectionState.activeConnection, isSelected]);

  useEffect(() => {
    const activeConnection =
      connectionState.activeConnection as ActiveConnection;
    const getDatabasesFunction = async () => {
      const databases = await getDatabaseList(activeConnection);
      setDatabasesItems(
        databases.map((database) => ({
          ...database,
          isSelected: database.name === activeDatabase,
        }))
      );
    };
    getDatabasesFunction();
  }, [activeDatabase]);

  useEffect(() => {
    if (connectionState.activeConnection) {
      console.log("a");
      getActiveDatabaseFunction(
        connectionState.activeConnection as ActiveConnection
      );
    }
  }, [worskpaceState.workspaces]);

  return (
    <>
      <ListItem button onClick={() => onItemClick(connection)}>
        <ListItemIcon>
          <DatabaseIcon
            connectionType={connection.type}
            isEnabled={isSelected}
          />
        </ListItemIcon>
        <ListItemText primary={connection.name} />
        {showDeleteIcon && (
          <IconButton
            className={classes.deleteIcon}
            onClick={(event) => {
              event.stopPropagation();
              onDeleteClick(connection);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </ListItem>
      <Collapse in={isSelected} timeout="auto" unmountOnExit>
        <DatabaseObjectTree objects={databasesItems} />
      </Collapse>
    </>
  );
};

export default DatabaseListItem;
