import React, { useState } from 'react';
import axios from 'axios';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
// import { editProfile } from '../../../actions/profile';

const Password = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const { oldPassword, newPassword, confirmPassword } = formData;
    const classes = useStyles();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        console.log('submit password');
        try {
            const res = await axios.post('/profile/edit', { key: 'password', value: formData });
            console.log('res in password', res.data);
        } catch (err) {
            console.log(err);
        }
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
