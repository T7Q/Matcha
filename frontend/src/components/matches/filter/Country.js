import React from "react";

import { TextField } from "@material-ui/core";
import { getCountries } from "countries-cities";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Country = ({ updateFilter, filter }) => {
    const countries = getCountries();
    const handleCountryChange = (event, newValue) => {
        let value = "";
        if (newValue !== null) {
            value = newValue;
        }
        updateFilter({
            ...filter,
            country: value,
        });
    };
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="country-standard"
            onChange={handleCountryChange}
            options={countries}
            getOptionLabel={(option) => option}
            defaultValue={[]}
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
