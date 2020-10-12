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
        <Card style={{ ...cardTheme }}>
            <div className="col" style={{ width: "100%" }}>
                <CardHeader
                    name={comment["user_name"]}
                    profPic={comment["prof_pic"]}
                    timeStamp={comment["date_created"]["$date"]}
                    isDark={props.isDark}
                />
                <h3 style={props.textTheme}>{comment.comment}</h3>
                <LikeBar
                    id={comment["_id"]}
                    mainUser={props.mainUser}
                    textTheme={props.textTheme}
                    numLikes={comment["num_likes"]}
                    isList={false}
                    isLiked={containsId(comment["liked_users"], mainUser.user["_id"]["$oid"])}
                />
            </div>
        </Card>
    );
};