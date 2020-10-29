import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from "@material-ui/core";
import { getCountries } from "countries-cities";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { updateFilter } from '../../../actions/match';

const Country = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);
    // const [formData, setFormData] = useState([]);
    const [formData, setFormData] = useState(filter['country']);

    const countries = getCountries();
    const handleCountryChange = (event, newValue) => {
        let value = "";
        if (newValue !== null) {
            value = newValue;
        }
        setFormData(value);
        dispatch(updateFilter({
            ...filter,
            country: value,
        }));
    };
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="country-standard"
            onChange={handleCountryChange}
            options={countries}
            getOptionLabel={(option) => option}
            value={formData}
            renderInput={(params) => (
                <TextField
                    {...params}
                    // variant="outlined"
                    variant="standard"
                    label="Living in ..."
                />
            )}
        />
    );
};

export default Country;
