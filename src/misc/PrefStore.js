const CURRENT_THEME = "CURRENT_THEME";
const JWT_TOKEN = "JWTTOKEN";
const USER_NAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";
const MAIN_TAB = "MAINTAB";
const SAVED_SORT = "SAVEDSORT"

export function saveTheme(value) {
    localStorage.setItem(CURRENT_THEME, value);
}

export function saveToken(token) {
    localStorage.setItem(JWT_TOKEN, token);
}

export function getCurrentTheme() {
    var theme = localStorage.getItem(CURRENT_THEME);
    return theme ? theme : "light";
}

export function getToken() {
    var token = localStorage.getItem(JWT_TOKEN);
    return token;
}

export function getLogin() {
    var userName = localStorage.getItem(USER_NAME_KEY);
    var password = localStorage.getItem(PASSWORD_KEY);

    return [userName, password];
}

export function setMainTab(tab) {
    localStorage.setItem(MAIN_TAB, tab);
}

export function getMainTab() {
    var mainTab = localStorage.getItem(MAIN_TAB);
    return mainTab ? Number(mainTab) : 0;
}

export function saveSort(sort) {
    localStorage.setItem(SAVED_SORT, sort);
}

export function getSort() {
    var sort = localStorage.getItem(SAVED_SORT);
    return sort ? Number(sort) : 0;
}

export function clearStorage() {
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
    localStorage.removeItem(JWT_TOKEN);
}
