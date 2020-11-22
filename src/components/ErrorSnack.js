import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

export const closeErrorSB = (event, reason, setOpen) => {
    if (reason === "clickaway") {
        return;
    }

    setOpen(false);
};

// message: string
// open: bool
// handleClose: callback
export const ErrorSnack = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity="error">
                {props.message}
            </Alert>
        </Snackbar>
    );
};
