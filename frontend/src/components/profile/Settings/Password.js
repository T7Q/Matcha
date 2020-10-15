import React, { useState } from 'react';
import axios from 'axios';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
// import { editProfile } from '../../../actions/profile';

const Password = ({ setSnackbar }) => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        oldPasswordError: '',
        passwordError: '',
        confirmPasswordError: '',
    });

    const { oldPassword, newPassword, confirmPassword } = formData;
    const { oldPasswordError, passwordError, confirmPasswordError } = errors;
    const classes = useStyles();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        if (validate(oldPassword, newPassword, confirmPassword)) {
            try {
                const res = await axios.post('/profile/edit', { key: 'password', value: formData });
                if (res.data.error) {
                    setErrors(res.data.error);
                } else {
                    setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                    setSnackbar(true, 'success', res.data.msg);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const validate = (oldPwd, newPwd, confirmPwd) => {
        let oldPwdError = '';
        let newPwdError = '';
        if (!oldPwd) {
            oldPwdError = 'required field';
        }
        if (!newPwd) {
            newPwdError = 'required field';
        } else if (newPwd.length < 6) {
            newPwdError = 'Password must be at least 6 characters';
        } else {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
            if (!re.test(newPwd)) {
                newPwdError = 'At least 1 uppercase, 1 lowercase letter and 1 number required';
            }
        }
        if (!confirmPwd) {
            setErrors({
                oldPasswordError: oldPwdError,
                passwordError: newPwdError,
                confirmPasswordError: 'required field',
            });
        } else if (confirmPwd !== newPwd) {
            setErrors({
                oldPasswordError: oldPwdError,
                passwordError: newPwdError,
                confirmPasswordError: 'Passwords do not match',
            });
        } else if (oldPwdError) {
            setErrors({
                oldPasswordError: oldPwdError,
                passwordError: newPwdError,
            });
        } else if (newPwdError) {
            setErrors({
                passwordError: newPwdError,
            });
        } else {
            return true;
        }
        return false;
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="oldPassword"
                            type="password"
                            className={classes.customInput}
                            placeholder="old password"
                            value={oldPassword}
                            error={oldPasswordError ? true : false}
                            helperText={oldPasswordError}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.customInput}
                            variant="outlined"
                            type="password"
                            name="newPassword"
                            placeholder="new password"
                            value={newPassword}
                            error={passwordError ? true : false}
                            helperText={passwordError}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.customInput}
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
                    className={`${classes.customButton} ${classes.p2}`}>
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

export default Password;
