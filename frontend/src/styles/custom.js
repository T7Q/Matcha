import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ca416e',
            light: '#ff749c',
            dark: '#950043',
            contrastText: '#fff',
        },
        secondary: {
            main: '#0e1125',
            light: '#34374d',
            // main: '#000000',
            // light: '#2c2c2c',
            dark: '#000000',
            contrastText: '#fff',
        },
        text: {
            primary: '#b5bad3',
            secondary: '#fff',
        },
        background: {
            default: 'rgb(12, 16, 35, 0.95)',
        },
    },
    typography: {
        fontFamily: 'El Messiri, sans-serif',
        h2: {
            color: '#219bf1',
            fontWeight: 400,
            paddingBottom: '.5rem',
        },
    },
});

export const useStyles = makeStyles(theme => ({
    customButton: {
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
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    hoverTransparent: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    customTransparentButton: {
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
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    customHeader: {
        color: '#fff',
    },
    text: {
        fontSize: '10px',
    },
    pr: {
        paddingRight: '5px',
    },
    img: {
        width: '30px',
        padding: '0 5px',
    },
    circle: {
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50%',
        },
        alignItems: 'center',
    },
}));
