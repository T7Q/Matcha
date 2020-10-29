import React from 'react';
import { useSelector } from 'react-redux';

import { Typography, Divider, ListItem } from '@material-ui/core';
import { Chat, Favorite } from '@material-ui/icons';

import { profileStyles } from '../../../styles/profileStyles';

const Status = ({ type }) => {
    const { profile } = useSelector((state) => state.profile);
    const classesProf = profileStyles();

    const options = [
        { text: 'You like them!', icon: <Favorite className={classesProf.connectionStyle} /> },
        { text: 'You are connected!', icon: <Chat className={classesProf.connectionStyle} /> },
    ];

    const index = profile.connected === 1 ? 0 : profile.connected === 2 ? 1 : '';

    if (type !== 'otherUser' && profile.blocked === '1') {
        return '';
    }

    return (
        <>
            {profile.connected === 1 || profile.connected === 2 ? (
                <>
                    <ListItem style={{ justifyContent: 'center' }}>
                        {options[index].icon}
                        <Typography style={{ display: 'flex' }}>{options[index].text}</Typography>
                    </ListItem>
                    <Divider className={classesProf.divider} />
                </>
            ) : (
                ''
            )}
        </>
    );
};

export default Status;
