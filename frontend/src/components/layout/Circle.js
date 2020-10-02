import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, useMediaQuery } from '@material-ui/core';
import { useStyles } from '../../styles/custom';
import { useTheme } from '@material-ui/core/styles';

const Circle = ({ isAuthenticated }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        !isAuthenticated &&
        !isMobile && (
            <Grid container className={classes.circle} item md={6} xs={12}>
                <img className="circle" src={require('../../circle.png')} alt="circle" />
            </Grid>
        )
    );
};

Circle.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Circle);
