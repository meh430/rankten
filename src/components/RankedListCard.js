import React from 'react';
import { Avatar, Card, useTheme } from '@material-ui/core';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import '../App.css';
import { appThemeConstants, getCardStyle, getTextTheme } from '../misc/AppTheme';

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
    const textTheme = getTextTheme(currentTheme);
    return (
        <Card style={{...cardStyle, width: "400px", maxWidth: "98%", padding: "10px"}}>
            <div className="col">
                <CardHeader textTheme={{ color: currentTheme.palette.type === "dark" ? "white" : "#666666", fontFamily: appThemeConstants.fontFamily }} />
                <h2 style={{ ...textTheme, marginTop: "0px" }}>Kid's Shows</h2>
                <img style={{borderRadius: "15px", width: "375px", maxWidth: "98%", alignSelf: "center"}}
                    src="https://image.winudf.com/v2/image/Y29tLmJsYWNra29waS5iYWt1Z2FuYmF0dGxlYnJ3YWxlcnNfc2NyZWVuXzRfMTUzMTIxNzAyNl8wNDE/screen-4.jpg?fakeurl=1&type=.jpg" />
            </div>
        </Card>
    )
}