import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import { setSnackbar } from '../../actions/setsnackbar';
import authService from '../../services/authService';
import { validateField } from '../../services/validator';

import Input from '../common/Input';
import WizardForm from '../common/WizardForm';

const UpdatePwd = ({ history }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ passwordError: '', confirmPasswordError: '' });
    const searchParams = new URLSearchParams(location.search);
    const { password, confirmPassword } = formData;
    const { passwordError, confirmPasswordError } = errors;

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const errorType = [name] + 'Error';
        const error = validateField(name, value, password);

        setErrors({ ...errors, [errorType]: error });
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async () => {
        if (!passwordError && !confirmPasswordError) {
            const dataToSubmit = {
                ...formData,
                userId: searchParams.get('user'),
                token: searchParams.get('token'),
            };
            const res = await authService.updatePwd(dataToSubmit);

            if (res.errors) {
                setErrors(res.errors);
            } else if (res.error) {
                dispatch(setSnackbar(true, 'error', res.error));
                setErrors({ passwordError: '', confirmPasswordError: '' });
            } else {
                dispatch(setSnackbar(true, 'success', res.msg));
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

export default UpdatePwd;
