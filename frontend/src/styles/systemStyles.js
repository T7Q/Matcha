import { makeStyles } from '@material-ui/core/styles';

export const systemStyles = makeStyles((theme) => ({
    mLeft20: {
        marginLeft: '20px',
    },
    mr10: {
        marginRight: '10px',
    },
    marginAuto: {
        margin: 'auto',
    },
    padding: {
        padding: 0,
    },
    plb0: {
        paddingLeft: 0,
        paddingBottom: 0,
    },
    p5: {
        padding: '5px',
    },
    pt10: {
        paddingTop: '10px',
    },
    pr5: {
        paddingRight: '5px',
    },
    infoColor: {
        color: theme.palette.info.main,
    },
    mainClr: {
        color: theme.palette.primary.main,
    },
    someColor: {
        color: theme.palette.text.secondary,
    },
    whiteColor: {
        color: theme.palette.text.primary,
    },
    bgMain: {
        backgroundColor: theme.palette.primary.main,
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
    fontSmall: {
        fontSize: 'small',
    },
    mobileText: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '10px',
        },
    },
    hideMedium: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    bottomXS: {
        [theme.breakpoints.down('xs')]: {
            top: 'auto',
            bottom: 0,
        },
    },
}));
