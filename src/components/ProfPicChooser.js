import React, { useContext } from "react";
import { useTheme, Dialog } from "@material-ui/core";

import { BackButton } from "./BackButton";
import { UserContext } from "../Contexts";
import { getTextTheme } from "../misc/AppTheme";
import "../App.css";

export function CustomizedDialogs(props) {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div class="row" style={{alignItems:"center", width:"500px", maxWidth:"95%"}}>
                <BackButton onClick={props.handleClose} />
                <h1 style={{ ...textTheme, marginLeft: "20px" }}>Choose Profile Pic</h1>
            </div>
            <div class="col"><h4>Bro</h4></div>
        </Dialog>
    );
}
