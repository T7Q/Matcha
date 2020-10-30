import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from '../images/background2.jpg';

export const settingStyles = makeStyles((theme) => ({
    header: {
        height: '150px',
        background: `url(${BackgroundImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
    },
    title: {
        color: '#219bf1',
    },
    tabs: {
        padding: 0,
        '& .MuiTab-wrapper': {
            flexDirection: 'row',
            justifyContent: 'start',
        },
        '& .MuiTab-root': {
            padding: 0,
        },
    },
    notification: {
        justifyContent: 'space-between',
        marginLeft: 0,
        marginRight: 0,
    },
    dNone: {
        display: 'none',
    },
    borderBottom: {
        borderBottom: '1px solid #252839',
    },
    list: {
        maxHeight: 350,
        overflow: 'auto',
        borderTop: '1px solid #252839',
    },
}));
