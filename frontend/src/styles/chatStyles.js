import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../images/background2.jpg';

export const chatStyles = makeStyles((theme) => ({
    header: {
        height: '150px',
        background: `url(${BackgroundImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
    },
    leftSide: {
        minHeight: '60vh',
        maxHeight: '60vh',
        background: theme.palette.background.secondary,
    },
    rightSide: {
        padding: '0 !important',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '16px !important',
        },
    },
    titleChats: {
        width: '90%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        color: theme.palette.primary.main,
    },
    listBox: {
        background: theme.palette.background.default,
        minHeight: '45vh',
        maxHeight: '45vh',
        width: '90%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    list: {
        maxHeight: '45vh',
        overflow: 'auto',
        background: theme.palette.background.default,
    },
    chat: {
        minHeight: '60vh',
        maxHeight: '60vh',
        border: '1px solid #252839',
        borderRadius: '30px',
        background: theme.palette.background.secondary,
    },
    inputField: {
        width: '100%',
        border: '1px solid ' + theme.palette.primary.main,
        borderRadius: '14px 14px 14px 14px',
        '& .MuiOutlinedInput-root': {
            '& :focus': {
                borderRadius: '14px 14px 14px 14px',
                background: theme.palette.background.default,
                border: '1px solid ' + theme.palette.primary.main,
            },
        },
        '& .MuiInputBase-root': {
            borderRadius: '14px 14px 14px 14px',
            '& :focus': {
                borderRadius: '14px 14px 14px 14px',
                background: 'yellow',
                border: '1px solid ' + theme.palette.primary.main,
            },
        },
    },
    conversationActiveList: {
        borderBottom: '1px solid #252839',
        backgroundColor: '#10183c',
    },
    conversationList: {
        borderBottom: '1px solid #252839',
        backgroundColor: 'inherit',
    },
    mine: {
        backgroundColor: '#0c1023',
        borderRadius: '14px 14px 0 14px',
        border: '1px solid #ff749c',
        padding: '16px',
        margin: '8px 0px 8px 80px',
        [theme.breakpoints.down('sm')]: {
            margin: '8px 0px 8px 15px',
        },
    },
    other: {
        backgroundColor: '#0c1023',
        borderRadius: '14px 14px 14px 0',
        border: '1px solid #ff749c',
        padding: '16px',
        margin: '8px 80px 8px 0',
        [theme.breakpoints.down('sm')]: {
            margin: '8px 15px 8px 0',
        },
    },
    date: {
        color: '#b5bad3',
        fontSize: 'small',
    },
    closeBlock: {
        position: 'absolute',
        left: '80%',
    },
}));
