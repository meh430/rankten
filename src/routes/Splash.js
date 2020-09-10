import ReactLoading from "react-loading";
import React, { useState, useEffect, useContext } from "react";
import { Logo } from "../components/Logo";
import { appThemeConstants } from "../misc/AppTheme";
import { useTheme } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import "../App.css";
import { UserReducerTypes } from "../reducers/UserReducer";
import { UserContext } from "../Contexts";
import { tokenValid } from "../api/Auth";

export const Splash = () => {
    const [startRoute, setStartRoute] = useState(null);
    const currentTheme = useTheme();
    const { userDispatch, userToken } = useContext(UserContext);
    useEffect(() => {
        console.log("called splash");

        if (userToken) {
            console.log(userToken);
            (async () => {
                const [hasError, userInfo] = await tokenValid(userToken);
                if (hasError) {
                    setStartRoute("/auth");
                } else {
                    //set user object?
                    userDispatch({ type: UserReducerTypes.getUserAction, payload: { user: userInfo } });
                    //set home?
                    setStartRoute("/main");
                }
            })();
        } else {
            setStartRoute("/auth");
        }
    }, [setStartRoute, userDispatch, userToken]);

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
            <Logo width="600" />
            <ReactLoading type="bars" color={appThemeConstants.hanPurple} />
        </div>
    );
};
