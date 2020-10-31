import React from 'react';
import { useSelector } from 'react-redux';

import { Typography, Divider, ListItem } from '@material-ui/core';
import { Chat, Favorite } from '@material-ui/icons';

import { systemStyles } from '../../../styles/systemStyles';

const Status = ({ type }) => {
    const { profile } = useSelector((state) => state.profile);
    const clss = systemStyles();

    const options = [
        {
            text: 'You like them!',
            icon: <Favorite className={`${clss.mr10} ${clss.mainClr}`} />,
        },
        {
            text: 'You are connected!',
            icon: <Chat className={`${clss.mr10} ${clss.mainClr}`} />,
        },
    ];

    const index = profile.connected === 1 ? 0 : profile.connected === 2 ? 1 : '';

    if (type !== 'otherUser' && profile.blocked === '1') {
        return '';
    }

    return (
        <>
            {profile.connected === 1 || profile.connected === 2 ? (
                <>
                    <ListItem className={clss.justifyContent}>
                        {options[index].icon}
                        <Typography className={clss.dFlex}>{options[index].text}</Typography>
                    </ListItem>
                    <Divider className={clss.bgMain} />
                </>
            ) : (
                ''
            )}
        </>
    );
};

export default Status;
