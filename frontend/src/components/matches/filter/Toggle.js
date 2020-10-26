import React from 'react';

import { Switch, FormControlLabel } from '@material-ui/core';

import { filterStyles } from "../../../styles/filterStyles";

const Toggle = ({ name, labelText, updateFilter, filter }) => {
    const handleChange = event => {
        updateFilter({ ...filter, [event.target.name]: event.target.checked });
    };
    const labelTextFinal = `${labelText} astrology`;
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={filter[name]}
                    onChange={handleChange}
                    color="primary"
                    name={name}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            }
            className={classesFilter.toggle}
            // style={{color: 'red'}}
            label={labelTextFinal}
        />
    );
};

export default Toggle;
