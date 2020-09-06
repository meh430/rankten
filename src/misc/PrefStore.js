const CURRENT_THEME = "CURRENT_THEME";
const JWT_TOKEN = "JWTTOKEN";
const USER_NAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

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
