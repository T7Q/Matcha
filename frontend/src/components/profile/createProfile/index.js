import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Box, Typography, useMediaQuery } from '@material-ui/core';

import { createProfile } from '../../../actions/profile';
import { validateField } from '../../../services/validator';

import BirthdayItem from './BirthdayItem';
import CountryItem from './CountryItem';
import UploadItem from './UploadItem';
import BioItem from './BioItem';
import GenderItem from './GenderItem';
import SexPreferenceItem from './SexPreferenceItem';
import TagItem from './TagItem';
import WizardForm from '../../common/WizardForm';

const ProfileCreation = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        gender: '',
        sex_preference: '',
        bio: '',
        birth_date: '2000/05/05',
        tags: [],
        country: '',
        currentStep: 1,
    });

    const [errors, setErrors] = useState({
        birth_dateError: '',
        countryError: '',
        genderError: '',
        sex_preferenceError: '',
        tagsError: '',
        bioError: '',
    });

    const [images, setImages] = useState({
        1: [],
        base1: '',
        2: [],
        base2: '',
        3: [],
        base3: '',
        4: [],
        base4: '',
        5: [],
        base5: '',
    });

    const isMobile = useMediaQuery('(max-width:600px)');
    const {
        birth_dateError,
        countryError,
        genderError,
        sex_preferenceError,
        tagsError,
        bioError,
    } = errors;

    const validateNext = async (name) => {
        if (!name) return false;
        const errorType = [name] + 'Error';
        let error = await validateField(name, formData[[name]]);
        setErrors({ ...errors, [errorType]: error });
        return error;
    };

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (!isAuthenticated) {
        return <Redirect to="/" />;
    }

    const setData = (value, type) => {
        const errorType = type + 'Error';
        const error = validateField(type, value);
        setErrors({ ...errors, [errorType]: error });
        setFormData({ ...formData, [type]: value });
    };

    const onSubmit = async (e) => {
        const dataToSubmit = { ...formData };
        delete dataToSubmit.currentStep;
        dataToSubmit.userId = user.userId;
        const errorsFromApi = await dispatch(createProfile(dataToSubmit, images, history));
        if (errorsFromApi) {
            setErrors({ ...errors, ...errorsFromApi });
        }
    };

    return (
        <WizardForm
            validate={validateNext}
            header="About you"
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}>
            <Box>
                <Typography variant={isMobile ? 'h5' : 'h4'}>Set up your profile</Typography>
                <Typography variant={isMobile ? 'h5' : 'h4'}>to meet new people</Typography>
            </Box>
            <BirthdayItem
                error={birth_dateError}
                name="birth_date"
                setFormData={setFormData}
                formData={formData}
            />
            <CountryItem
                error={countryError}
                name="country"
                setData={setData}
                formData={formData}
            />
            <GenderItem error={genderError} name="gender" formData={formData} setData={setData} />
            <SexPreferenceItem
                error={sex_preferenceError}
                name="sex_preference"
                formData={formData}
                setData={setData}
            />
            <TagItem error={tagsError} name="tags" formData={formData} setData={setData} />
            <UploadItem images={images} setImages={setImages} />
            <BioItem error={bioError} name="bio" bio={formData.bio} setData={setData} />
        </WizardForm>
    );
};

export default ProfileCreation;
