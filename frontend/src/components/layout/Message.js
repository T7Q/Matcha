import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Message = ({ message }) => (message ? <Fragment>{message}</Fragment> : <Redirect to='/' />);

Message.propTypes = {
    message: PropTypes.string,
};

const mapStateToProps = state => ({
    message: state.auth.message,
});

export default connect(mapStateToProps)(Message);
