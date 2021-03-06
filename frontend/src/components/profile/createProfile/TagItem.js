import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import profileService from '../../../services/profileService';
import Input from '../../common/Input';

const TagItem = ({ error, setData, formData }) => {
    const [realTags, setRealTags] = useState([]);

    useEffect(() => {
        profileService.getTags().then((tags) => {
            setRealTags(tags.map((item) => item.tag));
        });
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
                getOptionLabel={(option) => option}
                value={formData.tags}
                renderInput={(params) => (
                    <Input
                        {...params}
                        customClass="input2"
                        helperText={error}
                        placeholder="passions"
                    />
                )}
            />
        </Box>
    );
};

export default TagItem;
