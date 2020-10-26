// import clsx from 'clsx';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const primaryColor = {
    main: '#ca416e',
    light: '#ff749c',
    dark: '#950043',
    contrastText: '#fff',
};

const secondaryColor = {
    main: '#0e1125',
    light: '#34374d',
    // main: '#000000',
    // light: '#2c2c2c',
    dark: '#000000',
    contrastText: '#fff',
};

const infoColor = {
    main: '#219bf1',
    light: '#6eccff',
    dark: '#006dbe',
    contrastText: '#fff',
};

export const theme = createMuiTheme({
    palette: {
        primary: primaryColor,
        secondary: secondaryColor,
        info: infoColor,
        text: {
            primary: '#fff',
            // primary: '#b5bad3',
            secondary: '#b5bad3',
        },
        background: {
            // default: "rgb(12, 16, 35, 0.95)",
            default: '#0c1023',
            secondary: '#12172d',
        },
    },
    typography: {
        fontFamily: 'El Messiri, sans-serif',
        // h2: {
        //     color: '#219bf1',
        //     fontWeight: 400,
        //     paddingBottom: '.5rem',
        // },
    },
    overrides: {
        MuiToggleButton: {
            root: {
                '&$selected, &$selected:hover': {
                    backgroundColor: primaryColor.main + ' !important',
                },
                margin: '5px',
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: primaryColor.light,
                },
                '& .MuiToggleButton-label': {
                    color: 'black',
                    fontSize: '20px',
                    textTransform: 'lowercase',
                },
            },
        },
        MuiIconButton: {
            root: {
                textTransform: 'capitalize',
                color: '#fff',
            },
        },
        MuiTab: {
            wrapper: {
                // flexDirection: 'row',
                // justifyContent: 'start',
                textTransform: 'capitalize',
                fontSize: 'medium',
            },
        },
        MuiDialog: {
            paper: {
                backgroundColor: '#34374d',
            },
        },
        MuiFormHelperText: {
            root: {
                '&.Mui-error': {
                    fontSize: 'medium',
                },
            },
        },
        // button in nav to capitalize
        MuiTypography: {
            button: {
                textTransform: 'capitalize',
            },
        },
        MuiDropzoneArea: {
            text: {
                color: '#000',
            },
            icon: {
                color: '#134261',
            },
        },
        MuiAutocomplete: {
            option: {
                color: '#0e1125',
            },
        },
        MuiDropzonePreviewList: {
            image: { height: 'auto' },
            removeButton: { position: 'relative' },
        },
        MuiTypography: {
            body1: {
                overflowWrap: 'anywhere',
            },
            button: {
                textTransform: 'capitalize',
                fontSize: '20px',
            },
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: primaryColor.main,
            },
        },
        MuiFormControlLabel: {
            label: {
                overflowWrap: 'normal',
            },
        },
        MuiList: {
            dense: {
                background: 'red',
                color: 'green',
            },
            root: {
                // background: '#12172d',
                color: 'white',
                width: '100%',
                '& .MuiListItem': {
                    border: '1px solid yellow',
                },
                '&::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px #12172d',
                    webkitBoxShadow: 'inset 0 0 6px #12172d',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#252839',
                    outline: '1px solid #252839',
                },
            },
        },
        MuiListItem: {
            root: {
                // borderTop: '1px solid #252839',
                // borderBottom: '1px solid #252839',
            },
        },
    },
});

export const useStyles = makeStyles((theme) => ({
    menu: {
        '& .MuiMenu-paper': {
            border: '1px solid #000',
            background: theme.palette.secondary.main,
        },
    },
    whiteInput: {
        // backgroundColor: '#fff',
        // color: '#000',
        // borderRadius: '30px',
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
    root: {
        width: '75%',
        margin: '15px',
        padding: '5px',
    },
    customRadio: {
        color: 'black',
    },
    radio: {
        maxWidth: '300px',
        borderRadius: '30px !important',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '200px',
        },
    },
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
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.secondary,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
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
    customHeader: {
        color: '#fff',
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    text: {
        fontSize: '10px',
    },
    pr: {
        paddingRight: '5px',
    },
    p2: {
        padding: '15px',
    },
    img: {
        width: '40px',
        padding: '0 5px',
    },
    circle: {
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50%',
        },
        alignItems: 'center',
    },
    customSelect: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '3px',
        height: '40px',
        fontSize: 20,
        width: '300px',
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '200px',
        },
    },
    customInput: {
        width: '95%',
        margin: '10px',
        alignItems: 'center',
        // backgroundColor: 'transparent',
        '& label': {
            color: theme.palette.secondary.main,
            fontSize: '16px',
            // marginLeft: '25%',
        },
        '& input': {
            textAlign: 'center',
        },
        '& label.Mui-focused': {
            // marginLeft: 0,
        },
        '& .MuiOutlinedInput-root': {
            borderColor: 'grey',
            borderRadius: '30px',
            backgroundColor: '#fff',
            color: theme.palette.secondary.main,
            width: '100%',
            fontSize: '16px',
            borderWidth: 2,
        },
    },
    bioInput: {
        // minHeight: '150px',
        minWidth: '400px',
        [theme.breakpoints.down('xs')]: {
            minWidth: '200px',
        },
    },
    ml: {
        marginLeft: '30px',
    },
}));
