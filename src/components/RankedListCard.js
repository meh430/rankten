import React, { useState } from "react";
import { Avatar, Card, useTheme } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";

import "../App.css";

// textTheme: object
export const LikeBar = (props) => {
    const [liked, setLiked] = useState(false); //get from props?

    const onLike = () => setLiked(!liked);

    const likeStyle = { color: "red", height: "40px", width: "40px" };

    return (
        <div
            className="row"
            style={{
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
            <h3 style={props.textTheme}>{5} likes</h3>
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
                style={{ height: "65px", width: "65px", backgroundColor: appThemeConstants.lavender, margin: "12px" }}
            >
                <h3 style={{ fontFamily: appThemeConstants.fontFamily, color: "white", fontSize: "32px" }}>
                    {props.rank}
                </h3>
            </Avatar>
            <h3
                style={{
                    ...props.textTheme,
                    margin: "0px",
                    fontSize: "30px",
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
// textTheme: object
export const CardHeader = (props) => {
    return (
        <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="row">
                <Avatar style={{ height: "50px", width: "50px", marginRight: "12px" }}>
                    <AccountCircleIcon style={{ height: "100%", width: "100%" }} />
                </Avatar>
                <h3 style={props.textTheme}>meh4life</h3>
            </div>
            <h3 style={{ ...props.textTheme, marginRight: "4px" }}>2h ago</h3>
        </div>
    );
};

export const RankedListCard = (props) => {
    const currentTheme = useTheme();
    const cardStyle = getCardStyle(currentTheme);
    const textTheme = getTextTheme(currentTheme);
    return (
        <Card
            style={{
                ...cardStyle,
                width: "400px",
                maxWidth: "98%",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
            }}
        >
            <div className="col" style={{ width: "100%" }}>
                <CardHeader
                    textTheme={{
                        color: currentTheme.palette.type === "dark" ? "white" : "#666666",
                        fontFamily: appThemeConstants.fontFamily,
                    }}
                />
                <h2 style={{ ...textTheme, marginTop: "0px" }}>Kid's Shows</h2>
                <img
                    style={{ borderRadius: "15px", width: "375px", maxWidth: "98%", alignSelf: "center" }}
                    src="https://image.winudf.com/v2/image/Y29tLmJsYWNra29waS5iYWt1Z2FuYmF0dGxlYnJ3YWxlcnNfc2NyZWVuXzRfMTUzMTIxNzAyNl8wNDE/screen-4.jpg?fakeurl=1&type=.jpg"
                />
                {[
                    {
                        rank: "1",
                        item_name: "Bakugan",
                    },
                    {
                        rank: "2",
                        item_name: "Pokemon",
                    },
                    {
                        rank: "3",
                        item_name: "Some other show",
                    },
                ].map((rItem) => (
                    <RankItemPreview
                        textTheme={textTheme}
                        rank={rItem.rank}
                        itemName={rItem["item_name"]}
                        key={`rank_${rItem.rank}`}
                    />
                ))}
                <LikeBar textTheme={textTheme} />
            </div>
        </Card>
    );
};
