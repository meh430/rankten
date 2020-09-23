import React from 'react';
import { Button } from '@material-ui/core';

import { appThemeConstants } from '../misc/AppTheme'

//label: string
//width: string
//onClick: callback
export const ActionButton = (props) => {
    return (
        <Button
            onClick={props.onClick}
            variant="contained"
            disabled={props.disabled}
            style={{
                maxWidth: "75%",
                width: props.width,
                marginTop: "15px",
                marginBottom: "15px",
                color: "#ffffff",
                backgroundColor: appThemeConstants.hanPurple,
            }}
        >
            {props.label}
        </Button>
    );
};
