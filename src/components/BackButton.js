import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//color: string
//onClick: callback
export const BackButton = (props) => {
    return (
        <FontAwesomeIcon
            icon="arrow-left"
            onClick={props.onClick}
            style={{
                fontSize: "26px",
                marginLeft: "20px",
                color: props.color,
                cursor: "pointer",
                position: "absolute",
                left: "0",
            }}
        />
    );
};
