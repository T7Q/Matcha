import React, { useState } from 'react';
import axios from 'axios';
import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import WizardForm from '../../common/WizardForm';
import Input from '../../common/Input';

const Name = ({ firstName, lastName }) => {
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
    const classes = useStyles();

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        validateLocal(e.target.name, e.target.value);
    };

    const handleSubmit = async event => {
        try {
            console.log(lastname, firstname);
            const isValid = validate();
            if (isValid) {
                console.log('no errors');
            }
            // const res = await axios.post('/profile/edit', { key: 'name', value: formData });
            // console.log('edit profile actions', res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const validateLocal = (type, value) => {
        const errorType = [type] + 'Error';
        if (!value) {
            setErrors({ ...errors, [errorType]: 'required field' });
        } else {
            const re = /^[A-Za-z0-9]{0,}$/;
            if (!re.test(value)) {
                setErrors({
                    ...errors,
                    [errorType]: 'Name must include letters and numbers only',
                });
            } else {
                setErrors({ ...errors, [errorType]: '' });
            }
        }
    };

    const validate = () => {
        let errorName = '';
        console.log('in validate ', 'first: ', firstname, 'last: ', lastname);
        if (!firstname) {
            errorName = 'required field';
        } else {
            const re = /^[A-Za-z0-9]{0,}$/;
            if (!re.test(firstname)) {
                errorName = 'Name must include letters and numbers only';
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
                    lastnameError: 'Name must include letters and numbers only',
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
        <WizardForm header="Edit name" formData={formData} setFormData={setFormData} onSubmit={handleSubmit}>
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
