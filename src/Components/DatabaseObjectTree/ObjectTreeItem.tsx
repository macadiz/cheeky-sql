import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import { DatabaseObject, ObjectTreeIcon, ObjectTreeItemProps } from "./types";
import {
  TableView as TableViewIcon,
  Functions as FunctionsIcon,
  AccountTree as AccountTreeIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import DatabaseObjectTree from ".";

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
  listItemIcon: {
    minWidth: "0px !important",
    marginRight: 4,
  },
});

const ObjectTreeItem: FC<ObjectTreeItemProps> = ({
  name,
  iconName,
  isSelected = false,
  onClick,
  objects,
}) => {
  const classes = useStyles();
  const [children, setChildren] = useState<DatabaseObject[] | undefined>(
    objects
  );
  const [isOpen, setIsOpen] = useState(isSelected);

  const onListItemButtonClick = () => {
    if (onClick) {
      setIsOpen((isOpenPrevious) => !isOpenPrevious);
    }
  };

  useEffect(() => {
    if (isOpen && onClick) {
      onClick(setChildren);
    }
  }, [isOpen]);

  return (
    <>
      <ListItemButton selected={isSelected} onClick={onListItemButtonClick}>
        <ListItemIcon className={classes.listItemIcon}>
          {solveIcon(iconName)}
        </ListItemIcon>
        <ListItemText className={`${classes.listItemText}`} primary={name} />
      </ListItemButton>
      {children && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <DatabaseObjectTree objects={children} sx={{ pl: "10px" }} />
        </Collapse>
      )}
    </>
  );
};

export default ObjectTreeItem;
