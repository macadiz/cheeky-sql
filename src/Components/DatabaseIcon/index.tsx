import { SvgIcon, useTheme } from "@mui/material";
import { FC } from "react";
import { ConnectionTypes } from "../../Context/ConnectionsContext/types";
import MySQLIcon from "../../Icons/mysql.svg?react";
import { DatabaseIconProps } from "./types";

const solveIcon = (connectionType: ConnectionTypes) => {
  switch (connectionType) {
    case "MYSQL": {
      return MySQLIcon;
    }
  }
};

const DatabaseIcon: FC<DatabaseIconProps> = ({
  connectionType,
  isEnabled = false,
}) => {
  const theme = useTheme();
  return (
    <SvgIcon
      component={solveIcon(connectionType)}
      htmlColor={
        isEnabled ? theme.palette.success.light : theme.palette.grey[500]
      }
      inheritViewBox={true}
    />
  );
};

export default DatabaseIcon;
