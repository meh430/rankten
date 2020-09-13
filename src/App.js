import React, { useReducer, useMemo, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { UserContext, ThemeContext } from "./Contexts";
import { userReducer } from "./reducers/UserReducer";
import { getCurrentTheme, getToken } from "./misc/PrefStore";
import { appThemeConstants } from "./misc/AppTheme";
import { Splash } from "./routes/Splash";
import { LoginSignUp } from "./routes/LoginSignup";
import { MainRoute } from "./routes/MainRoute";
import "./App.css";

const appThemeLight = {
    palette: {
        type: "light",
        primary: {
            main: appThemeConstants.hanPurple,
            light: appThemeConstants.palePurple,
            dark: appThemeConstants.lavender,
        },
        secondary: {
            main: appThemeConstants.paraPink,
            dark: appThemeConstants.darkSienna,
        },
    },
};

const appThemeDark = {
    palette: {
        ...appThemeLight.palette,
        type: "dark",
        primary: {
            ...appThemeLight.palette.primary,
            main: appThemeConstants.lavender,
        },
        secondary: {
            ...appThemeLight.palette.secondary,
            dark: appThemeConstants.palePurple,
        },
    },
};

const App = () => {
    const [user, userDispatch] = useReducer(userReducer, null);
    const [userToken, setUserToken] = useState(getToken());
    console.log("Stored Token: " + userToken);
    const [theme, setTheme] = useState(getCurrentTheme());

    const userValue = useMemo(() => ({ user, userDispatch, userToken, setUserToken }), [
        user,
        userDispatch,
        userToken,
        setUserToken,
    ]);
    const themeValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    const darkTheme = createMuiTheme(appThemeDark);
    const lightTheme = createMuiTheme(appThemeLight);

    return (
        <div className="App">
            <ThemeContext.Provider value={themeValue}>
                <UserContext.Provider value={userValue}>
                    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                        <Switch>
                            <Route path="/" component={Splash} exact />
                            <Route path="/auth" component={LoginSignUp} />
                            <Route path="/main" component={MainRoute} />
                        </Switch>
                    </ThemeProvider>
                </UserContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
};

export default App;
