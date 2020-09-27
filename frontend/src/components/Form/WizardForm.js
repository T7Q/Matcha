import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';

const WizardForm = ({ header, children, formData, setFormData, onSubmit }) => {
    let step = formData.currentStep;
    const steps = children.length;

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
            <p>Step {step} of 5</p>

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
