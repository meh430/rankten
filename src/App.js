import React, { useReducer, useMemo, useState } from "react";
import { Logo } from "./components/Logo";
import { UserContext, ThemeContext } from "./Contexts";
import { ThemeProvider } from "@material-ui/core/styles";
import { userReducer } from "./reducers/UserReducer";
import { isDark } from "./misc/PrefStore";
import "./App.css";

const App = () => {
    const [user, userDispatch] = useReducer(userReducer, null);
    const [theme, setTheme] = useState(isDark());

    const userValue = useMemo(() => ({ user, userDispatch }), [user, userDispatch]);
    const themeValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    return (
        <ThemeContext.Provider value={themeValue}>
            <UserContext.Provider value={userValue}>
                <ThemeProvider>
                    <div className="App">
                        <Logo />
                    </div>
                </ThemeProvider>
            </UserContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
