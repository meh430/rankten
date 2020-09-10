import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../Contexts";

import InboxIcon from "@material-ui/icons/MoveToInbox";

import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";

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
    Hidden,
    IconButton,
    Divider,
    AppBar,
    CssBaseline,
} from "@material-ui/core";
import "../App.css";
import { appThemeConstants } from "../misc/AppTheme";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
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
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
export const MainRoute = (props) => {
    const { window } = props;
    const currentTheme = useTheme();
    //const { user } = useContext(UserContext);
    const container = window !== undefined ? () => window().document.body : undefined;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const classes = useStyles();

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
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
                    <div style={{display: "flex", flexDirection: "row", justifyContent:"center", width: "90%"}}>
                        <TextField style={{ width: "550px", maxWidth: "90%", margin:"12px" }} variant="outlined" placeholder="Search..." />
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
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at
                    ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis
                    convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
                    sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
                    quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris
                    commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue
                    eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi
                    etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare
                    suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum
                    eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
                    ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus
                    orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et.
                    Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
                    ultrices sagittis orci a.
                </Typography>
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
