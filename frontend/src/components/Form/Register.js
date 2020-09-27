import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Input from './Input';
import WizardForm from './WizardForm';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const Register = ({ setAlert, register, isAuthenticated, user, history }) => {
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
            register({ username, email, password, confirmPassword, lastname, firstname, history });
        }
    };

    return (
        <Fragment>
            <WizardForm header='Registration' setFormData={setFormData} formData={formData} onSubmit={onSubmit}>
                <Input type='email' header="Welcome! What's your email?" value={email} handleChange={onChange} />
                <Input type='username' header='Create a username' value={username} handleChange={onChange} />
                <Input
                    type='firstname'
                    header="What\'s your first name"
                    value={firstname}
                    handleChange={onChange}
                />
                <Input type='lastname' header="What\'s your last name" value={lastname} handleChange={onChange} />
                <Grid container direction='column' spacing={1}>
                    <Grid item>
                        <Input
                            type='password'
                            header='Create a password'
                            value={password}
                            handleChange={onChange}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            type='confirmPassword'
                            value={confirmPassword}
                            label='confirm password!'
                            handleChange={onChange}
                        />
                    </Grid>
                </Grid>
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

export default connect(mapStateToProps, { setAlert, register })(withRouter(Register));
