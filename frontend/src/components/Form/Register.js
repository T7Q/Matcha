import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Email from './Email';
import Input from './Input';
import Username from './Username';
import Password from './Password';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import WizardForm from './WizardForm';

const Register = ({ setAlert, register, isAuthenticated, user }) => {
    const [formData, setFormData] = useState({
        currentStep: 1,
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to='/complete' />;
    }

    const { username, firstname, lastname, email, password, confirmPassword } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log(username, email, password, firstname, lastname, confirmPassword);
            register({ username, email, password, confirmPassword, lastname, firstname });
        }
    };

    return (
        <Fragment>
            <WizardForm header='Registration' setFormData={setFormData} formData={formData} onSubmit={onSubmit}>
                <Input type='email' value={email} label='enter email!' handleChange={onChange} />
                <Input type='username' value={username} label='enter username!' handleChange={onChange} />
                <Input type='firstname' value={firstname} label='enter firstname!' handleChange={onChange} />
                <Input type='lastname' value={lastname} label='enter lastname!' handleChange={onChange} />
                <Fragment>
                    <Input type='password' value={password} label='enter password!' handleChange={onChange} />
                    <Input
                        type='password'
                        value={confirmPassword}
                        label='again password!'
                        handleChange={onChange}
                    />
                </Fragment>
            </WizardForm>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
