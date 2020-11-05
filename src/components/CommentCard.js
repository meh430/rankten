import React, { useState } from "react";
import { Card, Menu, MenuItem, TextField } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReactLoading from "react-loading";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { CardHeader } from "./RankedListCard";
import { containsId } from "../misc/Utils";
import "../App.css";
import { createComment, deleteComment, getCommentParent, likeComment } from "../api/CommentRepo";
import { fieldTheme } from "./Login";
import { getRankedList } from "../api/RankedListRepo";
import { appThemeConstants } from "../misc/AppTheme";
import { LoadingDialog } from "./LoadingDialog";

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

    const onLike = async () => {
        setLoading(true);
        const [e, res] = await likeComment(props.id["$oid"], props.mainUser.userToken);
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
        return await deleteComment(comment["_id"]["$oid"], props.mainUser.userToken);
    };

    return (
        <Card style={{ ...props.cardTheme, width: "400px", marginTop: "0px", marginBottom: "8px", maxWidth: "94%" }}>
            <div
                className="col"
                style={{ width: "100%", paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px" }}
            >
                {props.mainUser.user["user_name"] === comment["user_name"] ? (
                    <div
                        className="row"
                        style={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}
                    >
                        <div style={{ width: "93%" }}>
                            <CardHeader
                                name={comment["user_name"]}
                                profPic={comment["prof_pic"]}
                                timeStamp={comment["date_created"]["$date"]}
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
                                            const [e, rList] = await getCommentParent(comment["_id"]["$oid"]);
                                            if (!e) {
                                                props.onListNav(
                                                    rList["_id"]["$oid"],
                                                    rList["prof_pic"],
                                                    rList["user_name"]
                                                );
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
                        name={comment["user_name"]}
                        profPic={comment["prof_pic"]}
                        timeStamp={comment["date_created"]["$date"]}
                        isDark={props.isDark}
                    />
                )}

                {editing ? (
                    <TextField
                        defaultValue={comment.comment}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                setEditing(false);
                                (async () => {
                                    await createComment(
                                        comment["_id"]["$oid"],
                                        commentEdit,
                                        props.mainUser.userToken,
                                        true
                                    );
                                })();
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
                        onChange={(event) => (commentEdit = event.target.value)}
                    />
                ) : (
                    <h3 style={{ ...props.textTheme, marginLeft: "10px", marginRight: "10px", marginBottom: "0px" }}>
                        {comment.comment}
                    </h3>
                )}
                <CommentLikeBar
                    id={comment["_id"]}
                    mainUser={props.mainUser}
                    textTheme={props.textTheme}
                    numLikes={comment["num_likes"]}
                    isList={false}
                    isLiked={containsId(comment["liked_users"], props.mainUser.user["_id"]["$oid"])}
                />

                <LoadingDialog
                    open={deletedComment}
                    asyncTask={delComment}
                    onClose={() => {
                        setDeletedComment(false);
                        props.onUpdate();
                    }}
                    errorMessage="Failed to delete comment"
                    successMessage="Deleted comment"
                />
            </div>
        </Card>
    );
};
