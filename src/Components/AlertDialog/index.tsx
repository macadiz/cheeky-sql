import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useApplicationContext } from "../../Context/ApplicationContext";
import ConfirmationButtons from "./ConfirmationButtons";

const AlertDialog = () => {
  const { state, hideAlert } = useApplicationContext();
  
  const onConfirmation = () => {
    state.alertDialogData.onConfirmAction();
    hideAlert();
  };

  return (
    <Dialog open={state.alertDialogData.isOpen} onClose={hideAlert}>
      {state.alertDialogData.title.trim() !== "" && (
        <DialogTitle>{state.alertDialogData.title}</DialogTitle>
      )}
      {state.alertDialogData.content.trim() !== "" && (
        <DialogContent>{state.alertDialogData.content}</DialogContent>
      )}
      <DialogActions>
        {state.alertDialogData.type === "confirm" ? (
          <ConfirmationButtons
            onConfirmAction={onConfirmation}
            onCancelAction={hideAlert}
          />
        ) : (
          <Button onClick={hideAlert}>Ok</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
