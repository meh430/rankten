import React, { useState } from "react";
import { Card, Menu, MenuItem, TextField } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReactLoading from "react-loading";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { CardHeader } from "./RankedListCard";
import { createComment, deleteComment, likeComment } from "../api/CommentRepo";
import { fieldTheme } from "./Login";
import { appThemeConstants } from "../misc/AppTheme";
import { LoadingDialog } from "./LoadingDialog";
import { likeRes } from "../api/UserRepo";
import { closeErrorSB, ErrorSnack } from "./ErrorSnack";
import { getRankedList } from "../api/RankedListRepo";
import { UserReducerTypes } from "../reducers/UserReducer";
import "../App.css";

let commentEdit = "";

// id: string
// mainUser: object
// textTheme: object
// numLikes: number
// isLiked: bool
const CommentLikeBar = (props) => {
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(props.isLiked);
    const [numLikes, setNumLikes] = useState(props.numLikes);
    const [apiError, setApiError] = useState(false);

    const onLike = async () => {
        setLoading(true);
        const [e, res] = await likeComment(props.id, props.mainUser.userToken);
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

            setLiked(res === likeRes.liked);

            props.mainUser.userDispatch({
                type: UserReducerTypes.likeCommentAction,
                payload: { hasLiked: res === likeRes.liked, targetId: props.id },
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
            <h3 style={{ ...props.textTheme, fontSize: "20px" }}>{numLikes} likes</h3>
            <ErrorSnack
                handleClose={(event, reason) => closeErrorSB(event, reason, setApiError)}
                open={apiError}
                message="Error Liking Comment"
            />
        </div>
    );
};

// comment: object
// mainUser: object
// cardTheme: object
// textTheme: object
// isDark: bool
// toList: bool
// onListNav: callback
// onUpdate: callback
export const CommentCard = (props) => {
    const { comment } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [editing, setEditing] = useState(false);
    const [commentError, setCommentError] = useState(false);

    const [submitEdit, setSubmitEdit] = useState(false);
    const [deletedComment, setDeletedComment] = useState(false);

    const delComment = async () => {
        return await deleteComment(comment.commentId, props.mainUser.userToken);
    };

    const editComment = async () => {
        return await createComment(comment.commentId, commentEdit, props.mainUser.userToken, true);
    };
    return (
        <Card style={{ ...props.cardTheme, width: "400px", marginTop: "0px", marginBottom: "8px", maxWidth: "94%" }}>
            <div
                className="col"
                style={{ width: "100%", paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px" }}
            >
                {props.mainUser.user.userId === comment.userId ? (
                    <div
                        className="row"
                        style={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}
                    >
                        <div style={{ width: "93%" }}>
                            <CardHeader
                                name={comment.userName}
                                userId={comment.userId}
                                profPic={comment.profilePic}
                                timeStamp={comment.dateCreated}
                                isDark={props.isDark}
                            />
                        </div>

                        <MoreVertIcon
                            style={{ padding: "0px", margin: "0px", fontSize: "20px", cursor: "pointer" }}
                            onClick={(event) => setAnchorEl(event.target)}
                        />
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    setEditing(true);
                                }}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    setDeletedComment(true);
                                }}
                            >
                                Delete
                            </MenuItem>
                            {props.toList ? (
                                <MenuItem
                                    onClick={() => {
                                        (async () => {
                                            const [e, rList] = await getRankedList(comment.listId);
                                            if (!e) {
                                                props.onListNav(rList.listId, rList.profilePic, rList.username);
                                            }
                                        })();
                                        setAnchorEl(null);
                                    }}
                                >
                                    To List
                                </MenuItem>
                            ) : (
                                <i style={{ display: "none" }} />
                            )}
                        </Menu>
                    </div>
                ) : (
                    <CardHeader
                        name={comment.username}
                        userId={comment.userId}
                        profPic={comment.profilePic}
                        timeStamp={comment.dateCreated}
                        isDark={props.isDark}
                    />
                )}

                {editing ? (
                    <TextField
                        defaultValue={comment.comment}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                if (!commentEdit) {
                                    setCommentError(true);
                                    return;
                                }

                                setEditing(false);
                                setSubmitEdit(true);
                                event.preventDefault();
                            }
                        }}
                        style={fieldTheme}
                        label="Comment"
                        multiline
                        id="comment-field"
                        variant="outlined"
                        error={commentError}
                        helperText={commentError ? "Comment cannot be empty" : ""}
                        onChange={(event) => {
                            commentEdit = event.target.value;
                            setCommentError(false);
                        }}
                    />
                ) : (
                    <h3 style={{ ...props.textTheme, marginLeft: "10px", marginRight: "10px", marginBottom: "0px" }}>
                        {comment.comment}
                    </h3>
                )}
                <CommentLikeBar
                    id={comment.commentId}
                    mainUser={props.mainUser}
                    textTheme={props.textTheme}
                    numLikes={comment.numLikes}
                    isList={false}
                    isLiked={props.mainUser.user.likedComments.includes(comment.commentId)}
                />

                <LoadingDialog
                    open={(submitEdit || deletedComment) && !(submitEdit && deletedComment)}
                    asyncTask={submitEdit ? editComment : delComment}
                    onClose={() => {
                        if (submitEdit) {
                            setSubmitEdit(false);
                        } else if (deleteComment) {
                            setDeletedComment(false);
                        }

                        props.onUpdate();
                    }}
                    errorMessage={"Failed to " + (submitEdit ? "edit" : "delete") + " comment"}
                    successMessage={(submitEdit ? "Edited" : "Deleted") + " comment"}
                />
            </div>
        </Card>
    );
};
