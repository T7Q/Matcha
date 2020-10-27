import { makeStyles } from '@material-ui/core/styles';

export const chatStyles = makeStyles((theme) => ({
    chatGrid: {
        justifyContent: 'space-around',
    },
    // converstations: {
    background: theme.palette.background.secondary,
    // padding: '10px 20px 10px 20px',
    // "&.MuiPaper-elevation1": {
    //     boxShadow: "0px 15px 13px 0px rgba(0,0,0,0.2)",
    // },
    // boxShadow: "0px 15px 13px 0px rgba(0,0,0,0.2)",
    // },
    leftSide: {
        minHeight: '60vh',
        maxHeight: '60vh',
        background: theme.palette.background.secondary,
    },
    rightSide: {
        minHeight: '60vh',
        maxHeight: '60vh',
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
        // width: "inherit",
        background: theme.palette.background.default,
    },
    chat: {
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
