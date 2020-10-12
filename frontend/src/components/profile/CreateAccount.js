import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Input from '../common/Input';
import WizardForm from '../common/WizardForm';

const Register = ({ setAlert, register, isAuthenticated, user, history }) => {
    const [formData, setFormData] = useState({
        currentStep: 1,
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        usernameError: '',
        firstnameError: '',
        lastnameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
    });

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    const { username, firstname, lastname, email, password, confirmPassword } = formData;
    const {
        usernameError,
        firstnameError,
        lastnameError,
        emailError,
        passwordError,
        confirmPasswordError,
    } = errors;

    const validateNext = async (name, props) => {
        const value = props.value;
        switch (name) {
            case 'email':
                if (!value) {
                    setErrors({ ...errors, emailError: 'required field' });
                    return false;
                } else {
                    const res = await axios.post('/account/validateData', { key: 'email', value: value });
                    if (res.data.error) {
                        setErrors({ ...errors, emailError: res.data.error });
                        return false;
                    }
                    return true;
                }
            case 'username':
                if (!value) {
                    setErrors({ ...errors, usernameError: 'required field' });
                    return false;
                } else {
                    const res = await axios.post('/account/validateData', { key: 'username', value: value });
                    if (res.data.error) {
                        setErrors({ ...errors, usernameError: res.data.error });
                        return false;
                    }
                    return true;
                }
            case 'firstname':
                if (!value) {
                    setErrors({ ...errors, firstnameError: 'required field' });
                    return false;
                } else if (value.length < 2) {
                    setErrors({ ...errors, firstnameError: 'length requred more than 2 characters' });
                    return false;
                } else {
                    const re = /^[A-Za-z0-9]{0,}$/;
                    if (!re.test(value)) {
                        setErrors({ ...errors, firstnameError: 'Name must include letters and numbers only' });
                        return false;
                    }
                    return true;
                }
            case 'lastname':
                if (!value) {
                    setErrors({ ...errors, lastnameError: 'required field' });
                    return false;
                } else {
                    const re = /^[A-Za-z0-9]{0,}$/;
                    if (!re.test(value)) {
                        setErrors({ ...errors, lastnameError: 'Name must include letters and numbers only' });
                        return false;
                    }
                    return true;
                }
            case 'passwords':
                const passwordValue = props.password;
                const confirmPasswordValue = props.confirmpassword;
                let passwordError = '';
                if (!passwordValue) {
                    passwordError = 'required field';
                } else if (passwordValue.length < 6) {
                    passwordError = 'Password must be at least 6 characters';
                } else {
                    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
                    if (!re.test(passwordValue)) {
                        passwordError = 'At least 1 uppercase, 1 lowercase letter and 1 number required';
                    }
                }
                // console.log('password', passwordValue);
                // console.log('confpassword', confirmPasswordValue);
                if (!confirmPasswordValue) {
                    setErrors({ ...errors, passwordError: passwordError, confirmPasswordError: 'required field' });
                } else if (passwordValue !== confirmPasswordValue) {
                    setErrors({
                        ...errors,
                        passwordError: passwordError,
                        confirmPasswordError: 'Passwords do not match',
                    });
                } else if (passwordError) {
                    setErrors({ ...errors, passwordError: passwordError });
                } else {
                    return true;
                }
                return false;
        }
    };

    const validate = async (name, value) => {
        switch (name) {
            case 'email':
                if (!value) {
                    setErrors({ ...errors, emailError: 'required field' });
                } else {
                    setErrors({ ...errors, emailError: '' });
                }
                break;
            case 'username':
                if (!value) {
                    setErrors({ ...errors, usernameError: 'required field' });
                } else {
                    setErrors({ ...errors, usernameError: '' });
                }
                break;
            case 'firstname':
                if (!value) {
                    setErrors({ ...errors, firstnameError: 'required field' });
                } else if (value.length < 2) {
                    setErrors({ ...errors, firstnameError: 'length requred more than 2 characters' });
                } else {
                    setErrors({ ...errors, firstnameError: '' });
                }
                break;
            case 'lastname':
                if (!value) {
                    setErrors({ ...errors, lastnameError: 'required field' });
                } else {
                    setErrors({ ...errors, lastnameError: '' });
                }
                break;
            case 'password':
                if (!value) {
                    setErrors({ ...errors, passwordError: 'required field' });
                } else if (value.length < 6) {
                    setErrors({ ...errors, passwordError: 'Password must be at least 6 characters' });
                } else {
                    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
                    if (!re.test(value)) {
                        setErrors({
                            ...errors,
                            passwordError: 'At least 1 uppercase, 1 lowercase letter and 1 number required',
                        });
                    } else {
                        setErrors({ ...errors, passwordError: '' });
                    }
                }
                break;
            case 'confirmPassword':
                let passwordError = '';
                // console.log('valid confi pass', password);
                if (!password) {
                    // console.log('valid confi pass in pass', errors);
                    passwordError = 'required field';
                } else if (password.length < 6) {
                    passwordError = 'Password must be at least 6 characters';
                } else {
                    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
                    if (!re.test(password)) {
                        passwordError = 'At least 1 uppercase, 1 lowercase letter and 1 number required';
                    }
                }
                if (!value) {
                    setErrors({ ...errors, passwordError: passwordError, confirmPasswordError: 'required field' });
                } else if (password !== value) {
                    setErrors({
                        ...errors,
                        passwordError: passwordError,
                        confirmPasswordError: 'Passwords do not match',
                    });
                } else {
                    setErrors({ ...errors, passwordError: passwordError, confirmPasswordError: '' });
                }
                break;
        }
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        validate(e.target.name, e.target.value);
    };

    const onSubmit = async () => {
        const dataToSubmit = { ...formData };
        delete dataToSubmit.currentStep;
        const errorsFromApi = await register(dataToSubmit, history);
        if (errorsFromApi) {
            setErrors({ ...errors, ...errorsFromApi });
        }
    };

    return (
        <WizardForm
            validate={validateNext}
            header="Registration"
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}>
            <Input
                name="email"
                type="email"
                header="Welcome! What's your email?"
                value={email}
                handleChange={onChange}
                autoFocus
                helperText={emailError}
            />
            <Input
                name="username"
                type="username"
                header="Create a username"
                value={username}
                handleChange={onChange}
                helperText={usernameError}
            />
            <Input
                name="firstname"
                type="firstname"
                header="What's your first name"
                value={firstname}
                handleChange={onChange}
                helperText={firstnameError}
            />
            <Input
                name="lastname"
                type="lastname"
                header="What's your last name"
                value={lastname}
                handleChange={onChange}
                helperText={lastnameError}
            />
            <Grid
                name="passwords"
                password={password}
                confirmpassword={confirmPassword}
                container
                direction="column"
                spacing={1}>
                <Grid item>
                    <Input
                        type="password"
                        header="Create a password"
                        value={password}
                        handleChange={onChange}
                        autoFocus
                        helperText={passwordError}
                    />
                </Grid>
                <Grid item>
                    <Input
                        type="confirmPassword"
                        value={confirmPassword}
                        label="confirm password!"
                        handleChange={onChange}
                        helperText={confirmPasswordError}
                    />
                </Grid>
            </Grid>
        </WizardForm>
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

export default connect(mapStateToProps, { setAlert, register })(withRouter(Register));
