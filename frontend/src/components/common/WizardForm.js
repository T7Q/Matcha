import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton, Box, LinearProgress, Typography } from '@material-ui/core';
import { componentStyles } from '../../styles/componentStyles';
import { systemStyles } from '../../styles/systemStyles';
import Button from '../common/Button';

const WizardForm = ({
    header,
    children,
    formData,
    setFormData,
    onSubmit,
    validate,
    link,
    hideButton,
}) => {
    const history = useHistory();
    let step = formData.currentStep;
    let steps = 1;
    if (children) {
        steps = children.length;
    }
    if (!steps) {
        steps = 1;
    }
    const classesSystem = systemStyles();
    const classesProf = componentStyles();

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
        <Box pt={{ xs: 7, sm: 20 }} mb={{ xs: '80px' }} className={classesProf.editBox}>
            <form onSubmit={formSubmit}>
                <Box display="flex" alignItems="center" justifyContent="flex-start">
                    <IconButton
                        className={classesSystem.abs}
                        onClick={
                            step === 1 || steps === 1
                                ? () => handleRedirect(link ? link : '/')
                                : prev
                        }
                    >
                        <ArrowBackIosIcon fontSize="small" />
                    </IconButton>
                    <Typography className={classesSystem.marginAuto} variant="h6">
                        {header}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="column" textAlign="center">
                    {steps === 1 ? (
                        <Box pb={5}></Box>
                    ) : (
                        <Box width="250px" m="auto" my={5}>
                            <LinearProgress
                                className={classesProf.progress}
                                variant="determinate"
                                value={normalise(step)}
                            />
                        </Box>
                    )}
                    <Box display="flex" flexDirection="column" alignItems="center">
                        {steps === 1 ? children : children[step - 1]}
                    </Box>
                    <Box>
                        {!hideButton && (
                            <Button customClass="mainButton2" type="submit">
                                {step < steps ? 'Next' : 'Done'}
                            </Button>
                        )}
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default WizardForm;
