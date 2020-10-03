import React from 'react';
import { Avatar, Card, useTheme } from '@material-ui/core';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import '../App.css';
import { appThemeConstants, getCardStyle } from '../misc/AppTheme';

// name: string
// profPic: string
// timeStamp: number
// textTheme: object
export const CardHeader = props => {
    return (
        <div className="row" style={{justifyContent: "space-between"}}>
            <div className="row">
                <Avatar style={{height: "50px", width: "50px", marginRight: "12px"}}>
                    <AccountCircleIcon style={{ height: "100%", width: "100%" }}/>
                </Avatar>
                <h3 style={props.textTheme}>meh4life</h3>
            </div>
            <h3 style={{ ...props.textTheme, marginRight: "4px" }}>2h ago</h3>
        </div>
    );
}

export const RankedListCard = props => {
    const currentTheme = useTheme();
    const cardStyle = getCardStyle(currentTheme);
    return (
        <Card style={{...cardStyle, width: "400px", padding: "10px"}}>
            <div className="col">
                <CardHeader textTheme={{color: currentTheme.palette.type === "dark" ? "white" : "#666666", fontFamily: appThemeConstants.fontFamily}}/>
            </div>
        </Card>
    )
}