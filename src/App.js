import React, { useReducer, useMemo, useState } from "react";
import { UserContext, ThemeContext } from "./Contexts";
import { ThemeProvider } from "@material-ui/core/styles";
import { userReducer } from "./reducers/UserReducer";
import { isDark } from "./misc/PrefStore";
import { appThemeDark, appThemeLight } from "./misc/AppTheme";
import "./App.css";
import { Splash } from "./components/Splash";

const App = () => {
    const [user, userDispatch] = useReducer(userReducer, null);
    const [theme, setTheme] = useState(isDark());

    const userValue = useMemo(() => ({ user, userDispatch }), [user, userDispatch]);
    const themeValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    return (
        <div className="App"> 
            <ThemeContext.Provider value={themeValue}>
                <UserContext.Provider value={userValue}>
                    <ThemeProvider theme={theme === "dark" ? appThemeDark : appThemeLight}>
                        <Splash />
                    </ThemeProvider>
                </UserContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
};

export default App;
