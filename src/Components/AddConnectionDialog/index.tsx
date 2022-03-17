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
import { buildMySQLConnectionString } from "../../utils/connections";
import { Connection } from "../../Context/ConnectionsContext/types";
import { AddConnectionFormState } from "./types";

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

  const [formState, setFormState] =
    useState<AddConnectionFormState>(initialFormState);

  const onAddConnection = () => {
    const { connectionName, host, port, userName, password, database } =
      formState;

    const newConnection: Connection = {
      name: connectionName,
      type: "MYSQL",
      connectionString: buildMySQLConnectionString(
        host,
        port,
        userName,
        password,
        database
      ),
    };

    addNewConnection(newConnection);
  };

  const onFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof AddConnectionFormState
  ) => {
    setFormState({ ...formState, [fieldName]: event.target.value });
  };

  return (
    <Dialog
      open={state.showAddConnectionModal}
      onClose={toggleAddConnectionModal}
    >
      <DialogTitle>Add new connection</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid className={classes.gridColumn} xs={12} sm={6}>
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
          <Grid className={classes.gridColumn} xs={12} sm={6}>
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
          <Grid className={classes.gridColumn} xs={12} sm={6}>
            <TextField
              margin="dense"
              id="port"
              label="Port"
              fullWidth
              variant="standard"
              type="number"
              onChange={(event) => onFormChange(event, "port")}
              defaultValue={""}
              value={formState.port}
            />
          </Grid>
          <Grid className={classes.gridColumn} xs={12} sm={6}>
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
          <Grid className={classes.gridColumn} xs={12} sm={6}>
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
          <Grid className={classes.gridColumn} xs={12} sm={6}>
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
        <Button onClick={toggleAddConnectionModal}>Cancel</Button>
        <Button
          onClick={() => {
            onAddConnection();
            toggleAddConnectionModal();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddConnectionDialog;
