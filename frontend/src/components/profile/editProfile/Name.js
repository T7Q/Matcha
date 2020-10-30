import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateField } from '../../../services/validator';
import { editProfile } from '../../../actions/profile';

import WizardForm from '../../common/WizardForm';
import Input from '../../common/Input';
import { customStyles } from '../../../styles/customStyles';

const Name = ({ firstName, lastName }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstname: firstName,
        lastname: lastName,
    });
    const [errors, setErrors] = useState({
        firstnameError: '',
        lastnameError: '',
    });
    const classes = customStyles();

    const { firstname, lastname } = formData;
    const { firstnameError, lastnameError } = errors;

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const errorType = [name] + 'Error';
        const error = validateField(name, value);
        setErrors({ ...errors, [errorType]: error });
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (
            validateField('firstname', firstName) === '' &&
            validateField('lastname', lastname) === ''
        ) {
            const res = await dispatch(editProfile({ key: 'name', value: formData }));
            if (res && res.error) setErrors({ ...res.error });
        }
    };

    return (
        <WizardForm
            link="/profile/me"
            header="Edit name"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}>
            <>
                <Input
                    autoFocus
                    className={classes.input2}
                    name="firstname"
                    type="firstname"
                    value={firstname}
                    handleChange={onChange}
                    helperText={firstnameError}
                />
                <Input
                    className={classes.input2}
                    name="lastname"
                    type="lastname"
                    value={lastname}
                    handleChange={onChange}
                    helperText={lastnameError}
                />
            </>
        </WizardForm>
    );
};

export default Name;
