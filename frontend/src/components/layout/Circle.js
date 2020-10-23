import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, useMediaQuery, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from '../../styles/custom';

const Circle = ({ auth: { isAuthenticated, loading } }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        !isMobile &&
        !isAuthenticated &&
        !loading && (
            <Grid container className={classes.circle} item md={6} xs={12}>
                <Box >
                {/* <Box pt="200px"> */}
                    <img className="circle" src={require('../../circle.png')} alt="circle" />
                </Box>
            </Grid>
        )
    );
};

Circle.propTypes = {
    auth: PropTypes.object,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Circle);
