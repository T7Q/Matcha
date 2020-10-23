import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgetPwd } from '../../actions/auth';
import Input from '../common/Input';
import WizardForm from '../common/WizardForm';

const ForgetPwd = ({ forgetPwd, isAuthenticated, user }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({ email: '' });
    const [error, setError] = useState('');

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async () => {
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
        <WizardForm link="/login" formData={formData} setFormData={setFormData} onSubmit={onSubmit}>
            <Input
                header="Enter your email to reset your password"
                type="email"
                value={email}
                handleChange={onChange}
                helperText={error}
            />
        </WizardForm>
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

export default connect(mapStateToProps, { forgetPwd })(ForgetPwd);
