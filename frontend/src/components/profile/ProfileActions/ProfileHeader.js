import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import LikeButton from "../../common/matchGallery/LikeButton";
import MoreInfo from "./MoreInfo";
import UserRating from "./UserRating";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const ProfileHeader = ({ profile, type }) => {
    const avatarAlt = profile.first_name + " " + profile.last_name;
    return (
        <>
            <Typography variant="h6">user id: {profile.user_id}</Typography>
            <Avatar alt={avatarAlt} src={"/" + profile.profile_pic_path} />
            <Typography variant="h3">
                {profile.first_name}{" "}
                {type === "otherUser" ? (
                    <LikeButton card={profile} location={"profile"} />
                ) : (
                    ""
                )}
            <UserRating profile={profile}/>
            </Typography>
            {type === "otherUser" ? <MoreInfo profile={profile} /> : ""}
            {/* <ProfileActions /> */}
            <Typography variant="body1">{profile.fame_rating}</Typography>
        </>
    );
};

export default ProfileHeader;