import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import WizardForm from '../../common/WizardForm';
import { createProfile } from '../../../actions/profile';
import { useStyles } from '../../../styles/custom';
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
        birth_date: '2010/05/05',
        tags: '',
        country: '',
        currentStep: 1,
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
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (!isAuthenticated) {
        return <Redirect to="/" />;
    }

    const validate = target => {
        console.log(target);
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        const dataToSubmit = formData;
        delete dataToSubmit.currentStep;
        dataToSubmit.userId = user.userId;
        // console.log(dataToSubmit);
        createProfile(dataToSubmit, images, history);
    };

    return (
        <WizardForm
            validate={validate}
            header="About you"
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}>
            <Box>
                <Typography className={classes.customHeader} variant={isMobile ? 'h5' : 'h4'}>
                    Set up your profile
                </Typography>
                <Typography className={classes.customHeader} variant={isMobile ? 'h5' : 'h4'}>
                    to meet new people
                </Typography>
            </Box>
            <BirthdayItem setFormData={setFormData} formData={formData} />
            <CountryItem setFormData={setFormData} formData={formData} />
            <GenderItem formData={formData} setFormData={setFormData} />
            <SexPreferenceItem formData={formData} setFormData={setFormData} />
            <TagItem formData={formData} setFormData={setFormData} />
            <UploadItem images={images} setImages={setImages} />
            <BioItem bio={formData.bio} onChange={onChange} />
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
