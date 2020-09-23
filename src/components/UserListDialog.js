import React, { useState } from "react";
import { useTheme, Dialog } from "@material-ui/core";
import ReactLoading from "react-loading";

import { BackButton } from "./BackButton";
import { ActionButton } from "./ActionButton";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { UserPreviewCard } from "./UserPreviewCard";
import "../App.css";

//handleClose: callback
//open: bool
//title: string
//type: string
export const UserListDialog = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    const [usersList, setUsersList] = useState([]);
    const [hitMax, setHitMax] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div style={{ backgroundColor: currentTheme.palette.background.default }}>
                <div class="row" style={{ alignItems: "center", width: "300px", maxWidth: "95%" }}>
                    <BackButton onClick={props.handleClose} />
                    <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px" }}>{props.title}</h1>
                </div>
                <div class="col" style={{ alignItems: "center" }}>
                    {usersList.length == 0 ? <h3 style={textTheme}>No users found</h3> : usersList.map(user => <UserPreviewCard userName={user['user_name']} profPic={user['prof_pic']} bio={user['bio']}/>)}
                    {loading ? <ReactLoading type="bars" color={appThemeConstants.hanPurple}/> : <i style={{display: "none"}}/>}
                    {loading || usersList.length == 0 ? <i syle={{display: "none"}}/>: <ActionButton label="Load More" width="140px" maxWidth="90%" onClick={() => console.log("loading more")} />}
                </div>
            </div>
        </Dialog>
    );
};
