import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';

import CustomRouter from '../routing/CustomRouter';
import Circle from './Circle';
import { componentStyles } from '../../styles/componentStyles';

const Background = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const classes = componentStyles();

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
