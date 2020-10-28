import React, { useState } from 'react';
import axios from 'axios';
import WizardForm from '../../common/WizardForm';
import Input from '../../common/Input';

const Name = ({ setSnackbar, firstName, lastName }) => {
    const [formData, setFormData] = useState({
        firstname: firstName,
        lastname: lastName,
    });

    const [errors, setErrors] = useState({
        firstnameError: '',
        lastnameError: '',
    });
    const { firstname, lastname } = formData;
    const { firstnameError, lastnameError } = errors;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        validateLocal(e.target.name, e.target.value);
    };

    const handleSubmit = async (event) => {
        if (validate()) {
            try {
                const res = await axios.post('/profile/edit', { key: 'name', value: formData });
                if (res.data.error) {
                    setErrors(res.data.error);
                } else {
                    setSnackbar(true, 'success', res.data.msg);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const validateLocal = (type, value) => {
        const errorType = [type] + 'Error';
        if (!value) {
            setErrors({ ...errors, [errorType]: 'required field' });
        } else if (value.length > 25) {
            setErrors({ ...errors, [errorType]: 'Should be between 1 to 25 characthers' });
        } else {
            const re = /^[A-Za-z0-9]{0,}$/;
            if (!re.test(value)) {
                setErrors({
                    ...errors,
                    [errorType]: 'must include letters and numbers only',
                });
            } else {
                setErrors({ ...errors, [errorType]: '' });
            }
        }
    };

    const validate = () => {
        let errorName = '';
        if (!firstname) {
            errorName = 'required field';
        } else {
            const re = /^[A-Za-z0-9]{0,}$/;
            if (!re.test(firstname)) {
                errorName = 'must include letters and numbers only';
            }
        }
        if (!lastname) {
            setErrors({ ...errors, firstnameError: errorName, lastnameError: 'required field' });
        } else {
            const re = /^[A-Za-z0-9]{0,}$/;
            if (!re.test(lastname)) {
                setErrors({
                    ...errors,
                    firstnameError: errorName,
                    lastnameError: 'must include letters and numbers only',
                });
            } else if (errorName) {
                setErrors({ ...errors, firstnameError: errorName });
            } else {
                setErrors({ ...errors, firstnameError: '', lastnameError: '' });
                return true;
            }
        }
        return false;
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
                    name="firstname"
                    type="firstname"
                    value={firstname}
                    handleChange={onChange}
                    helperText={firstnameError}
                />
                <Input
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
