import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Grid } from '@material-ui/core';

import { updateUser } from '../../../actions/auth';
import { editProfile } from '../../../actions/profile';
import { validateField } from '../../../services/validator';
import Input from '../../common/Input';
import Button from '../../common/Button';

const Email = ({ setSnackbar }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email: user.email,
        password: '',
    });

    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
    });

    const { email, password } = formData;
    const { emailError, passwordError } = errors;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = validateField('email', email);
        if (error) {
            setErrors({ ...errors, emailError: error });
        } else if (!password) {
            setErrors({ ...errors, passwordError: 'required field' });
        } else if (user.email === email) {
            dispatch(setSnackbar(true, 'warning', 'No changes applied'));
        } else if (user.username === 'love') {
            dispatch(setSnackbar(true, 'warning', 'Changing demo user email is now allowed. Please create your own account.'));
        } else {
            const res = await dispatch(editProfile({ key: 'email', value: formData }));
            if (res && res.error) {
                setErrors({ ...res.error });
            } else {
                setFormData({ email: email, password: '' });
                dispatch(updateUser({ ...user, email: email }));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Input
                            type="email"
                            customClass="input2"
                            placeholder="new email"
                            value={email}
                            onChange={onChange}
                            helperText={emailError}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            customClass="input2"
                            type="password"
                            value={password}
                            helperText={passwordError}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit">Save</Button>
            </FormGroup>
        </form>
    );
};

export default Email;
