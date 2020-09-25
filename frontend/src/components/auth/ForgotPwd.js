import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgetPwd } from '../../actions/auth';
import { IconButton, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ForgetPwd = ({ forgetPwd, isAuthenticated, user, message, history }) => {
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        forgetPwd({ email, history });
    };

    if (message) {
        return <Redirect to='/matches' />;
    }
    // Redirect is logged in
    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to='/complete' />;
    }

    return (
        <Fragment>
            <Link to='/login'>
                <IconButton>
                    <ArrowBackIosIcon />
                </IconButton>
            </Link>
            <p className='lead'>Enter your email to reset your password</p>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Next' />
            </form>
        </Fragment>
    );
};

ForgetPwd.propTypes = {
    forgetPwd: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    message: PropTypes.string,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    message: state.message,
});

export default connect(mapStateToProps, { forgetPwd })(withRouter(ForgetPwd));
