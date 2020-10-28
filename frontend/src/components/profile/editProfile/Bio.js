import React, { useState } from 'react';
import axios from 'axios';
import { TextareaAutosize, FormControl, FormHelperText } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import WizardForm from '../../common/WizardForm';

const Bio = ({ setSnackbar, bioProp }) => {
    const [formData, setFormData] = useState({ bio: bioProp });

    const [errors, setErrors] = useState({ bioError: '' });
    const { bio } = formData;
    const { bioError } = errors;
    const classes = useStyles();

    const setData = (value) => {
        validate(value);
        setFormData({ bio: value });
    };

    const handleSubmit = async (event) => {
        if (validate(bio)) {
            try {
                const res = await axios.post('/profile/edit', { key: 'bio', value: bio });
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

    const validate = (value) => {
        if (!bio) {
            setErrors({ bioError: 'required field' });
            return false;
        } else if (bio.length > 200) {
            setErrors({ bioError: 'Bio should be between 1 to 200 characters' });
        } else {
            setErrors({ bioError: '' });
            return true;
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
