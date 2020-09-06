import { Button, Card, CardContent, useTheme, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { appThemeConstants } from "../misc/AppTheme";
import "../App.css";

export const namePattern = new RegExp("^[a-z0-9_-]{3,15}$");
export const passwordPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");
let userName = "";
let password = "";
export const Login = () => {
    const currentTheme = useTheme();
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [successfulLogin, setSuccess] = useState(false);
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

    const submitLogin = () => {
        let error = false;
        console.log(userName);
        if (!userName.match(namePattern)) {
            error = true;
            setNameError(true);
            setSuccess(false);
        } else {
            setNameError(false);
        }

        if (!password.match(passwordPattern)) {
            error = true;
            setPasswordError(true);
            setSuccess(false);
        } else {
            setPasswordError(false);
        }

        if (!error) {
            //make api call to login. If has error, show snackbar, else push main route
            setSuccess(true);
        }
    };

    if (!passwordError && !nameError && successfulLogin) {
        return <Redirect to="/main" />;
    }

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
            <CardContent className="col" style={{ alignItems: "center", paddingBottom: "2px" }}>
                <h1 style={textTheme}>Log In</h1>
                <TextField
                    error={nameError}
                    helperText={nameError ? "Name can only have 3-15 characters" : ""}
                    style={fieldTheme}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={(event) => (userName = event.target.value)}
                />

                <TextField
                    error={passwordError}
                    helperText={passwordError ? "Password needs a number, an uppercase letter, and a special character" : ""}
                    style={fieldTheme}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={(event) => (password = event.target.value)}
                />

                <Button
                    onClick={() => submitLogin()}
                    variant="contained"
                    style={{
                        width: "70%",
                        marginTop: "15px",
                        marginBottom: "15px",
                        color: "#ffffff",
                        backgroundColor: appThemeConstants.hanPurple,
                    }}
                >
                    Log In
                </Button>

                <h4 style={textTheme}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: currentTheme.palette.secondary.dark }}>
                        Sign up
                    </Link>
                </h4>
            </CardContent>
        </Card>
    );
};
