import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FC } from "react";
import DatabaseIcon from "../DatabaseIcon";
import { DatabaseListItemProps } from "./types";
import { makeStyles } from "@mui/styles";

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
  return (
    <ListItem button onClick={() => onItemClick(connection)}>
      <ListItemIcon>
        <DatabaseIcon connectionType={connection.type} isEnabled={isSelected} />
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
  );
};

export default DatabaseListItem;
