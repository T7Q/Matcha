import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading, user },
    path,
    params,
    url,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props =>
                loading ? (
                    <Spinner />
                ) : !isAuthenticated ? (
                    <Redirect to="/" />
                ) : user.status === 2 ? (
                    <Component path={path} {...props} />
                ) : (
                    <Redirect to="/complete" />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
