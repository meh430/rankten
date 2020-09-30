import React from "react";
import { Card, useTheme, Avatar, makeStyles } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { getCardStyle, getTextTheme } from "../misc/AppTheme";
import "../App.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "100px",
        width: "100px",
        marginBottom: "12px",
    },
    avIcon: {
        height: "100%",
        width: "100%",
    },
}));

//profPic: string
//userName: string
//bio: string
export const UserPreviewCard = (props) => {
    const history = useHistory();
    const currentTheme = useTheme();
    const cardTheme = getCardStyle(currentTheme);
    const textTheme = getTextTheme(currentTheme);

    const classes = useStyles();

    return (
        <Card
            style={{ ...cardTheme, maxWidth: "100%", width: "400px", margin: "4px", cursor: "pointer" }}
            onClick={() => {
                history.push("/main/profile/" + props.userName);
            }}
        >
            <div className="col" style={{ paddingLeft: "12px", paddingRight: "12px", paddingTop: "14px" }}>
                <div className="row" style={{ alignItems: "center" }}>
                    <Avatar src={props.profPic} className={classes.avatar}>
                        <AccountCircleIcon className={classes.avIcon} />
                    </Avatar>
                    <h2 style={{ ...textTheme, paddingLeft: "20px" }}>{props.userName}</h2>
                </div>
                {props.bio ? (
                    <h4 style={{ ...textTheme, paddingLeft: "6px", paddingRight: "6px" }}>{props.bio}</h4>
                ) : (
                    <i style={{ display: "none" }} />
                )}
            </div>
        </Card>
    );
};
