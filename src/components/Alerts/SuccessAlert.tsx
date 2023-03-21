import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface SuccessAlertProps {
  successSubmit: boolean;
  closeSuccessAlertHandler: () => void;
}

const SuccessAlert = (props: SuccessAlertProps) => (
  <Snackbar
    open={props.successSubmit}
    autoHideDuration={6000}
    onClose={props.closeSuccessAlertHandler}
  >
    <Alert
      onClose={props.closeSuccessAlertHandler}
      severity='success'
      sx={{ width: "100%" }}
    >
      Your dish has been successfully submitted!
    </Alert>
  </Snackbar>
);

export default SuccessAlert;
