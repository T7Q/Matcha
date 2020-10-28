import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { register } from '../../actions/auth';
import { validateField, validateAtBackend } from '../../services/validator';

import Input from '../common/Input';
import WizardForm from '../common/WizardForm';

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
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
        if (name === 'email' || name === 'username') {
            const error = await validateAtBackend(name, props.value);
            if (error) {
                setErrors({ ...errors, ...error });
                return true;
            }
        }
        return false;
    };

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const errorType = [name] + 'Error';
        const error = validateField(name, value, password);

        setErrors({ ...errors, [errorType]: error });
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async () => {
        const dataToSubmit = { ...formData };
        delete dataToSubmit.currentStep;
        const errorsFromApi = await dispatch(register(dataToSubmit, history));
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

export default Register;
