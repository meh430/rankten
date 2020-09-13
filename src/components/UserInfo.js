import React, { useContext } from "react";
import { Avatar, Card, CardContent, makeStyles, useTheme } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { UserContext } from "../Contexts";
import { getCardStyle, getTextTheme } from "../misc/AppTheme";
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
//user: object
export const UserInfo = (props) => {
    let token = "";
    const mainUser = useContext(UserContext);
    const classes = useStyles();
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);
    let userStats = [];
    let user = props.isMain ? mainUser.user : props.user;
    let avatarSrc = user['prof_pic'];

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
            <CardContent className="row" style={{ justifyContent: "space-around", alignItems: "center" }}>
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
