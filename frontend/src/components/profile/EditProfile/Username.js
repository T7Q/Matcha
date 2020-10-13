import React, { useState } from 'react';
import axios from 'axios';
import WizardForm from '../../common/WizardForm';
import Input from '../../common/Input';

const Username = ({ usernameProp }) => {
    const [formData, setFormData] = useState({
        username: usernameProp,
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
        try {
            const isValid = await validate(username);
            if (isValid) {
                console.log('no errors');
            }
            // const res = await axios.post('/profile/edit', { key: 'name', value: formData });
            // console.log('edit profile actions', res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const validate = async value => {
        if (!value) {
            setErrors({ usernameError: 'required field' });
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
                header="Create a username"
                value={username}
                handleChange={onChange}
                helperText={usernameError}
            />
        </WizardForm>
    );
};

export default Username;
