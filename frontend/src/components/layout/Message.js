import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

const Message = ({ message }) => (message ? <Typography variant="h2">{message}</Typography> : <Redirect to="/" />);

Message.propTypes = {
    message: PropTypes.string,
};

const mapStateToProps = state => ({
    message: state.auth.message,
});

export default connect(mapStateToProps)(Message);
