import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from "../background2.jpg";

export const chatStyles = makeStyles((theme) => ({
    header:{
        height: "150px",
        background: `url(${BackgroundImage}) no-repeat center center fixed`,
        backgroundSize: "cover",

    },
    headerText: {
        color: theme.palette.info.main,
    },
    chatGrid: {
        justifyContent: 'space-around',
        alignItems: "center",
    },
    leftSide: {
        minHeight: '60vh',
        maxHeight: '60vh',
        background: theme.palette.background.secondary,
    },
    rightSide: {
        paddingLeft: 0,
        paddingRight: 0,
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
}));