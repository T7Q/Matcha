import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton, MobileStepper, Button } from '@material-ui/core';
import Stepper from './Stepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
    root: {
        // maxWidth: 400,
        flexGrow: 1,
    },
    progress: {
        width: '75%',
    },
});

const WizardForm = ({ header, children, formData, setFormData, onSubmit }) => {
    let step = formData.currentStep;
    const classes = useStyles();
    const steps = children.length;
    const theme = useTheme();
    const next = () => {
        // If the current step is 1 or 2, then add one on "next" button click
        step = step >= steps ? steps : step + 1;
        setFormData({ ...formData, currentStep: step });
    };

    const prev = () => {
        // If the current step is 2 or 3, then subtract one on "previous" button click
        step = step <= 1 ? 1 : step - 1;
        setFormData({ ...formData, currentStep: step });
    };

    return (
        <Fragment>
            <Stepper steps={steps} activeStep={step - 1} />
            {step === 1 ? (
                <Link to='/'>
                    <IconButton>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Link>
            ) : (
                <IconButton onClick={prev}>
                    <ArrowBackIosIcon />
                </IconButton>
            )}
            <h1>{header}</h1>
            {/* <p>Step {step} of 5</p> */}

            {children[step - 1]}
            {step < steps && (
                <button className='btn btn-primary float-right' type='button' onClick={next}>
                    Next
                </button>
            )}
            {step === steps && <button onClick={onSubmit}>Submit</button>}
        </Fragment>
    );
};

export default WizardForm;
