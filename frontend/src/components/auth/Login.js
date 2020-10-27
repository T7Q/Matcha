import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { login } from '../../actions/auth';
import Input from '../common/Input';
import WizardForm from '../common/WizardForm';
import { customStyles } from '../../styles/customStyles';
import { useStyles } from '../../styles/custom';
import { setSnackbar } from '../../actions/setsnackbar';

const Login = ({ login, isAuthenticated, user, setSnackbar }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ usernameError: '', passwordError: '' });

    const location = useLocation();
    const history = useHistory();
    const classes = customStyles();
    const classesCustom = useStyles();
    const { username, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        let isMounted = true;
        if (location.pathname === '/account/activate') {
            const goToBackend = async () => {
                const res = await axios.get(`/account/activate${location.search}`);
                if (isMounted) {
                    if (res.data.error) {
                        setSnackbar(true, 'error', res.data.error);
                    } else {
                        setSnackbar(true, 'success', res.data.msg);
                    }
                    history.push('/login');
                }
            };
            goToBackend();
        }
        return () => {
            isMounted = false;
        };
    }, [location, history, setSnackbar]);

    const handleRedirect = (newRoute) => {
        history.push(newRoute);
    };

    const sendLogin = async (data) => {
        const res = await login(data);
        if (res && res.error) {
            setErrors({
                usernameError: res.error,
                passwordError: res.error,
            });
        }
    };

    const getPosition = async (position) => {
        const dataToSubmit = { ...formData };
        dataToSubmit.longitude = position.coords.longitude;
        dataToSubmit.latitude = position.coords.latitude;
        sendLogin(dataToSubmit);
    };

    const errorInPosition = async (error) => {
        sendLogin(formData);
    };

    const onSubmit = async (e) => {
        if (!username || !password) {
            setErrors({
                usernameError: !username && 'username required',
                passwordError: !password && 'password required',
            });
            return;
        }
        if (navigator.geolocation) {
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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.mainButton}>
                    Next
                </Button>
                <Button
                    className={classesCustom.customLinkButton}
                    onClick={() => handleRedirect('/forgetPwd')}
                    color="secondary">
                    Forgot password?
                </Button>
            </>
        </WizardForm>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    setSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { login, setSnackbar })(Login);
