import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import WizardForm from '../../common/WizardForm';
import { createProfile } from '../../../actions/profile';
import BirthdayItem from './BirthdayItem';
import CountryItem from './CountryItem';
import UploadItem from './UploadItem';
import BioItem from './BioItem';
import GenderItem from './GenderItem';
import SexPreferenceItem from './SexPreferenceItem';
import TagItem from './TagItem';

const ProfileCreation = ({ isAuthenticated, user, createProfile, history }) => {
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
        birthdateError: '',
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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const { birthdateError, countryError, genderError, sex_preferenceError, tagsError, bioError } = errors;

    const getAge = date => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const validateNext = async (name, props) => {
        switch (name) {
            case 'birthdate':
                if (!formData.birth_date) {
                    setErrors({ ...errors, birthdateError: 'required field' });
                    return false;
                }
                let age = getAge(formData.birth_date);
                if (age < 18) {
                    setErrors({
                        ...errors,
                        birthdateError: '18 years required',
                    });
                    return false;
                } else if (age > 120) {
                    setErrors({
                        ...errors,
                        birthdateError: 'You must be alive',
                    });
                    return false;
                }
                return true;
            case 'country':
                if (!formData.country) {
                    setErrors({ ...errors, countryError: 'required field' });
                    return false;
                }
                setErrors({ ...errors, countryError: '' });
                return true;
            case 'tags':
                if (formData.tags.length < 5) {
                    setErrors({ ...errors, tagsError: 'Choose minimum 5 tags' });
                    return false;
                }
                setErrors({ ...errors, tagsError: '' });
                return true;
            case 'gender':
                if (!formData.gender) {
                    setErrors({ ...errors, genderError: 'required field' });
                    return false;
                }
                setErrors({ ...errors, genderError: '' });
                return true;
            case 'sexPreference':
                if (!formData.sex_preference) {
                    setErrors({ ...errors, sex_preferenceError: 'required field' });
                    return false;
                }
                setErrors({ ...errors, sex_preferenceError: '' });
                return true;
            case 'bio':
                if (!formData.bio) {
                    setErrors({ ...errors, bioError: 'required field' });
                    return false;
                }
                if (formData.bio.length > 200) {
                    setErrors({ ...errors, bioError: 'should be less than 200 characters' });
                    return false;
                }
                setErrors({ ...errors, bioError: '' });
                return true;
            default:
                return true;
        }
    };

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (!isAuthenticated) {
        return <Redirect to="/" />;
    }

    const setData = (val, type) => {
        const errorType = type + 'Error';
        if (!val) {
            setErrors({ ...errors, [errorType]: 'required field' });
        } else {
            setErrors({ ...errors, [errorType]: '' });
        }
        setFormData({ ...formData, [type]: val });
    };

    const onSubmit = async e => {
        const dataToSubmit = { ...formData };
        delete dataToSubmit.currentStep;
        dataToSubmit.userId = user.userId;
        const errorsFromApi = await createProfile(dataToSubmit, images, history);
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
            <BirthdayItem error={birthdateError} name="birthdate" setFormData={setFormData} formData={formData} />
            <CountryItem error={countryError} name="country" setData={setData} formData={formData} />
            <GenderItem error={genderError} name="gender" formData={formData} setData={setData} />
            <SexPreferenceItem
                error={sex_preferenceError}
                name="sexPreference"
                formData={formData}
                setData={setData}
            />
            <TagItem error={tagsError} name="tags" formData={formData} setData={setData} />
            <UploadItem images={images} setImages={setImages} />
            <BioItem error={bioError} name="bio" bio={formData.bio} setData={setData} />
        </WizardForm>
    );
};

ProfileCreation.propTypes = {
    createProfile: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { createProfile })(withRouter(ProfileCreation));
