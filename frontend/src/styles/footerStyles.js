import { makeStyles } from "@material-ui/core/styles";

export const footerStyles = makeStyles((theme) => ({
    footerBtn: {
        color: theme.palette.text.secondary,
        "&:hover": {
            color: theme.palette.primary.main,
        },
    },
}));
