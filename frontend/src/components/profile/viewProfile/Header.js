import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Typography, Box, Grid } from '@material-ui/core';

import UserRating from './UserRating';
import Buttons from './Buttons';
import UserAvatar from './UserAvatar';
import Dropdown from './DropdownItem';
import OnlineBadge from './OnlineBadge';
import CustomizedDialog from './CustomizedDialog';
import { profileStyles } from '../../../styles/profileStyles';

const Header = ({ type, updateStatus }) => {
    const { profile } = useSelector((state) => state.profile);
    const { filter, match } = useSelector((state) => state.match);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const classesProf = profileStyles();

    let description = '';
    if (type === 'otherUser') {
        let compatibility = profile.compatibility;

        if (filter.believe_cn === false || filter.believe_west === false) {
            const userInfo = match.find((n) => n.user_id === profile.user_id);
            if (userInfo) {
                compatibility = userInfo.match;
            }
        }
        description = `${profile.age} * ${profile.country} * ${compatibility}% match`;
    }

    return (
        <Box
            bgcolor="secondary.main"
            boxShadow={6}
            pt={4}
            pb={2}
            className={classesProf.backgroundHeader}>
            <Grid container alignItems="flex-end">
                <Grid item xs={12} sm={4} md={3}>
                    {type === 'otherUser' ? (
                        <OnlineBadge profile={profile} handleClickOpen={handleClickOpen} />
                    ) : (
                        <UserAvatar handleClickOpen={handleClickOpen} />
                    )}
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography
                        style={{ overflowWrap: 'break-word' }}
                        variant="h4"
                        className={classesProf.name}>
                        {profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)}
                    </Typography>
                    {type === 'otherUser' && (
                        <Typography variant="body1" className={classesProf.description}>
                            {description}
                            <Dropdown userId={profile.user_id} blocked={profile.blocked} />
                        </Typography>
                    )}
                    <Box className={classesProf.ratingPosition}>
                        <UserRating profile={profile} />
                    </Box>
                </Grid>
                {type === 'otherUser' && (
                    <Grid item xs={12} sm={4} md={6}>
                        <Buttons updateStatus={updateStatus} card={profile} />
                    </Grid>
                )}
            </Grid>

            <CustomizedDialog type={type} open={open} setOpen={setOpen} profile={profile} />
        </Box>
    );
};

export default Header;
