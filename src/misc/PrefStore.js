const DARK_THEME = "DARKTHEME";
const JWT_TOKEN = "JWTTOKEN";
const USER_NAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

function saveDarkTheme(value) {
    localStorage.setItem(DARK_THEME, value);
}

