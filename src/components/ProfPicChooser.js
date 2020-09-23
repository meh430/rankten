import React, { useContext, useState } from "react";
import { useTheme, Dialog, makeStyles, Avatar, TextField, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { BackButton } from "./BackButton";
import { UserContext } from "../Contexts";
import { getTextTheme } from "../misc/AppTheme";
import { fieldTheme } from "./Login";
import { appThemeConstants } from '../misc/AppTheme';
import "../App.css";

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "200px",
        width: "200px",
    },
    avIcon: {
        height: "100%",
        width: "100%",
    },
}));

export const ProfilePicChooser = (props) => {
    const { user, userDispatch, userToken } = useContext(UserContext);
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    const classes = useStyles();

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
                    error={error}
                    helperText={error ? "Image not valid" : ""}
                    style={fieldTheme}
                    id="url-field"
                    label="Image Url"
                    variant="outlined"
                    onChange={(event) => setProfPic(event.target.value)}
                />
                <Button
                    variant="contained"
                    disabled={error}
                    style={{
                        maxWidth: "75%",
                        width: "225px",
                        marginTop: "15px",
                        marginBottom: "15px",
                        color: "#ffffff",
                        backgroundColor: appThemeConstants.hanPurple,
                    }}
                >
                    Set As Profile Pic
                </Button>
            </div>
        </Dialog>
    );
};
//<ReactLoading type="bubbles" color={appThemeConstants.hanPurple} />
