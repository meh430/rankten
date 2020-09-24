import React, { useEffect, useState } from "react";
import { useTheme, Dialog, DialogTitle } from "@material-ui/core";
import ReactLoading from "react-loading";

import { BackButton } from "./BackButton";
import { ActionButton } from "./ActionButton";
import { appThemeConstants, getTextTheme } from "../misc/AppTheme";
import { UserPreviewCard } from "./UserPreviewCard";
import { UserPreviewTypes, getFollowers, getFollowing, getLikers } from "../api/UserPreviewRepo";
import "../App.css";

//handleClose: callback
//open: bool
//title: string
//type: string
export const UserListDialog = (props) => {
    const currentTheme = useTheme();
    const textTheme = getTextTheme(currentTheme);

    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [e, res] = await getUsers(props.type)(props.name);
            if (!e) {
                setUsersList([...res]);
            }
            setLoading(false);
        })();
    }, [props.type]);

    return (
        <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div
                className="col"
                style={{
                    backgroundColor: currentTheme.palette.background.default,
                    alignItems: "center",
                    overscrollBehaviorY: "none",
                }}
            >
                <div
                    class="row"
                    style={{
                        alignItems: "center",
                        width: "420px",
                        maxWidth: "100%",
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                        backgroundColor: currentTheme.palette.background.default,
                    }}
                >
                    <BackButton onClick={props.handleClose} />
                    <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px" }}>{props.title}</h1>
                </div>
                <div
                    class="col"
                    style={{
                        alignItems: "center",
                        overscrollBehaviorY: "scroll",
                        maxHeight: "90%",
                        width: "420px",
                        maxWidth: "100%",
                        marginBottom: "6px",
                    }}
                >
                    {loading ? (
                        <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
                    ) : usersList.length == 0 ? (
                        <h3 style={textTheme}>No users found</h3>
                    ) : (
                        usersList.map((user) => (
                            <UserPreviewCard
                                userName={user["user_name"]}
                                profPic={user["prof_pic"]}
                                bio={user["bio"]}
                            />
                        ))
                    )}
                </div>
            </div>
        </Dialog>
    );
};

function getUsers(type) {
    switch (type) {
        case UserPreviewTypes.followersList:
            return getFollowers;
            break;
        case UserPreviewTypes.followingList:
            return getFollowing;
            break;
        case UserPreviewTypes.likersList:
            return getLikers;
            break;
    }
}
