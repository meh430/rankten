import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

//color: string
//onClick: callback
export const BackButton = (props) => {
    return (
        <ArrowBackIcon
            onClick={props.onClick}
            style={{
                fontSize: "26px",
                marginLeft: "10px",
                color: props.color,
                cursor: "pointer",
            }}
        />
    );
};
