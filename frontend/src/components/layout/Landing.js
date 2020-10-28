import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';

import { customStyles } from '../../styles/customStyles';

const Landing = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const history = useHistory();
    const classes = customStyles();
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleRedirect = (newRoute) => {
        history.push(newRoute);
    };

    if (isAuthenticated) {
        return <Redirect to="/matches" />;
    }

    return loading ? (
        <>Loading</>
    ) : (
        <Box pt="200px" display="flex" flexDirection="column" textAlign="center">
            <Typography variant={isMobile ? 'h5' : 'h4'} className={classes.infoColor}>
                Your love Is Written
            </Typography>
            <Typography mb={2} variant={isMobile ? 'h4' : 'h3'}>
                In The Stars
            </Typography>
            <Button
                onClick={() => handleRedirect('/register')}
                variant="contained"
                className={`${classes.mainButton} ${classes.secondButton}`}>
                Create Account
            </Button>
            <Typography variant="h6">or</Typography>

            <Button onClick={() => handleRedirect('/login')} className={classes.mainButton}>
                Log in
            </Button>
            <Button
                onClick={() => handleRedirect('/login')}
                variant="contained"
                className={`${classes.mainButton} ${classes.googleBtn}`}>
                <img className={classes.img} alt="google" src={require('../../google.png')} />
                Log in with Google
            </Button>
        </Box>
    );
};

export default Landing;
