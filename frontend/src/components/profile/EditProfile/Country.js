import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Box } from '@material-ui/core';
import { getCountries } from 'countries-cities';
import { useStyles } from '../../../styles/custom';
import WizardForm from '../../common/WizardForm';

const Country = ({ countryProp }) => {
    const [formData, setFormData] = useState({ country: countryProp });

    const countries = getCountries();
    const [errors, setErrors] = useState({ countryError: '' });
    const { country } = formData;
    const { countryError } = errors;
    const classes = useStyles();

    const setData = val => {
        setFormData({ country: val });
    };

    const handleSubmit = async event => {
        try {
            console.log(country);
            if (validate(country)) {
                console.log('no error');
            }
            // const res = await axios.post('/profile/edit', { key: 'name', value: formData });
            // console.log('edit profile actions', res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const validate = value => {
        if (!value) {
            setErrors({ ...errors, countryError: 'required field' });
            return false;
        }
        setErrors({ ...errors, countryError: '' });
        return true;
    };

    return (
        <WizardForm
            link="/profile/me"
            header="Edit country"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}>
            <>
                <Box width={{ md: '300px' }} py={2}></Box>
                <Autocomplete
                    onChange={(e, val) => setData(val)}
                    options={countries}
                    getOptionLabel={option => option}
                    getOptionSelected={option => option}
                    value={country}
                    renderInput={params => (
                        <TextField
                            autoFocus
                            {...params}
                            className={classes.customInput}
                            error={countryError ? true : false}
                            helperText={countryError}
                            variant="outlined"
                            placeholder="Country"
                        />
                    )}
                />
            </>
        </WizardForm>
    );
};

export default Country;
