import React from "react";
import { Card } from "@material-ui/core";

import { CardHeader, LikeBar } from "./RankedListCard";
import { containsId } from "../misc/Utils";
import "../App.css";

// comment: object
// mainUser: object
// cardTheme: object
// textTheme: object
// isDark: bool
export const CommentCard = (props) => {
    const { comment } = props;
    return (
        <Card style={{ ...props.cardTheme, width: "400px", marginBottom: "2px", maxWidth: "100%" }}>
            <div className="col" style={{ width: "100%", paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
                <CardHeader
                    name={comment["user_name"]}
                    profPic={comment["prof_pic"]}
                    timeStamp={comment["date_created"]["$date"]}
                    isDark={props.isDark}
                />
                <h3 style={{ ...props.textTheme, marginLeft: "10px" , marginRight: "10px", marginBottom: "0px"}}>{comment.comment}</h3>
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