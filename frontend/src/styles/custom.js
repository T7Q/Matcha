import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        common: {
            black: 'red',
            white: 'blue',
        },
        default: {
            main: '#ca416e',
        },
        primary: {
            main: '#ca416e',
            // light: '#7986cb',
            // dark: '#303f9f',
            // contrastText: '#fff',
        },
        background: {
            default: '#ca416e',
        },
    },
});

export default theme;
