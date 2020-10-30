import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

import { validateField } from '../../../services/validator';
import profileService from '../../../services/profileService';
import { editTags } from '../../../actions/profile';

import WizardForm from '../../common/WizardForm';

const Tag = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState([]);
    const [realTags, setRealTags] = useState([]);
    const [errors, setErrors] = useState({ tagsError: '' });
    const { tagsError } = errors;

    useEffect(() => {
        let isMounted = true;
        async function getTags() {
            const res = await profileService.getTags();
            if (isMounted && !res.error) {
                setRealTags(res.map((item) => item.tag));
            }
        }
        getTags();
        async function getUserTags() {
            const res = await profileService.getUserTags();
            if (isMounted && !res.error) {
                setFormData(res.map((item) => item.tag_name));
            }
        }
        getUserTags();
        return () => {
            isMounted = false;
        };
    }, []);

    const setData = (value) => {
        const error = validateField('tags', value);
        setErrors({ tagsError: error });
        setFormData(value);
    };

    const handleSubmit = async () => {
        if (validateField('tags', formData) === '') {
            const res = await dispatch(editTags({ key: 'tags', value: formData }));
            if (res && res.error) setErrors({ ...res.error });
        }
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
                getOptionLabel={(option) => option}
                value={formData}
                renderInput={(params) => (
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
