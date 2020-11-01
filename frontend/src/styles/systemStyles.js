import { makeStyles } from '@material-ui/core/styles';

export const systemStyles = makeStyles((theme) => ({
    mLeft20: {
        marginLeft: '20px',
    },
    mr10: {
        marginRight: '10px',
    },
    mr0: {
        marginRight: '0px',
    },
    mb20: {
        marginBottom: '20px',
    },
    marginAuto: {
        margin: 'auto',
    },
    m0: {
        margin: 0,
    },
    padding: {
        padding: 0,
    },
    p10: {
        padding: '10px',
    },
    pl0: {
        paddingLeft: 0,
    },
    pl15: {
        paddingLeft: '15px',
    },
    plb0: {
        paddingLeft: 0,
        paddingBottom: 0,
    },
    pt10: {
        paddingTop: '10px',
    },
    pt50: {
        paddingTop: '50px',
    },
    pr5: {
        paddingRight: '5px',
    },
    py20: {
        paddingBottom: '20px',
        paddingTop: '20px',
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
    bgSecondary: {
        background: theme.palette.background.secondary,
    },
    bgSome: {
        backgroundColor: '#10183c',
    },
    alignCenter: {
        textAlign: 'center',
    },
    alignItems: {
        alignItems: 'center',
    },
    justifyContent: {
        justifyContent: 'center',
    },
    dNone: {
        display: 'none',
    },
    dFlex: {
        display: 'flex',
    },
    borderBottom: {
        borderBottom: '1px solid #252839',
    },
    floatRight: {
        float: 'right',
    },
    abs: {
        position: 'absolute',
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
    font05: {
        fontSize: '0.5em',
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
    img: {
        width: '40px',
        padding: '0 5px',
    },
    overWrap: {
        overflowWrap: 'normal',
    },
    minHeight80: {
        minHeight: '80px',
    },
}));
