import { makeStyles } from "@material-ui/core/styles";

export const profileStyles = makeStyles((theme) => ({
    h4: {
            color: '#219bf1',
            paddingTop: '2rem',
        },
    p: {
        alignItems: 'center',
    },
    avatarImageStyle: {
        margin: 'auto',
        width: "160px",
        height: "160px",
        
    },
    center: {
        alignItems: 'center',
    },
    rating: {
        padding: 0,
        alignItems: 'center',
    }
}));
