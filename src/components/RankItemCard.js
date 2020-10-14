import { Card } from "@material-ui/core";
import React from "react";

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
            }}
        >
            <div className="col" style={{ alignItems: "center", width: "100%" }}>
                <img
                    style={{ borderRadius: "15px", width: "375px", maxWidth: "98%", alignSelf: "center" }}
                    src={props.rankItem.picture}
                />
                <h3 style={props.textTheme}>{props.rankItem.description}</h3>
            </div>
        </Card>
    );
};
