import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { componentStyles } from '../../styles/componentStyles';

const NotFound = () => {
    const classes = componentStyles();
    return (
        <Box textAlign="center" className={classes.notFound}>
            <Typography variant="h5" pt={20}>
                Oops! Page not found
            </Typography>
        </Box>
    );
};

export default NotFound;
