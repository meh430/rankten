export const appThemeConstants = {
    palePurple: "#f1e3f3",
    lavender: "#c2bbf0",
    darkSienna: "#4a051c",
    hanPurple: "#6320ee",
    paraPink: "#ef476f",
    fontFamily: "'Nunito', sans-serif",
};

export const getTextTheme = (theme) => {
    return {
        fontFamily: appThemeConstants.fontFamily,
        color: theme.palette.secondary.dark,
    };
};

export const getCardStyle = (theme) => {
    return {
        margin: "10px",
        alignSelf: "center",
        boxShadow: currentTheme.shadows[4],
        borderRadius: "10px",
    };
};
