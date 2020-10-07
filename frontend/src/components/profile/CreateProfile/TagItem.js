import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useStyles } from '../../../styles/custom';

const SexPreferenceItem = ({ setFormData, formData }) => {
    const classes = useStyles();
    const [realTags, setRealTags] = useState([]);

    useEffect(() => {
        console.log('in use Effect');
        let isMounted = true;
        async function getTags() {
            const res = await axios.get('profile/tags');
            isMounted && setRealTags(res.data);
        }
        getTags();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Box px={{ md: 5 }}>
            <Box pb={2}>
                <Typography variant="h5" className={classes.customHeader}>
                    You are passionate about ...
                </Typography>
            </Box>
            <ToggleButtonGroup
                style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                orientation="vertical"
                value={formData.tags}
                onChange={(e, v) => {
                    setFormData({ ...formData, tags: v });
                }}>
                {realTags.map(tag => (
                    <ToggleButton key={tag.tag} className={classes.radio} name={tag.tag} value={tag.tag}>
                        {tag.tag}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
};

export default SexPreferenceItem;
