import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Card, useTheme } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ReactLoading from "react-loading";

import { resetUserContext, UserContext } from "../Contexts";
import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { containsId, tsToDelta } from "../misc/Utils";
import { UserListDialog } from "./UserListDialog";
import { UserPreviewTypes } from "../api/UserPreviewRepo";
import { likeList } from "../api/UserRepo";
import { UserReducerTypes } from "../reducers/UserReducer";
import "../App.css";

//commentPreview: object
//cardTheme: object
//theme: object
export const CommentPreview = (props) => {
    return (
        <Card style={props.cardStyle}>
            <div className="col">
                <CardHeader
                    isDark={props.isDark}
                    name={props.commentPreview["user_name"]}
                    profPic={props.commentPreview["prof_pic"]}
                    timeStamp={props.commentPreview["date_created"]}
                />
                <h3 style={{ ...props.textTheme, margin: "4px" }}>{props.commentPreview["comment"]}</h3>
                <h4
                    style={{
                        ...props.textTheme,
                        margin: "4px",
                        textDecoration: "underline",
                        cursor: "pointer",
                        display: props.commentPreview["num_comments"] <= 1 ? "none" : "inline",
                    }}
                >
                    View all {props.commentPreview["num_comments"]} comments
                </h4>
            </div>
        </Card>
    );
};

// id: string
// mainUser: object
// textTheme: object
// numLikes: number
// isLiked: bool
// isList: bool
export const LikeBar = (props) => {
    const [loading, setLoading] = useState(false);
    const [openLikers, setOpenLikers] = useState(false);
    const [liked, setLiked] = useState(props.isLiked);
    const [numLikes, setNumLikes] = useState(props.numLikes);

    const onLike = async () => {
        setLoading(true);
        const [e, res] = await likeList(props.id, props.mainUser.userToken);
        if (e) {
            setLoading(false);
            return;
        } else {
            if (liked) {
                setNumLikes(numLikes - 1);
            } else {
                setNumLikes(numLikes + 1);
            }
            setLiked(res === "LIKED");
            props.mainUser.userDispatch({
                type: UserReducerTypes.likeListAction,
                payload: { hasLiked: res === "LIKED", targetId: { $oid: props.id } },
            });
            setLoading(false);
        }
    };

    const likeStyle = { color: "red", height: "45px", width: "45px" };

    return loading ? (
        <ReactLoading type="bubbles" color={appThemeConstants.hanPurple} />
    ) : (
        <div
            className="row"
            style={{
                margin: "0px",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "12px",
                paddingRight: "12px",
                cursor: "pointer",
            }}
        >
            {liked ? (
                <FavoriteIcon onClick={onLike} style={likeStyle} />
            ) : (
                <FavoriteBorderIcon onClick={onLike} style={likeStyle} />
            )}
            <h3 style={{ ...props.textTheme, fontSize: "20px" }} onClick={() => setOpenLikers(props.isList && true)}>
                {numLikes} likes
            </h3>

            <UserListDialog
                handleClose={() => setOpenLikers(false)}
                open={openLikers}
                title="Liked By"
                type={UserPreviewTypes.likersList}
                name={props.id}
            />
        </div>
    );
};

// rank: number
// itemName: string
// textTheme: object
export const RankItemPreview = (props) => {
    return (
        <div className="row" style={{ alignItems: "center", width: "100%", flexWrap: "nowrap" }}>
            <Avatar
                style={{ height: "50px", width: "50px", backgroundColor: appThemeConstants.lavender, margin: "12px" }}
            >
                <h3 style={{ fontFamily: appThemeConstants.fontFamily, color: "white", fontSize: "26px" }}>
                    {props.rank}
                </h3>
            </Avatar>
            <h3
                style={{
                    ...props.textTheme,
                    margin: "0px",
                    marginLeft: "2px",
                    fontSize: "28px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {props.itemName}
            </h3>
        </div>
    );
};

// name: string
// profPic: string
// timeStamp: number
// isDark: bool
export const CardHeader = (props) => {
    const history = useHistory();
    const secondTextTheme = {
        color: props.isDark ? "white" : "#666666",
        fontFamily: appThemeConstants.fontFamily,
    };
    return (
        <div className="row" style={{ justifyContent: "space-between" }}>
            <div
                className="row"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/main/profile/" + props.name)}
            >
                <Avatar src={props.profPic} style={{ height: "50px", width: "50px", marginRight: "12px" }}>
                    <AccountCircleIcon style={{ height: "100%", width: "100%" }} />
                </Avatar>
                <h3 style={secondTextTheme}>{props.name}</h3>
            </div>
            <h3 style={{ ...secondTextTheme, marginRight: "4px" }}>{tsToDelta(props.timeStamp)}</h3>
        </div>
    );
};

//rankedList: object
export const RankedListCard = (props) => {
    const currentTheme = useTheme();
    const cardStyle = getCardStyle(currentTheme);
    const textTheme = getTextTheme(currentTheme);
    const mainUser = useContext(UserContext);

    if (!mainUser.user) {
        resetUserContext(mainUser);
        return <ReactLoading type="bars" color={appThemeConstants.hanPurple} />;
    }

    return (
        <Card
            style={{
                ...cardStyle,
                width: "400px",
                maxWidth: "98%",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
                marginBottom: "18px",
            }}
        >
            <div className="col" style={{ width: "100%" }}>
                <CardHeader
                    name={props.rankedList["user_name"]}
                    profPic={props.rankedList["prof_pic"]}
                    timeStamp={props.rankedList["date_created"]["$date"]}
                    isDark={currentTheme.palette.type === "dark"}
                />
                <h2 style={{ ...textTheme, marginTop: "0px" }}>{props.rankedList["title"]}</h2>
                <img
                    style={{ borderRadius: "15px", width: "375px", maxWidth: "98%", alignSelf: "center" }}
                    src={props.rankedList["picture"]}
                />
                {props.rankedList["rank_list"].map((rItem) => (
                    <RankItemPreview
                        textTheme={textTheme}
                        rank={rItem.rank}
                        itemName={rItem["item_name"]}
                        key={`rank_${rItem.rank}`}
                    />
                ))}
                <h4
                    style={{
                        ...textTheme,
                        margin: "0px",
                        textDecoration: "underline",
                        cursor: "pointer",
                        display: props.rankedList["num_rank_items"] <= 3 ? "none" : "inline",
                    }}
                >
                    View {props.rankedList["num_rank_items"] - props.rankedList["rank_list"].length} more items
                </h4>
                <LikeBar
                    isList={true}
                    numLikes={props.rankedList["num_likes"]}
                    textTheme={textTheme}
                    id={props.rankedList["_id"]}
                    isLiked={containsId(mainUser.user["liked_lists"], props.rankedList["_id"])}
                    mainUser={mainUser}
                />
                {props.rankedList["num_comments"] >= 1 ? (
                    <CommentPreview
                        commentPreview={{
                            ...props.rankedList["comment_preview"],
                            num_comments: props.rankedList["num_comments"],
                        }}
                        isDark={currentTheme.palette.type === "dark"}
                        textTheme={textTheme}
                        cardStyle={{
                            ...cardStyle,
                            margin: "0px",
                            marginBottom: "10px",
                            width: "100%",
                            paddingTop: "8px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            backgroundColor:
                                currentTheme.palette.type === "dark"
                                    ? appThemeConstants.hanPurple
                                    : appThemeConstants.palePurple,
                        }}
                    />
                ) : (
                    <i style={{ display: "none" }} />
                )}
            </div>
        </Card>
    );
};
