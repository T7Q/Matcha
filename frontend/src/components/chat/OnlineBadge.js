import React from 'react';
import { Badge, Tooltip } from '@material-ui/core';

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

const OnlineBadge = ({ lastSeen }) => {
    // calculate hours ago
    const hours = (date) => {
        const timeNow = new Date();
        let differenceInTime = timeNow.getTime() - date.getTime();
        let differenceInMinutes = parseInt(differenceInTime / (1000 * 60));
        const str =
            differenceInMinutes >= 60
                ? 'more than an hour ago'
                : differenceInTime <= 1000 * 60
                ? 'online'
                : `${differenceInMinutes} minutes ago`;
        return str;
    };

    // calcuate number of days until now
    const days = (lastSeen) => {
        const today = new Date();
        const date = new Date(lastSeen);
        let differenceInTime = today.getTime() - date.getTime();
        let differenceInDays = parseInt(differenceInTime / (1000 * 3600 * 24));
        const str =
            differenceInDays > 365
                ? 'more than a year ago'
                : differenceInDays > 365
                ? '6 months ago'
                : differenceInDays > 91
                ? '3 months ago'
                : differenceInDays > 31
                ? 'a months ago'
                : differenceInDays === 0
                ? hours(date)
                : differenceInDays === 1
                ? 'yesterday'
                : `${differenceInDays} day(s) ago`;
        return str;
    };

    if (lastSeen === 'online' || days(lastSeen) === 'online') {
        return (
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            />
        );
    }

    return (
        <Tooltip title={`last seen ${days(lastSeen)}`}>
            <StyledOfflineBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            />
        </Tooltip>
    );
};

export default OnlineBadge;
