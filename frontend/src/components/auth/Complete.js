import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Complete = ({ isAuthenticated, user }) => {
    // Redirect is logged in
    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return <div>Complete</div>;
};

Complete.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps)(Complete);
