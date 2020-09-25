import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading, user }, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated && !loading ? (
                <Redirect to='/login' />
            ) : user.status === 2 ? (
                <Component {...props} />
            ) : (
                <Redirect to='/complete' />
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
