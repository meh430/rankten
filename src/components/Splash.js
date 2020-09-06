import ReactLoading from "react-loading";
import React from 'react';
import { Logo } from "./Logo";
import { appColors } from '../misc/AppTheme';
export const Splash = () => {

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "space-around"}}>
            <Logo />
            <ReactLoading type="bars" color={appColors.hanPurple}/>
        </div>
    );
}