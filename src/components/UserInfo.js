import React, { useContext, useEffect, useState } from "react";
import { Avatar, Card, CardContent, makeStyles, useTheme, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { resetUserContext, UserContext } from "../Contexts";
import { getCardStyle, getTextTheme, appThemeConstants } from "../misc/AppTheme";
import "../App.css";
import { getUser } from "../api/UserRepo";
import { UserReducerTypes } from "../reducers/UserReducer";
import { loginUser } from "../api/Auth";
import { getLogin } from "../misc/PrefStore";
import ReactLoading from "react-loading";


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
//user: object
export const UserInfo = (props) => {
    let token = "";
    const mainUser = useContext(UserContext);
    const classes = useStyles();
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
        
    let userStats = [];
    let user = props.isMain ? mainUser.user : props.user;

    if (!mainUser.user) {
        resetUserContext(mainUser);
        return <ReactLoading type="bubbles" color={appThemeConstants.hanPurple} />;
    }

    let avatarSrc = user["prof_pic"];

    userStats.push(
        {
            label: "Rank Points",
            stat: user["rank_points"],
        },
        {
            label: "Rank Lists",
            stat: user["list_num"],
        },
        {
            label: "Followers",
            stat: user["num_followers"],
        },
        {
            label: "Following",
            stat: user["num_following"],
        }
    );

    if (props.isMain) {
        userStats.push(
            {
                label: "Comments",
                stat: user["num_comments"],
            },
            {
                label: "Liked Lists",
                stat: user["num_liked"],
            }
        );
    }

    return (
        <Card
            style={{
                ...getCardStyle(currentTheme),
                width: "800px",
                maxWidth: "98%",
            }}
        >
            <CardContent className="col" style={{ alignItems: "center"}}>
                <div className="row" style={{ justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                    <Avatar src={avatarSrc} className={classes.avatar}>
                        <AccountCircleIcon className={classes.avIcon} />
                    </Avatar>
                    <div className="row" style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
                        {userStats.map((userStat) => (
                            <UserStat
                                stat={userStat.stat}
                                label={userStat.label}
                                key={userStat.label}
                                textTheme={textTheme}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    variant="contained"
                    style={{
                        width: "70%",
                        marginTop: "15px",
                        marginBottom: "15px",
                        color: "#ffffff",
                        backgroundColor: appThemeConstants.hanPurple,
                    }}
                >
                    FOLLOW
                </Button>
            </CardContent>
        </Card>
    );
};

//onClick: callback
//label: string
//stat: number
//textTheme: object
const UserStat = (props) => {
    return (
        <div className="col" style={{ alignItems: "center", justifyContent: "center", margin: "10px" }}>
            <h2 style={props.textTheme}>{props.stat}</h2>
            <h3 style={props.textTheme}>{props.label}</h3>
        </div>
    );
};
