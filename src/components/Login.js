import { Button, Card, CardContent, useTheme, TextField } from "@material-ui/core";
import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { appThemeConstants } from "../misc/AppTheme";
import "../App.css";
export const Login = () => {
    const currentTheme = useTheme();
    const [loginError, setError] = useState(false);
    const [successfulLogin, setSuccess] = useState(false);
    const fieldTheme = {
        color: appThemeConstants.lavender,
        width: "90%",
        borderRadius: "15px",
        margin: "10px",
    };

    const textTheme = {
        fontFamily: appThemeConstants.fontFamily,
        color: currentTheme.palette.secondary.dark,
    };

    const submitLogin = () => {

    }

    if (!loginError && successfulLogin) {
        return <Redirect to="/main"/>
    }

    return (
        <Card
            style={{
                alignSelf: "center",
                boxShadow: currentTheme.shadows[4],
                width: "500px",
                maxWidth: "90%",
                borderRadius: "10px",
            }}
        >
            <CardContent className="col" style={{ alignItems: "center", paddingBottom: "2px" }}>
                <h1 style={textTheme}>Log In</h1>
                <TextField style={fieldTheme} id="outlined-basic" label="Username" variant="outlined" />

                <TextField
                    style={fieldTheme}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />

                <Button
                    variant="contained"
                    style={{
                        width: "70%",
                        marginTop: "15px",
                        marginBottom: "15px",
                        color: "#ffffff",
                        backgroundColor: appThemeConstants.hanPurple,
                    }}
                >
                    Log In
                </Button>

                <h4 style={textTheme}>Don't have an account? <Link to='/signup' style={{color: currentTheme.palette.secondary.dark}}>Sign up</Link></h4>
            </CardContent>
        </Card>
    );
};
