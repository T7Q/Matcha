import React, { Fragment } from 'react';
import { Box, TextareaAutosize, Typography, FormHelperText, FormControl } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';

const BioItem = ({ bio, setData, error }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Box pb={2}>
                <Typography variant="h5" className={classes.customHeader}>
                    Introduce yourself
                </Typography>
            </Box>
            <TextareaAutosize
                name="bio"
                rowsMin={15}
                value={bio}
                className={classes.bioInput}
                onChange={e => setData(e.target.value, 'bio')}
                placeholder="For example, how would your best friend discribe you"
            />
            <FormControl className={classes.ml} error={error ? true : false}>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </Fragment>
    );
};

export default BioItem;
