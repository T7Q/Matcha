import React, { useState } from 'react';
import axios from 'axios';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { TextareaAutosize, FormControl, FormHelperText, Button } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import WizardForm from '../../common/WizardForm';
import Input from '../../common/Input';

const Birthdate = ({ birthdateProp }) => {
    const [formData, setFormData] = useState({ birth_date: birthdateProp });

    const [errors, setErrors] = useState({ birthdateError: '' });
    const { birth_date } = formData;
    const { birthdateError } = errors;
    const classes = useStyles();

    const handleDate = date => {
        setFormData({ ...formData, birth_date: date });
    };

    const handleSubmit = async event => {
        try {
            console.log(birth_date);
            if (validate(birth_date)) {
                console.log('no error');
            }
            // const res = await axios.post('/profile/edit', { key: 'name', value: formData });
            // console.log('edit profile actions', res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAge = dob => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const validate = value => {
        if (!value) {
            setErrors({ birthdateError: 'required field' });
            return false;
        }
        let age = getAge(value);
        if (age < 18) {
            setErrors({ birthdateError: '18 years required' });
            return false;
        } else if (age > 120) {
            setErrors({ birthdateError: 'You must be alive' });
            return false;
        }
        setErrors({ birthdateError: '' });
        return true;
    };

    return (
        <WizardForm
            link="/profile/me"
            header="Edit birthdate"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <DatePicker
                    disableFuture
                    inputVariant="outlined"
                    minDate="1902/01/01"
                    openTo="year"
                    format="yyyy/MM/dd"
                    value={birth_date}
                    onChange={handleDate}
                    className={classes.customInput}
                    error={birthdateError ? true : false}
                    helperText={birthdateError}
                />
            </MuiPickersUtilsProvider>
        </WizardForm>
    );
};

export default Birthdate;
