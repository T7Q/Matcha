import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            render={(props) =>
                loading ? (
                    <Spinner />
                ) : !isAuthenticated ? (
                    <Redirect to="/" />
                ) : user.status === 2 ? (
                    <Component {...rest} path={path} {...props} />
                ) : (
                    <Redirect to="/complete" />
                )
            }
        />
    );
};
export default PrivateRoute;
