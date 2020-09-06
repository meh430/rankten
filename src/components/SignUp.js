import { Button, Card, CardContent, useTheme, TextField } from "@material-ui/core";
import React from "react";
import { appThemeConstants } from "../misc/AppTheme";
import "../App.css";
export const SignUp = () => {
    const currentTheme = useTheme();
    const fieldTheme = {
        color: appThemeConstants.lavender,
        width: "90%",
        borderRadius: "15px",
        margin: "10px",
    };

    const textTheme = {
        fontFamily: appThemeConstants.fontFamily,
        color: currentTheme.palette.secondary.dark,
    };
    return (
        <Card
            style={{
                margin: "10px",
                alignSelf: "center",
                boxShadow: currentTheme.shadows[4],
                width: "500px",
                maxWidth: "90%",
                borderRadius: "10px",
            }}
        >
            <CardContent className="col" style={{ alignItems: "center", paddingBottom: "2px" }}>
                <h1 style={textTheme}>Sign Up</h1>

                <TextField style={fieldTheme} id="outlined-basic" label="Username" variant="outlined" />

                <TextField
                    style={fieldTheme}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />

                <TextField
                    style={fieldTheme}
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="outlined"
                />

                <Button
                    variant="contained"
                    style={{
                        width: "70%",
                        marginTop: "20px",
                        marginBottom: "0px",
                        color: "#ffffff",
                        backgroundColor: appThemeConstants.hanPurple,
                    }}
                >
                    Sign Up
                </Button>

                <h4 style={textTheme}>Have an account? Sign in</h4>
            </CardContent>
        </Card>
    );
};
