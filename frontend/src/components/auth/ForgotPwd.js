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

const ForgetPwd = ({ forgetPwd, isAuthenticated, user, message, history }) => {
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;
    const classes = useStyles();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRedirect = newRoute => {
        history.push(newRoute);
    };

    const onSubmit = async e => {
        e.preventDefault();
        forgetPwd({ email, history });
    };

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    return (
        <Box>
            <Box ml="-40px">
                <IconButton color="inherit" onClick={() => handleRedirect('/login')}>
                    <ArrowBackIosIcon fontSize="large" />
                </IconButton>
            </Box>
            <Form onSubmit={onSubmit}>
                <Input
                    header="Enter your email to reset your password"
                    type="email"
                    value={email}
                    handleChange={onChange}
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
    message: PropTypes.string,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    message: state.message,
});

export default connect(mapStateToProps, { forgetPwd })(withRouter(ForgetPwd));
