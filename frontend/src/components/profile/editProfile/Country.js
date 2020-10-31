import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries } from 'countries-cities';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Box } from '@material-ui/core';

import { validateField } from '../../../services/validator';
import { editProfile } from '../../../actions/profile';

import WizardForm from '../../common/WizardForm';
import Input from '../../common/Input';

const Country = ({ setSnackbar, countryProp }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ country: countryProp });
    const [errors, setErrors] = useState({ countryError: '' });

    const { country } = formData;
    const { countryError } = errors;
    const countries = getCountries();

    const setData = (value) => {
        const error = validateField('country', value);
        setErrors({ countryError: error });
        setFormData({ country: value });
    };

    const handleSubmit = async () => {
        if (validateField('country', country) === '') {
            const res = await dispatch(editProfile({ key: 'country', value: country }, true));
            if (res && res.error) setErrors({ ...res.error });
        }
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
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option) => option}
                    value={country}
                    renderInput={(params) => (
                        <Input
                            autoFocus
                            customClass="input2"
                            {...params}
                            helperText={countryError}
                            placeholder="Country"
                        />
                    )}
                />
            </>
        </WizardForm>
    );
};

export default Country;
