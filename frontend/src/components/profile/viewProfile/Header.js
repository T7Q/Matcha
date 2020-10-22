import React, { useState } from 'react';
import { Typography, Avatar, Badge, Box, Grid } from '@material-ui/core';
import { Container, useMediaQuery } from '@material-ui/core';
import UserRating from './UserRating';
import { Block } from '@material-ui/icons';
import Buttons from './Buttons';
import Dropdown from './DropdownItem';
import CustomizedDialog from './CustomizedDialog';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { useStyles } from '../../../styles/custom';
import { profileStyles } from '../../../styles/profileStyles';
import { useTheme } from '@material-ui/core/styles';

// calcuate number of days until now
const days = lastSeen => {
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
            : (differenceInDays = 0
                  ? 'today'
                  : (differenceInDays = 1 ? 'yesterday' : `a ${differenceInDays} day(s) ago`));
    return str;
};

const StyledBadge = withStyles(theme => ({
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

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         "& > *": {
//             margin: theme.spacing(1),
//         },
//     },
// }));

const Header = ({ profile, type }) => {
    const [open, setOpen] = useState(false);
    const avatarAlt = profile.first_name + ' ' + profile.last_name;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const theme = useTheme();

    let description = '';
    if (type === 'otherUser') {
        description = `${profile.age} * ${profile.country} * ${profile.compatibility}% match`;
    }

    const lastSeen = `last seen ${days(profile.last_seen)}`;

    const classes = useStyles();
    const classesProf = profileStyles();
    return (
        <Box bgcolor="secondary.main" pt={4}>
            <Grid container alignItems="flex-end">
                <Grid item xs={12} sm={4} md={3}>
                    {type === 'otherUser' ? (
                        <Tooltip title={profile.online === 0 ? lastSeen : ''}>
                            <StyledBadge
                                className={classesProf.avatarImageStyle}
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot">
                                <Avatar
                                    className={classesProf.avatarImageStyle}
                                    onClick={handleClickOpen}
                                    alt="user profile"
                                    src={profile.profile_pic_path}
                                />
                            </StyledBadge>
                        </Tooltip>
                    ) : (
                        ''
                    )}
                    {type === 'myProfile' ? (
                        <Avatar
                            className={classesProf.avatarImageStyle}
                            onClick={handleClickOpen}
                            alt={avatarAlt}
                            src={profile.profile_pic_path}
                            p={10}
                        />
                    ) : (
                        ''
                    )}
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <Typography
                        variant="h4"
                        // nowrap
                        className={classesProf.name}>
                        {profile.first_name}
                    </Typography>
                    {type === 'otherUser' ? (
                        <Typography variant="body1" className={classesProf.description}>
                            {description}
                            <Dropdown userId={profile.user_id} blocked={profile.blocked} />
                        </Typography>
                    ) : (
                        ''
                    )}
                    <Box className={classesProf.ratingPosition}>
                        <UserRating profile={profile} />
                    </Box>
                </Grid>
                {type === 'otherUser' ? (
                    <Grid item xs={12} sm={4} md={6}>
                        <Buttons card={profile} />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>

            <CustomizedDialog type={type} open={open} setOpen={setOpen} profile={profile} />
        </Box>
    );
};

export default Header;
