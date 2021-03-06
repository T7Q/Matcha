import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import authService from '../../services/authService';
import { setSnackbar } from '../../actions/setsnackbar';

import Input from '../common/Input';
import WizardForm from '../common/WizardForm';

const ForgetPwd = ({ history }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ email: '' });
    const [error, setError] = useState('');
    const { email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async () => {
        if (!email) {
            setError('required field');
            return;
        }
        try {
            await authService.forgetPwd(email);
            dispatch(setSnackbar(true, 'success', 'Check your email'));
            setTimeout(() => history.push('/'), 1000);
        } catch (err) {
            setError(err.response.data);
        }
    };

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    return (
        <WizardForm link="/login" formData={formData} setFormData={setFormData} onSubmit={onSubmit}>
            <Input
                header="Enter your email to reset your password"
                type="email"
                value={email}
                handleChange={onChange}
                helperText={error}
            />
        </WizardForm>
    );
};

export default ForgetPwd;
