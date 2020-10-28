import { makeStyles } from "@material-ui/core/styles";

export const galleryStyles = makeStyles((theme) => ({
    card: {
        width: 250,
        [theme.breakpoints.down('xs')]: {
            width: "auto",
        },
        margin: "auto",
        border: `1px solid #10183c`,
        "&.MuiPaper-elevation1": {
            boxShadow: "0px 15px 13px 0px rgba(0,0,0,0.2)",
        },
        "&.MuiPaper-rounded": {
            borderRadius: "0px",
        },
    },
    cardMedia: {
        height: 280,
        [theme.breakpoints.down('xs')]: {
            height: 250,
        },
        width: "100%",
        objectFit: "cover",
    },
    cardContent: {
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
    },
    title: {
        color: theme.palette.info.main,
        "&:hover": {
            color: theme.palette.text.primary,
        },
        marginBottom: 0,
    },
    cardActions: {
        backgroundColor: theme.palette.background.default,
        paddingTop: 0,
        justifyContent: "center",
    },
    cardActionBox: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    bgIcon: {
        padding: "5px",
    },
    textOverIcon: {
        fill: theme.palette.text.primary,
    },
    textOver: {
        color: theme.palette.background.default,
        "&.MuiIconButton-root.Mui-disabled": {
            color: theme.palette.background.default,
        },
        fontSize: "9px",
        fontWeight: "900",
        position: "absolute",
        padding: 0,
    },
    rating: {
        "&.MuiRating-root": {
            color: theme.palette.primary.main,
        },
    },
    fullLikeBtn: {
        fill: theme.palette.primary.main,
        "&:hover": {
            fill: theme.palette.text.primary,
        },
    },
    fullChatBtn: {
        fill: theme.palette.text.secondary,
        "&:hover": {
            fill: theme.palette.primary.main,
        },
    },
    emptyLikeBtn: {
        fill: theme.palette.text.secondary,
        "&:hover": {
            fill: theme.palette.primary.main,
        },
    },
    icon: {
        padding: "5px",
        alignSelf: "end",
    },
}));
