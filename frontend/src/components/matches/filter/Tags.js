import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { settingStyles } from '../../../styles/settingStyles';
import { updateFilter } from '../../../actions/match';

const Tags = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);
    const classesSetting = settingStyles();
    const [realTags, setRealTags] = useState([]);
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        let isMounted = true;
        async function getTags() {
            const res = await axios.get('/profile/tags');
            isMounted && setRealTags(res.data.map(item => item.tag));
        }
        setFormData(filter['tags']);
        getTags();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleInterestChange = (event, newValue) => {
        let selectedTags = [];
        if (newValue.length !== 0) {
            const temp = Object.entries(newValue);
            temp.forEach(([key, value]) => {
                selectedTags.push(value);
            });
        }
        setFormData(selectedTags);
        dispatch(updateFilter({
            ...filter,
            tags: selectedTags,
        }));
    };
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="interest-standard"
            onChange={handleInterestChange}
            options={realTags}
            getOptionLabel={(option) => option}
            // defaultValue={[]}
            value={formData}
            renderInput={(params) => (
                <TextField
                    className={classesSetting.tags}
                    {...params}
                    variant="standard"
                    label="Passionate about ..."
                />
            )}
        />
    );
};

export default Tags;
