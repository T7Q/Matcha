import React, { useEffect, useState } from 'react';
import { Badge, Avatar, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
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

const OnlineBadge = ({ profile, socket }) => {
    const [partnerIsOnline, setPartnerIsOnline] = useState(profile.online === 1 ? true : false);
    const date = new Date(profile.last_seen).toLocaleString();

    useEffect(() => {
        let isMounted = true;
        socket.on('ONLINE', (userId, online) => {
            if (isMounted && userId === profile.partner_id) {
                setPartnerIsOnline(online);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [partnerIsOnline, socket, profile.partner_id]);

    if (!partnerIsOnline)
        return (
            <Tooltip title={`last seen ${date}`}>
                <StyledOfflineBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot">
                    <Avatar alt={profile.partner_name} src={profile.avatar} p={10} />
                </StyledOfflineBadge>
            </Tooltip>
        );
    else {
        return (
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot">
                <Avatar alt={profile.partner_name} src={profile.avatar} p={10} />
            </StyledBadge>
        );
    }
};

export default OnlineBadge;
