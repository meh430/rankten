import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Card, useTheme } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ReactLoading from "react-loading";

import { resetUserContext, UserContext } from "../Contexts";
import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { tsToDelta } from "../misc/Utils";
import { UserListDialog } from "./UserListDialog";
import { UserPreviewTypes } from "../api/UserPreviewRepo";
import { likeList } from "../api/UserRepo";
import { UserReducerTypes } from "../reducers/UserReducer";
import { RankedListView } from "./RankedListView";
import { CommentsDialog } from "./CommentsDialog";
import { RankedListEdit } from "./RankedListEdit";
import { deleteRankedList, updateRankedList } from "../api/RankedListRepo";
import { LoadingDialog } from "./LoadingDialog";
import "../App.css";
import { closeErrorSB, ErrorSnack } from "./ErrorSnack";

// commentPreview: object
// cardTheme: object
// theme: object
// onClick: callback
export const CommentPreview = (props) => {
    return (
        <Card style={props.cardStyle}>
            <div className="col">
                <CardHeader
                    isDark={props.isDark}
                    userId={props.commentPreview.userId}
                    name={props.commentPreview.username}
                    profPic={props.commentPreview.profilePic}
                    timeStamp={props.commentPreview.dateCreated}
                />
                <h3 style={{ ...props.textTheme, margin: "4px" }}>{props.commentPreview.comment}</h3>
                <h4
                    onClick={props.onClick}
                    style={{
                        ...props.textTheme,
                        margin: "4px",
                        textDecoration: "underline",
                        cursor: "pointer",
                        display: props.commentPreview.numComments <= 1 ? "none" : "inline",
                    }}
                >
                    View all {props.commentPreview.numComments} comments
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
// numComments: number
export const CardLikeBar = (props) => {
    const [loading, setLoading] = useState(false);
    const [openLikers, setOpenLikers] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [liked, setLiked] = useState(props.isLiked);
    const [numLikes, setNumLikes] = useState(props.numLikes);
    const [apiError, setApiError] = useState(false);

    const onLike = async () => {
        setLoading(true);
        const [e, res] = await likeList(props.id, props.mainUser.userToken);
        setApiError(e);
        if (e) {
            setLoading(false);
            return;
        } else {
            if (liked) {
                setNumLikes(numLikes - 1);
            } else {
                setNumLikes(numLikes + 1);
            }
            setLiked(res == "LIKED");
            props.mainUser.userDispatch({
                type: UserReducerTypes.likeListAction,
                payload: { hasLiked: res == "LIKED", targetId: props.id },
            });

            setLoading(false);
        }
    };

    const likeStyle = { color: "red", height: "45px", width: "45px", marginRight: "6px" };

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
            <div className="row" style={{ alignItems: "center" }}>
                {liked ? (
                    <FavoriteIcon onClick={onLike} style={likeStyle} />
                ) : (
                    <FavoriteBorderIcon onClick={onLike} style={likeStyle} />
                )}
                <h3 style={{ ...props.textTheme, fontSize: "20px" }} onClick={() => setOpenLikers(true)}>
                    {numLikes} {numLikes == 1 ? "like" : "likes"}
                </h3>
            </div>

            <div className="row" style={{ alignItems: "center" }} onClick={() => setOpenComments(true)}>
                <CommentIcon style={{ height: "25x", width: "25px", marginRight: "6px" }} />
                <h3 style={{ ...props.textTheme, fontSize: "20px" }}>
                    {props.numComments} {props.numComments == 1 ? "comment" : "comments"}
                </h3>
            </div>

            <UserListDialog
                handleClose={() => setOpenLikers(false)}
                open={openLikers}
                title="Liked By"
                type={UserPreviewTypes.likersList}
                name={props.id}
            />

            <CommentsDialog
                open={openComments}
                handleClose={() => setOpenComments(false)}
                mainUser={props.mainUser}
                listId={props.id}
                userComments={false}
            />
            <ErrorSnack
                open={apiError}
                handleClose={(event, reason) => closeErrorSB(event, reason, setApiError)}
                message="Error Liking"
            />
        </div>
    );
};

// ranking: number
// itemName: string
// textTheme: object
export const RankItemPreview = (props) => {
    return (
        <div className="row" style={{ alignItems: "center", width: "100%", flexWrap: "nowrap" }}>
            <Avatar
                style={{ height: "50px", width: "50px", backgroundColor: appThemeConstants.lavender, margin: "12px" }}
            >
                <h3 style={{ fontFamily: appThemeConstants.fontFamily, color: "white", fontSize: "26px" }}>
                    {props.ranking}
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
// userId: number
// profPic: string
// timeStamp: number
// isDark: bool
// full: bool
export const CardHeader = (props) => {
    const history = useHistory();
    const secondTextTheme = {
        color: props.isDark ? "white" : "#666666",
        fontFamily: appThemeConstants.fontFamily,
    };
    return (
        <div
            className="row"
            style={
                props.full
                    ? {
                          justifyContent: "space-between",
                          width: "100%",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          marginBottom: "4px",
                      }
                    : { justifyContent: "space-between" }
            }
        >
            <div
                className="row"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/main/profile/" + props.userId)}
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

// rankedList: object
// onUpdate: callback
export const RankedListCard = (props) => {
    const currentTheme = useTheme();
    const cardStyle = getCardStyle(currentTheme);
    const textTheme = getTextTheme(currentTheme);
    const mainUser = useContext(UserContext);

    const [edited, setEdited] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [savedList, setSavedList] = useState(null);

    const deleteList = async () => {
        setOpenEdit(false);
        return await deleteRankedList(props.rankedList.listId, mainUser.userToken);
    };

    const editList = async () => {
        console.log(savedList);
        if (savedList && savedList.rankItems.length >= 1) {
            return await updateRankedList(savedList, props.rankedList.listId, mainUser.userToken);
        } else {
            return [false, {}];
        }
    };

    const onOpen = () => setOpenList(true);

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
                    name={props.rankedList.username}
                    userId={props.rankedList.userId}
                    profPic={props.rankedList.profilePic}
                    timeStamp={props.rankedList.dateCreated}
                    isDark={currentTheme.palette.type === "dark"}
                />
                <h2 style={{ ...textTheme, marginTop: "0px", cursor: "pointer" }} onClick={onOpen}>
                    {props.rankedList.title}
                </h2>
                <img
                    style={{ borderRadius: "15px", width: "375px", maxWidth: "98%", alignSelf: "center" }}
                    src={props.rankedList.picture}
                />
                {props.rankedList.rankItems.map((rItem) => (
                    <RankItemPreview
                        textTheme={textTheme}
                        ranking={rItem.ranking}
                        itemName={rItem.itemName}
                        key={`rank_${rItem.ranking}`}
                    />
                ))}
                <h4
                    onClick={onOpen}
                    style={{
                        ...textTheme,
                        margin: "0px",
                        textDecoration: "underline",
                        cursor: "pointer",
                        display: props.rankedList.numItems <= 3 ? "none" : "inline",
                    }}
                >
                    View {props.rankedList.numItems - props.rankedList.rankItems.length} more items
                </h4>

                <CardLikeBar
                    numComments={props.rankedList.numComments}
                    numLikes={props.rankedList.numLikes}
                    textTheme={textTheme}
                    id={props.rankedList.listId}
                    isLiked={mainUser.user.likedLists.includes(props.rankedList.listId)}
                    mainUser={mainUser}
                />

                {props.rankedList["num_comments"] >= 1 ? (
                    <CommentPreview
                        onClick={() => setOpenComments(true)}
                        commentPreview={{
                            ...props.rankedList.commentPreview,
                            numComments: props.rankedList.numComments,
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

                <RankedListView
                    open={openList}
                    listId={props.rankedList.listId}
                    onClose={() => setOpenList(false)}
                    mainUser={mainUser}
                    name={props.rankedList.username}
                    profPic={props.rankedList.profilePic}
                    onEdit={() => {
                        setOpenList(false);
                        setOpenEdit(true);
                    }}
                />
                <RankedListEdit
                    open={openEdit}
                    listId={props.rankedList.listId}
                    onClose={() => setOpenEdit(false)}
                    onDelete={() => setDeleted(true)}
                    onSave={(rankedList) => {
                        setSavedList(rankedList);
                        setEdited(true);
                        setDeleted(false);
                    }}
                    mainUser={mainUser}
                    isNew={false}
                />
                <LoadingDialog
                    open={(edited || deleted) && !(edited && deleted)}
                    asyncTask={edited ? editList : deleteList}
                    onClose={() => {
                        if (edited) {
                            setEdited(false);
                        } else if (deleted) {
                            setDeleted(false);
                        }

                        props.onUpdate();
                    }}
                    errorMessage={"Unable to " + (edited ? "edit" : deleted ? "delete" : "") + " list"}
                    successMessage={(edited ? "Edited" : deleted ? "Deleted" : "") + " list!"}
                />
                <CommentsDialog
                    open={openComments}
                    handleClose={() => setOpenComments(false)}
                    mainUser={mainUser}
                    listId={props.rankedList.listId}
                    userComments={false}
                />
            </div>
        </Card>
    );
};
