import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./custom";

export const profileStyles = makeStyles((theme) => ({
    name: {
        // color: "#219bf1",
        paddingTop: "2rem",
        textAlign: "left",
        [theme.breakpoints.down("xs")]: {
            textAlign: "center",
        },
    },
    description: {
        textAlign: "left",
        [theme.breakpoints.down("xs")]: {
            textAlign: "center",
        },
    },
    ratingPosition: {
        textAlign: "left",
        [theme.breakpoints.down("xs")]: {
            textAlign: "center",
        },
    },
    avatarImageStyle: {
        alignItems: "center",
        margin: "auto",
        width: "160px",
        height: "160px",
        display: "flex",
        marginBottom: '-15px',
    },
    ratingColor: {
        color: theme.palette.text.secondary,
    },
    buttonSize: {
        marginRight: "10px",
        size: "large",
        [theme.breakpoints.down("sm")]: {
            size: "small",
        },
    },
    connectionStyle: {
        marginRight: "10px",
        color: theme.palette.primary.light,
    },
    blocked: {
        marginRight: "10px",
        color: theme.palette.info.main,
    },
    listIconStyle: {
        color: theme.palette.text.primary,
        size: 'small',
    },
    listItem:{
        paddingLeft: 0,
        paddingTop: '10px',
        paddingBottom: 0,
    },
    likeButton: {
        color: 'green',
        borderColor: 'green',
        // borderColor: theme.palette.secondary.main,
        // '&:hover': {
        //     backgroundColor: 'blue',
        // },
        
    },
    editBtn: {
        color: theme.palette.text.secondary,
    },

}));
