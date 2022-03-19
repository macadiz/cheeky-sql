import { Button } from "@mui/material";
import { FC } from "react";
import { ConfirmationButtonsProps } from "./types";

const ConfirmationButtons: FC<ConfirmationButtonsProps> = ({
  onConfirmAction,
  onCancelAction,
}) => {
  return (
    <>
      <Button onClick={onCancelAction}>Cancel</Button>
      <Button onClick={onConfirmAction}>Ok</Button>
    </>
  );
};

export default ConfirmationButtons;
