import { makeStyles } from '@material-ui/core/styles';

export const navStyles = makeStyles((theme) => ({
    iconButtonActive: {
        '& span': {
            color: theme.palette.primary.main,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    iconButton: {
        '&:hover span': {
            color: theme.palette.primary.main,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    appBar: {
        [theme.breakpoints.down('xs')]: {
            top: 'auto',
            bottom: 0,
        },
    },
    mobileText: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '10px',
        },
    },
    hideMedium: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    pr: {
        paddingRight: '5px',
    },
    menuItem: {
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
        '& .MuiListItemIcon-root': {
            color: theme.palette.common.white,
        },
    },
    menu: {
        '& .MuiMenu-paper': {
            border: '1px solid #000',
            background: theme.palette.secondary.main,
        },
    },
    avatar: {
        width: '25px',
        height: '25px',
    },
    fillWhite: {
        fill: 'white',
    },
}));
