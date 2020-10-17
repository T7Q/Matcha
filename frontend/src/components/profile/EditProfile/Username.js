import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WizardForm from '../../common/WizardForm';
import Input from '../../common/Input';
import { editProfile } from '../../../actions/profile';

const Username = ({ setSnackbar, editProfile, user }) => {
    const [formData, setFormData] = useState({
        username: user.username,
    });

    const [errors, setErrors] = useState({
        usernameError: '',
    });
    const { username } = formData;
    const { usernameError } = errors;

    const onChange = async e => {
        setFormData({ username: e.target.value });
        await validate(e.target.value);
    };

    const handleSubmit = async event => {
        if (await validate(username)) {
            try {
                const res = await axios.post('/profile/edit', { key: 'username', value: username });
                if (res.data.error) {
                    setErrors(res.data.error);
                } else {
                    user.username = username;
                    editProfile(user);
                    setSnackbar(true, 'success', res.data.msg);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const validate = async value => {
        if (!value) {
            setErrors({ usernameError: 'required field' });
        } else if (username === user.username) {
            setSnackbar(true, 'warning', 'No changes applied');
        } else {
            const re = /^[A-Za-z0-9]{0,}$/;
            if (!re.test(value)) {
                setErrors({ usernameError: 'Name must include letters and numbers only' });
            } else {
                const res = await axios.post('/account/validateData', { key: 'username', value: value });
                if (res.data.error && Object.keys(res.data.error).length > 0) {
                    setErrors(res.data.error);
                } else {
                    setErrors({ usernameError: '' });
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <WizardForm
            link="/profile/me"
            header="Edit username"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}>
            <Input
                name="username"
                type="username"
                value={username}
                handleChange={onChange}
                helperText={usernameError}
            />
        </WizardForm>
    );
};

Username.propTypes = {
    editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { editProfile })(Username);
