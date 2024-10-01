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
                    700:"#491b71",
                    600: "#000",
                    500: "#1e90ff", // Custom blue color
                    200: "#00000095",
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
                        backgroundColor: theme.vars.palette.success[700],
                        "& tr": {
                            backgroundColor: theme.vars.palette.success[700],
                        },
                        "& td": {
                            backgroundColor: theme.vars.palette.success[700],
                        },
                    },

                    "& tbody": {
                        color: theme.vars.palette.success[500], // Header text color
                        "--unstable_TableCell-height": "30px",
                        "& td": {
                            color: theme.vars.palette.warning[500],
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
                        // backgroundColor: theme.vars.palette.success[500], // Change footer background here
                        "& tr": {
                            color: theme.vars.palette.warning[500],
                            
                        },
                        "& td": {
                            color: theme.vars.palette.warning[500],
                            backgroundColor: theme.vars.palette.success[700], // Footer background
                        },
                    },
                }),
            },
        },

        JoyInput: {
            styleOverrides: {
                root: {
                    fontSize: ["1rem", "1.2rem", "1.4rem"], // [sm, md, lg]
                },
            },
        },
        JoyButton: {
            styleOverrides: {
                root: {
                    fontSize: ["1.5rem", "1.2rem", "1.4rem"], // [sm, md, lg]
                },
            },
        },
        JoySelect: {
            styleOverrides: {
                root: {
                    fontSize: ["1.5rem", "1.2rem", "1.4rem"], // [sm, md, lg]
                },
            },
        },
        
    },
});

export default theme;
