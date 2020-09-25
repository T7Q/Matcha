import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePwd } from '../../actions/auth';
import { IconButton, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const UpdatePwd = ({ updatePwd, isAuthenticated, user, history }) => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const { password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        updatePwd({ password, confirmPassword, history });
    };

    // if (message) {
    //     return <Redirect to='/' />;
    // }
    // Redirect is logged in
    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (isAuthenticated && user.status === 1) {
        return <Redirect to='/complete' />;
    }

    return (
        <Fragment>
            <p className='lead'>Enter your new password</p>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='new password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                    />
                    <input
                        type='password'
                        placeholder='confirm password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Upload & log in' />
            </form>
        </Fragment>
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
