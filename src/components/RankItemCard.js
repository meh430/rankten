import React from "react";
import { Avatar, Card } from "@material-ui/core";

import { appThemeConstants } from "../misc/AppTheme";
import "../App.css";

// rankItem: object
// onClick: callback
// textTheme: object
// cardTheme: object
export const RankItemCard = (props) => {
    return (
        <Card
            style={{
                ...props.cardStyle,
                width: "412px",
                maxWidth: "98%",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
                marginBottom: "8px",
                borderRadius: "15px",
                marginLeft: "8px",
                marginRight: "8px",
            }}
        >
            <div className="col" style={{ alignSelf: "center", alignItems: "center", width: "100%" }}>
                <div
                    className="row"
                    style={{ alignItems: "center", width: "100%", flexWrap: "nowrap", marginBottom: "2px" }}
                >
                    <Avatar
                        style={{
                            height: "40px",
                            width: "40px",
                            backgroundColor: appThemeConstants.lavender,
                            margin: "12px",
                        }}
                    >
                        <h3 style={{ fontFamily: appThemeConstants.fontFamily, color: "white", fontSize: "22px" }}>
                            {props.rankItem.rank}
                        </h3>
                    </Avatar>
                    <h3
                        style={{
                            ...props.textTheme,
                            margin: "0px",
                            marginLeft: "2px",
                            fontSize: "24px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {props.rankItem["item_name"]}
                    </h3>
                </div>
                <img
                    style={{ borderRadius: "15px", width: "375px", maxWidth: "98%", alignSelf: "center" }}
                    src={props.rankItem.picture}
                />
                <h3
                    style={{
                        ...props.textTheme,
                        textAlign: "center",
                        marginTop: props.rankItem.picture ? "8px" : "0px",
                        marginBottom: props.rankItem.description ? "10px" : "6px",
                    }}
                >
                    {props.rankItem.description}
                </h3>
            </div>
        </Card>
    );
};
