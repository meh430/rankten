import React from 'react';
import { useTheme } from '@material-ui/core';
import '../App.css';
import { Logo } from '../components/Logo';

//isLogin: bool
export const LoginSignUp = (props) => {
    const currentTheme = useTheme();
    return (
        <div className="row" style={{ backgroundColor: currentTheme.palette.background.paper, minHeight: "100vh", justifyContent: "space-evenly" }}>
            <Logo width="500"/>
            
        </div>
    );
}