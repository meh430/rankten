import React from "react";
import { useHistory } from "react-router-dom";
import { Card, useTheme, Avatar, makeStyles } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { getCardStyle, getTextTheme } from "../misc/AppTheme";
import "../App.css";

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "50px",
        width: "50px",
    },
    avIcon: {
        height: "100%",
        width: "100%",
    },
}));

//profPic: string
//userName: string
//userId: number
export const UserPreviewCard = (props) => {
    const history = useHistory();
    const currentTheme = useTheme();
    const cardTheme = getCardStyle(currentTheme);
    const textTheme = getTextTheme(currentTheme);

    const classes = useStyles();

    return (
        <Card
            style={{
                ...cardTheme,
                maxWidth: "100%",
                width: "96%",
                margin: "4px",
                padding: "10px",
                cursor: "pointer",
            }}
            onClick={() => {
                history.push("/main/profile/" + props.userId);
            }}
        >
            {" "}
            <div className="row" style={{ alignItems: "center" }}>
                <Avatar src={props.profPic} className={classes.avatar}>
                    <AccountCircleIcon className={classes.avIcon} />
                </Avatar>
                <div className="row" style={{ justifyContent: "center", flexGrow: 1 }}>
                    <h2 style={{ ...textTheme, alignSelf: "center" }}>{props.userName}</h2>
                </div>
            </div>
        </Card>
    );
};
