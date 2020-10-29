import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateField } from '../../../services/validator';
import { editProfile } from '../../../actions/profile';

import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { customStyles } from '../../../styles/customStyles';
import WizardForm from '../../common/WizardForm';

const SexPreference = ({ genderProp, sexPreferenceProp }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        gender: genderProp,
        sexPreference: sexPreferenceProp,
    });

    const [errors, setErrors] = useState({ genderError: '', sexPreferenceError: '' });
    const { gender, sexPreference } = formData;
    const { genderError, sexPreferenceError } = errors;
    const classes = customStyles();

    const setData = (value, type) => {
        const errorType = [type] + 'Error';
        const error = validateField(type, value);
        setErrors({ ...errors, [errorType]: error });
        setFormData({ ...formData, [type]: value });
    };

    const handleSubmit = async () => {
        if (gender && sexPreference) {
            const res = await dispatch(
                editProfile({
                    key: 'sex_preference',
                    value: formData,
                })
            );
            if (res && res.error) setErrors({ ...res.error });
        }
    };

    return (
        <WizardForm
            link="/profile/me"
            header="Edit sex preference"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}>
            <>
                <Autocomplete
                    onChange={(e, val) => setData(val, 'gender')}
                    options={['man', 'woman']}
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option) => option}
                    value={formData.gender}
                    renderInput={(params) => (
                        <TextField
                            autoFocus
                            {...params}
                            className={classes.input2}
                            error={genderError ? true : false}
                            helperText={genderError}
                            variant="outlined"
                            placeholder="gender"
                            label="I'm a ..."
                        />
                    )}
                />
                <Autocomplete
                    onChange={(e, val) => setData(val, 'sexPreference')}
                    options={['man', 'woman', 'both']}
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option) => option}
                    value={formData.sexPreference}
                    renderInput={(params) => (
                        <TextField
                            autoFocus
                            {...params}
                            className={classes.input2}
                            error={sexPreferenceError ? true : false}
                            helperText={sexPreferenceError}
                            variant="outlined"
                            placeholder="gender"
                            label="I'm am looking for"
                        />
                    )}
                />
            </>
        </WizardForm>
    );
};

export default SexPreference;
