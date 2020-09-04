const palePurple = '#f1e3f3';
const lavender = '#c2bbf0';
const darkSienna = '#4a051c';
const hanPurple = '#6320ee';
const paraPink = '#ef476f';

const appThemeLight = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: lavender,
            light: palePurple,
            dark: hanPurple
        },
        secondary: {
            main: paraPink,
            dark: darkSienna
        }
    }
});

const appThemeDark = createMuiTheme({
    ...appThemeLight,
    pallete: {
        ...appThemeLight.palette,
        type: 'dark'
    }
});