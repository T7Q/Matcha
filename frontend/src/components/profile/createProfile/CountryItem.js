import React from 'react';
import { getCountries } from 'countries-cities';
import { Box, Typography, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { componentStyles } from '../../../styles/componentStyles';

const CountryItem = ({ error, setData, formData }) => {
    const classes = componentStyles();
    const countries = getCountries();

    return (
        <Box display="flex" flexDirection="column">
            <Box py={2}>
                <Typography variant="h5">Where do you primary live?</Typography>
            </Box>
            <Autocomplete
                onChange={(e, val) => setData(val, 'country')}
                options={countries}
                getOptionLabel={(option) => option}
                getOptionSelected={(option) => option}
                value={formData.country}
                renderInput={(params) => (
                    <TextField
                        autoFocus
                        {...params}
                        className={classes.input}
                        error={error ? true : false}
                        helperText={error}
                        variant="outlined"
                        placeholder="Country"
                    />
                )}
            />
        </Box>
    );
};

export default CountryItem;
