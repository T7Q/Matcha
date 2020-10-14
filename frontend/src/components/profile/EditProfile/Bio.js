import React, { useState } from 'react';
import { TextareaAutosize, FormControl, FormHelperText } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import WizardForm from '../../common/WizardForm';

const Bio = ({ bioProp }) => {
    const [formData, setFormData] = useState({ bio: bioProp });

    const [errors, setErrors] = useState({ bioError: '' });
    const { bio } = formData;
    const { bioError } = errors;
    const classes = useStyles();

    const setData = value => {
        validate(value);
        setFormData({ bio: value });
    };

    const handleSubmit = async event => {
        try {
            console.log(bio);
            if (validate(bio)) {
                console.log('no error');
            }
            // const res = await axios.post('/profile/edit', { key: 'name', value: formData });
            // console.log('edit profile actions', res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const validate = value => {
        if (!bio) {
            setErrors({ bioError: 'required field' });
            return false;
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
                    onChange={e => setData(e.target.value, 'bio')}
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
