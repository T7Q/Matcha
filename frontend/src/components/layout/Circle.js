import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, useMediaQuery } from '@material-ui/core';
import { useStyles } from '../../styles/custom';
import { useTheme } from '@material-ui/core/styles';

const Circle = ({ auth: { isAuthenticated, user } }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        !isMobile &&
        (!isAuthenticated || user.status === 1) && (
            <Grid container className={classes.circle} item md={6} xs={12}>
                <img className="circle" src={require('../../circle.png')} alt="circle" />
            </Grid>
        )
    );
};

Circle.propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps)(Circle);
