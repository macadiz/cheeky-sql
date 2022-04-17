import { List } from "@mui/material";
import React, { FC } from "react";
import ObjectTreeItem from "./ObjectTreeItem";
import { DatabaseObjectTreeProps } from "./types";

const DatabaseObjectTree: FC<DatabaseObjectTreeProps> = ({ objects, sx }) => {
  return (
    <List sx={sx}>
      {objects.map((object, index) => {
        return (
          <ObjectTreeItem
            key={index}
            name={object.name}
            iconName={object.icon}
            isSelected={object.isSelected}
            onClick={object.onClick}
            objects={object.objects}
          />
        );
      })}
    </List>
  );
};

export default DatabaseObjectTree;
