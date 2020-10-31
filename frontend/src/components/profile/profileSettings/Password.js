import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';

import { editProfile } from '../../../actions/profile';
import { validateField } from '../../../services/validator';
import { btnStyles } from '../../../styles/btnStyles';

const Password = () => {
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
    const classes = btnStyles();

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
        if (validate()) {
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
                        <TextField
                            variant="outlined"
                            name="oldPassword"
                            type="password"
                            className={classes.input2}
                            placeholder="old password"
                            value={oldPassword}
                            error={oldPasswordError ? true : false}
                            helperText={oldPasswordError}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.input2}
                            variant="outlined"
                            type="password"
                            name="password"
                            placeholder="new password"
                            value={password}
                            error={passwordError ? true : false}
                            helperText={passwordError}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.input2}
                            variant="outlined"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            error={confirmPasswordError ? true : false}
                            helperText={confirmPasswordError}
                            placeholder="confirm password!"
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.mainButton}>
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

export default Password;
