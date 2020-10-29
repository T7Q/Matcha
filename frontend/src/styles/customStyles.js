import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../background3.jpg';

export const customStyles = makeStyles((theme) => ({
    mainButton: {
        margin: '10px',
        fontSize: '16px',
        textTransform: 'capitalize',
        padding: '21px 30px 17px',
        borderRadius: '30px',
        marginBottom: '4px',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        minWidth: '170px',
        fontWeight: '500',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.background.default,
        },
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    secondButton: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.secondary,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    linkButton: {
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
    },
    googleBtn: {
        border: 'none',
        backgroundColor: theme.palette.background.secondary,
    },
    progress: {
        width: '75%',
        margin: '15px',
        padding: '5px',
    },
    input: {
        margin: '5px',
        '& label': {
            color: theme.palette.secondary.main,
            fontSize: '20px',
        },
        '& input': {
            textAlign: 'center',
        },
        '& .MuiOutlinedInput-root': {
            borderColor: 'grey',
            borderRadius: '30px',
            backgroundColor: '#fff',
            color: theme.palette.secondary.main,
            width: '100%',
            fontSize: '20px',
            borderWidth: 2,
        },
        // width: '100%',
        // backgroundColor: 'transparent',
    },
    input2: {
        width: '95%',
        margin: '10px',
        alignItems: 'center',
        '& label': {
            color: theme.palette.primary.light,
            fontSize: '16px',
            // marginLeft: '25%',
        },
        '& input': {
            textAlign: 'center',
        },
        '& label.Mui-focused': {
            // marginLeft: 0,
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '30px',
            width: '100%',
            fontSize: '16px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid ' + theme.palette.primary.light,
        },
    },
    bioInput: {
        // minHeight: '150px',
        minWidth: '400px',
        [theme.breakpoints.down('xs')]: {
            minWidth: '200px',
        },
    },
    ml: {
        marginLeft: '30px',
    },
    infoColor: {
        color: theme.palette.info.main,
    },
    img: {
        width: '40px',
        padding: '0 5px',
    },
    circle: {
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50%',
        },
        alignItems: 'center',
    },
    background: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    spinner: { width: '200px', margin: 'auto', display: 'block' },
    customIconButtonActive: {
        '& span': {
            color: theme.palette.primary.main,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    customIconButton: {
        '&:hover span': {
            color: theme.palette.primary.main,
        },
        borderRadius: '5px',
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    radio: {
        maxWidth: '300px',
        borderRadius: '30px !important',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '200px',
        },
    },
    alignCenter: {
        textAlign: 'center',
    },
}));
