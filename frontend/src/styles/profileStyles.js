import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./custom";


export const profileStyles = makeStyles((theme) => ({

    h4: {
            color: '#219bf1',
            paddingTop: '2rem',
            align: 'center',
            // [theme.breakpoints.down('sm')]: {
            //     // align: 'left',
            //     color: 'red',
            // }
        },
    p: {
        alignItems: 'center',
    },
    avatarImageStyle: {
        margin: 'auto',
        width: "160px",
        height: "160px",
        display: 'flex',
        
    },
    center: {
        alignItems: 'center',
    },
    // bottom: {
    //     alignSelf: 'end',
    //     // justify: 'flex-end',
    // },
    // rating: {
    //     padding: 0,
    //     alignItems: 'center',
    // },
    ratingColor: {
        color: theme.palette.text.secondary,
    },
    buttonSize: {
        marginRight: '10px',
        size: 'large',
        [theme.breakpoints.down('sm')]: {
            size: 'small',
            color: 'pink'
        }
    },

}));
