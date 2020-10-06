import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Box } from '@material-ui/core';
import { updatePwd } from '../../actions/auth';
import Input from '../common/Input';
import Form from '../common/IndividualForm';
import { useStyles } from '../../styles/custom';

const UpdatePwd = ({ updatePwd, isAuthenticated, user, history, ...props }) => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    // const token = props.location.search.split('=');
    // console.log(token);
    const classes = useStyles();
    const { password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        updatePwd({ password, confirmPassword, history });
    };

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to="/complete" />;
    }

    return (
        <Box>
            <Form onSubmit={onSubmit}>
                <Input header="Enter your new password" type="password" value={password} handleChange={onChange} />
                <Input type="confirmPassword" value={confirmPassword} handleChange={onChange} />
                <Button className={classes.customButton} type="submit" variant="contained" color="primary">
                    Upload & log in
                </Button>
            </Form>
        </Box>
    );
};

UpdatePwd.propTypes = {
    updatePwd: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { updatePwd })(withRouter(UpdatePwd));
