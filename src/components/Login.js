import { Button, Card, CardContent, useTheme, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../Contexts";
import { appThemeConstants, getCardStyle } from "../misc/AppTheme";
import { loginUser } from "../api/Auth";
import {UserReducerTypes} from "../reducers/UserReducer"
import ReactLoading from "react-loading";
import "../App.css";

export const fieldTheme = {
    color: appThemeConstants.lavender,
    width: "90%",
    borderRadius: "15px",
    margin: "10px",
};

//error: bool
//onChange: callback
export const NameField = (props) => {
    return (
        <TextField
            error={props.error}
            helperText={props.error ? "Name can only have 3-15 characters" : ""}
            style={fieldTheme}
            id="name-field"
            label="User Name"
            variant="outlined"
            onChange={props.onChange}
        />
    );
};

//error: bool
//onChange: callback
export const PasswordField = (props) => {
    return (
        <TextField
            error={props.error}
            helperText={props.error ? "Password needs a number, an uppercase letter, and a special character" : ""}
            style={fieldTheme}
            id="password-field"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={props.onChange}
        />
    );
};

//isLogin: bool
//loading: bool
//onClick: callback
export const AuthSubmit = (props) => {
    if (props.loading) {
        return <ReactLoading type="bubbles" color={appThemeConstants.hanPurple} />;
    } else {
        return (
            <Button
                onClick={props.onClick}
                variant="contained"
                style={{
                    width: "70%",
                    marginTop: "15px",
                    marginBottom: "15px",
                    color: "#ffffff",
                    backgroundColor: appThemeConstants.hanPurple,
                }}
            >
                {props.isLogin ? "Log In" : "Sign Up"}
            </Button>
        );
    }
};

//textTheme: object
//isLogin: bool
//onClick: callback
export const AltAuth = (props) => {
    return (
        <h4 style={props.textTheme}>
            {props.isLogin ? "Don't have an account? " : "Have an account? "}
            <u style={{ color: props.textTheme.color, cursor: "pointer" }} onClick={props.onClick}>
                {props.isLogin ? "Log In" : "Sign Up"}
            </u>
        </h4>
    );
};

export const namePattern = new RegExp("^[a-z0-9_-]{3,15}$");
export const passwordPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");
let userName = "";
let password = "";

//setAuthFail: callback
//setLogin: callback
export const Login = (props) => {
    const currentTheme = useTheme();
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [successfulLogin, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userDispatch, setUserToken } = useContext(UserContext);

    const textTheme = {
        fontFamily: appThemeConstants.fontFamily,
        color: currentTheme.palette.secondary.dark,
    };

    const submitLogin = async () => {
        setLoading(true);
        let error = false;
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
            const [hasError, userInfo] = await loginUser(userName, password);

            if (hasError) {
                setSuccess(false);
                props.setAuthFail((prevState) => ({ message: "Incorrect username or password", failed: true }));
                setLoading(false);
                return;
            } else {
                userDispatch({ type: UserReducerTypes.getUserAction, payload: { user: userInfo } });
                setUserToken(userInfo['jwt_token']);
                setSuccess(true);
                setLoading(false);
            }
        } else {
            setSuccess(false);
            setLoading(false);
        }
    };

    if (!passwordError && !nameError && successfulLogin) {
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
                <h1 style={textTheme}>Log In</h1>
                <NameField error={nameError} onChange={(event) => (userName = event.target.value)} />
                <PasswordField error={passwordError} onChange={(event) => (password = event.target.value)} />
                <AuthSubmit loading={loading} isLogin={true} onClick={() => submitLogin()} />
                <AltAuth textTheme={textTheme} isLogin={true} onClick={() => props.setLogin(false)} />
            </CardContent>
        </Card>
    );
};
