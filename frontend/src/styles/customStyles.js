import { makeStyles } from '@material-ui/core/styles';

export const customStyles = makeStyles((theme) => ({
    mainButton: {
        margin: '10px',
        fontSize: '16px',
        textTransform: 'capitalize',
        padding: '21px 30px 17px',
        borderRadius: '30px',
        marginBottom: '4px',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        minWidth: '170px',
        fontWeight: '500',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.background.default,
        },
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    secondButton: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.secondary,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    linkButton: {
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
    },
    progress: {
        width: '75%',
        margin: '15px',
        padding: '5px',
    },
    input: {
        margin: '5px',
        '& label': {
            color: theme.palette.secondary.main,
            fontSize: '20px',
        },
        '& input': {
            textAlign: 'center',
        },
        '& .MuiOutlinedInput-root': {
            borderColor: 'grey',
            borderRadius: '30px',
            backgroundColor: '#fff',
            color: theme.palette.secondary.main,
            width: '100%',
            fontSize: '20px',
            borderWidth: 2,
        },
        // width: '100%',
        // backgroundColor: 'transparent',
    },
    customIconButtonActive: {
        '& span': {
            color: theme.palette.primary.main,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    customIconButton: {
        '&:hover span': {
            color: theme.palette.primary.main,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
}));
