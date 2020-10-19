import React, { useState } from "react";
import { Card, Menu, MenuItem, TextField } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { CardHeader, LikeBar } from "./RankedListCard";
import { containsId } from "../misc/Utils";
import "../App.css";
import { createComment, deleteComment, getCommentParent } from "../api/CommentRepo";
import { fieldTheme } from "./Login";
import { getRankedList } from "../api/RankedListRepo";

let commentEdit = "";

// comment: object
// mainUser: object
// cardTheme: object
// textTheme: object
// isDark: bool
// toList: bool
// onListNav: callback
export const CommentCard = (props) => {
    const { comment } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [editing, setEditing] = useState(false);
    const [commentError, setCommentError] = useState(false);

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
                                    (async () => {
                                        await deleteComment(comment["_id"]["$oid"], props.mainUser.userToken);
                                    })();
                                }}
                            >
                                Delete
                            </MenuItem>
                            {props.toList ? (
                                <MenuItem onClick={() => {
                                    (async () => {
                                        const [e, rList] = (await getCommentParent(comment["_id"]["$oid"]));
                                        if (!e) {
                                            
                                            props.onListNav(rList["_id"]["$oid"], rList["prof_pic"], rList["user_name"]);

                                        }
                                    })();
                                    setAnchorEl(null);
                                }}>To List</MenuItem>
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
                <LikeBar
                    id={comment["_id"]}
                    mainUser={props.mainUser}
                    textTheme={props.textTheme}
                    numLikes={comment["num_likes"]}
                    isList={false}
                    isLiked={containsId(comment["liked_users"], props.mainUser.user["_id"]["$oid"])}
                />
            </div>
        </Card>
    );
};
