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
            main: appThemeConstants.hanPurple,
            light: appThemeConstants.palePurple,
            dark: appThemeConstants.lavender,
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
    const [theme, setTheme] = useState(getCurrentTheme());

    const userValue = useMemo(() => ({ user, userDispatch }), [user, userDispatch]);
    const themeValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    const darkTheme = createMuiTheme(appThemeDark);
    const lightTheme = createMuiTheme(appThemeLight);

    return (
        <div className="App">
            <ThemeContext.Provider value={themeValue}>
                <UserContext.Provider value={userValue}>
                    <ThemeProvider theme={theme === "light" ? darkTheme : lightTheme}>
                        <Switch>
                            <Route path="/" component={Splash} exact />
                            <Route path="/login" render={() => <LoginSignUp isLogin={true}/>} />
                            <Route path="/signup" render={() => <LoginSignUp isLogin={false}/>} />
                        </Switch>
                    </ThemeProvider>
                </UserContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
};

export default App;
