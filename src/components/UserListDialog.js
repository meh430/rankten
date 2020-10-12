import React, { useEffect, useState } from "react";
import { useTheme, Dialog } from "@material-ui/core";
import ReactLoading from "react-loading";

import { BackButton } from "./BackButton";
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
            if (props.open) {
                setLoading(true);
                const [e, res] = await getUsers(props.type)(props.name);
                if (!e) {
                    setUsersList([...res]);
                }
                setLoading(false);
            }
        })();
    }, [props.type, props.name, props.open]);

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
                    className="row"
                    style={{
                        alignItems: "center",
                        alignSelf: "start",
                        width: "fit-conent",
                        maxWidth: "100%",
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                        backgroundColor: currentTheme.palette.background.default,
                    }}
                >
                    <BackButton onClick={props.handleClose} />
                    <h1 style={{ ...textTheme, marginLeft: "22px", fontSize: "22px", marginRight: "20px" }}>
                        {props.title}
                    </h1>
                </div>
                <div
                    class="col"
                    style={{
                        alignItems: "center",
                        overscrollBehaviorY: "scroll",
                        maxHeight: "90%",
                        width: "320px",
                        maxWidth: "100%",
                        marginBottom: "6px",
                    }}
                >
                    {loading ? (
                        <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
                    ) : !usersList.length ? (
                        <h3 style={textTheme}>No users found</h3>
                    ) : (
                        usersList.map((user) => (
                            <UserPreviewCard
                                key={`user_${user["user_name"]}`}
                                userName={user["user_name"]}
                                profPic={user["prof_pic"]}
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
        case UserPreviewTypes.followingList:
            return getFollowing;
        case UserPreviewTypes.likersList:
            return getLikers;
        default:
            throw new Error("Bro what are you doing?");
    }
}
