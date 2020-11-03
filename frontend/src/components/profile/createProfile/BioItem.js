import React from 'react';
import { Box, TextareaAutosize, Typography, FormHelperText, FormControl } from '@material-ui/core';
import { systemStyles } from '../../../styles/systemStyles';
import { componentStyles } from '../../../styles/componentStyles';

const BioItem = ({ bio, setData, error }) => {
    const classes = systemStyles();
    const classesCustom = componentStyles();

    return (
        <Box display="flex" flexDirection="column">
            <Box pb={2}>
                <Typography variant="h5">Introduce yourself</Typography>
            </Box>
            <TextareaAutosize
                name="bio"
                rowsMin={15}
                value={bio}
                className={classesCustom.bioInput}
                onChange={(e) => setData(e.target.value, 'bio')}
                placeholder="For example, how would your best friend discribe you"
            />
            <FormControl className={classes.mLeft20} error={error ? true : false}>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default BioItem;
