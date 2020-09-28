import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Input from './Input';
import { makeStyles } from '@material-ui/core/styles';
import WizardForm from './WizardForm';
import { withRouter } from 'react-router-dom';
import {
    Grid,
    Select,
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    MenuItem,
    Button,
} from '@material-ui/core';
import { createProfile } from '../../actions/profile';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles({
    root: {
        padding: '5px',
    },
    radio: {
        margin: '5px',
        border: 'none',
        backgroundColor: 'white',
        color: 'black',
    },
});

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
    const classes = useStyles();

    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    const { gender, sex_preference, bio, birth_date, tags, country, region } = formData;
    const onChange = e => {
        // console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDate = e => {
        setFormData({ ...formData, birth_date: e });
    };

    const onSubmit = e => {
        e.preventDefault();
        // createProfile(formData, history);
        console.log(formData);
    };

    return (
        <WizardForm header='About you' setFormData={setFormData} formData={formData} onSubmit={onSubmit}>
            <Grid>
                <p className='lead'>
                    <i className='fas fa-user'></i>Set up your profile to meet new people
                </p>
            </Grid>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <h2>When were you born?</h2>
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
            <Fragment>
                <h2>Where do you primary live?</h2>
                <CountryDropdown
                    style={{
                        backgroundColor: 'white',
                        color: 'black',
                        margin: '10px',
                        fontSize: 20,
                    }}
                    value={country}
                    onChange={val => setFormData({ ...formData, country: val })}
                />
                <RegionDropdown
                    style={{
                        backgroundColor: 'white',
                        color: 'black',
                        margin: '10px',
                        fontSize: 20,
                    }}
                    blankOptionLabel='Please, select country'
                    defaultOptionLabel='Now select a region'
                    country={country}
                    value={region}
                    onChange={val => setFormData({ ...formData, region: val })}
                />
            </Fragment>
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
