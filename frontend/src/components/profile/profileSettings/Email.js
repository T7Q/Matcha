import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import { editProfile } from '../../../actions/profile';
import { validateField } from '../../../services/validator';
import { customStyles } from '../../../styles/customStyles';
import { updateUser } from '../../../actions/auth';

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
    const classes = customStyles();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = validateField('email', email);
        if (error) {
            setErrors({ ...errors, emailError: error });
        } else if (!password) {
            setErrors({ ...errors, passwordError: 'required field' });
        } else if (user.email === email) {
            setSnackbar(true, 'warning', 'No changes applied');
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
        <form onSubmit={handleSubmit} className={classes.alignCenter}>
            <FormGroup>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="email"
                            type="email"
                            className={classes.input2}
                            placeholder="new email"
                            value={email}
                            onChange={onChange}
                            error={emailError ? true : false}
                            helperText={emailError}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.input2}
                            variant="outlined"
                            type="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            error={passwordError ? true : false}
                            helperText={passwordError}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    className={`${classes.mainButton} ${classes.p2}`}>
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

export default Email;
