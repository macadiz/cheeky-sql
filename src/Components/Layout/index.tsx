import { AppBar, Box, Toolbar } from "@mui/material";
import {
  CloudOff as CloudOffIcon,
} from "@mui/icons-material";
import React, { FC, useState } from "react";
import Sidebar, { sidebarWidth } from "./Sidebar";
import AddConnectionDialog from "../AddConnectionDialog";
import { makeStyles } from "@mui/styles";
import { useConnectionsContext } from "../../Context/ConnectionsContext";
import Workspace from "../Workspace";
import AlertDialog from "../AlertDialog";
import Topbar from "../Topbar";

const useStyles = makeStyles({
  mainContent: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});

const Layout: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const classes = useStyles();

  const { state } = useConnectionsContext();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${sidebarWidth}px)` },
            ml: { sm: `${sidebarWidth}px` },
          }}
        >
          <Topbar handleSidebarToggle={handleSidebarToggle} />
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
          aria-label="database connections"
        >
          <Sidebar
            isOpen={sidebarOpen}
            handleSidebarToggle={handleSidebarToggle}
          />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${sidebarWidth}px)` },
          }}
        >
          <Toolbar />
          <div className={classes.mainContent}>
            {state.activeConnection ? (
              <Workspace />
            ) : (
              <>
                <CloudOffIcon />
                Disconnected...
              </>
            )}
          </div>
        </Box>
      </Box>
      <AddConnectionDialog />
      <AlertDialog />
    </>
  );
};

export default Layout;
