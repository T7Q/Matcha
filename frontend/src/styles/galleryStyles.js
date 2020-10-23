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
        width: 250,
        // [theme.breakpoints.down("xs")]: {
        //     width: 250,
        // },
        margin: 'auto',
        // borderColor: 'white',
    },
    cardMedia: {
        height: 280,
        // [theme.breakpoints.down("xs")]: {
        //     height: 320,
        // },
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
    },
    distance: {
        marginBottom: 0,
    },
    cardActions: {
        backgroundColor: theme.palette.background.default,
        paddingTop: 0,
        justifyContent: 'center',
    },
    fullLikeBtn: {
        borderColor: theme.palette.primary.main,
        fill: theme.palette.primary.main,
        '&:hover': {
            borderColor: theme.palette.text.primary,
            fill: theme.palette.text.primary,
        },
    },
    fullChatBtn: {
        borderColor: theme.palette.primary.light,
        fill: theme.palette.primary.main,
        '&:hover': {
            borderColor: theme.palette.text.primary,
            fill: theme.palette.text.primary,
        },
    },
    emptyLikeBtn: {
        borderColor: 'blue',
        fill: theme.palette.text.primary,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            fill: theme.palette.primary.main,
        },
    },
    icon: {
        padding: '5px',
        alignSelf: "end",
    },
    bgIcon: {
        padding: '5px',
    },
    textOverIcon: {
        // fill: theme.palette.background.secodary,
        // fill: 'transparent',
        // border: 'red',
        borderColor: 'red',
        // color: theme.palette.background.secondary,
    },
    textOver: {
        color: theme.palette.text.primary,
        '&.MuiIconButton-root.Mui-disabled': {
            color: theme.palette.text.primary,
        },
        fontSize: "10px",
        fontWeight: "900",
        position: "absolute",

        padding: 0,
    },


}));
