import { makeStyles } from '@material-ui/core/styles';
import MoonImage from '../images/moon1.jpg';

export const notFoundStyles = makeStyles((theme) => ({
    background: {
        height: '90vh',
        alignItems: 'center',
        backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${MoonImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
}));
