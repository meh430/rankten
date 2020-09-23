import React from "react";

//color: string
//onClick: callback
export const BackButton = (props) => {
    return (
        <i
            className="fas fa-arrow-left"
            onClick={props.onClick}
            style={{
                fontSize: "24px",
                marginLeft: "20px",
                color: props.color,
                cursor: "pointer",
            }}
        />
    );
};
