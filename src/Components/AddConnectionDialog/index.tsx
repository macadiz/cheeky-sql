import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useConnectionsContext } from "../../Context/ConnectionsContext";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  TestConnectionConfig,
} from "../../utils/connections";
import { Connection } from "../../Context/ConnectionsContext/types";
import { AddConnectionFormState } from "./types";
import { useApplicationContext } from "../../Context/ApplicationContext";
import { buildMySQLConnectionConfig } from "../../utils/mysqlConnection";

const useStyles = makeStyles({
  gridColumn: {
    padding: 4,
  },
});

const initialFormState: AddConnectionFormState = {
  connectionName: "",
  host: "",
  port: 3306,
  userName: "",
  password: "",
  database: "",
};

const AddConnectionDialog = () => {
  const classes = useStyles();

  const { state, toggleAddConnectionModal, addNewConnection } =
    useConnectionsContext();

  const { showAlert } = useApplicationContext();

  const [formState, setFormState] =
    useState<AddConnectionFormState>(initialFormState);

  const { connectionName, host, port, userName, password, database } =
    formState;

  const onAddConnection = async () => {
    try {
      await checkIfConnectionIsValid();

      const newConnection: Connection = {
        name: connectionName,
        type: "MYSQL",
        connectionObject: buildMySQLConnectionConfig(
          host,
          port,
          userName,
          password,
          database
        ),
      };

      addNewConnection(newConnection);
      toggleAddConnectionModal();
    } catch (error) {
      showAlert("Error, please check", (error as Error).message);
    }
  };

  const onFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof AddConnectionFormState
  ) => {
    setFormState({ ...formState, [fieldName]: event.target.value });
  };

  const checkIfConnectionIsValid = async () => {
    return await TestConnectionConfig(
      "MYSQL",
      buildMySQLConnectionConfig(host, port, userName, password, database)
    );
  };

  const onTestConnectionButtonClick = async () => {
    try {
      await checkIfConnectionIsValid();
      showAlert("Connection OK!", "");
    } catch (error) {
      showAlert("Connection error", (error as Error).message);
    }
  };

  return (
    <Dialog
      open={state.showAddConnectionModal}
      onClose={toggleAddConnectionModal}
    >
      <DialogTitle>Add new connection</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item className={classes.gridColumn} xs={12} sm={6}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Connection name"
              fullWidth
              variant="standard"
              onChange={(event) => onFormChange(event, "connectionName")}
              value={formState.connectionName}
            />
          </Grid>
          <Grid item className={classes.gridColumn} xs={12} sm={6}>
            <TextField
              margin="dense"
              id="host"
              label="Host"
              fullWidth
              variant="standard"
              onChange={(event) => onFormChange(event, "host")}
              value={formState.host}
            />
          </Grid>
          <Grid item className={classes.gridColumn} xs={12} sm={6}>
            <TextField
              margin="dense"
              id="port"
              label="Port"
              fullWidth
              variant="standard"
              type="number"
              onChange={(event) => onFormChange(event, "port")}
              defaultValue={formState.port}
            />
          </Grid>
          <Grid item className={classes.gridColumn} xs={12} sm={6}>
            <TextField
              margin="dense"
              id="user"
              label="User name"
              fullWidth
              variant="standard"
              onChange={(event) => onFormChange(event, "userName")}
              value={formState.userName}
            />
          </Grid>
          <Grid item className={classes.gridColumn} xs={12} sm={6}>
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(event) => onFormChange(event, "password")}
              value={formState.password}
            />
          </Grid>
          <Grid item className={classes.gridColumn} xs={12} sm={6}>
            <TextField
              margin="dense"
              id="database"
              label="Database"
              fullWidth
              variant="standard"
              onChange={(event) => onFormChange(event, "database")}
              value={formState.database}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onTestConnectionButtonClick}>Test connection</Button>
        <Button onClick={toggleAddConnectionModal}>Cancel</Button>
        <Button onClick={onAddConnection}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddConnectionDialog;
