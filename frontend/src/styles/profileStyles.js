import { makeStyles } from "@material-ui/core/styles";

export const profileStyles = makeStyles((theme) => ({
    backgroundHeader: {
        backgroundImage: `url('./milkyWay.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    name: {
        color: "#219bf1",
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
    ratingFill: {
        "&.MuiRating-root": {
            color: theme.palette.text.primary,
        },
    },
    avatarImageStyle: {
        alignItems: "center",
        margin: "auto",
        width: "160px",
        height: "160px",
        display: "flex",
        marginBottom: '-20px',
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
        color: theme.palette.primary.main,
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
        color: theme.palette.text.primary,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "30px",
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        
    },
    chatButton: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "30px",
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
        },
        marginLeft: "10px",
        
    },
    editBtn: {
        color: theme.palette.text.secondary,
    },
   

}));
