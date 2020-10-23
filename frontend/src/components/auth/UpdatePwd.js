import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import WizardForm from '../common/WizardForm';
import { setSnackbar } from '../../actions/setsnackbar';

const UpdatePwd = ({ isAuthenticated, user, location, setSnackbar }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ passwordError: '', confirmPasswordError: '' });
    const searchParams = new URLSearchParams(location.search);
    const { password, confirmPassword } = formData;
    const { passwordError, confirmPasswordError } = errors;

    const validate = async (name, value) => {
        switch (name) {
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
                if (!password) {
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
            default:
        }
    };
    const onChange = e => {
        validate(e.target.name, e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async () => {
        if (!passwordError && !confirmPasswordError) {
            const dataToSubmit = { ...formData };
            dataToSubmit.userId = searchParams.get('user');
            dataToSubmit.token = searchParams.get('token');
            const res = await axios.post('/account/updatePwd', dataToSubmit);
            if (res.data.errors) {
                setErrors(res.data.errors);
            } else if (res.data.error) {
                setSnackbar(true, 'error', res.data.error);
                setErrors({ passwordError: '', confirmPasswordError: '' });
            } else {
                setSnackbar(true, 'success', res.data.msg);
                history.push('/login');
            }
        }
    };

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    return (
        <WizardForm formData={formData} setFormData={setFormData} onSubmit={onSubmit}>
            <>
                <Input
                    header="Enter your new password"
                    type="password"
                    value={password}
                    handleChange={onChange}
                    helperText={passwordError}
                />
                <Input
                    type="confirmPassword"
                    value={confirmPassword}
                    handleChange={onChange}
                    helperText={confirmPasswordError}
                />
            </>
        </WizardForm>
    );
};

UpdatePwd.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    setSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { setSnackbar })(UpdatePwd);
