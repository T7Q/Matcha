import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const SexPreferenceItem = ({ error, setData, formData }) => {
    const [realTags, setRealTags] = useState([]);

    useEffect(() => {
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

    return (
        <Box px={{ md: 5 }}>
            <Box pb={2}>
                <Typography variant="h5">You are passionate about ...</Typography>
            </Box>
            <Autocomplete
                onChange={(e, value) => {
                    setData(value, 'tags');
                }}
                multiple
                options={realTags}
                getOptionLabel={option => option}
                value={formData.tags}
                renderInput={params => (
                    <TextField
                        {...params}
                        error={error ? true : false}
                        helperText={error}
                        variant="outlined"
                        placeholder="passions"
                    />
                )}
            />
        </Box>
    );
};

export default SexPreferenceItem;
