import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton, Grid, Box, LinearProgress, Button } from '@material-ui/core';

const Circle = ({ isAuthenticated }) => {
    return (
        <>
            {!isAuthenticated ? (
                <Grid container item md={6} sm={12}>
                    <Box overflow='hidden' position='absolute' top='25%'>
                        <img className='circle' src={require('../../circle.png')} alt='circle' />
                    </Box>
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
