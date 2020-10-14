import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import { getProfile } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';
import Bio from './Bio';
import Birthdate from './Birthdate';
import Name from './Name';
import Tag from './Tag';
import Username from './Username';
import SexPreference from './SexPreference';
// import Photos from './Photos';
import Country from './Country';
import Header from '../ProfileItems/Header';

const Edit = ({ getProfile, profile: { profile, loading }, ...props }) => {
    let type = props.match.params.type;

    useEffect(() => {
        getProfile('myProfile');
    }, [getProfile]);

    return loading ? (
        <Spinner />
    ) : (
        <Box mb="-50px">
            <Box mb="-100px">
                <Header profile={profile} type="me" />
            </Box>
            <Grid container justify="center">
                <Grid container item xs={12} sm={6} justify="center">
                    {(() => {
                        switch (type) {
                            case 'bio':
                                return <Bio bioProp={profile.bio} />;
                            case 'tags':
                                return <Tag />;
                            case 'name':
                                return <Name firstName={profile.first_name} lastName={profile.last_name} />;
                            case 'username':
                                return <Username usernameProp={profile.username} />;
                            case 'birthdate':
                                return <Birthdate birthdateProp={profile.birth_date} />;
                            case 'sexPreference':
                                return (
                                    <SexPreference
                                        genderProp={profile.gender}
                                        sexPreferenceProp={profile.sex_preference}
                                    />
                                );
                            case 'country':
                                return <Country countryProp={profile.country} />;
                            default:
                                return <>Page not found</>;
                        }
                    })()}
                </Grid>
            </Grid>
        </Box>
    );
};

Edit.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Edit);
