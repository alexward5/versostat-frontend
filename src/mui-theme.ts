import { alpha, createTheme } from "@mui/material/styles";

const drawerWidth = "240px";
const appBarHeightXs = "52px";
const appBarHeightMd = "56px";

const themeMainTextColor = "#FFFFFF";

const themeMainColor = "#49e688";
const themeMainColor_2 = "#67e995";
const themeMainColor_3 = "#7feda2";
const themeMainColor_4 = "#94f0af";
const themeMainColor_5 = "#a8f3bd";
const themeMainColor_6 = "#baf6ca";

const darkThemeSurfaceColor_1 = "#191924";
const darkThemeSurfaceColor_2 = "#2e2e39";
const darkThemeSurfaceColor_3 = "#45444e";
const darkThemeSurfaceColor_4 = "#5d5c65";
const darkThemeSurfaceColor_5 = "#76757d";
const darkThemeSurfaceColor_6 = "#8f8f96";

// Use module augmentation to add new variables to Theme and ThemeOptions
declare module "@mui/material/styles" {
    interface Theme {
        drawerWidth: string;
        appBarHeightXs: string;
        appBarHeightMd: string;

        themeMainTextColor: string;

        themeMainColor: string;
        themeMainColor_2: string;
        themeMainColor_3: string;
        themeMainColor_4: string;
        themeMainColor_5: string;
        themeMainColor_6: string;

        darkThemeSurfaceColor_1: string;
        darkThemeSurfaceColor_2: string;
        darkThemeSurfaceColor_3: string;
        darkThemeSurfaceColor_4: string;
        darkThemeSurfaceColor_5: string;
        darkThemeSurfaceColor_6: string;
        darkThemeBorderColor: string;
    }

    interface ThemeOptions {
        drawerWidth: string;
        appBarHeightXs: string;
        appBarHeightMd: string;

        themeMainTextColor: string;

        themeMainColor: string;
        themeMainColor_2: string;
        themeMainColor_3: string;
        themeMainColor_4: string;
        themeMainColor_5: string;
        themeMainColor_6: string;

        darkThemeSurfaceColor_1: string;
        darkThemeSurfaceColor_2: string;
        darkThemeSurfaceColor_3: string;
        darkThemeSurfaceColor_4: string;
        darkThemeSurfaceColor_5: string;
        darkThemeSurfaceColor_6: string;
        darkThemeBorderColor: string;
    }
}

const theme = createTheme({
    // Theme variables to use in components
    drawerWidth: drawerWidth,
    appBarHeightXs: appBarHeightXs,
    appBarHeightMd: appBarHeightMd,

    themeMainTextColor: themeMainTextColor,

    themeMainColor: themeMainColor,
    themeMainColor_2: themeMainColor_2,
    themeMainColor_3: themeMainColor_3,
    themeMainColor_4: themeMainColor_4,
    themeMainColor_5: themeMainColor_5,
    themeMainColor_6: themeMainColor_6,

    darkThemeSurfaceColor_1: darkThemeSurfaceColor_1,
    darkThemeSurfaceColor_2: darkThemeSurfaceColor_2,
    darkThemeSurfaceColor_3: darkThemeSurfaceColor_3,
    darkThemeSurfaceColor_4: darkThemeSurfaceColor_4,
    darkThemeSurfaceColor_5: darkThemeSurfaceColor_5,
    darkThemeSurfaceColor_6: darkThemeSurfaceColor_6,
    darkThemeBorderColor: darkThemeSurfaceColor_5,

    // Custom font from Google fonts
    typography: {
        fontFamily: '"Inter", sans-serif',
        fontWeightBold: 800,
    },
    palette: {
        primary: {
            main: themeMainTextColor,
        },
        text: {
            primary: themeMainTextColor,
        },
    },
    // Component style overrides
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    height: appBarHeightXs,
                    minHeight: appBarHeightXs,
                    [theme.breakpoints.up("xs")]: {
                        height: appBarHeightXs,
                        minHeight: appBarHeightXs,
                    },
                    [theme.breakpoints.up("md")]: {
                        height: appBarHeightMd,
                        minHeight: appBarHeightMd,
                    },
                }),
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    minHeight: appBarHeightXs,
                    height: appBarHeightXs,
                    [theme.breakpoints.up("xs")]: {
                        minHeight: appBarHeightXs,
                        height: appBarHeightXs,
                    },
                    [theme.breakpoints.up("md")]: {
                        minHeight: appBarHeightMd,
                        height: appBarHeightMd,
                    },
                }),
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: 46,
                    "&.MuiTablePagination-select": {
                        marginRight: "12px",
                        marginLeft: 0,
                    },
                },
            },
        },
        MuiCheckbox: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    "&.Mui-checked": {
                        color: themeMainTextColor,
                    },
                    "&.MuiCheckbox-indeterminate": {
                        color: themeMainTextColor,
                    },
                    color: themeMainTextColor,
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: ({ theme }) => ({
                    // Ensure consistent spacing across all breakpoints
                    [theme.breakpoints.up("xs")]: {
                        marginBottom: "18px",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                    },
                }),
                track: {
                    border: "none",
                    background:
                        // "linear-gradient(90deg, #4af792 0%, #00c6ff 100%)",
                        "linear-gradient(90deg,rgba(73, 230, 136, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(76, 230, 137, 1) 100%)",
                },
                thumb: {
                    backgroundColor: themeMainTextColor,
                    border: `2px solid ${darkThemeSurfaceColor_1}`,
                    width: 18,
                    height: 18,
                },
                markLabel: ({ theme }) => ({
                    [theme.breakpoints.up("xs")]: {
                        top: 14,
                    },
                }),
                valueLabel: {
                    fontSize: "0.875rem",
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    height: 34,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "none",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: darkThemeSurfaceColor_4,
                },
                root: {
                    "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: darkThemeSurfaceColor_5,
                        },
                    },
                    "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: darkThemeSurfaceColor_5,
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    ".MuiSelect-icon": {
                        color: themeMainTextColor,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&.Mui-disabled": { color: darkThemeSurfaceColor_4 },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: darkThemeSurfaceColor_3,
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: darkThemeSurfaceColor_5,
                },
                list: { paddingTop: 0, paddingBottom: 0 },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: themeMainTextColor,
                    backgroundColor: darkThemeSurfaceColor_5,
                    "&:hover": {
                        backgroundColor: alpha(darkThemeSurfaceColor_2, 0.3),
                    },
                    "&.Mui-selected": {
                        backgroundColor: darkThemeSurfaceColor_2,
                        "&:hover": {
                            backgroundColor: darkThemeSurfaceColor_2,
                        },
                    },
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                toolbar: {
                    "& .MuiTablePagination-actions": {
                        marginLeft: "8px",
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: "0.875rem",
                },
            },
        },
    },
});

export default theme;
