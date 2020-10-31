import React from 'react';
import { getCountries } from 'countries-cities';
import { Box, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Input from '../../common/Input';

const CountryItem = ({ error, setData, formData }) => {
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
                    <Input autoFocus {...params} helperText={error} placeholder="Country" />
                )}
            />
        </Box>
    );
};

export default CountryItem;
