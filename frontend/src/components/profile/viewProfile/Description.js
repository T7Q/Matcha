import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography, IconButton, Divider, Paper } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';

import { systemStyles } from '../../../styles/systemStyles';

const Description = ({ type }) => {
    const { profile } = useSelector((state) => state.profile);
    const clss = systemStyles();
    const userDescription = [
        {
            key: `desc1`,
            title: 'My self-summary',
            text: profile.bio,
            link: '/profile/me/edit/bio',
        },
        {
            key: `desc2`,
            title: 'My passions',
            text: profile.tags ? profile.tags.join(', ') : '',
            link: '/profile/me/edit/tags',
        },
    ];

    return (
        <List key="desc1">
            {userDescription.map((value, index) => {
                return (
                    <div key={'title' + index}>
                        <Divider light />
                        <Paper
                            className={`${clss.mb20} ${clss.someColor} ${clss.bgSecondary}`}
                            elevation={4}>
                            <ListItem>
                                <Typography variant="h6" className={clss.whiteColor}>
                                    {value.title}
                                </Typography>
                                <ListItemSecondaryAction>
                                    {type === 'myProfile' ? (
                                        <IconButton
                                            edge="end"
                                            component={Link}
                                            to={value.link}
                                            className={clss.someColor}>
                                            <ArrowForwardIos fontSize="small" />
                                        </IconButton>
                                    ) : (
                                        ''
                                    )}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={value.text} />
                            </ListItem>
                        </Paper>
                    </div>
                );
            })}
        </List>
    );
};

export default Description;
