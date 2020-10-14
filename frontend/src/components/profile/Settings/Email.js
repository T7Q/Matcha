import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import { setSnackbar } from '../../../actions/setsnackbar';
import { editProfile } from '../../../actions/profile';

const Email = ({ setSnackbar, editProfile, user }) => {
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
    const classes = useStyles();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validate = () => {
        let errorPassword = '';
        if (!password) {
            errorPassword = 'required field';
        }
        if (!email) {
            setErrors({ ...errors, passwordErrod: errorPassword, emailError: 'required field' });
        } else if (errorPassword) {
            setErrors({ ...errors, passwordErrod: errorPassword, emailError: '' });
        } else {
            setErrors({ passwordError: '', emailError: '' });
            return true;
        }
        return false;
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            const res = await axios.post('/profile/edit', { key: 'email', value: formData });
            if (res.data.error) {
                setErrors(res.data.error);
            } else {
                user.email = email;
                editProfile(user);
                setSnackbar(true, 'success', res.data.msg);
                setErrors({ emailError: '', passwordError: '' });
                setFormData({ email: email, password: '' });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="email"
                            type="email"
                            className={classes.customInput}
                            placeholder="new email"
                            value={email}
                            onChange={onChange}
                            error={emailError ? true : false}
                            helperText={emailError}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.customInput}
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
                    className={`${classes.customButton} ${classes.p2}`}>
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

Email.propTypes = {
    setSnackbar: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { setSnackbar, editProfile })(Email);
