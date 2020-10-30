import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { updateFilter } from '../../../actions/match';

const orientation = [
    { label: 'men interested in man', db: 'gay' },
    { label: 'women interested in woman', db: 'lesbian' },
    { label: 'women interested in man', db: 'straight_woman' },
    { label: 'men interested in woman', db: 'straight_man' },
    { label: 'women interested in woman and man', db: 'bi_woman' },
    { label: 'men interested in woman and man', db: 'bi_man' },
];

const getValue = (input, array) => {
    const initial = input ? array.find((n) => n.db === input) : '';
    const result = {
        label: input ? initial.label : '',
        db: input ? input : '',
    };
    return result;
};

const Orientation = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);

    const handleOrientationChange = (event, newValue) => {
        let value = '';
        if (newValue !== null) {
            value = newValue.db;
        }
        dispatch(updateFilter({ ...filter, sex_orientation: value }));
    };
    return (
        <Autocomplete
            id="combo-box-demo"
            onChange={handleOrientationChange}
            options={orientation}
            getOptionLabel={(option) => option.label}
            value={getValue(filter['sex_orientation'], orientation)}
            getOptionSelected={(option) => option}
            renderInput={(params) => <TextField {...params} label="I'm looking for ..." />}
        />
    );
};

export default Orientation;
