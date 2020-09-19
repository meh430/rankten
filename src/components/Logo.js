import React from "react";

//width: string
export const Logo = (props) => {
    return (
        <img
            src={require("../assets/ranktenlogo.png")}
            alt="Rank Ten logo"
            style={{ maxWidth: "80%", alignSelf: "center", paddingTop: "10px" }}
            width={`${props.width}px`}
        />
    );
};
