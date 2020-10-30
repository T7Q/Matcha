import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';

import CustomRouter from '../routing/CustomRouter';
import Circle from './Circle';
import { customStyles } from '../../styles/customStyles';

const Background = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const classes = customStyles();

    return (
        <Box flexGrow={1} className={isAuthenticated ? '' : classes.background}>
            <Grid style={{ minHeight: '80vh' }} container>
                <CustomRouter />
                <Circle />
            </Grid>
        </Box>
    );
};

export default Background;
