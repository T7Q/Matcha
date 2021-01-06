import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Grid } from '@material-ui/core';

import { editProfile } from '../../../actions/profile';
import { validateField } from '../../../services/validator';
import { systemStyles } from '../../../styles/systemStyles';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { setSnackbar } from '../../../actions/setsnackbar';

const Password = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        oldPasswordError: '',
        passwordError: '',
        confirmPasswordError: '',
    });

    const { oldPassword, password, confirmPassword } = formData;
    const { oldPasswordError, passwordError, confirmPasswordError } = errors;
    const classes = systemStyles();

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const errorType = [name] + 'Error';
        const error = validateField(name, value, password);

        setErrors({ ...errors, [errorType]: error });
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        return (
            validateField('password', password) === '' &&
            validateField('oldPassword', oldPassword) === '' &&
            validateField('confirmPassword', confirmPassword, password) === ''
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.username === 'love') {
            dispatch(setSnackbar(true, 'warning', 'Changing demo user password is not allowed. Please create your own account.'));
        } else if (validate()) {
            const res = await dispatch(editProfile({ key: 'password', value: formData }));
            if (res && res.error) {
                setErrors({ ...res.error });
            } else {
                setFormData({ oldPassword: '', password: '', confirmPassword: '' });
            }
        } else {
            setErrors({
                passwordError: await validateField('password', password),
                confirmPasswordError: await validateField(
                    'confirmPassword',
                    confirmPassword,
                    password
                ),
                oldPasswordError: await validateField('oldPassword', oldPassword),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.alignCenter}>
            <FormGroup>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Input
                            name="oldPassword"
                            type="password"
                            customClass="input2"
                            placeholder="old password"
                            value={oldPassword}
                            helperText={oldPasswordError}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            customClass="input2"
                            type="password"
                            placeholder="new password"
                            value={password}
                            helperText={passwordError}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            customClass="input2"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            helperText={confirmPasswordError}
                            placeholder="confirm password!"
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit">Save</Button>
            </FormGroup>
        </form>
    );
};

export default Password;
