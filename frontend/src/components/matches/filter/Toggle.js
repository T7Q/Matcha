import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, FormControlLabel } from '@material-ui/core';

import { updateFilter } from '../../../actions/match';
import { filterStyles } from '../../../styles/filterStyles';

const Toggle = ({ name, labelText }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);
    const classesFilter = filterStyles();
    const handleChange = (event) => {
        dispatch(updateFilter({ ...filter, [event.target.name]: event.target.checked }));
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
            label={labelTextFinal}
        />
    );
};

export default Toggle;
