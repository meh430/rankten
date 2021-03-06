import { createContext } from "react";

import { tokenValid } from "./api/Auth";
import { getToken } from "./misc/PrefStore";
import { UserReducerTypes } from "./reducers/UserReducer";

export const UserContext = createContext(null);
export const ThemeContext = createContext("light");

export const resetUserContext = async (userContext) => {
    const [e, loggedIn] = await tokenValid(getToken());
    if (e) {
        await resetUserContext(userContext);
    } else {
        userContext.setUserToken(getToken());
        userContext.userDispatch({ type: UserReducerTypes.getUserAction, payload: { user: loggedIn } });
    }
};
