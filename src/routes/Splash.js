import ReactLoading from "react-loading";
import React, { useState, useEffect, useContext } from "react";
import { Logo } from "../components/Logo";
import { appThemeConstants } from "../misc/AppTheme";
import { useTheme } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import '../App.css';
import { UserReducerTypes } from "../reducers/UserReducer";
import { UserContext } from "../Contexts";
import { tokenValid } from "../api/Auth";
import { getToken } from "../misc/PrefStore";
export const Splash = () => {
    const [startRoute, setStartRoute] = useState(null);
    const currentTheme = useTheme();
    const { userDispatch } = useContext(UserContext);
    useEffect(() => {
        console.log("called splash")
        const storedToken = getToken();
        if (storedToken) {
            const [hasError, userInfo] = tokenValid(storedToken);
            if (hasError) {
                setStartRoute('/login');
            } else {
                //set user object?
                userDispatch({ type: UserReducerTypes.GET_USER_ACTION, payload: userInfo });
                //set home?
            }
        } else {
            setStartRoute('/signup');
        }
    }, [setStartRoute, userDispatch]);

    if (startRoute) {
        return <Redirect to={startRoute} />;
    }

    return (
        <div
            className="col"
            style={{
                alignItems: "center",
                minHeight: "100vh",
                justifyContent: "space-around",
                backgroundColor: currentTheme.palette.background.default,
            }}
        >
            <Logo width="600"/>
            <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
        </div>
    );
};
