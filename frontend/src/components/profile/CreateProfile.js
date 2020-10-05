import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import LuxonUtils from '@date-io/luxon';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { DropzoneArea } from 'material-ui-dropzone';
import { Box, TextareaAutosize, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// import { setAlert } from '../../actions/alert';
import WizardForm from '../common/WizardForm';
import { createProfile } from '../../actions/profile';
import { useStyles } from '../../styles/custom';

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
        2: [],
        3: [],
        4: [],
        5: [],
    });
    const [realTags, setRealTags] = useState([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();

    useEffect(() => {
        let isMounted = true;
        async function getTags() {
            const res = await axios.get('profile/tags');
            isMounted && setRealTags(res.data);
        }
        getTags();
        return () => {
            isMounted = false;
        };
    }, []);

    if (isAuthenticated && user.status === 2) {
        return <Redirect to="/matches" />;
    } else if (!isAuthenticated) {
        return <Redirect to="/" />;
    }

    const { gender, sex_preference, bio, birth_date, tags, country } = formData;
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDate = date => {
        setFormData({ ...formData, birth_date: date });
    };

    const onSubmit = e => {
        const dataToSubmit = formData;
        delete dataToSubmit.currentStep;
        dataToSubmit.userId = user.userId;
        console.log(dataToSubmit);
        // createProfile(dataToSubmit, history);
        console.log(images);
    };

    return (
        <WizardForm header="About you" setFormData={setFormData} formData={formData} onSubmit={onSubmit}>
            {/* <Box>
                <Typography className={classes.customHeader} variant={isMobile ? 'h5' : 'h4'}>
                    Set up your profile
                </Typography>
                <Typography className={classes.customHeader} variant={isMobile ? 'h5' : 'h4'}>
                    to meet new people
                </Typography>
            </Box>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <Box py={2}>
                    <Typography variant="h5" className={classes.customHeader}>
                        When were you born?
                    </Typography>
                </Box>
                <DatePicker
                    disableFuture
                    inputVariant="outlined"
                    minDate="1902/01/01"
                    openTo="year"
                    format="yyyy/MM/dd"
                    // label="Date of birth"
                    // views={['year', 'month', 'date']}
                    value={birth_date}
                    onChange={handleDate}
                    className={classes.customInput}
                />
            </MuiPickersUtilsProvider>
            <Box display="flex" flexDirection="column">
                <Box py={2}>
                    <Typography variant="h5" className={classes.customHeader}>
                        Where do you primary live?
                    </Typography>
                </Box>
                <CountryDropdown
                    defaultOptionLabel="Please, select a country"
                    className={classes.customSelect}
                    value={country}
                    onChange={val => setFormData({ ...formData, country: val })}
                />
            </Box>
            <ToggleButtonGroup
                orientation="vertical"
                value={gender}
                exclusive
                onChange={(e, v) => {
                    setFormData({ ...formData, gender: v });
                }}>
                <Box width={{ md: '300px' }} py={2}>
                    <Typography variant="h5" className={classes.customHeader}>
                        You are ...
                    </Typography>
                </Box>
                <ToggleButton className={classes.radio} name="man" value="man">
                    Man
                </ToggleButton>
                <ToggleButton className={classes.radio} name="woman" value="woman">
                    Woman
                </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                orientation="vertical"
                value={sex_preference}
                exclusive
                onChange={(e, v) => {
                    setFormData({ ...formData, sex_preference: v });
                }}>
                <Box width={{ md: '300px' }} py={2}>
                    <Typography variant="h5" className={classes.customHeader}>
                        You are looking for ...
                    </Typography>
                </Box>
                <ToggleButton className={classes.radio} name="man" value="man">
                    Man
                </ToggleButton>
                <ToggleButton className={classes.radio} name="woman" value="woman">
                    Woman
                </ToggleButton>
                <ToggleButton className={classes.radio} name="both" value="both">
                    Both
                </ToggleButton>
            </ToggleButtonGroup>
            <Box px={{ md: 5 }}>
                <Box pb={2}>
                    <Typography variant="h5" className={classes.customHeader}>
                        You are passionate about ...
                    </Typography>
                </Box>
                <ToggleButtonGroup
                    style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    orientation="vertical"
                    value={tags}
                    onChange={(e, v) => {
                        setFormData({ ...formData, tags: v });
                    }}>
                    {realTags.map(tag => (
                        <ToggleButton key={tag.tag} className={classes.radio} name={tag.tag} value={tag.tag}>
                            {tag.tag}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box> */}
            <Box>
                <Box pb={2}>
                    <Typography variant="h5" className={classes.customHeader}>
                        Add photos of you
                    </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    {Object.keys(images).map(key => (
                        <Fragment key={key}>
                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                onChange={image => setImages({ key: image })}
                                showFileNames
                                initialFiles={images[key]}
                                dropzoneText="Add photo here"
                                showAlerts={false}
                                filesLimit={1}
                            />
                        </Fragment>
                    ))}
                </Box>
            </Box>
            <Fragment>
                <Box pb={2}>
                    <Typography variant="h5" className={classes.customHeader}>
                        Introduce yourself
                    </Typography>
                </Box>
                <TextareaAutosize
                    name="bio"
                    style={{ minWidth: '400px', minHeight: '150px' }}
                    onChange={onChange}
                    value={bio}
                    placeholder="For example, how would your best friend discribe you"
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
