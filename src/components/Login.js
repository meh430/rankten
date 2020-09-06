import { Card, CardContent, useTheme } from "@material-ui/core";
import React from 'react';
import {appThemeConstants} from '../misc/AppTheme'
export const Login = () => {
    const currentTheme = useTheme();
    return (
        <Card style={{ alignSelf: "center", boxShadow: currentTheme.shadows[4], minWidth: "500px", maxWidth: "90%", borderRadius: "30px"}}>
            <CardContent>
                <h1 style={{fontFamily: appThemeConstants.fontFamily, color: currentTheme.palette.secondary.dark}}>Login</h1>
            </CardContent>
        </Card>
    );
}