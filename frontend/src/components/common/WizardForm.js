import React from 'react';
import { withRouter } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton, Box, LinearProgress, Button, Typography } from '@material-ui/core';
import { useStyles } from '../../styles/custom';

const WizardForm = ({ header, children, formData, setFormData, onSubmit, history }) => {
    let step = formData.currentStep;
    const steps = children.length;
    const classes = useStyles();

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

    const handleRedirect = newRoute => {
        history.push(newRoute);
    };

    const normalise = value => ((value - 1) * 100) / (steps - 1);

    const formSubmit = e => {
        e.preventDefault();
        step < steps ? next() : onSubmit();
    };

    return (
        <Box width="auto" pt="100px" mb={{ xs: '80px' }}>
            <form onSubmit={formSubmit}>
                <Box>
                    <IconButton onClick={step === 1 ? () => handleRedirect('/') : prev}>
                        <ArrowBackIosIcon fontSize="large" />
                    </IconButton>
                </Box>
                <Box display="flex" flexDirection="column" textAlign="center">
                    <Box display="flex" my={5} maxWidth="300px">
                        <Typography variant="h6">{header}</Typography>
                        <LinearProgress className={classes.root} variant="determinate" value={normalise(step)} />
                    </Box>
                    {children[step - 1]}
                    <Box mt={5}>
                        <Button variant="contained" color="primary" type="submit" className={classes.customButton}>
                            {step < steps ? 'Next' : 'Done'}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default withRouter(WizardForm);
