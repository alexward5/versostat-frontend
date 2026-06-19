import { createTheme } from "@mui/material/styles";

const drawerWidth = "240px";
const appBarHeightXs = "52px";
const appBarHeightMd = "56px";

const textColor = "#FFFFFF";
const accentColor = "#49e688";

const surface = {
    1: "#191924",
    2: "#2e2e39",
    3: "#45444e",
    4: "#5d5c65",
    5: "#76757d",
} as const;

declare module "@mui/material/styles" {
    interface Theme {
        drawerWidth: string;
        appBarHeightXs: string;
        appBarHeightMd: string;
        darkThemeSurfaceColor_1: string;
        darkThemeSurfaceColor_2: string;
        darkThemeSurfaceColor_3: string;
        darkThemeSurfaceColor_4: string;
        darkThemeSurfaceColor_5: string;
        darkThemeBorderColor: string;
    }

    interface ThemeOptions {
        drawerWidth: string;
        appBarHeightXs: string;
        appBarHeightMd: string;
        darkThemeSurfaceColor_1: string;
        darkThemeSurfaceColor_2: string;
        darkThemeSurfaceColor_3: string;
        darkThemeSurfaceColor_4: string;
        darkThemeSurfaceColor_5: string;
        darkThemeBorderColor: string;
    }
}

const theme = createTheme({
    drawerWidth,
    appBarHeightXs,
    appBarHeightMd,

    darkThemeSurfaceColor_1: surface[1],
    darkThemeSurfaceColor_2: surface[2],
    darkThemeSurfaceColor_3: surface[3],
    darkThemeSurfaceColor_4: surface[4],
    darkThemeSurfaceColor_5: surface[5],
    darkThemeBorderColor: surface[5],

    typography: {
        fontFamily: '"Inter", sans-serif',
        fontWeightBold: 800,
    },
    palette: {
        primary: {
            main: textColor,
        },
        secondary: {
            main: accentColor,
        },
        text: {
            primary: textColor,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    height: appBarHeightXs,
                    minHeight: appBarHeightXs,
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
                        color: textColor,
                    },
                    "&.MuiCheckbox-indeterminate": {
                        color: textColor,
                    },
                    color: textColor,
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: ({ theme }) => ({
                    [theme.breakpoints.up("xs")]: {
                        marginBottom: "18px",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                    },
                }),
                track: {
                    border: "none",
                    background: `linear-gradient(90deg, ${accentColor} 0%, ${textColor} 50%, ${accentColor} 100%)`,
                },
                thumb: {
                    backgroundColor: textColor,
                    border: `2px solid ${surface[1]}`,
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
                    borderColor: surface[4],
                },
                root: {
                    "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: surface[5],
                        },
                    },
                    "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: surface[5],
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    ".MuiSelect-icon": {
                        color: textColor,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&.Mui-disabled": { color: surface[4] },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: surface[3],
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: surface[5],
                },
                list: { paddingTop: 0, paddingBottom: 0 },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: textColor,
                    backgroundColor: surface[5],
                    // Ripple previews the destination color (unselected → will become selected)
                    "& .MuiTouchRipple-root": {
                        color: surface[3],
                    },
                    "&:hover": {
                        backgroundColor: surface[4],
                    },
                    // Keyboard-focused (arrow key navigation): no background change
                    "&.Mui-focusVisible": {
                        backgroundColor: surface[5],
                    },
                    "&.Mui-selected": {
                        backgroundColor: surface[3],
                        // Ripple previews the destination color (selected → will become unselected)
                        "& .MuiTouchRipple-root": {
                            color: surface[5],
                        },
                        "&:hover": {
                            backgroundColor: surface[4],
                        },
                        // Keyboard-focused selected item: keep selected color
                        "&.Mui-focusVisible": {
                            backgroundColor: surface[3],
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
