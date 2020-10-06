import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, useMediaQuery, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from '../../styles/custom';

const Circle = ({ auth: { isAuthenticated, user } }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        !isMobile &&
        !isAuthenticated && (
            <Grid container className={classes.circle} item md={6} xs={12}>
                <Box pt="200px">
                    <img className="circle" src={require('../../circle.png')} alt="circle" />
                </Box>
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
