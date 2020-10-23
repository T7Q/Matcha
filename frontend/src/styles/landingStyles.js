import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./custom";

export const landingStyles = makeStyles((theme) => ({
    title: {
        color: "#219bf1",
    },
    googleBtn: {
        margin: "10px",
        fontSize: "16px",
        textTransform: "capitalize",
        padding: "21px 30px 17px",
        borderRadius: "30px",
        marginBottom: "4px",
        lineHeight: "1.3",
        letterSpacing: "normal",
        minWidth: "170px",
        fontWeight: "700",
        // border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.secondary,
        "&:hover": {
            backgroundColor: theme.palette.background.default,
        },
        flex: "0 1 auto",
        [theme.breakpoints.down("xs")]: {
            padding: "15px 5px",
        },
    },

}));
