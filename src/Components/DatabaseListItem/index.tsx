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
import {
  getDatabaseList,
  getDatabaseObjectsNavigation,
  getSelectedDatabase,
} from "../../utils/navigation";
import { ActiveConnection } from "../../Context/ConnectionsContext/types";

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

  const { state: connectionState, setDefaultDatabase } =
    useConnectionsContext();

  const { defaultDatabase } = connectionState;

  const [databasesItems, setDatabasesItems] = useState<DatabaseObject[]>([]);

  const getDatabasesFunction = async () => {
    if (connectionState.activeConnection) {
      const databases = await getDatabaseList(connectionState.activeConnection);
      setDatabasesItems(
        databases.map((database) => ({
          ...database,
          isSelected: database.name === defaultDatabase,
          onClick: async () => {
            setDefaultDatabase(database.name);
          },
          objects: getDatabaseObjectsNavigation(
            connectionState.activeConnection as ActiveConnection,
            database.name
          ),
        }))
      );
    }
  };

  const getActiveDatabaseFunction = async () => {
    if (connectionState.activeConnection) {
      const selectedDatabase = await getSelectedDatabase(
        connectionState.activeConnection
      );
      setDefaultDatabase(selectedDatabase);
    }
  };

  useEffect(() => {
    if (isSelected) {
      getActiveDatabaseFunction();
    }
  }, [isSelected]);

  useEffect(() => {
    if (defaultDatabase !== undefined && isSelected) {
      getDatabasesFunction();
    }
  }, [defaultDatabase]);

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
        <DatabaseObjectTree objects={databasesItems} sx={{ pl: "10px" }} />
      </Collapse>
    </>
  );
};

export default DatabaseListItem;
