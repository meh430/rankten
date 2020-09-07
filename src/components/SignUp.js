import { Card, CardContent, useTheme, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { namePattern, passwordPattern, PasswordField, NameField, AltAuth, AuthSubmit, fieldTheme } from "./Login";
import { signupUser } from "../api/Auth";
import {appThemeConstants} from '../misc/AppTheme'
import "../App.css";
let userName = "";
let password = "";
let bio = "";

//setAuthFail: callback
//setLogin: callback
export const SignUp = (props) => {
    const currentTheme = useTheme();

    const textTheme = {
        fontFamily: appThemeConstants.fontFamily,
        color: currentTheme.palette.secondary.dark,
    };

    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [bioError, setBioError] = useState(false);
    const [successfulLogin, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

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
                props.setAuthFail(prevState => ({ message: "Username already exists", failed: true }));
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
                <NameField error={nameError} onChange={(event) => (userName = event.target.value)} />
                <PasswordField error={passwordError} onChange={(event) => (password = event.target.value)} />
                <TextField
                    style={fieldTheme}
                    label="Bio"
                    multiline
                    rows={4}
                    id="bio-field"
                    variant="outlined"
                    error={bioError}
                    helperText={bioError ? "Bio cannot be empty" : ""}
                    onChange={(event) => (bio = event.target.value)}
                />

                <AuthSubmit loading={loading} isLogin={false} onClick={() => submitSignup()} />
                <AltAuth textTheme={textTheme} isLogin={false} onClick={() => props.setLogin(true)}/>
            </CardContent>
            </Card>
    );
};
