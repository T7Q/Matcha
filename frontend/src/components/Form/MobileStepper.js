import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const StyledMobileStepper = withStyles({
    root: {
        background: 'lightslategray',
        maxWidth: 400,
        flexGrow: 1,
    },
    progress: {
        width: '100%',
    },
})(MobileStepper);

export default StyledMobileStepper;
