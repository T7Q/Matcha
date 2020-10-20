import React, { useState } from 'react';
import { Typography, Avatar, Badge, Box, Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';
import UserRating from './UserRating';
import Buttons from './Buttons';
import CustomizedDialog from './CustomizedDialog';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Dropdown from './DropdownItem';

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
    // const lastSeen = days(profile.last_seen);
    const handleClickOpen = () => {
        setOpen(true);
    };

    let description = '';
    if (type === 'otherUser') {
        description = `${profile.age} * ${profile.country} * ${profile.compatibility}% match`;
    }

    const lastSeen = `last seen ${days(profile.last_seen)}`;
    // let color = profile.online === 1 ? { color: "#44b700", backgroundColor: "#44b700" } : { color: "grey", backgroundColor: "grey" };

    return (
        <Box bgcolor="secondary.main">
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        {type === 'otherUser' ? (
                            <Tooltip title={profile.online === 0 ? lastSeen : ''}>
                                <StyledBadge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot">
                                    <Avatar
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
                            <Avatar onClick={handleClickOpen} alt={avatarAlt} src={profile.profile_pic_path} />
                        ) : (
                            ''
                        )}
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h3" noWrap>
                            {profile.first_name} id:{profile.user_id}
                        </Typography>
                        {type === 'otherUser' ? (
                            <Typography variant="h6" style={{ display: 'flex' }}>
                                {description}
                                <Dropdown userId={profile.user_id} blocked={profile.blocked} />
                            </Typography>
                        ) : (
                            ''
                        )}
                        <UserRating profile={profile} />
                    </Grid>
                    {type === 'otherUser' ? (
                        <Grid item xs={6} sm={6}>
                            <Buttons card={profile} />
                        </Grid>
                    ) : (
                        ''
                    )}
                </Grid>
                <CustomizedDialog type={type} open={open} setOpen={setOpen} profile={profile} />
            </Container>
        </Box>
    );
};

export default Header;
