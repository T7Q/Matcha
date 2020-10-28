import { makeStyles } from '@material-ui/core/styles';
// import BackgroundImage from "../background2.jpg";

export const settingStyles = makeStyles((theme) => ({
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
}));
