import { makeStyles } from '@material-ui/core/styles';

export const systemStyles = makeStyles((theme) => ({
    mLeft20: {
        marginLeft: '20px',
    },
    marginAuto: {
        margin: 'auto',
    },
    padding: {
        padding: 0,
    },
    p5: {
        padding: '5px',
    },
    pr5: {
        paddingRight: '5px',
    },
    infoColor: {
        color: theme.palette.info.main,
    },
    primaryColor: {
        color: theme.palette.primary.main,
    },
    someColor: {
        color: theme.palette.text.secondary,
    },
    alignCenter: {
        textAlign: 'center',
    },
    dNone: {
        display: 'none',
    },
    borderBottom: {
        borderBottom: '1px solid #252839',
    },
    justifySpaceAround: {
        justifyContent: 'space-around',
    },
    floatRight: {
        float: 'right',
    },
    overflowY: {
        overflowY: 'auto',
    },
    fillPrimary: {
        fill: theme.palette.text.primary,
    },
    fillInfo: {
        fill: theme.palette.info.main,
    },
}));
