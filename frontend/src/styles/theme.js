import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = {
    main: '#ca416e',
    light: '#ff749c',
    dark: '#950043',
    contrastText: '#fff',
};

const secondaryColor = {
    main: '#0e1125',
    light: '#34374d',
    dark: '#000000',
    contrastText: '#fff',
};

const infoColor = {
    main: '#219bf1',
    light: '#6eccff',
    dark: '#006dbe',
    contrastText: '#fff',
};

const theme = createMuiTheme({
    palette: {
        primary: primaryColor,
        secondary: secondaryColor,
        info: infoColor,
        text: {
            primary: '#fff',
            secondary: '#b5bad3',
        },
        background: {
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
        MuiCssBaseline: {
            '@global': {
                '*::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '*::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px #12172d',
                    webkitBoxShadow: 'inset 0 0 6px #12172d',
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: '#252839',
                    outline: '1px solid #252839',
                },
            },
        },
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
                fontSize: '16px',
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
                // '&::-webkit-scrollbar': {
                //     width: '0.4em',
                // },
                // '&::-webkit-scrollbar-track': {
                //     boxShadow: 'inset 0 0 6px #12172d',
                //     webkitBoxShadow: 'inset 0 0 6px #12172d',
                // },
                // '&::-webkit-scrollbar-thumb': {
                //     backgroundColor: '#252839',
                //     outline: '1px solid #252839',
                // },
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

export default theme;
