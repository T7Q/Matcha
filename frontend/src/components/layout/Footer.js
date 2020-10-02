import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Typography, Box, useMediaQuery } from '@material-ui/core';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        !isMobile && (
            <Box zIndex="1" textAlign="center" p={2} bgcolor="secondary.dark">
                <Typography>Tatiana Kuumola</Typography>
                <Typography>Diana Mukaliyeva</Typography>
            </Box>
        )
    );
};

export default Footer;
