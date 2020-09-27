import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { IconButton, Button, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Input from '../Form/Input';
import Form from '../Form/Form';

const Login = ({ login, isAuthenticated, user }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login({ username, password });
    };

    // Redirect is logged in
    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to='/complete' />;
    }

    return (
        <Fragment>
            <Link to='/'>
                <IconButton>
                    <ArrowBackIosIcon />
                </IconButton>
            </Link>
            <Form onSubmit={onSubmit}>
                <Input
                    header='Enter username and password'
                    type='username'
                    handleChange={onChange}
                    value={username}
                />
                <Input type='password' handleChange={onChange} value={password} />

                <Button type='submit' variant='contained' color='primary'>
                    Next
                </Button>
                <Link to='/forgetPwd'>
                    <Button color='primary'>Forgot password?</Button>
                </Link>
            </Form>
            {/* <form onSubmit={onSubmit}>
                <Grid container direction='column' spacing={1}>
                    <Grid item>
                        <Input
                            header='Enter username and password'
                            type='username'
                            handleChange={onChange}
                            value={username}
                        />
                    </Grid>
                    <Grid item>
                        <Input type='password' handleChange={onChange} value={password} />
                    </Grid>
                    <Grid item>
                        <Button type='submit' variant='contained' color='primary'>
                            Next
                        </Button>
                    </Grid>
                    <Link to='/forgetPwd'>
                        <Button color='primary'>Forgot password?</Button>
                    </Link>
                </Grid>
            </form> */}
        </Fragment>
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

export default connect(mapStateToProps, { login })(Login);
