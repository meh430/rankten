import { Button, Card, CardContent, useTheme, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { namePattern, passwordPattern } from "./Login";
import { appThemeConstants } from "../misc/AppTheme";
import { signupUser } from "../api/Auth";
import ReactLoading from 'react-loading';
import "../App.css";
let userName = "";
let password = "";
let bio = "";
export const SignUp = (props) => {
    const currentTheme = useTheme();
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [bioError, setBioError] = useState(false);
    const [successfulLogin, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const submitSignup = async() => {
        setLoading(true);
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

        if (!bio || bio === "") {
            error = true;
            setBioError(true);
            setSuccess(false);
        } else {
            setBioError(false);
        }

        if (!error) {
            //make api call to login. If has error, show snackbar, else push main route
            const [hasError, userInfo] = await signupUser(userName, password);
            
            if (hasError) {
                setSuccess(false);
                props.onAuthFail(prevState => ({ message: "Username already exists", failed: true }));
                setLoading(false);
                return;
            } else {
                console.log("SUCCESS");
                setSuccess(true);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    if (!passwordError && !nameError && !bioError && successfulLogin) {
        return <Redirect to="/main" />;
    }

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

                <TextField
                    error={nameError}
                    helperText={nameError ? "Name can only have 3-15 characters" : ""}
                    style={fieldTheme}
                    id="outlined-basic"
                    label="User Name"
                    variant="outlined"
                    onChange={(event) => (userName = event.target.value)}
                />

                <TextField
                    error={passwordError}
                    helperText={
                        passwordError ? "Password needs a number, an uppercase letter, and a special character" : ""
                    }
                    style={fieldTheme}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={(event) => (password = event.target.value)}
                />

                <TextField
                    style={fieldTheme}
                    label="Bio"
                    multiline
                    rows={4}
                    variant="outlined"
                    error={bioError}
                    helperText={bioError ? "Bio cannot be empty" : ""}
                    onChange={(event) => (bio = event.target.value)}
                />

                {loading ? <ReactLoading type='bubbles' color={appThemeConstants.hanPurple}/> :
                    <Button
                    onClick={() => submitSignup()}
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
                </Button>}

                <h4 style={textTheme}>
                    Have an account?{" "}
                    <Link to="/login" style={{ color: currentTheme.palette.secondary.dark }}>
                        Log in
                    </Link>
                </h4>
            </CardContent>
            </Card>
    );
};
