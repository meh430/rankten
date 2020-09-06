import { createMuiTheme } from '@material-ui/core/styles';

export const appColors = {
    palePurple: '#f1e3f3',
    lavender: '#c2bbf0',
    darkSienna: '#4a051c',
    hanPurple: '#6320ee',
    paraPink: '#ef476f'
}

export const appThemeLight = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: appColors.lavender,
            light: appColors.palePurple,
            dark: appColors.hanPurple
        },
        secondary: {
            main: appColors.paraPink,
            dark: appColors.darkSienna
        }
    }
});

export const appThemeDark = createMuiTheme({
    ...appThemeLight,
    pallete: {
        ...appThemeLight.palette,
        primary: {
            ...appThemeLight.primary
        },
        secondary: {
            ...appThemeLight.secondary
        },
        type: 'dark'
    }
});