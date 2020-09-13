import React, { useContext, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { UserContext, ThemeContext } from "../Contexts";
import { saveTheme } from "../misc/PrefStore";
import ExploreIcon from "@material-ui/icons/Explore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListIcon from "@material-ui/icons/List";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
    TextField,
    Drawer,
    makeStyles,
    useTheme,
    Typography,
    Toolbar,
    ListItemText,
    ListItemIcon,
    ListItem,
    List,
    Switch as Sw,
    Hidden,
    IconButton,
    Divider,
    AppBar,
    FormControlLabel,
    CssBaseline,
} from "@material-ui/core";
import "../App.css";
import { appThemeConstants } from "../misc/AppTheme";
import { Logo } from "../components/Logo";
import "../App.css";
import { Profile } from "../components/Profile";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: "100%"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        color: theme.palette.text.primary,
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {

        width: drawerWidth,
        backgroundColor: theme.palette.background.default,
    },
    content: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    listItem: {
        width: "95%",
        borderRadius: "15px",
        marginLeft: "8px",
        marginTop: "4px"
    }
}));
export const MainRoute = (props) => {
    const { window } = props;
    const currentTheme = useTheme();
    //const { user } = useContext(UserContext);
    const { setTheme } = useContext(ThemeContext);
    const container = window !== undefined ? () => window().document.body : undefined;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [themeSwitch, setThemeSwitch] = useState(currentTheme.palette.type);

    const onThemeChange = () => {
        const newTheme = themeSwitch === "dark" ? "light" : "dark";
        setThemeSwitch(newTheme);
        setTheme(newTheme);
        saveTheme(newTheme);
    };

    const classes = useStyles();

    const selectedColor =
        currentTheme.palette.type === "light" ? appThemeConstants.palePurple : appThemeConstants.hanPurple;
    const unselectedColor = currentTheme.palette.background.default;
    const linkStyle = {
        textDecoration: "none",
        color: currentTheme.palette.text.primary,
    };
    const iconColor = {
        color: currentTheme.palette.type === "dark" ? appThemeConstants.lavender : appThemeConstants.hanPurple,
    };
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const drawer = (
        <div className="col" style={{ width: "100%" }}>
            <Logo />
            <List style={{marginTop: "10px"}}>
                <Link to="/main" style={linkStyle}>
                    <ListItem
                        className={classes.listItem}
                        button
                        key="feed"
                        onClick={() => setTabIndex(0)}
                        style={{ backgroundColor: tabIndex === 0 ? selectedColor : unselectedColor }}
                    >
                        <ListItemIcon>{<ListIcon style={iconColor} />}</ListItemIcon>
                        <ListItemText primary={"Feed"} />
                    </ListItem>
                </Link>
                <Link to="/main/discover" style={linkStyle}>
                    <ListItem
                        className={classes.listItem}
                        button
                        key="discover"
                        onClick={() => setTabIndex(1)}
                        style={{ backgroundColor: tabIndex === 1 ? selectedColor : unselectedColor }}
                    >
                        <ListItemIcon>{<ExploreIcon style={iconColor} />}</ListItemIcon>
                        <ListItemText primary={"Discover"} />
                    </ListItem>
                </Link>
                <Link to="/main/profile" style={linkStyle}>
                    <ListItem
                        className={classes.listItem}
                        button
                        key="profile"
                        onClick={() => setTabIndex(2)}
                        style={{ backgroundColor: tabIndex === 2 ? selectedColor : unselectedColor }}
                    >
                        <ListItemIcon>{<AccountCircleIcon style={iconColor} />}</ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItem>
                </Link>
            </List>

            <div className="col" style={{ position: "absolute", bottom: 0, width: "100%" }}>
                <ListItem button key="themechange">
                    <FormControlLabel
                        control={<Sw checked={themeSwitch==="dark"} onChange={onThemeChange} name="themeSwitch" color="primary" />}
                        label="Dark Mode"
                    />
                </ListItem>
                <Link to="/auth" style={linkStyle}>
                    <ListItem button key="logout">
                        <ListItemIcon>{<ExitToAppIcon style={iconColor} />}</ListItemIcon>
                        <ListItemText primary={"Log Out"} />
                    </ListItem>
                </Link>
            </div>
        </div>
    );
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classes.appBar}
                style={{ backgroundColor: currentTheme.palette.background.default, boxShadow: currentTheme.shadows[0] }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "90%" }}>
                        <TextField
                            style={{ width: "550px", maxWidth: "90%", margin: "12px" }}
                            variant="outlined"
                            placeholder="Search..."
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/main" component={() => <h1>Feed</h1>} exact />
                    <Route path="/main/discover" component={() => <h1>Discover</h1>} />
                    <Route path="/main/search" component={() => <h1>Search</h1>} />
                    <Route path="/main/profile" component={Profile} />
                </Switch>
            </main>
        </div>
    );
    /*return (
        <div style={{ height: "100vh", width: "100vw", backgroundColor: currentTheme.palette.background.default }}>
            <AppBar
                position="static"
                style={{
                    backgroundColor: currentTheme.palette.background.default,
                    boxShadow: currentTheme.shadows[0],
                    width: "100vw",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                        className={classes.menuButton}
                    >
                        <MenuIcon style={{ color: currentTheme.palette.text.primary }} />
                    </IconButton>

                    <div>
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor="left"
                                open={mobileOpen}
                                onClose={toggleDrawer}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer variant="permanent" open>
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </div>
                    <div style={{ width: "fit-content", maxWidth: "90%", flexGrow: "1" }}>
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
    );*/
};
