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
    TextareaAutosize,
    MenuItem,
    Button,
} from '@material-ui/core';
import { createProfile } from '../../actions/profile';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { DropzoneDialog, DropzoneAreaBase } from 'material-ui-dropzone';

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
            <ToggleButtonGroup
                orientation='vertical'
                value={gender}
                exclusive
                onChange={(e, v) => {
                    setFormData({ ...formData, gender: v });
                }}>
                <h2> &emsp;&emsp;&emsp;You are ... &emsp;&emsp;&emsp;</h2>
                <ToggleButton className={classes.radio} name='man' value='man'>
                    Man
                </ToggleButton>
                <ToggleButton className={classes.radio} name='woman' value='woman'>
                    Woman
                </ToggleButton>
                <ToggleButton className={classes.radio} name='other' value='other'>
                    Other
                </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                orientation='vertical'
                value={sex_preference}
                exclusive
                onChange={(e, v) => {
                    setFormData({ ...formData, sex_preference: v });
                }}>
                <h2>You are looking for ... &emsp;</h2>
                <ToggleButton className={classes.radio} name='man' value='man'>
                    Man
                </ToggleButton>
                <ToggleButton className={classes.radio} name='woman' value='woman'>
                    Woman
                </ToggleButton>
                <ToggleButton className={classes.radio} name='both' value='both'>
                    Both
                </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                orientation='vertical'
                value={tags}
                onChange={(e, v) => {
                    setFormData({ ...formData, tags: v });
                }}>
                <h2>You are passionate about ... &emsp;</h2>
                <ToggleButton className={classes.radio} name='Cooking' value='Cooking'>
                    Cooking
                </ToggleButton>
                <ToggleButton className={classes.radio} name='Foodie' value='Foodie'>
                    Foodie
                </ToggleButton>
                <ToggleButton className={classes.radio} name='Volunteering' value='Volunteering'>
                    Volunteering
                </ToggleButton>
            </ToggleButtonGroup>
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
