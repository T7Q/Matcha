import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { updateFilter } from '../../../actions/match';

const Orientation = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);

    const orientation = [
        { label: 'men interested in man', db: 'gay' },
        { label: 'women interested in woman', db: 'lesbian' },
        { label: 'women interested in man', db: 'straight_woman' },
        { label: 'men interested in woman', db: 'straight_man' },
        { label: 'women interested in woman and man', db: 'bi_woman' },
        { label: 'men interested in woman and man', db: 'bi_man' },
    ];

    const initial = filter['sex_orientation'] ? orientation.find((n) => n.db === filter['sex_orientation']) : "";
    const [formData, setFormData] = useState({
        label: filter['sex_orientation'] ? initial.label : "",
        db: filter['sex_orientation'] ? filter['sex_orientation']: "",
    });

    const handleOrientationChange = (event, newValue) => {
        let value = '';
        if (newValue !== null) {
            value = newValue.db;
            setFormData(newValue);
        } else {
            setFormData({label: "", db: ""});
        }
        dispatch(
            updateFilter({
                ...filter,
                sex_orientation: value,
            })
        );
    };
    return (
        <Autocomplete
            id="combo-box-demo"
            onChange={handleOrientationChange}
            options={orientation}
            getOptionLabel={(option) => option.label}
            value={formData}
            getOptionSelected={(option) => option}
            renderInput={(params) => <TextField {...params} label="I'm looking for ..." />}
        />
    );
};

export default Orientation;
