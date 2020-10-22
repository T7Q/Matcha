import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./custom";

export const galleryStyles = makeStyles((theme) => ({
    name: {
        // color: "#219bf1",
        paddingTop: "2rem",
        textAlign: "left",
        [theme.breakpoints.down("xs")]: {
            textAlign: "center",
        },
    },
    title: {
        color: theme.palette.info.main,
        '&:hover': {
            color: theme.palette.text.primary,
        },
    },
    card: {
        width: 200,
        margin: 'auto',
        border: '1px',
        borderColor: 'white',
    },
    cardMedia: {
        height: 200,
        width: '100%',
        objectFit: "cover",
        focusHighlight: 'red',
        '&:hover': {
            // color: theme.palette.text.primary,
            focusHighlight: 'red',
        },
    },
    cardContent: {
        textAlign: "center",
    }
    

}));
