import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgetPwd } from '../../actions/auth';
import { IconButton, Button, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Input from '../common/Input';
import Form from '../common/IndividualForm';
import { useStyles } from '../../styles/custom';

const ForgetPwd = ({ forgetPwd, isAuthenticated, user, history }) => {
    const [formData, setFormData] = useState({ email: '' });
    const [error, setError] = useState('');

    const classes = useStyles();
    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRedirect = newRoute => {
        history.push(newRoute);
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (!email) {
            setError('required field');
            return;
        }
        const res = await forgetPwd({ email, history });
        if (res) setError(res);
    };

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    return (
        <Box pt="150px">
            <Box>
                <IconButton onClick={() => handleRedirect('/login')}>
                    <ArrowBackIosIcon fontSize="large" />
                </IconButton>
            </Box>
            <Form onSubmit={onSubmit}>
                <Input
                    header="Enter your email to reset your password"
                    type="email"
                    value={email}
                    handleChange={onChange}
                    helperText={error}
                />
                <Button className={classes.customButton} type="submit" variant="contained" color="primary">
                    Next
                </Button>
            </Form>
        </Box>
    );
};

ForgetPwd.propTypes = {
    forgetPwd: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { forgetPwd })(withRouter(ForgetPwd));
