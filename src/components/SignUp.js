import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, useTheme, TextField } from "@material-ui/core";

import { namePattern, passwordPattern, PasswordField, NameField, AltAuth, AuthSubmit, fieldTheme } from "./Login";
import { signupUser } from "../api/Auth";
import { UserContext } from "../Contexts";
import { UserReducerTypes } from "../reducers/UserReducer";
import { getCardStyle, getTextTheme } from "../misc/AppTheme";
import "../App.css";

let userName = "";
let password = "";
let bio = "";

//onChange: callback
//onEnter: callback
//error: bool
//default: string
export const BioField = (props) => {
    return (
        <TextField
            defaultValue={props.default}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    props.onEnter();
                    event.preventDefault();
                }
            }}
            style={fieldTheme}
            label="Bio"
            multiline
            rows={4}
            id="bio-field"
            variant="outlined"
            error={props.error}
            helperText={props.error ? "Bio cannot be empty" : ""}
            onChange={props.onChange}
        />
    );
};

//setAuthFail: callback
//setLogin: callback
export const SignUp = (props) => {
    const currentTheme = useTheme();

    const textTheme = getTextTheme(currentTheme);

    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [bioError, setBioError] = useState(false);
    const [successfulLogin, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { userDispatch, setUserToken } = useContext(UserContext);

    const submitSignup = async () => {
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
            const [hasError, userInfo] = await signupUser(userName, password, bio);

            if (hasError) {
                setSuccess(false);
                props.setAuthFail((prevState) => ({ message: "Username already exists", failed: true }));
                setLoading(false);
                return;
            } else {
                userDispatch({ type: UserReducerTypes.getUserAction, payload: { user: userInfo } });
                setUserToken(userInfo.jwtToken);
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
                ...getCardStyle(currentTheme),
                width: "500px",
                maxWidth: "90%",
            }}
        >
            <CardContent className="col" style={{ alignItems: "center", paddingBottom: "2px" }}>
                <h1 style={textTheme}>Sign Up</h1>
                <NameField
                    error={nameError}
                    onChange={(event) => (userName = event.target.value)}
                    onEnter={submitSignup}
                />
                <PasswordField
                    error={passwordError}
                    onChange={(event) => (password = event.target.value)}
                    onEnter={submitSignup}
                />
                <BioField onEnter={submitSignup} onChange={(event) => (bio = event.target.value)} error={bioError} />
                <AuthSubmit loading={loading} isLogin={false} onClick={() => submitSignup()} />
                <AltAuth textTheme={textTheme} isLogin={false} onClick={() => props.setLogin(true)} />
            </CardContent>
        </Card>
    );
};
