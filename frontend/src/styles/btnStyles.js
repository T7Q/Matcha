import { makeStyles } from '@material-ui/core/styles';

export const btnStyles = makeStyles((theme) => ({
    footerBtn: {
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.primary.main,
        },
        fontSize: 'small',
    },
    likeButton: {
        color: theme.palette.text.primary,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '30px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    chatButton: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '30px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
        },
        marginLeft: '10px',
    },
    iconButton: {
        '&:hover span': {
            color: theme.palette.primary.main,
        },
        '& span.MuiBadge-badge': {
            color: theme.palette.primary.contrastText,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    iconButtonActive: {
        '& span': {
            color: theme.palette.primary.main,
        },
        '& span.MuiBadge-badge': {
            color: theme.palette.primary.contrastText,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
}));
