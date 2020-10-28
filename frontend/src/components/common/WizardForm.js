import React from 'react';
import { withRouter } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton, Box, LinearProgress, Button, Typography } from '@material-ui/core';
import { customStyles } from '../../styles/customStyles';
import { profileStyles } from '../../styles/profileStyles';

const WizardForm = ({
    header,
    children,
    formData,
    setFormData,
    onSubmit,
    history,
    validate,
    link,
    hideButton,
}) => {
    let step = formData.currentStep;
    let steps = 1;
    if (children) {
        steps = children.length;
    }
    if (!steps) {
        steps = 1;
    }
    const classes = customStyles();
    const classesProf = profileStyles();

    const next = () => {
        // If the current step is 1 or 2, then add one on "next" button click
        step = step >= steps ? steps : step + 1;
        setFormData({ ...formData, currentStep: step });
    };

    const prev = () => {
        // If the current step is 2 or 3, then subtract one on "previous" button click
        step = step <= 1 ? 1 : step - 1;
        setFormData({ ...formData, currentStep: step });
        // validate(children[step - 1].props.name, children[step - 1].props.value);
    };

    const handleRedirect = (newRoute) => {
        history.push(newRoute);
    };

    const normalise = (value) => ((value - 1) * 100) / (steps - 1);

    const formSubmit = async (e) => {
        e.preventDefault();
        if (steps === 1) {
            onSubmit();
        } else if (!(await validate(children[step - 1].props.name, children[step - 1].props))) {
            step < steps ? next() : onSubmit();
        }
    };

    return (
        <Box
            // width="auto"
            // pt="100px"
            pt={20}
            mb={{ xs: '80px' }}
            className={classesProf.editBox}>
            <form onSubmit={formSubmit}>
                <Box display="flex" alignItems="center" justifyContent="flex-start">
                    {/* <Box style={{ position: 'absolute', alignSelf: 'start' }}> */}
                    <IconButton
                        style={{ position: 'absolute' }}
                        onClick={
                            step === 1 || steps === 1
                                ? () => handleRedirect(link ? link : '/')
                                : prev
                        }>
                        <ArrowBackIosIcon fontSize="small" />
                    </IconButton>
                    {/* </Box> */}
                    {/* {steps === 1 && ( */}
                    <Typography style={{ marginLeft: 'auto', marginRight: 'auto' }} variant="h6">
                        {header}
                    </Typography>
                    {/* )} */}
                </Box>
                <Box display="flex" flexDirection="column" textAlign="center">
                    {steps === 1 ? (
                        <></>
                    ) : (
                        <Box display="flex" my={5} maxWidth="300px">
                            {/* <Typography variant="h6">{header}</Typography> */}
                            <LinearProgress
                                className={classes.progress}
                                variant="determinate"
                                value={normalise(step)}
                            />
                        </Box>
                    )}
                    {steps === 1 ? children : children[step - 1]}
                    {!hideButton && (
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.mainButton}>
                            {step < steps ? 'Next' : 'Done'}
                        </Button>
                    )}
                </Box>
            </form>
        </Box>
    );
};

export default withRouter(WizardForm);
