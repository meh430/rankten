import React from 'react';
import { useTheme, Dialog } from "@material-ui/core";
import ReactLoading from 'react-loading';

import { BackButton } from "./BackButton";
import { ActionButton } from "./ActionButton";
import { UserContext } from "../Contexts";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import "../App.css";

//handleClose: callback
//open: bool
//title: string
export const UserListDialog = props => {
    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div class="row" style={{ alignItems: "center", width: "500px", maxWidth: "95%" }}>
                <BackButton onClick={props.handleClose} />
                <h1 style={{ ...textTheme, marginLeft: "22px" }}>{props.title}</h1>
            </div>
            <div class="col" style={{ alignItems: "center" }}>
                List of users
            </div>
        </Dialog>
    );
}