import React from "react";
import { Button } from "@material-ui/core";

import { appThemeConstants } from "../misc/AppTheme";

// label: string
// width: string
// maxWidth: string
// onClick: callback
// disabled: bool
export const ActionButton = (props) => {
    const { maxWidth } = props;
    return (
        <Button
            onClick={props.onClick}
            variant="contained"
            disabled={props.disabled}
            style={{
                maxWidth: maxWidth ? maxWidth : "75%",
                width: props.width,
                marginTop: "15px",
                marginBottom: "15px",
                color: "#ffffff",
                backgroundColor: props.color ? props.color : appThemeConstants.hanPurple,
            }}
        >
            {props.label}
        </Button>
    );
};
