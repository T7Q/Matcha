import { makeStyles } from '@material-ui/core/styles';

export const navStyles = makeStyles((theme) => ({
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
}));
