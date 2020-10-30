import React from 'react';
import { Box, Typography, FormHelperText, FormControl } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { customStyles } from '../../../styles/customStyles';
import { systemStyles } from '../../../styles/systemStyles';

const SexPreferenceItem = ({ error, setData, formData }) => {
    const classes = systemStyles();
    const classesCustom = customStyles();

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={formData.sex_preference}
            exclusive
            onChange={(e, value) => {
                setData(value, 'sex_preference');
            }}>
            <Box width={{ md: '300px' }} py={2}>
                <Typography variant="h5">You are looking for ...</Typography>
            </Box>
            <ToggleButton className={classesCustom.radio} name="man" value="man">
                Man
            </ToggleButton>
            <ToggleButton className={classesCustom.radio} name="woman" value="woman">
                Woman
            </ToggleButton>
            <ToggleButton className={classesCustom.radio} name="both" value="both">
                Both
            </ToggleButton>
            <FormControl className={classes.mLeft20} error={error ? true : false}>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </ToggleButtonGroup>
    );
};

export default SexPreferenceItem;
