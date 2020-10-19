import React, { useState } from "react";
import { Card, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { CardHeader, LikeBar } from "./RankedListCard";
import { containsId } from "../misc/Utils";
import "../App.css";

// comment: object
// mainUser: object
// cardTheme: object
// textTheme: object
// isDark: bool
// toList: bool
export const CommentCard = (props) => {
    const { comment } = props;
    const [anchorEl, setAnchorEl] = useState(null);

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
                            <MenuItem onClick={() => setAnchorEl(null)}>Edit</MenuItem>
                            <MenuItem onClick={() => setAnchorEl(null)}>Delete</MenuItem>
                            {props.toList ? (
                                <MenuItem onClick={() => setAnchorEl(null)}>To List</MenuItem>
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

                <h3 style={{ ...props.textTheme, marginLeft: "10px", marginRight: "10px", marginBottom: "0px" }}>
                    {comment.comment}
                </h3>
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
