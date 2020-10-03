import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { IconButton, Button, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Input from '../common/Input';
import Form from '../common/IndividualForm';
import { useStyles } from '../../styles/custom';

const Login = ({ login, isAuthenticated, user, history }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const classes = useStyles();
    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRedirect = newRoute => {
        history.push(newRoute);
    };

    const onSubmit = async e => {
        e.preventDefault();
        login({ username, password });
    };

    // Redirect is logged in
    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    return (
        <Box>
            <Box ml="-40px">
                <IconButton color="inherit" onClick={() => handleRedirect('/')}>
                    <ArrowBackIosIcon fontSize="large" />
                </IconButton>
            </Box>
            <Form onSubmit={onSubmit}>
                <Input
                    header="Enter username and password"
                    type="username"
                    handleChange={onChange}
                    value={username}
                />
                <Input type="password" handleChange={onChange} value={password} />
                <Button type="submit" variant="contained" color="primary">
                    Next
                </Button>
                <Link to="/forgetPwd">
                    <Button color="primary">Forgot password?</Button>
                </Link>
            </Form>
        </Box>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
