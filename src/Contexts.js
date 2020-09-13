import { createContext } from 'react';
import { loginUser } from './api/Auth';
import { getLogin, saveToken } from './misc/PrefStore';
import { UserReducerTypes } from './reducers/UserReducer';

export const UserContext = createContext(null);
export const ThemeContext = createContext("light");

export const resetUserContext = async(userContext) => {
    const [userName, password] = getLogin();
    const [e, loggedIn] = await loginUser(userName, password);
    console.log(loggedIn);
    saveToken(loggedIn['jwt_token'], userName, password);
    userContext.setUserToken(loggedIn['jwt_token']);
    userContext.userDispatch({ type: UserReducerTypes.getUserAction, payload: { user: loggedIn } });
}