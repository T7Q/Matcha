import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { getCountries } from 'countries-cities';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { updateFilter } from '../../../actions/match';

const Country = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);

    const countries = getCountries();
    const handleCountryChange = (event, newValue) => {
        let value = '';
        if (newValue !== null) {
            value = newValue;
        }
        dispatch(
            updateFilter({
                ...filter,
                country: value,
            })
        );
    };
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="country-standard"
            onChange={handleCountryChange}
            options={countries}
            getOptionLabel={(option) => option}
            value={filter['country']}
            renderInput={(params) => (
                <TextField {...params} variant="standard" label="Living in ..." />
            )}
        />
    );
};

export default Country;
