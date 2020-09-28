import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Input from './Input';
import WizardForm from './WizardForm';
import { withRouter } from 'react-router-dom';
import { Grid, Select, MenuItem, InputLabel } from '@material-ui/core';
import { createProfile } from '../../actions/profile';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

const ProfileCreation = ({ isAuthenticated, user, createProfile, history }) => {
    const [formData, setFormData] = useState({
        gender: '',
        sex_preference: '',
        bio: '',
        birth_date: '2010-05-05',
        tags: '',
        country: '',
        currentStep: 1,
        region: '',
    });
    const [countries, setCountries] = useState([]);

    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    const { gender, sex_preference, bio, birth_date, tags, country, region } = formData;
    const onChange = e => {
        console.log(e);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDate = e => setFormData({ ...formData, birth_date: e });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <WizardForm header='About you' setFormData={setFormData} formData={formData} onSubmit={onSubmit}>
            <Grid>
                <p className='lead'>
                    <i className='fas fa-user'></i>Set up your profile to meet new people
                </p>
            </Grid>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <DatePicker
                    disableFuture
                    inputVariant='outlined'
                    minDate='1900-01-01'
                    openTo='year'
                    format='dd/MM/yyyy'
                    label='Date of birth'
                    views={['year', 'month', 'date']}
                    value={birth_date}
                    onChange={handleDate}
                />
            </MuiPickersUtilsProvider>
            {/* <Input type='username' header='Create a username' value={username} handleChange={onChange} />
            <Input type='firstname' header="What\'s your first name" value={firstname} handleChange={onChange} />
            <Input type='lastname' header="What\'s your last name" value={lastname} handleChange={onChange} /> */}
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
