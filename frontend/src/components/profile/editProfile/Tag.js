import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import WizardForm from '../../common/WizardForm';

const Tag = ({ setSnackbar }) => {
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
            isMounted && setFormData(tagsFromApi.data.map(item => item.tag_name));
        }
        getTags();
        getUserTags();
        return () => {
            isMounted = false;
        };
    }, []);

    const { tagsError } = errors;

    const setData = val => {
        setFormData(val);
    };

    const handleSubmit = async event => {
        if (validate(formData)) {
            try {
                const res = await axios.post('/profile/editTags', { key: 'tags', value: formData });
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

    const validate = value => {
        if (formData.length < 5) {
            setErrors({ tagsError: 'Choose minimum 5 passions' });
            return false;
        } else if (formData.length > 10) {
            setErrors({ tagsError: 'Maximum 10 passions' });
            return false;
        }
        setErrors({ tagsError: '' });
        return true;
    };

    return (
        <WizardForm
            link="/profile/me"
            header="Edit passions"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}>
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
