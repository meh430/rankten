import React, { useContext, useState } from "react";
import { Avatar, Card, CardContent, makeStyles, useTheme, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ReactLoading from "react-loading";

import { CustomizedDialogs } from "./ProfPicChooser";
import { resetUserContext, UserContext } from "../Contexts";
import { getCardStyle, getTextTheme, appThemeConstants } from "../misc/AppTheme";
import { followUser } from "../api/UserRepo";
import { UserReducerTypes } from "../reducers/UserReducer";
import { containsId, tsToDate } from "../misc/Utils";
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

//isFollowing: bool
//mainUser: UserContext
//name: string
//id: object
const FollowButton = (props) => {
    const [loading, setLoading] = useState(false);
    const [following, setFollowing] = useState(props.isFollowing);
    const mainUser = props.mainUser;
    return loading ? (
        <ReactLoading type="bubbles" color={appThemeConstants.hanPurple} />
    ) : (
        <Button
            onClick={async () => {
                setLoading(true);
                const [e, res] = await followUser(props.name, mainUser.userToken);
                console.log(res);
                if (e) {
                    setLoading(false);
                    return;
                } else {
                    setFollowing(res === "FOLLOW");
                    mainUser.userDispatch({
                        type: UserReducerTypes.followUserAction,
                        payload: { hasFollowed: res === "FOLLOW", targetId: props.id },
                    });
                    setLoading(false);
                }
            }}
            variant="contained"
            style={{
                maxWidth: "75%",
                width: "400px",
                marginTop: "15px",
                marginBottom: "15px",
                color: "#ffffff",
                backgroundColor: appThemeConstants.hanPurple,
            }}
        >
            {following ? "Unfollow" : "Follow"}
        </Button>
    );
};

//bio: string
//date: object
//textTheme: object
const UserBio = (props) => {
    return (
        <div style={{ alignSelf: "start", marginLeft: "30px" }}>
            <h1 style={{ ...props.textTheme, textAlign: "start" }}>Bio</h1>
            <h3 style={{ ...props.textTheme, textAlign: "start" }}>
                {props.bio === "" ? "This user does not have a bio" : props.bio}
            </h3>
            <h1 style={{ ...props.textTheme, textAlign: "start" }}>Date Created</h1>
            <h3 style={{ ...props.textTheme, textAlign: "start" }}>{tsToDate(props.date["$date"])}</h3>
        </div>
    );
};

//isMain: bool
//user: object
export const UserInfo = (props) => {
    const mainUser = useContext(UserContext);
    const classes = useStyles();
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    const [profPickerOpen, setProfPickerOpen] = useState(false);

    let userStats = [];
    let user = props.isMain ? mainUser.user : props.user;

    if (!mainUser.user) {
        resetUserContext(mainUser);
        return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
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

    const handleClickOpen = () => {
        setProfPickerOpen(true);
    };
    const handleClose = () => {
        setProfPickerOpen(false);
    };

    return (
        <Card
            style={{
                ...getCardStyle(currentTheme),
                width: "800px",
                maxWidth: "98%",
            }}
        >
            <CardContent className="col" style={{ alignItems: "center" }}>
                <h1 style={textTheme}>{user["user_name"]}</h1>
                <div className="row" style={{ justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                    <Avatar src={avatarSrc} className={classes.avatar} onClick={() => setProfPickerOpen(true)}>
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
                <UserBio textTheme={textTheme} bio={user["bio"]} date={user["date_created"]} />
                {props.isMain ? (
                    <i style={{ display: "none" }} />
                ) : (
                    <FollowButton
                        mainUser={mainUser}
                        name={user["user_name"]}
                        isFollowing={containsId(mainUser.user["following"], user["_id"])}
                        id={user["_id"]}
                    />
                )}

                <CustomizedDialogs open={profPickerOpen} handleClose={handleClose} handleClickOpen={handleClickOpen}/>
            </CardContent>
        </Card>
    );
};
