import React, { useContext, useState } from "react";
import { useTheme, Dialog, makeStyles, Avatar, TextField } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ReactLoading from 'react-loading';

import { BackButton } from "./BackButton";
import { ActionButton } from "./ActionButton";
import { UserContext } from "../Contexts";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { fieldTheme } from "./Login";
import { updateProfilePic } from "../api/UserRepo";
import { UserReducerTypes } from "../reducers/UserReducer";
import "../App.css";

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "200px",
        width: "200px",
        marginBottom:"12px"
    },
    avIcon: {
        height: "100%",
        width: "100%",
    },
}));

//handleClose: callback
//open: bool
export const ProfilePicChooser = (props) => {
    const { user, userDispatch, userToken } = useContext(UserContext);
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [profPic, setProfPic] = useState(user["prof_pic"]);

    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div class="row" style={{ alignItems: "center", width: "500px", maxWidth: "95%" }}>
                <BackButton onClick={props.handleClose} />
                <h1 style={{ ...textTheme, marginLeft: "22px" }}>Choose Profile Pic</h1>
            </div>
            <div class="col" style={{ alignItems: "center" }}>
                <img
                    style={{ display: "none" }}
                    src={profPic}
                    onError={() => setError(true)}
                    onLoad={() => setError(false)}
                />
                <Avatar src={profPic} className={classes.avatar}>
                    <AccountCircleIcon className={classes.avIcon} />
                </Avatar>
                <TextField
                    defaultValue={profPic}
                    error={error}
                    helperText={error ? "Image not valid" : ""}
                    style={fieldTheme}
                    id="url-field"
                    label="Image Url"
                    variant="outlined"
                    onChange={(event) => setProfPic(event.target.value)}
                />
                {loading ? <ReactLoading type="bars" color={appThemeConstants.hanPurple} /> : <ActionButton disabled={error} width="225px" onClick={async () => {
                    setLoading(true);
                    const [e, res] = await updateProfilePic(profPic, userToken);
                    if (e) {
                        setError(true);
                    } else {
                        setError(false)
                        userDispatch({ type: UserReducerTypes.updateProfilePicAction, payload: { profPic: profPic } });
                        props.handleClose();
                    }
                    setLoading(false);

                }} label="Set As Profile Pic" />}
            </div>
        </Dialog>
    );
};
//<ReactLoading type="bubbles" color={appThemeConstants.hanPurple} />
