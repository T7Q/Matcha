import React from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import { getCountries } from 'countries-cities';
import Autocomplete from '@material-ui/lab/Autocomplete';
const CountryItem = ({ setFormData, formData }) => {
    const classes = useStyles();
    const countries = getCountries();

    return (
        <Box display="flex" flexDirection="column">
            <Box py={2}>
                <Typography variant="h5" className={classes.customHeader}>
                    Where do you primary live?
                </Typography>
            </Box>
            <Autocomplete
                onChange={(e, val) => setFormData({ ...formData, country: val })}
                options={countries}
                getOptionLabel={option => option}
                getOptionSelected={option => option}
                value={formData.country}
                renderInput={params => (
                    <TextField {...params} variant="standard" label="Country" placeholder="Country" />
                )}
            />
        </Box>
    );
};

export default CountryItem;
