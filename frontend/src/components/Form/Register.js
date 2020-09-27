import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Email from './Email';
import Input from './Input';
import Username from './Username';
import Password from './Password';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';

const Register = ({ setAlert, register, isAuthenticated, user }) => {
    const [formData, setFormData] = useState({
        currentStep: 1,
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to='/complete' />;
    }

    const { username, firstname, lastname, email, password, confirmPassword } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log(username, email, password, firstname, lastname, confirmPassword);
            register({ username, email, password, confirmPassword, lastname, firstname });
        }
    };

    const next = () => {
        let currentStep = formData.currentStep;
        // If the current step is 1 or 2, then add one on "next" button click
        currentStep = currentStep >= 2 ? 3 : currentStep + 1;
        setFormData({ ...formData, currentStep: currentStep });
    };

    const prev = () => {
        let currentStep = formData.currentStep;
        // If the current step is 2 or 3, then subtract one on "previous" button click
        currentStep = currentStep <= 1 ? 1 : currentStep - 1;
        setFormData({ ...formData, currentStep: currentStep });
    };

    return (
        <Fragment>
            {formData.currentStep === 1 ? (
                <Link to='/'>
                    <IconButton>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Link>
            ) : (
                <IconButton onClick={prev}>
                    <ArrowBackIosIcon />
                </IconButton>
            )}

            <h1>Registration</h1>
            <p>Step {formData.currentStep} of 5</p>

            <form onSubmit={onSubmit}>
                <Input
                    currentStep={formData.currentStep}
                    requiredStep={1}
                    type='email'
                    value={email}
                    label='enter email!'
                    handleChange={onChange}
                />
                <Email currentStep={formData.currentStep} handleChange={onChange} email={email} />
                <Username currentStep={formData.currentStep} handleChange={onChange} username={username} />
                <Username currentStep={formData.currentStep} handleChange={onChange} username={username} />
                <Username currentStep={formData.currentStep} handleChange={onChange} username={username} />
                <Password currentStep={formData.currentStep} handleChange={onChange} password={password} />
                {formData.currentStep < 3 && (
                    <button className='btn btn-primary float-right' type='button' onClick={next}>
                        Next
                    </button>
                )}
                {formData.currentStep === 3 && <button type='submit'>Submit</button>}
            </form>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
