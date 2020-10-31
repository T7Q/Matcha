import React from 'react';
import { Box, Typography, FormHelperText, FormControl } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { componentStyles } from '../../../styles/componentStyles';
import { systemStyles } from '../../../styles/systemStyles';

const CountryItem = ({ error, setData, formData }) => {
    const classesCustom = componentStyles();
    const classes = systemStyles();

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={formData.gender}
            exclusive
            onChange={(e, value) => {
                setData(value, 'gender');
            }}>
            <Box width={{ md: '300px' }} py={2}>
                <Typography variant="h5">You are ...</Typography>
            </Box>
            <ToggleButton className={classesCustom.radio} name="man" value="man">
                Man
            </ToggleButton>
            <ToggleButton className={classesCustom.radio} name="woman" value="woman">
                Woman
            </ToggleButton>
            <FormControl className={classes.mLeft20} error={error ? true : false}>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </ToggleButtonGroup>
    );
};

export default CountryItem;
