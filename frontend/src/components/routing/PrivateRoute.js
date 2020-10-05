import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading, user }, path, history, ...rest }) => {
    // console.log("rest ", rest);
    // console.log("history ", history);
    // console.log("COMPONENT ", Component);
    // console.log("auth", isAuthenticated);

    return (
        <Route
            {...rest}
            render={props =>
                loading ? (
                    <></>
                ): !isAuthenticated ? (
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
export default connect(mapStateToProps)(withRouter(PrivateRoute));
