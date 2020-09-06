import { Button, Card, CardContent, useTheme, TextField } from "@material-ui/core";
import React from "react";
import { appThemeConstants } from "../misc/AppTheme";
import "../App.css";
export const Login = () => {
    const currentTheme = useTheme();
    const fieldTheme = {
        color: appThemeConstants.lavender,
        width: "90%",
        borderRadius: "15px",
        margin: "10px",
    };
    return (
        <Card
            style={{
                alignSelf: "center",
                boxShadow: currentTheme.shadows[4],
                width: "500px",
                maxWidth: "90%",
                borderRadius: "10px",
            }}
        >
            <CardContent className="col" style={{alignItems: "center"}}>
                <h1 style={{ fontFamily: appThemeConstants.fontFamily, color: currentTheme.palette.secondary.dark }}>
                    Login
                </h1>
                <TextField
                    style={fieldTheme}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
                <TextField style={fieldTheme} id="outlined-basic" label="Outlined" variant="outlined" />

                <Button variant="contained" style={{width: "70%", marginTop: "15px", color: "#ffffff", backgroundColor: appThemeConstants.hanPurple}}>
                    Login
                </Button>
            </CardContent>
        </Card>
    );
};
