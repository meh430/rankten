import React from "react";
import { useTheme, Dialog } from "@material-ui/core";
import ReactLoading from "react-loading";

import { BackButton } from "./BackButton";
import { ActionButton } from "./ActionButton";
import { UserContext } from "../Contexts";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import "../App.css";
import { UserPreviewCard } from "./UserPreviewCard";

//handleClose: callback
//open: bool
//title: string
//type: string
export const UserListDialog = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div style={{ backgroundColor: currentTheme.palette.background.default }}>
                <div class="row" style={{ alignItems: "center", width: "280px", maxWidth: "95%" }}>
                    <BackButton onClick={props.handleClose} />
                    <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px" }}>{props.title}</h1>
                </div>
                <div class="col" style={{ alignItems: "center" }}>
                    <UserPreviewCard userName="John Doe" profPic="https://cdn.ebaumsworld.com/2020/07/24/041135/86328344/dank-memes-reddit26.jpg" bio="Blah blah blah blah blah blah blah blah blah blah blahblahblah blah blah blahblah"/>
                    <UserPreviewCard userName="John Doe" profPic="https://cdn.ebaumsworld.com/2020/07/24/041135/86328344/dank-memes-reddit26.jpg" bio="Blah blah blah blah blah blah blah blah blah blah blahblahblah blah blah blahblah"/>
                </div>
            </div>
        </Dialog>
    );
};
