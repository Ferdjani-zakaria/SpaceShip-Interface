import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
    fontFamily: {
        body: "Audiowide, sans-serif",
        display: "Audiowide, sans-serif",
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    600: "#ffd700",
                },
                success: {
                    600: "#000",
                    500: "#1e90ff", // Custom blue color
                    200: "#724bff10",
                    100: "#ccc",
                },
                warning: {
                    500: "#ffd700", // Custom yellow color
                },
            },
        },
        dark: {
            palette: {
                success: {
                    500: "#1e90ff", // Custom blue color for dark mode
                },
                warning: {
                    500: "#ffd700", // Custom yellow color for dark mode
                },
            },
        },
    },
    components: {
        JoyTable: {
            styleOverrides: {
                root: ({ theme }) => ({
                    overflowY: "scroll",
                    backgroundColor: theme.vars.palette.success[200],
                    borderRadius: "5px",
                    border: `1px solid ${theme.vars.palette.success[100]}`,
                    borderRight: "none",
                    color: theme.vars.palette.warning[500],
                    // Style specific parts
                    "& thead": {
                        color: theme.vars.palette.success[500],
                        BorderBottom: `20px solid ${theme.vars.palette.success[100]}`,
                        "& tr": {},
                    },

                    "& tbody": {
                        color: theme.vars.palette.success[500], // Header text color
                        "--unstable_TableCell-height": "30px",
                        "& td": {
                            color: theme.vars.palette.warning[500],
                            // color: theme.vars.palette.success[500], // Table cell text color
                            borderBottom: `1px solid ${theme.vars.palette.success[700]}`, // Cell borders
                        },
                        "& tr:hover": {
                            backgroundColor: theme.vars.palette.warning[500],
                            "& td": {
                                color: theme.vars.palette.success[600],
                            },
                        },
                    },
                    "& tfoot": {
                        backgroundColor: theme.vars.palette.success[200], // Change footer background here
                        "& tr": {
                            color: theme.vars.palette.warning[500],
                            backgroundColor: theme.vars.palette.success[200], // Footer background
                        },
                        "& td": {
                            color: theme.vars.palette.warning[500],
                            backgroundColor: theme.vars.palette.success[200], // Footer background
                        },
                    },
                }),
            },
        },
    },
});

export default theme;
