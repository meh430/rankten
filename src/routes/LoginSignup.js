import React from "react";
import { useTheme } from "@material-ui/core";
import "../App.css";
import { Logo } from "../components/Logo";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { appThemeConstants } from "../misc/AppTheme";

//isLogin: bool
export const LoginSignUp = (props) => {
    const currentTheme = useTheme();
    return (
        <div
            className="row"
            style={{
                backgroundColor: currentTheme.palette.background.default,
                minHeight: "100vh",
                justifyContent: "space-evenly",
            }}
        >
            <div className="col" style={{ justifyContent: "center" }}>
                <Logo width="500" />
                <h1
                    style={{
                        alignSelf: "center",
                        paddingTop: "20px",
                        fontFamily: appThemeConstants.fontFamily,
                        color: currentTheme.palette.secondary.dark,
                        maxWidth: "90%",
                    }}
                >
                    Quickly create and share top ten lists on Rank 10!
                </h1>
            </div>
            {props.isLogin ? <Login /> : <SignUp />}
        </div>
    );
};
