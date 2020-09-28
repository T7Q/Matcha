import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton, Grid, Box, LinearProgress, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '75%',
        margin: '15px',
    },
});

const WizardForm = ({ header, children, formData, setFormData, onSubmit }) => {
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

    const normalise = value => ((value - 1) * 100) / (steps - 1);

    return (
        <form onSubmit={onSubmit}>
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
            <Box display='flex'>
                <h3 style={{ verticalAlign: 'middle' }}>{header}</h3>
                <LinearProgress className={classes.root} variant='determinate' value={normalise(step)} />
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    {children[step - 1]}
                </Grid>
                <Grid item xs={6}></Grid>
                {step < steps ? (
                    <Grid item xs={6}>
                        <Button size='large' variant='contained' color='primary' onClick={next}>
                            Next
                        </Button>
                    </Grid>
                ) : (
                    step === steps && (
                        <Grid item xs={6}>
                            <Button size='large' variant='contained' color='primary' onClick={onSubmit}>
                                Done
                            </Button>
                        </Grid>
                    )
                )}
                <Grid item xs={6}></Grid>
            </Grid>
        </form>
    );
};

export default WizardForm;
