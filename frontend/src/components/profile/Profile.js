import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import Typography from '@material-ui/core/Typography';
import ProfileActions from './ProfileActions';
import Moment from 'react-moment';


const Profile = ({ getCurrentProfile, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);


    return loading && profile === null ? <Spinner/> : 
        <Fragment>
            <ProfileActions>
            </ProfileActions>
            <Typography variant="h6">
                Logged in user id: {profile.user_id}
                <ProfileActions>
            </ProfileActions>
            </Typography>
            <Typography variant="body1">
                {profile.first_name} {profile.last_name}
                <ProfileActions>
            </ProfileActions>
            </Typography>
            <Typography variant="body1">
                {profile.fame_rating} 
            </Typography>
            <Typography variant="body1">
                {profile.username}
            </Typography>
            <Typography variant="body1">
                {profile.chinese_horo}, {profile.western_horo}, <Moment format ='DD/MM/YYYY'>{profile.birth_date}</Moment>
            </Typography>
            <Typography variant="body1">
                {profile.gender} interested in {profile.sex_preference}
            </Typography>
            <Typography variant="h6">
                My self-summary
            </Typography>
            <Typography variant="body1">
                {profile.bio}
            </Typography>
            <Typography variant="h6">
                My passions
            </Typography>
            <Typography variant="body1">
                {profile.tags}
            </Typography>
        </Fragment>;
};

Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);