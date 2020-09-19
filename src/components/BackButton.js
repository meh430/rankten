import React from "react";

//color: string
//onClick: callback
export const BackButton = (props) => {
    return (
        <i
            class="fas fa-arrow-left"
            onClick={props.onClick}
            style={{
                fontSize: "26px",
                marginLeft: "20px",
                color: props.color,
                cursor: "pointer",
            }}
        />
    );
};
