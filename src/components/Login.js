import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardContent, useTheme, TextField, InputAdornment, IconButton } from "@material-ui/core";
import ReactLoading from "react-loading";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { UserContext } from "../Contexts";
import { appThemeConstants, getCardStyle, getTextTheme } from "../misc/AppTheme";
import { loginUser } from "../api/Auth";
import { UserReducerTypes } from "../reducers/UserReducer";
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
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    props.onEnter();
                    event.preventDefault();
                }
            }}
            error={props.error}
            helperText={props.error ? "Name needs 3-15 characters" : ""}
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
//label: string
//errorMessage: string
export const PasswordField = (props) => {
    const [visible, setVisible] = useState(false);
    const errorMessage = props.errorMessage ? props.errorMessage : "Password needs 6-20 characters";
    const label = props.label ? props.label : "Password";
    return (
        <TextField
            error={props.error}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    props.onEnter();
                    event.preventDefault();
                }
            }}
            helperText={props.error ? errorMessage : ""}
            style={fieldTheme}
            id="password-field"
            label={label}
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            variant="outlined"
            onChange={props.onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => setVisible(!visible)}>
                            {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
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
                {props.isLogin ? "Sign Up" : "Log In"}
            </u>
        </h4>
    );
};

export const namePattern = new RegExp("^[a-zA-Z0-9_#?!@$ %^&*-]{3,15}$");
export const passwordPattern = new RegExp("^[a-zA-Z0-9_#?!@$ %^&*-]{6,20}$");
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

    const textTheme = getTextTheme(currentTheme);

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
                setUserToken(userInfo.jwtToken);
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
                <NameField
                    error={nameError}
                    onChange={(event) => (userName = event.target.value)}
                    onEnter={submitLogin}
                />
                <PasswordField
                    error={passwordError}
                    onChange={(event) => (password = event.target.value)}
                    onEnter={submitLogin}
                />
                <AuthSubmit loading={loading} isLogin={true} onClick={() => submitLogin()} />
                <AltAuth textTheme={textTheme} isLogin={true} onClick={() => props.setLogin(false)} />
            </CardContent>
        </Card>
    );
};
