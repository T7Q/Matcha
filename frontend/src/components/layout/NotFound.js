import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { notFoundStyles } from '../../styles/notFoundStyles';

const NotFound = () => {
    const classNotFound = notFoundStyles();
    return (
        <Box textAlign="center" className={classNotFound.background}>
            <Typography variant="h5" pt={20}>
                Oops! Page not found
            </Typography>
        </Box>
    );
};

export default NotFound;
