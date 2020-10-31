import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { componentStyles } from '../../../styles/componentStyles';

const UserAvatar = ({ handleClickOpen }) => {
    const { profile } = useSelector((state) => state.profile);
    const avatarAlt = profile.first_name + ' ' + profile.last_name;
    const classes = componentStyles();

    return (
        <Avatar
            className={classes.avatarImageStyle}
            onClick={handleClickOpen}
            alt={avatarAlt}
            src={profile.profile_pic_path}
            p={10}
        />
    );
};

export default UserAvatar;
