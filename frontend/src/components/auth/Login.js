import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';

import authService from '../../services/authService';
import { login } from '../../actions/auth';
import { setSnackbar } from '../../actions/setsnackbar';

import Input from '../common/Input';
import WizardForm from '../common/WizardForm';
import { btnStyles } from '../../styles/btnStyles';

const Login = ({ history }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ usernameError: '', passwordError: '' });
    const { username, password } = formData;
    const classes = btnStyles();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ usernameError: '', passwordError: '' });
    };

    useEffect(() => {
        if (location.pathname === '/account/activate') {
            authService.activate(location.search).then((res) => {
                if (res.error) {
                    dispatch(setSnackbar(true, 'error', res.error));
                } else {
                    dispatch(setSnackbar(true, 'success', res.msg));
                }
                history.push('/login');
            });
        }
    }, [location, history, dispatch]);

    const sendLogin = async (data) => {
        const res = await dispatch(login(data));
        if (res && res.error) {
            setErrors({ usernameError: res.error, passwordError: res.error });
        }
    };

    const getPosition = async (position) => {
        const dataToSubmit = {
            ...formData,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        };
        sendLogin(dataToSubmit);
    };

    const errorInPosition = async () => {
        sendLogin(formData);
    };

    const onSubmit = async (e) => {
        if (!username || !password) {
            setErrors({
                usernameError: !username && 'username required',
                passwordError: !password && 'password required',
            });
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition, errorInPosition);
        } else {
            sendLogin(formData);
        }
    };

    // Redirect if logged in
    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    return (
        <WizardForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            hideButton={true}>
            <>
                <Input
                    header="Enter username and password"
                    type="username"
                    handleChange={onChange}
                    value={username}
                    helperText={errors.usernameError}
                />
                <Input
                    type="password"
                    handleChange={onChange}
                    value={password}
                    helperText={errors.passwordError}
                />
                <Button type="submit" className={classes.mainButton}>
                    Next
                </Button>
                <Button
                    className={`${classes.mainButton} ${classes.linkButton}`}
                    onClick={() => history.push('/forgetPwd')}>
                    Forgot password?
                </Button>
            </>
        </WizardForm>
    );
};

export default Login;
