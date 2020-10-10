import React, { useContext, useState } from "react";
import { Avatar, Card, CardContent, makeStyles, useTheme } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import ReactLoading from "react-loading";

import { BioField } from "./SignUp";
import { UserListDialog } from "./UserListDialog";
import { UserPreviewTypes } from "../api/UserPreviewRepo";
import { ProfilePicChooser } from "./ProfPicChooser";
import { ActionButton } from "./ActionButton";
import { resetUserContext, UserContext } from "../Contexts";
import { getCardStyle, getTextTheme, appThemeConstants } from "../misc/AppTheme";
import { followUser, updateBio } from "../api/UserRepo";
import { UserReducerTypes } from "../reducers/UserReducer";
import { containsId, tsToDate, tsToDelta } from "../misc/Utils";
import "../App.css";

const useStyles = makeStyles((theme) => ({
    avatar: {
        cursor: "pointer",
        height: "200px",
        width: "200px",
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
    const { onClick } = props;
    return (
        <div
            className="col"
            style={{
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
                cursor: onClick ? "pointer" : "auto",
            }}
            onClick={onClick}
        >
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
        <ActionButton
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
            width="400px"
            label={following ? "Unfollow" : "Follow"}
        />
    );
};

let bioEdit = "";

//bio: string
//date: object
//textTheme: object
//isMain: bool
const UserBio = (props) => {
    const { userDispatch, userToken } = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [bioError, setError] = useState(false);

    return (
        <div className="col" style={{ alignSelf: "start", marginLeft: "30px", width: "100%" }}>
            <div className="row" style={{ alignItems: "center" }}>
                <h1 style={{ ...props.textTheme, textAlign: "start" }}>Bio</h1>
                <EditIcon
                    onClick={() => {
                        if (props.isMain && !editing) {
                            setEditing(true);
                        }
                    }}
                    style={{ marginLeft: "12px", cursor: "pointer", display: props.isMain ? "inline" : "none" }}
                />
            </div>
            {editing ? (
                <BioField
                    default={props.bio}
                    onChange={(event) => (bioEdit = event.target.value)}
                    onEnter={() => {
                        if (bioEdit === "") {
                            setError(true);
                            setTimeout(() => {
                                setError(false);
                            }, 2000);
                            return;
                        }

                        (async () => {
                            const [e, res] = await updateBio(bioEdit, userToken);
                            if (e) {
                                setError(true);
                                setTimeout(() => {
                                    setError(false);
                                }, 2000);
                            } else {
                                userDispatch({ type: UserReducerTypes.updateBioAction, payload: { bio: bioEdit } });
                                setEditing(false);
                            }
                        })();
                    }}
                    error={bioError}
                />
            ) : (
                <h3 style={{ ...props.textTheme, textAlign: "start" }}>
                    {props.bio === ""
                        ? props.isMain
                            ? "Set a bio to highlight your interests"
                            : "This user does not have a bio"
                        : props.bio}
                </h3>
            )}

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
    const [followersOpen, setFollowersOpen] = useState(false);
    const [followingOpen, setFollowingOpen] = useState(false);

    let userStats = [];
    let user = props.isMain ? mainUser.user : props.user;

    if (!mainUser.user) {
        resetUserContext(mainUser);
        return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
    }

    let avatarSrc = user["prof_pic"];

    userStats.push(
        {
            onClick: null,
            label: "Rank Points",
            stat: user["rank_points"],
        },
        {
            onClick: null,
            label: "Rank Lists",
            stat: user["list_num"],
        },
        {
            onClick: () => setFollowersOpen(true),
            label: "Followers",
            stat: user["num_followers"],
        },
        {
            onClick: () => setFollowingOpen(true),
            label: "Following",
            stat: user["num_following"],
        }
    );

    if (props.isMain) {
        userStats.push(
            {
                onClick: null,
                label: "Comments",
                stat: user["num_comments"],
            },
            {
                onClick: null,
                label: "Liked Lists",
                stat: user["num_liked"],
            }
        );
    }

    return (
        <Card
            style={{
                ...getCardStyle(currentTheme),
                width: "850px",
                maxWidth: "98%",
            }}
        >
            <CardContent className="col" style={{ alignItems: "center" }}>
                <h1 style={textTheme}>{user["user_name"]}</h1>
                <div className="row" style={{ justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                    <Avatar
                        src={avatarSrc}
                        className={classes.avatar}
                        onClick={() => {
                            if (props.isMain) {
                                setProfPickerOpen(true);
                            }
                        }}
                    >
                        <AccountCircleIcon className={classes.avIcon} />
                    </Avatar>
                    <div className="row" style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
                        {userStats.map((userStat) => (
                            <UserStat
                                onClick={userStat.onClick}
                                stat={userStat.stat}
                                label={userStat.label}
                                key={userStat.label}
                                textTheme={textTheme}
                            />
                        ))}
                    </div>
                </div>
                <UserBio isMain={props.isMain} textTheme={textTheme} bio={user["bio"]} date={user["date_created"]} />
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

                <UserListDialog
                    open={followersOpen}
                    handleClose={() => setFollowersOpen(false)}
                    title={user["user_name"] + "'s Followers"}
                    type={UserPreviewTypes.followersList}
                    name={user["user_name"]}
                />
                <UserListDialog
                    open={followingOpen}
                    handleClose={() => setFollowingOpen(false)}
                    title={user["user_name"] + "'s Following"}
                    type={UserPreviewTypes.followingList}
                    name={user["user_name"]}
                />
                <ProfilePicChooser open={profPickerOpen} handleClose={() => setProfPickerOpen(false)} />
            </CardContent>
        </Card>
    );
};
