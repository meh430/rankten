import React, { useReducer, useMemo, useState } from "react";
import { UserContext, ThemeContext } from "./Contexts";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { userReducer } from "./reducers/UserReducer";
import { getCurrentTheme } from "./misc/PrefStore";
import { appThemeConstants } from "./misc/AppTheme";
import "./App.css";
import { Splash } from "./routes/Splash";
import { Switch, Route } from 'react-router-dom';
import { LoginSignUp } from "./routes/LoginSignup";
const appThemeLight = {
    palette: {
        type: "light",
        primary: {
            main: appThemeConstants.lavender,
            light: appThemeConstants.palePurple,
            dark: appThemeConstants.hanPurple,
        },
        secondary: {
            main: appThemeConstants.paraPink,
            dark: appThemeConstants.darkSienna,
        }
    },
};

const appThemeDark = {
    palette: {
        ...appThemeLight.palette,
        type: "dark",
        primary: {
            ...appThemeLight.palette.primary,
        },
        secondary: {
            ...appThemeLight.palette.secondary,
            dark: appThemeConstants.palePurple,

        },
    },
};

const App = () => {
    const [user, userDispatch] = useReducer(userReducer, null);
    const [theme, setTheme] = useState(getCurrentTheme());

    const userValue = useMemo(() => ({ user, userDispatch }), [user, userDispatch]);
    const themeValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    const darkTheme = createMuiTheme(appThemeDark);
    const lightTheme = createMuiTheme(appThemeLight);

    return (
        <div className="App">
            <ThemeContext.Provider value={themeValue}>
                <UserContext.Provider value={userValue}>
                    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                        <Switch>
                            <Route path="/" component={Splash} exact />
                            <Route path="/auth" component={LoginSignUp} />
                        </Switch>
                    </ThemeProvider>
                </UserContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
};

export default App;
