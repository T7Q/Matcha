import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MobileStepper from './MobileStepper';

const ProgressMobileStepper = ({ steps, activeStep }) => {
    const theme = useTheme();
    return <MobileStepper variant='progress' steps={steps} position='static' activeStep={activeStep} />;
};

ProgressMobileStepper.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withStyles(null, { withTheme: true })(ProgressMobileStepper);
