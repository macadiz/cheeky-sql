import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  Menu as MenuIcon,
  CloudOff as CloudOffIcon,
} from "@mui/icons-material";
import React, { FC, useState } from "react";
import Sidebar, { sidebarWidth } from "./Sidebar";
import AddConnectionDialog from "../AddConnectionDialog";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  mainContent: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});

const Layout: FC = () => {
  const [sidebarOpen, setSiedbarOpen] = useState(false);

  const classes = useStyles();

  const handleSidebarToggle = () => {
    setSiedbarOpen(!sidebarOpen);
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
              Cheeky SQL
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
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
            <CloudOffIcon />
            Disconnected...
          </div>
        </Box>
      </Box>
      <AddConnectionDialog />
    </>
  );
};

export default Layout;
