import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete } from '@material-ui/lab';
import { Box, Typography, TextField } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import WizardForm from '../../common/WizardForm';

const SexPreference = ({ setSnackbar, genderProp, sexPreferenceProp }) => {
    const [formData, setFormData] = useState({ gender: genderProp, sexPreference: sexPreferenceProp });

    const [errors, setErrors] = useState({ genderError: '', sexPreferenceError: '' });
    const { gender, sexPreference } = formData;
    const { genderError, sexPreferenceError } = errors;
    const classes = useStyles();

    const setData = (value, type) => {
        validate(value, type);
        setFormData({ ...formData, [type]: value });
    };

    const handleSubmit = async event => {
        if (gender && sexPreference) {
            try {
                const res = await axios.post('/profile/edit', { key: 'sex_preference', value: formData });
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

    const validate = (value, type) => {
        const errorType = type + 'Error';
        if (!value) {
            setErrors({ ...errors, [errorType]: 'required field' });
        } else {
            setErrors({ ...errors, [errorType]: '' });
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
                <Box width={{ md: '300px' }} py={2}>
                    <Typography variant="h6" className={classes.customHeader}>
                        I am ...
                    </Typography>
                </Box>
                <Autocomplete
                    onChange={(e, val) => setData(val, 'gender')}
                    options={['man', 'woman']}
                    getOptionLabel={option => option}
                    getOptionSelected={option => option}
                    value={formData.gender}
                    renderInput={params => (
                        <TextField
                            autoFocus
                            {...params}
                            className={classes.customInput}
                            error={genderError ? true : false}
                            helperText={genderError}
                            variant="outlined"
                            placeholder="gender"
                        />
                    )}
                />
                <Box width={{ md: '300px' }} py={2}>
                    <Typography variant="h6" className={classes.customHeader}>
                        I am looking for ...
                    </Typography>
                </Box>
                <Autocomplete
                    onChange={(e, val) => setData(val, 'sexPreference')}
                    options={['man', 'woman', 'both']}
                    getOptionLabel={option => option}
                    getOptionSelected={option => option}
                    value={formData.sexPreference}
                    renderInput={params => (
                        <TextField
                            autoFocus
                            {...params}
                            className={classes.customInput}
                            error={sexPreferenceError ? true : false}
                            helperText={sexPreferenceError}
                            variant="outlined"
                            placeholder="gender"
                        />
                    )}
                />
            </>
        </WizardForm>
    );
};

export default SexPreference;
