import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import { validateField } from '../../../services/validator';
import { editProfile } from '../../../actions/profile';

import { customStyles } from '../../../styles/customStyles';
import WizardForm from '../../common/WizardForm';

const Birthdate = ({ birthdateProp }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ birthDate: birthdateProp });
    const [errors, setErrors] = useState({ birth_dateError: '' });

    const { birthDate } = formData;
    const { birth_dateError } = errors;
    const classes = customStyles();

    const handleDate = (date) => {
        const error = validateField('birth_date', date);
        setErrors({ birth_dateError: error });
        setFormData({ birthDate: date });
    };

    const handleSubmit = async (event) => {
        if (validateField('birth_date', birthDate) === '') {
            const res = await dispatch(editProfile({ key: 'birth_date', value: birthDate }, true));
            if (res && res.error) setErrors({ ...res.error });
        }
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
                    className={classes.input2}
                    error={birth_dateError ? true : false}
                    helperText={birth_dateError}
                />
            </MuiPickersUtilsProvider>
        </WizardForm>
    );
};

export default Birthdate;
