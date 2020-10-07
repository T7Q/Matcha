import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import { editProfile } from '../../../actions/profile';

const Email = ({ editProfile }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const classes = useStyles();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async event => {
        event.preventDefault();
        const result = await editProfile({ key: 'email', value: { email: email, password: password } });
        console.log(result);
        // if (result.data.error) {
        //     log
        // }
        console.log('submit email');
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

Email.propTypes = {
    editProfile: PropTypes.func.isRequired,
};

export default connect(null, { editProfile })(Email);
