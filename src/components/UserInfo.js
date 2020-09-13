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
        <Card
            style={{
                margin: "10px",
                alignSelf: "center",
                boxShadow: currentTheme.shadows[4],
                width: "800px",
                maxWidth: "98%",
                borderRadius: "10px",
            }}
        >
            <CardContent className="row" style={{justifyContent: "space-evenly", alignItems: "center"}}>
                <Avatar src="" className={classes.avatar}>
                    <AccountCircleIcon className={classes.avIcon} />
                </Avatar>
                <div className="row" style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
                    {
                        [
                            {
                                stat: 12,
                                label: "Rank Points"
                            },
                            {
                                stat: 12,
                                label: "Rank Lists"
                            },
                            {
                                stat: 12,
                                label: "Followers"
                            },
                            {
                                stat: 12,
                                label: "Following"
                            },
                            {
                                stat: 12,
                                label: "Comments"
                            },
                            {
                                stat: 12,
                                label: "Liked Lists"
                            }
                        ].map(userStat => <UserStat stat={userStat.stat} label={userStat.label} key={userStat.label}/>)
                    }
                </div>
            </CardContent>
        </Card>
    );
};

//onClick: callback
//label: string
//stat: number
const UserStat = (props) => {
    return (
        <div className="col" style={{ alignItems: "center", justifyContent: "center", margin: "10px" }}>
            <h4>{props.stat}</h4>
            <h5>{props.label}</h5>
        </div>
    );
};
