import React from 'react';
import { Typography, Box } from '@material-ui/core';

const NotFound = () => {
    return (
        <Box textAlign="center" pt="50%">
            <Typography variant="h3">
                <i className="fas fa-exclamation-triangle" /> Page Not Found
            </Typography>
            <Box p={3}>
                <Typography>Sorry, this page does not exist</Typography>
            </Box>
        </Box>
    );
};

export default NotFound;
