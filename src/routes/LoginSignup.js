import React from 'react';
import { useTheme } from '@material-ui/core';
import '../App.css';
import { Logo } from '../components/Logo';
import { Login } from '../components/Login';

//isLogin: bool
export const LoginSignUp = (props) => {
    const currentTheme = useTheme();
    return (
        <div className="row" style={{ backgroundColor: currentTheme.palette.background.default, minHeight: "100vh", justifyContent: "space-evenly" }}>
            <Logo width="500"/>
            <Login/>
        </div>
    );
}