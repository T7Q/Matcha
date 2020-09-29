import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ca416e',
            // light: '#7986cb',
            // dark: '#303f9f',
            contrastText: '#0f0f0f',
        },
        text: {
            primary: '#b5bad3',
            secondary: '#0f',
        },
        background: {
            default: 'rgb(12, 16, 35, 0.95)',
        },
        action: {
            hover: 'rgba(0, 0, 0)',
            hoverOpacity: 1,
        },
    },
});

export default theme;
