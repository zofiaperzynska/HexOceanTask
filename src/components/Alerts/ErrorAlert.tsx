import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface ErrorAlertProps {
  errorMessage: string;
  closeErrorAlertHandler: () => void;
}

const ErrorAlert = (props: ErrorAlertProps) => (
  <Snackbar
    open={!!props.errorMessage}
    autoHideDuration={6000}
    onClose={props.closeErrorAlertHandler}
  >
    <Alert
      onClose={props.closeErrorAlertHandler}
      severity='error'
      sx={{ width: "100%" }}
    >
      {props.errorMessage}
    </Alert>
  </Snackbar>
);

export default ErrorAlert;
