const DARK_THEME = "DARKTHEME";
const JWT_TOKEN = "JWTTOKEN";
const USER_NAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

function saveDarkTheme(value) {
    localStorage.setItem(DARK_THEME, value);
}

function saveCred(token, userName, password) {
    localStorage.setItem(JWT_TOKEN, token);
    localStorage.setItem(USER_NAME_KEY, userName);
    localStorage.setItem(PASSWORD_KEY, password);
}

function isDark() {
    var dark = localStorage.getItem(DARK_THEME);
    return dark != undefined ? dark : false;
}

function getToken() {
    var token = localStorage.getItem(JWT_TOKEN);
    return token;
}

function getLogin() {
    var userName = localStorage.getItem(USER_NAME_KEY);
    var password = localStorage.getItem(PASSWORD_KEY);

    return [userName, password];
}