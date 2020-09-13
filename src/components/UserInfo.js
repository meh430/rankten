import React, { useContext } from "react";
import { Avatar, Card, CardContent, makeStyles, useTheme } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { UserContext } from "../Contexts";
import "../App.css";

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "100px",
        width: "100px",
    },
    avIcon: {
        height: "100%",
        width: "100%",
    },
}));
//isMain: bool
//profilePic: string
export const UserInfo = (props) => {
    //const { user } = useContext(UserContext);
    const classes = useStyles();
    const currentTheme = useTheme();
    return (
        <Card style={{
                margin: "10px",
                alignSelf: "center",
                boxShadow: currentTheme.shadows[4],
                width: "800px",
                maxWidth: "98%",
                borderRadius: "10px",
            }}>
            <CardContent className="row">
                <Avatar src="" className={classes.avatar}>
                    <AccountCircleIcon className={classes.avIcon} />
                </Avatar>
                <div className="row" style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
                    
                </div>
            </CardContent>
        </Card>
    );
};
