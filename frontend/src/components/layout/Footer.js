import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, useMediaQuery, Button } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';

import { btnStyles } from '../../styles/btnStyles';

const Footer = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const isMobile = useMediaQuery('(max-width:600px)');
    const classes = btnStyles();

    const authors = [
        {
            name: 'tkuumola',
            github: 'https://github.com/T7Q',
        },
        {
            name: 'Dmukaliyeva',
            github: 'https://github.com/DianaMukaliyeva',
        },
    ];

    return (
        (!isMobile || !isAuthenticated) && (
            <Box
                zIndex="1"
                textAlign="center"
                p={2}
                bgcolor="secondary.main"
                color="text.secondary">
                <Typography variant="body2"> © Copyright 2020 All Rights Reserved. </Typography>
                {authors.map((value, index) => {
                    return (
                        <span key={index}>
                            <Tooltip title="Open GitHub" placement="top">
                                <Button
                                    target="_blank"
                                    href={value.github}
                                    className={classes.footerBtn}>
                                    {value.name}
                                </Button>
                            </Tooltip>
                            {index === 0 ? ' & ' : ''}
                        </span>
                    );
                })}
            </Box>
        )
    );
};

export default Footer;
