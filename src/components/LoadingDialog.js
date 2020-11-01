import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Dialog, useTheme } from "@material-ui/core";

import "../App.css";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { ActionButton } from "./ActionButton";

// open: bool
// asyncTask: callback
// onClose: callback
// errorMessage: string
// successMessage: string
export const LoadingDialog = (props) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const executeTask = () => {
        (async () => {
            if (!props.open) {
                return;
            }

            setLoading(true);
            const [e, res] = await props.asyncTask();
            console.log([e, res]);
            setSuccess(e);
            if (!e) {
                setTimeout(props.onClose, 1500);
            }
        })();
    };

    useEffect(executeTask, []);

    return (
        <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div className="col" style={{ justifyContent: "center", alignItems: "center" }}>
                {loading ? (
                    <ReactLoading type="cylon" color={appThemeConstants.hanPurple} />
                ) : (
                    <ResultDisplay
                        success={success}
                        successMessage={props.successMessage}
                        errorMessage={props.errorMessage}
                        executeTask={executeTask}
                    />
                )}
            </div>
        </Dialog>
    );
};

// success: bool
// successMessage: string
// errorMessage: string
// executeTask: callback
const ResultDisplay = (props) => {
    const textTheme = getTextTheme(useTheme());

    if (props.success) {
        return <h2 style={textTheme}>{props.successMessage}</h2>;
    } else {
        return (
            <div className="row" style={{ alignItems: "center" }}>
                <h2 style={textTheme}>{props.errorMessage}</h2>
                <ActionButton onClick={props.executeTask} width="100px" label="Try Again" />
            </div>
        );
    }
};
