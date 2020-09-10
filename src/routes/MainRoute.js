import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../Contexts";
import { AppBar, Toolbar, IconButton, TextField, Typography, useTheme } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import "../App.css";
import { appThemeConstants } from "../misc/AppTheme";
export const MainRoute = () => {
    const currentTheme = useTheme();
    //const { user } = useContext(UserContext);
    return (
        <div style={{ height: "100vh", width:"100vw", backgroundColor: currentTheme.palette.background.default }}>
            <AppBar
                position="static"
                style={{
                    backgroundColor: currentTheme.palette.background.default,
                    boxShadow: currentTheme.shadows[0],
                    width: "100vw",
                }}
            >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon style={{ color: currentTheme.palette.text.primary }} />
                    </IconButton>
                    <Typography
                        style={{ fontFamily: appThemeConstants.fontFamily, color: currentTheme.palette.secondary.dark, marginLeft: "10px" }}
                    >
                        Rank 10
                    </Typography>
                    <div style={{ width: "fit-content", maxWidth: "80%" }}>
                        <TextField
                            style={{ width: "550px", margin: "8px", maxWidth: "60%" }}
                            variant="outlined"
                            placeholder="Search..."
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <div>
                <Switch>
                    <Route path="/main" component={() => <h1>Feed</h1>} exact />
                    <Route path="/main/discover" component={() => <h1>Discover</h1>} />
                    <Route path="/main/search" component={() => <h1>Search</h1>} />
                    <Route path="/main/profile" component={() => <h1>Profile</h1>} />
                </Switch>
            </div>
        </div>
    );
};
