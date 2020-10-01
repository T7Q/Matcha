import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
        // action: {
        //     hover: 'rgba(0, 0, 0)',
        //     hoverOpacity: 1,
        // },
    },
});

export default theme;
