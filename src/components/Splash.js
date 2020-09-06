import ReactLoading from "react-loading";
import React, { useState, useEffect, useContext } from "react";
import { Logo } from "./Logo";
import { appColors } from "../misc/AppTheme";
import { useTheme } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { getToken } from "../misc/PrefStore";
import {tokenValid} from "../api/Auth"
import { UserContext } from "../Contexts";
import { UserReducerTypes } from "../reducers/UserReducer";
export const Splash = () => {
    const [startRoute, setStartRoute] = useState(null);
    const currentTheme = useTheme();

    useEffect(() => {
        const storedToken = getToken();
        if (storedToken) {
            const [hasError, userInfo] = tokenValid(storedToken);
            if (hasError) {
                //login?
            } else {
                //set user object?
                const { userDispatch } = useContext(UserContext);
                userDispatch({ type: UserReducerTypes.GET_USER_ACTION, payload: userInfo });
                //set home?
            }
        } else {
            //login?
        }
    }, [setStartRoute]);

    if (startRoute) {
        return <Redirect to={startRoute} />;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                justifyContent: "space-around",
                backgroundColor: currentTheme.palette.background.paper,
            }}
        >
            <Logo />
            <ReactLoading type="bars" color={appColors.hanPurple} />
        </div>
    );
};
