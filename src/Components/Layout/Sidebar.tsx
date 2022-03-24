import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Storage as StorageIcon } from "@mui/icons-material";
import { SidebarProps } from "./types";
import React, { FC } from "react";
import { useConnectionsContext } from "../../Context/ConnectionsContext";
import { Connection } from "../../Context/ConnectionsContext/types";
import { useWorkspaceContext } from "../../Context/WorkspaceContext";
import { createSQLInterface } from "../../utils/connections";
import DatabaseIcon from "../DatabaseIcon";
import { useApplicationContext } from "../../Context/ApplicationContext";

export const sidebarWidth = 240;

const SidebarContent = () => {
  const { state, toggleAddConnectionModal, setActiveConnection } =
    useConnectionsContext();
  const { createNewTab } = useWorkspaceContext();

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
      createNewTab();
    } catch (error) {
      const caughtError = error as Error;
      showAlert("Connection Error", caughtError.message);
    }
  };


  return (
    <div>
      <Toolbar>
        <Button variant="contained" onClick={onNewConnectionClick}>
          New connection
        </Button>
      </Toolbar>
      <Divider />
      <List>
        {state.availableConnections.map((connection) => (
          <ListItem
            button
            key={connection.connectionId}
            onClick={() => onItemClick(connection)}
          >
            <ListItemIcon>
              <DatabaseIcon connectionType={connection.type} />
            </ListItemIcon>
            <ListItemText primary={connection.name} />
          </ListItem>
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
