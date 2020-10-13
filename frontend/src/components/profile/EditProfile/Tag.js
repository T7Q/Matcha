import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormControl, FormHelperText, Button } from '@material-ui/core';
import { getCountries } from 'countries-cities';
import { useStyles } from '../../../styles/custom';
import WizardForm from '../../common/WizardForm';
import Input from '../../common/Input';

const Tag = () => {
    const [formData, setFormData] = useState([]);
    const [realTags, setRealTags] = useState([]);
    const [errors, setErrors] = useState({ tagsError: '' });

    useEffect(() => {
        let isMounted = true;
        async function getTags() {
            const res = await axios.get('/profile/tags');
            isMounted && setRealTags(res.data.map(item => item.tag));
        }
        async function getUserTags() {
            const tagsFromApi = await axios.get('/profile/me/tags');
            console.log(tagsFromApi.data);
            isMounted && setFormData(tagsFromApi.data.map(item => item.tag_name));
        }
        getTags();
        getUserTags();
        return () => {
            isMounted = false;
        };
    }, []);

    const { tagsError } = errors;
    const classes = useStyles();

    const setData = val => {
        setFormData(val);
    };

    const handleSubmit = async event => {
        try {
            console.log(formData);
            if (validate(formData)) {
                console.log('no error');
            }
            // const res = await axios.post('/profile/edit', { key: 'name', value: formData });
            // console.log('edit profile actions', res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const validate = value => {
        if (formData.length < 5) {
            setErrors({ agsError: 'Choose minimum 5 tags' });
            return false;
        }
        setErrors({ tagsError: '' });
        return true;
    };

    return (
        <WizardForm header="Edit passions" formData={formData} setFormData={setFormData} onSubmit={handleSubmit}>
            <Autocomplete
                onChange={(e, value) => {
                    setData(value);
                }}
                multiple
                options={realTags}
                getOptionLabel={option => option}
                value={formData}
                renderInput={params => (
                    <TextField
                        {...params}
                        error={tagsError ? true : false}
                        helperText={tagsError}
                        variant="outlined"
                        placeholder="passions"
                    />
                )}
            />
        </WizardForm>
    );
};

export default Tag;