import React, { useEffect, useState } from 'react';
import { Badge, Avatar, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { componentStyles } from '../../../styles/componentStyles';
import UserAvatar from './UserAvatar';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        marginBottom: '-20px',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const StyledOfflineBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: 'black',
        color: 'black',
        marginBottom: '-20px',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid grey',
            content: '""',
        },
    },
}))(Badge);

const OnlineBadge = ({ socket, profile, handleClickOpen }) => {
    const [partnerIsOnline, setPartnerIsOnline] = useState(profile.online === 1 ? true : false);
    const classes = componentStyles();
    const date = new Date(profile.last_seen).toLocaleString();

    useEffect(() => {
        let isMounted = true;
        socket.on('ONLINE', (userId, online) => {
            if (isMounted && userId === profile.user_id) {
                setPartnerIsOnline(online);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [partnerIsOnline, socket, profile.user_id]);

    if (!partnerIsOnline)
        return (
            <Tooltip title={`last seen ${date}`}>
                <StyledOfflineBadge
                    className={classes.avatarImageStyle}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot">
                    <UserAvatar handleClickOpen={handleClickOpen} />
                </StyledOfflineBadge>
            </Tooltip>
        );
    else {
        return (
            <StyledBadge
                className={profile.online === 1 ? classes.avatarImageStyle : ''}
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot">
                <Avatar
                    className={classes.avatarImageStyle}
                    onClick={handleClickOpen}
                    alt="user profile"
                    src={profile.profile_pic_path}
                />
            </StyledBadge>
        );
    }
};

export default OnlineBadge;
