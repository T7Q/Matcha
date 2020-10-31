import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';

import { getProfile } from '../../../actions/profile';
import Bio from './Bio';
import Birthdate from './Birthdate';
import Name from './Name';
import Tag from './Tag';
import Username from './Username';
import SexPreference from './SexPreference';
import Country from './Country';
import Spinner from '../../layout/Spinner';
import Header from '../viewProfile/Header';

const Edit = () => {
    const { profile, loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    let { type } = useParams();

    useEffect(() => {
        dispatch(getProfile('myProfile'));
    }, [dispatch]);

    return loading ? (
        <Spinner />
    ) : (
        <Box mb="-50px">
            <Box mb="-100px">
                <Header profile={profile} type="myProfile" />
            </Box>
            <Grid container justify="center">
                <Grid container item xs={12} sm={6} justify="center">
                    {(() => {
                        switch (type) {
                            case 'bio':
                                return <Bio bioProp={profile.bio} />;
                            case 'tags':
                                return <Tag />;
                            case 'username':
                                return <Username />;
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
                            case 'name':
                            default:
                                return (
                                    <Name
                                        firstName={profile.first_name}
                                        lastName={profile.last_name}
                                    />
                                );
                        }
                    })()}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Edit;
