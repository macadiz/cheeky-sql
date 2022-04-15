import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { FC } from "react";
import { ObjectTreeIcon, ObjectTreeItemProps } from "./types";
import {
  TableView as TableViewIcon,
  Functions as FunctionsIcon,
  AccountTree as AccountTreeIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const solveIcon = (iconName: ObjectTreeIcon) => {
  switch (iconName) {
    case "Table":
      return <TableViewIcon />;
    case "Function":
      return <FunctionsIcon />;
    case "Procedure":
      return <AccountTreeIcon />;
    case "Database":
      return <StorageIcon />;
    default:
      return <></>;
  }
};

const useStyles = makeStyles({
  listItemText: {
    "& span": {
      fontSize: 12,
    },
  },
});

const ObjectTreeItem: FC<ObjectTreeItemProps> = ({
  name,
  iconName,
  isSelected = false,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <ListItemButton sx={{ pl: 4 }} selected={isSelected} onClick={onClick}>
      <ListItemIcon>{solveIcon(iconName)}</ListItemIcon>
      <ListItemText className={`${classes.listItemText}`} primary={name} />
    </ListItemButton>
  );
};

export default ObjectTreeItem;
