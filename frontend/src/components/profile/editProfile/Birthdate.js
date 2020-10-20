import React, { useState } from 'react';
import axios from 'axios';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { useStyles } from '../../../styles/custom';
import WizardForm from '../../common/WizardForm';

const Birthdate = ({ setSnackbar, birthdateProp }) => {
    const [formData, setFormData] = useState({ birthDate: birthdateProp });

    const [errors, setErrors] = useState({ birthdateError: '' });
    const { birthDate } = formData;
    const { birthdateError } = errors;
    const classes = useStyles();

    const handleDate = date => {
        setFormData({ ...formData, birthDate: date });
    };

    const handleSubmit = async event => {
        if (validate(birthDate)) {
            try {
                const res = await axios.post('/profile/edit', { key: 'birth_date', value: birthDate });
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
                    value={birthDate}
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
