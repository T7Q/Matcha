import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { CountryDropdown } from 'react-country-region-selector';
import { useStyles } from '../../../styles/custom';

const CountryItem = ({ country, setFormData, formData }) => {
    const classes = useStyles();

    return (
        <Box display="flex" flexDirection="column">
            <Box py={2}>
                <Typography variant="h5" className={classes.customHeader}>
                    Where do you primary live?
                </Typography>
            </Box>
            <CountryDropdown
                defaultOptionLabel="Please, select a country"
                className={classes.customSelect}
                value={formData.country}
                onChange={val => setFormData({ ...formData, country: val })}
            />
        </Box>
    );
};

export default CountryItem;
