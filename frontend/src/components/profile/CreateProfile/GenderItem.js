import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useStyles } from '../../../styles/custom';

const CountryItem = ({ setFormData, formData }) => {
    const classes = useStyles();

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={formData.gender}
            exclusive
            onChange={(e, v) => {
                setFormData({ ...formData, gender: v });
            }}>
            <Box width={{ md: '300px' }} py={2}>
                <Typography variant="h5" className={classes.customHeader}>
                    You are ...
                </Typography>
            </Box>
            <ToggleButton className={classes.radio} name="man" value="man">
                Man
            </ToggleButton>
            <ToggleButton className={classes.radio} name="woman" value="woman">
                Woman
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default CountryItem;
