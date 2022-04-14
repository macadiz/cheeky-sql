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
    "&.selected": {
      "& span": {
        fontWeight: "bold",
      },
    },
  },
});

const ObjectTreeItem: FC<ObjectTreeItemProps> = ({
  name,
  iconName,
  isSelected = false,
}) => {
  const classes = useStyles();
  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>{solveIcon(iconName)}</ListItemIcon>
      <ListItemText
        className={`${classes.listItemText} ${isSelected ? "selected" : ""}`}
        primary={name}
      />
    </ListItemButton>
  );
};

export default ObjectTreeItem;
