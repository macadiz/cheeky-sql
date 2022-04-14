import { List } from "@mui/material";
import React, { FC } from "react";
import ObjectTreeItem from "./ObjectTreeItem";
import { DatabaseObjectTreeProps } from "./types";

const DatabaseObjectTree: FC<DatabaseObjectTreeProps> = ({ objects }) => {
  return (
    <List>
      {objects.map((object, index) => {
        return (
          <ObjectTreeItem
            key={index}
            name={object.name}
            iconName={object.icon}
          />
        );
      })}
    </List>
  );
};

export default DatabaseObjectTree;
