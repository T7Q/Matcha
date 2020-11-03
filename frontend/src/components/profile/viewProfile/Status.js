import React from 'react';

import { Typography, Divider, ListItem } from '@material-ui/core';
import { Chat, Favorite } from '@material-ui/icons';

import { systemStyles } from '../../../styles/systemStyles';

const Status = ({ status }) => {
    const clss = systemStyles();

    const options = [
        {},
        {
            text: 'You like them!',
            icon: <Favorite className={`${clss.mr10} ${clss.mainClr}`} />,
        },
        {
            text: 'You are connected!',
            icon: <Chat className={`${clss.mr10} ${clss.mainClr}`} />,
        },
        {
            text: 'You like them!',
            icon: <Favorite className={`${clss.mr10} ${clss.mainClr}`} />,
        },
    ];

    if (status < 1 || status > 2) {
        return '';
    }

    return (
        <>
            <ListItem className={clss.justifyContent}>
                {options[status].icon}
                <Typography className={clss.dFlex}>{options[status].text}</Typography>
            </ListItem>
            <Divider className={clss.bgMain} />
        </>
    );
};

export default Status;
