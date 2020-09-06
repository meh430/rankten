import React, { useReducer, useMemo, useState } from "react";
import { UserContext, ThemeContext } from "./Contexts";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { userReducer } from "./reducers/UserReducer";
import { getCurrentTheme } from "./misc/PrefStore";
import { appColors } from "./misc/AppTheme";
import "./App.css";
import { Splash } from "./components/Splash";
const appThemeLight = {
    palette: {
        type: "light",
        primary: {
            main: appColors.lavender,
            light: appColors.palePurple,
            dark: appColors.hanPurple,
        },
        secondary: {
            main: appColors.paraPink,
            dark: appColors.darkSienna,
        },
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
                        <Splash />
                    </ThemeProvider>
                </UserContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
};

export default App;
