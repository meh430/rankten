import React, { useContext, useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import {
    Button,
    MenuItem,
    Menu,
    TextField,
    Drawer,
    makeStyles,
    useTheme,
    Toolbar,
    ListItemText,
    ListItemIcon,
    ListItem,
    List,
    Switch as Sw,
    Hidden,
    IconButton,
    AppBar,
    FormControlLabel,
    CssBaseline,
} from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListIcon from "@material-ui/icons/List";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

import { ThemeContext } from "../Contexts";
import { clearStorage, getMainTab, saveTheme, setMainTab } from "../misc/PrefStore";
import { appThemeConstants } from "../misc/AppTheme";
import { Logo } from "../components/Logo";
import { Profile } from "../components/Profile";
import { SearchUsers } from "../components/SearchUsers";
import { Discover } from "../components/Discover";
import { Feed } from "../components/Feed";
import "../App.css";
import { SearchLists } from "../components/SearchLists";
import { Settings } from "../components/Settings";

const renderOtherProfile = (routerProps) => {
    let userId = routerProps.match.params.userId;
    return <Profile userId={userId} isMain={false} />;
};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: "100%",
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
        marginTop: "4px",
    },
}));

let searchQuery = "";

export const MainRoute = (props) => {
    const { window } = props;
    const currentTheme = useTheme();
    //const { user } = useContext(UserContext);
    const { setTheme } = useContext(ThemeContext);
    const container = window !== undefined ? () => window().document.body : undefined;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(getMainTab());
    const [themeSwitch, setThemeSwitch] = useState(currentTheme.palette.type);
    const [searchLists, setSearchLists] = useState(true);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [settings, openSettings] = useState(false);

    const searchItemClicked = (listSelected) => {
        setSearchLists(listSelected);
        setMenuAnchor(null);
    };

    const history = useHistory();

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
            <List style={{ marginTop: "10px" }}>
                <Link to="/main" style={linkStyle}>
                    <ListItem
                        className={classes.listItem}
                        button
                        key="feed"
                        onClick={() => {
                            setTabIndex(0);
                            setMainTab(0);
                        }}
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
                        onClick={() => {
                            setTabIndex(1);
                            setMainTab(1);
                        }}
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
                        onClick={() => {
                            setTabIndex(2);
                            setMainTab(2);
                        }}
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
                        control={
                            <Sw
                                checked={themeSwitch === "dark"}
                                onChange={onThemeChange}
                                name="themeSwitch"
                                color="primary"
                            />
                        }
                        label="Dark Mode"
                    />
                </ListItem>
                <ListItem button key="settings" onClick={() => openSettings(true)}>
                    <ListItemIcon>{<SettingsIcon style={iconColor} />}</ListItemIcon>
                    <ListItemText primary={"Settings"} />
                </ListItem>
                <Link to="/auth" style={linkStyle} onClick={() => clearStorage()}>
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
                    <div
                        className="row"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "90%",
                            alignSelf: "center",
                            justifySelf: "center",
                        }}
                    >
                        <TextField
                            style={{ width: "550px", maxWidth: "50%", margin: "12px" }}
                            variant="outlined"
                            placeholder="Search..."
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    history.push(
                                        `/main/${searchLists ? "search_lists" : "search_users"}/${searchQuery}`
                                    );
                                    event.preventDefault();
                                }
                            }}
                            onChange={(event) => (searchQuery = event.target.value)}
                        />
                        <Button
                            style={{ height: "fit-content", fontFamily: appThemeConstants.fontFamily }}
                            onClick={(event) => setMenuAnchor(event.currentTarget)}
                        >
                            {searchLists ? "Lists" : "Users"}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={menuAnchor}
                            keepMounted
                            open={Boolean(menuAnchor)}
                            onClose={() => setMenuAnchor(null)}
                        >
                            <MenuItem onClick={() => searchItemClicked(true)}>Lists</MenuItem>
                            <MenuItem onClick={() => searchItemClicked(false)}>Users</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
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
                            keepMounted: false,
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
                <Settings open={settings} onClose={() => openSettings(false)} />
                <Switch>
                    <Route path="/main" component={Feed} exact />
                    <Route path="/main/discover" component={Discover} />
                    <Route
                        path="/main/search_users/:query"
                        render={(routerProps) => {
                            return <SearchUsers query={routerProps.match.params.query} />;
                        }}
                    />
                    <Route
                        path="/main/search_lists/:query"
                        render={(routerProps) => {
                            return <SearchLists query={routerProps.match.params.query} />;
                        }}
                    />
                    <Route path="/main/profile" render={() => <Profile isMain={true} />} exact />
                    <Route path="/main/profile/:userId" render={(routerProps) => renderOtherProfile(routerProps)} />
                </Switch>
            </main>
        </div>
    );
};
