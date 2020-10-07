import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from '../../styles/custom';

const Landing = ({ isAuthenticated, loading, history, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const handleRedirect = newRoute => {
        history.push(newRoute);
    };

    if (isAuthenticated) {
        return <Redirect to="/matches" />;
    }

    return (
        <Box pt="200px" display="flex" flexDirection="column" textAlign="center">
            <Typography variant={isMobile ? 'h3' : 'h2'}>Your love Is</Typography>
            <Typography className={classes.customHeader} variant={isMobile ? 'h3' : 'h2'}>
                In The Stars
            </Typography>
            <Button
                onClick={() => handleRedirect('/register')}
                variant="contained"
                color="primary"
                className={classes.customButton}>
                Create Account
            </Button>
            <Typography className={classes.customHeader} variant="h5">
                or
            </Typography>
            <Button
                onClick={() => handleRedirect('/login')}
                variant="contained"
                className={classes.customButton + ' ' + classes.p2}>
                <img className={classes.img} alt="google" src={require('../../google.png')} />
                Log in with Google
            </Button>
            <Button
                onClick={() => handleRedirect('/login')}
                color="secondary"
                className={classes.customTransparentButton}>
                Log in with username
            </Button>
        </Box>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
});

export default connect(mapStateToProps)(withRouter(Landing));
