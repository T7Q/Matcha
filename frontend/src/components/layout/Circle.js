import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMediaQuery, Box } from '@material-ui/core';

import { customStyles } from '../../styles/customStyles';
import circle from '../../images/circle.png';

const Circle = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const classes = customStyles();
    const isMobile = useMediaQuery('(max-width:960px)');

    return (
        !isMobile &&
        !isAuthenticated &&
        !loading && (
            <Grid container className={classes.circle} item md={6} xs={12}>
                <Box>
                    <img className="circle" src={circle} alt="circle" />
                </Box>
            </Grid>
        )
    );
};

export default Circle;
