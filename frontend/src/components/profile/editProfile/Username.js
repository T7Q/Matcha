import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { validateAtBackend, validateField } from '../../../services/validator';
import { editProfile } from '../../../actions/profile';
import { updateUser } from '../../../actions/auth';
import { setSnackbar } from '../../../actions/setsnackbar';

import { customStyles } from '../../../styles/customStyles';
import Input from '../../common/Input';
import WizardForm from '../../common/WizardForm';

const Username = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        username: user.username,
    });
    const [errors, setErrors] = useState({
        usernameError: '',
    });
    const classes = customStyles();

    const { username } = formData;
    const { usernameError } = errors;

    const onChange = (e) => {
        const value = e.target.value;
        const error = validateField('username', value);
        setErrors({ ...error });
        setFormData({ username: value });
    };

    const handleSubmit = async () => {
        if (username === user.username) {
            dispatch(setSnackbar(true, 'warning', 'No changes applied'));
        } else {
            const error = await validateAtBackend('username', username);
            if (error === '') {
                const res = await dispatch(editProfile({ key: 'username', value: username }, true));
                if (res && res.error) {
                    setErrors({ ...res.error });
                } else {
                    dispatch(updateUser({ ...user, username: username }));
                }
            } else {
                setErrors({ ...error });
            }
        }
    };

    return (
        <WizardForm
            link="/profile/me"
            header="Edit username"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}>
            <Input
                autoFocus
                className={classes.input2}
                name="username"
                type="username"
                value={username}
                handleChange={onChange}
                helperText={usernameError}
            />
        </WizardForm>
    );
};

export default Username;
