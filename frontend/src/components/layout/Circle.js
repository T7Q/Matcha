import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton, Grid, Box, LinearProgress, Button, useMediaQuery } from '@material-ui/core';
import { useStyles } from '../../styles/custom';
import { useTheme } from '@material-ui/core/styles';

const Circle = ({ isAuthenticated }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <>
            {!isAuthenticated && !isMobile ? (
                <Grid container className={classes.circle} item sm={6} xs={12}>
                    {/* <Box overflow="hidden" position="absolute" top="25%"> */}
                    <img className="circle" src={require('../../circle.png')} alt="circle" />
                    {/* </Box> */}
                </Grid>
            ) : (
                ''
            )}
        </>
    );
};

Circle.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Circle);
