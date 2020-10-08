import React, { useState } from 'react';
import axios from 'axios';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';

const Name = (firstName, lastName) => {
    const [formData, setFormData] = useState({
        firstname: firstName,
        lastname: lastName,
    });

    const { firstname, lastname } = formData;
    const classes = useStyles();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            // const res = await axios.post('/profile/edit', { key: 'name', value: formData });
            // console.log('edit profile actions', res.data);
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
                            name="firstname"
                            type="text"
                            className={classes.customInput}
                            placeholder="new email"
                            value={email}
                            onChange={onChange}
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

export default Name;
