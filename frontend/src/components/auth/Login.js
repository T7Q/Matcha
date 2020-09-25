import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { IconButton, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Login = ({ login, isAuthenticated, user }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login({ username, password });
    };

    // Redirect is logged in
    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to='/complete' />;
    }

    return (
        <Fragment>
            <Link to='/'>
                <IconButton>
                    <ArrowBackIosIcon />
                </IconButton>
            </Link>
            <p className='lead'>Enter username and password</p>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        minLength='6'
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Next' />
            </form>
            <Link to='/register'>
                <Button variant='contained' color='primary'>
                    Forgot password?
                </Button>
            </Link>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);
