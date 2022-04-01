import {
  Alert,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Close as TimesIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import React, { FC, useState } from "react";
import { useConnectionsContext } from "../../Context/ConnectionsContext";
import {
  ActiveConnection,
  SQLError,
  SQLErrorTypes,
} from "../../Context/ConnectionsContext/types";
import { useWorkspaceContext } from "../../Context/WorkspaceContext";
import { executeQuery, solveSQLError } from "../../utils/connections";
import { makeStyles } from "@mui/styles";
import ResultsDisplay from "./ResultsDisplay";

const useStyles = makeStyles({
  workspaceContainer: {
    width: "100%",
    "& .MuiButtonBase-root.MuiTab-root": {
      padding: "2px 2px 0 2px",
      height: 30,
    },
    "& .add-new-tab": {
      width: 24,
    },
  },
  workspaceTopBar: {
    display: "flex",
  },
  tabLabel: {
    minWidth: 100,
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 12,
    height: 12,
    "& svg": {
      width: 12,
      height: 12,
    },
  },
  newTabButton: {
    width: 48,
    height: 48,
  },
  workspaceQueryContainer: {
    width: "100%",
  },
  toolbarContainer: {
    margin: "16px 0",
    width: "100%",
  },
  nullText: {
    fontStyle: "italic",
  },
  toolButton: {
    padding: "0 !important",
    minWidth: "28px !important",
    width: 28,
    height: 28,
  },
});

const Workspace: FC = () => {
  const classes = useStyles();

  const [sqlError, setSQLError] = useState<SQLError | null>(null);
  const { state: connectionState } = useConnectionsContext();
  const {
    state: workspaceState,
    setSelectedTab,
    setQueryResults,
    setTabQuery,
    createNewTab,
    removeTab,
  } = useWorkspaceContext();

  const currentWorkspace = workspaceState.workspaces.find(
    (workspaces) =>
      workspaceState.selectedWorkspaceConnectionId === workspaces.connectionId
  );

  if (!currentWorkspace) {
    return <></>;
  }

  const onExecuteQueryClick = async () => {
    setSQLError(null);
    setQueryResults([]);
    const activeConnection =
      connectionState.activeConnection as ActiveConnection;

    try {
      const results = await executeQuery(
        activeConnection.type,
        activeConnection.connection,
        currentWorkspace.selectedTab?.SQLQuery ?? ""
      );
      setQueryResults(results);
    } catch (error) {
      setSQLError(solveSQLError(activeConnection.type, error as SQLErrorTypes));
    }
  };

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    tabId: string
  ) => {
    setSelectedTab(tabId);
  };

  const onRemoveTabClick = (event: React.MouseEvent, tabId: string) => {
    event.stopPropagation();
    removeTab(tabId);
  };

  const resultsSet = currentWorkspace.selectedTab?.resultSet;

  return (
    <div className={classes.workspaceContainer}>
      <div className={classes.workspaceTopBar}>
        {currentWorkspace.selectedTab && (
          <Tabs
            value={currentWorkspace.selectedTab?.tabId}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            {currentWorkspace.tabs.map((tab) => {
              return (
                <Tab
                  component={"div"}
                  label={
                    <div className={classes.tabLabel}>
                      New Tab{" "}
                      <IconButton
                        onClick={(event) => onRemoveTabClick(event, tab.tabId)}
                        className={classes.iconButton}
                      >
                        <TimesIcon />
                      </IconButton>
                    </div>
                  }
                  key={`workspace-tab-${tab.tabId}`}
                  value={tab.tabId}
                />
              );
            })}
          </Tabs>
        )}
        <IconButton
          className={classes.newTabButton}
          onClick={createNewTab}
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </div>
      <div className={classes.workspaceQueryContainer}>
        {currentWorkspace.selectedTab && (
          <>
            <Box className={classes.toolbarContainer}>
              <Button
                className={classes.toolButton}
                onClick={onExecuteQueryClick}
                variant="contained"
                color="primary"
                title="Run SQL query"
              >
                <PlayArrowIcon />
              </Button>
            </Box>
            <TextField
              onChange={(e) => setTabQuery(e.target.value)}
              value={currentWorkspace.selectedTab.SQLQuery ?? ""}
              label="SQL query"
              multiline
              fullWidth
              minRows={5}
              maxRows={5}
            />
          </>
        )}
        {sqlError && <Alert severity="error">{sqlError.message}</Alert>}
        {resultsSet && <ResultsDisplay resultsSet={resultsSet} />}
      </div>
    </div>
  );
};

export default Workspace;
