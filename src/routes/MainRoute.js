import React, { useContext } from "react";
import { UserContext } from "../Contexts";
import { AppBar, Toolbar, IconButton, InputBase } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import '../App.css'
export const MainRoute = () => {
    //const { user } = useContext(UserContext);
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow: "1" }}>
                        <SearchIcon/>
                        <InputBase placeholder="Search..." inputProps={{ "aria-label": "Search..." }} />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
