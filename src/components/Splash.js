import ReactLoading from "react-loading";
import React from "react";
import { Logo } from "./Logo";
import { appColors } from "../misc/AppTheme";
import { useTheme } from "@material-ui/core";
export const Splash = () => {
    const currentTheme = useTheme();
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
