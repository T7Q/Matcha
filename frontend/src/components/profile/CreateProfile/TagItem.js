import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup, Autocomplete } from '@material-ui/lab';
import { useStyles } from '../../../styles/custom';

const SexPreferenceItem = ({ setFormData, formData }) => {
    const classes = useStyles();
    const [realTags, setRealTags] = useState([]);

    useEffect(() => {
        console.log('in use Effect');
        let isMounted = true;
        async function getTags() {
            const res = await axios.get('profile/tags');
            isMounted && setRealTags(res.data.map(item => item.tag));
        }
        getTags();
        return () => {
            isMounted = false;
        };
    }, []);
    console.log(formData.tags);
    return (
        <Box px={{ md: 5 }}>
            <Box pb={2}>
                <Typography variant="h5" className={classes.customHeader}>
                    You are passionate about ...
                </Typography>
            </Box>
            <Autocomplete
                onChange={(e, v) => {
                    setFormData({ ...formData, tags: v });
                }}
                className={classes.customAutocomplete}
                multiple
                options={realTags}
                getOptionLabel={option => option}
                value={formData.tags}
                renderInput={params => (
                    <TextField {...params} variant="standard" label="Tags" placeholder="passions" />
                )}
            />
        </Box>
    );
};

export default SexPreferenceItem;
