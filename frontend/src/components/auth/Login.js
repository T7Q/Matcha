import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login({ username, password });
    };

    if (isAuthenticated) {
        return <Redirect to='/matches' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Sign Into Your Account
            </p>
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
                <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    // isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(null, { login })(Login);
