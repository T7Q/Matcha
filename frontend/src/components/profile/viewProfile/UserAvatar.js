import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { profileStyles } from '../../../styles/profileStyles';

const UserAvatar = ({ handleClickOpen }) => {
    const { profile } = useSelector((state) => state.profile);
    const avatarAlt = profile.first_name + ' ' + profile.last_name;
    const classesProf = profileStyles();

    return (
        <Avatar
            className={classesProf.avatarImageStyle}
            onClick={handleClickOpen}
            alt={avatarAlt}
            src={profile.profile_pic_path}
            p={10}
        />
    );
};

export default UserAvatar;
