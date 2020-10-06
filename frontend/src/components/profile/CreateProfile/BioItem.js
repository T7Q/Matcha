import React, { Fragment } from 'react';
import { Box, TextareaAutosize, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';

const BioItem = ({ bio, onChange }) => {
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
                style={{ minWidth: '400px', minHeight: '150px' }}
                onChange={onChange}
                value={bio}
                placeholder="For example, how would your best friend discribe you"
            />
        </Fragment>
    );
};

export default BioItem;
