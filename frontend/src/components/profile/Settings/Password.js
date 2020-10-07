import React, { useState } from 'react';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';

const Password = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const { oldPassword, newPassword, confirmPassword } = formData;
    const classes = useStyles();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = event => {
        event.preventDefault();
        console.log('submit password');
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
