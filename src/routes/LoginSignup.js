import React, { useState } from "react";
import { useTheme, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { Logo } from "../components/Logo";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { appThemeConstants } from "../misc/AppTheme";
import { setMainTab } from "../misc/PrefStore";
import "../App.css";

export const LoginSignUp = (props) => {
    setMainTab(0);
    const currentTheme = useTheme();
    const [authFail, setAuthFail] = useState({ message: "", failed: false });
    const [isLogin, setLogin] = useState(true);
    console.log(`IsLogin: ${isLogin}`);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAuthFail((prevState) => ({ message: prevState.message, failed: false }));
    };

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
            {isLogin ? (
                <Login setAuthFail={setAuthFail} setLogin={setLogin} />
            ) : (
                <SignUp setAuthFail={setAuthFail} setLogin={setLogin} />
            )}

            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={authFail.failed}
                autoHideDuration={6000}
                onClose={handleClose}
                message={authFail.message}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    );
};
