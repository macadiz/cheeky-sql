import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
} from "@mui/material";
import {
  Brightness7 as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { SidebarProps } from "./types";
import React, { FC, useEffect } from "react";
import { useConnectionsContext } from "../../Context/ConnectionsContext";
import { Connection } from "../../Context/ConnectionsContext/types";
import { useWorkspaceContext } from "../../Context/WorkspaceContext";
import { createSQLInterface } from "../../utils/connections";
import { useApplicationContext } from "../../Context/ApplicationContext";
import DatabaseListItem from "../DatabaseListItem";
import { useThemeContext } from "../../Context/ThemeContext";
import { makeStyles } from "@mui/styles";

export const sidebarWidth = 240;

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  colorModeButton: {
    "&.MuiButtonBase-root": {
      borderRadius: "50%",
    },
  },
});

const SidebarContent = () => {
  const classes = useStyles();

  const { toggleColorMode, mode } = useThemeContext();

  const {
    state,
    toggleAddConnectionModal,
    setActiveConnection,
    removeConnection,
  } = useConnectionsContext();
  const {
    state: { selectedWorkspaceConnectionId },
    openWorkspace,
  } = useWorkspaceContext();

  const { showAlert } = useApplicationContext();

  const onNewConnectionClick = () => {
    toggleAddConnectionModal();
  };

  const onItemClick = async (connection: Connection) => {
    try {
      const connectionInterface = await createSQLInterface(
        "MYSQL",
        connection.connectionObject
      );

      setActiveConnection(connectionInterface, connection);
      openWorkspace(connection.connectionId as string);
    } catch (error) {
      const caughtError = error as Error;
      showAlert("Connection Error", caughtError.message);
    }
  };

  const onItemDelete = async (connection: Connection) => {
    showAlert(
      `Are you sure you want to delete ${connection.name}?`,
      "",
      "confirm",
      () => {
        removeConnection(connection.connectionId as string);
      }
    );
  };

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Button variant="contained" onClick={onNewConnectionClick}>
          New connection
        </Button>
        <IconButton
          className={classes.colorModeButton}
          onClick={toggleColorMode}
          color="primary"
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {state.availableConnections.map((connection) => (
          <DatabaseListItem
            key={connection.connectionId}
            connection={connection}
            onItemClick={onItemClick}
            onDeleteClick={onItemDelete}
            isSelected={
              selectedWorkspaceConnectionId === connection.connectionId
            }
            showDeleteIcon
          />
        ))}
      </List>
    </div>
  );
};

const Sidebar: FC<SidebarProps> = ({ isOpen, handleSidebarToggle }) => {
  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={isOpen}
        onClose={handleSidebarToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
          },
        }}
      >
        <SidebarContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
          },
        }}
        open
      >
        <SidebarContent />
      </Drawer>
    </>
  );
};

export default Sidebar;
