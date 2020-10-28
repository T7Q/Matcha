import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextareaAutosize, FormControl, FormHelperText } from '@material-ui/core';

import { validateField } from '../../../services/validator';
import { editProfile } from '../../../actions/profile';

import { customStyles } from '../../../styles/customStyles';
import WizardForm from '../../common/WizardForm';

const Bio = ({ bioProp }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ bio: bioProp });
    const [errors, setErrors] = useState({ bioError: '' });

    const { bio } = formData;
    const { bioError } = errors;
    const classes = customStyles();

    const setData = (value) => {
        const error = validateField('bio', value);
        setErrors({ bioError: error });
        setFormData({ bio: value });
    };

    const handleSubmit = async () => {
        if (validateField('bio', bio) === '') {
            const res = await dispatch(editProfile({ key: 'bio', value: bio }));
            if (res && res.error) setErrors({ ...res.error });
        }
    };

    return (
        <WizardForm
            link="/profile/me"
            header="Edit bio"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}>
            <>
                <TextareaAutosize
                    name="bio"
                    rowsMin={15}
                    value={bio}
                    className={classes.bioInput}
                    onChange={(e) => setData(e.target.value, 'bio')}
                    placeholder="For example, how would your best friend discribe you"
                />
                <FormControl className={classes.ml} error={bioError ? true : false}>
                    <FormHelperText>{bioError}</FormHelperText>
                </FormControl>
            </>
        </WizardForm>
    );
};

export default Bio;
