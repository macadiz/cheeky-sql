import { IconButton, Toolbar, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Menu as MenuIcon } from "@mui/icons-material";
import React, { FC } from "react";
import { TopbarProps } from "./types";
import { useConnectionsContext } from "../../Context/ConnectionsContext";
import { useWorkspaceContext } from "../../Context/WorkspaceContext";
import { useApplicationContext } from "../../Context/ApplicationContext";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  closeWorkspaceButtonContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
});

const Topbar: FC<TopbarProps> = ({ handleSidebarToggle }) => {
  const classes = useStyles();

  const { showAlert } = useApplicationContext();
  const {
    state: { activeConnection },
    setActiveConnection,
  } = useConnectionsContext();
  const { state: workspaceState, closeWorkspace } = useWorkspaceContext();

  const onCloseWorkspace = () => {
    showAlert(
      "Confirm action",
      "You are going to lose every tab for this workspace. Are you sure you want to close it?",
      "confirm",
      () => {
        setActiveConnection(null);
        closeWorkspace(workspaceState.selectedWorkspaceConnectionId);
      }
    );
  };

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleSidebarToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Cheeky SQL {activeConnection && `- ${activeConnection.name}`}
      </Typography>
      {activeConnection && (
        <div className={classes.closeWorkspaceButtonContainer}>
          <IconButton onClick={onCloseWorkspace}>
            <CloseIcon htmlColor="white" />
          </IconButton>
        </div>
      )}
    </Toolbar>
  );
};

export default Topbar;
