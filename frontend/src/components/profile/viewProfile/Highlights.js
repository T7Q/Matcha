import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { ListItemSecondaryAction } from '@material-ui/core';
import { Timeline, AssignmentIndOutlined, VpnKeyOutlined } from '@material-ui/icons';
import { ArrowForwardIos, BubbleChartOutlined, LocationOnOutlined } from '@material-ui/icons';

import { profileStyles } from '../../../styles/profileStyles';
import Status from './Status';

const Highlights = ({ type }) => {
    const { profile } = useSelector((state) => state.profile);
    const classesProf = profileStyles();

    const date = new Date(profile.birth_date).toLocaleDateString();
    
    const orientation =
        profile.sex_orientation === 'straight_man' || profile.sex_orientation === 'straight_woman'
            ? 'straight'
            : profile.sex_orientation === 'bi_man' || profile.sex_orientation === 'bi_woman'
            ? 'bisexual'
            : profile.sex_orientation;

    const gender = profile['gender'].charAt(0).toUpperCase() + profile['gender'].slice(1);

    const userData = [
        {
            icon: <AssignmentIndOutlined />,
            text: `${profile.first_name} ${profile.last_name}`,
            link: '/profile/me/edit/name',
        },
        {
            icon: <VpnKeyOutlined />,
            text: profile.username,
            link: '/profile/me/edit/username',
        },
        {
            icon: <Timeline />,
            text: `${profile.chinese_horo}, ${profile.western_horo}, ${date}`,
            link: '/profile/me/edit/birthdate',
        },
        {
            icon: <BubbleChartOutlined />,
            text: `${gender}, ${orientation}`,
            link: '/profile/me/edit/sexPreference',
        },
        {
            icon: <LocationOnOutlined />,
            text: type === 'myProfile' ? `${profile.country}` : `${profile.distance} km away`,
            link: '/profile/me/edit/country',
        },
    ];
    return (
        <List key="desc2">
            {type === 'otherUser' && profile.blocked !== '1' && <Status type={type} />}
            {userData.map((value, index) => {
                return (
                    <ListItem key={'info' + index} className={classesProf.listItem}>
                        <ListItemIcon className={classesProf.listIconStyle}>
                            {value.icon}
                        </ListItemIcon>
                        <ListItemText
                            style={{ fontSize: '0.5em', margin: 0 }}
                            primary={value.text}
                        />
                        <ListItemSecondaryAction>
                            {type === 'myProfile' ? (
                                <IconButton
                                    edge="end"
                                    component={Link}
                                    to={value.link}
                                    className={classesProf.editBtn}>
                                    <ArrowForwardIos fontSize="small" />
                                </IconButton>
                            ) : (
                                ''
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default Highlights;
