import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Typography, Grid, IconButton, Divider, Container, Paper } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Timeline, AssignmentIndOutlined, Favorite, VpnKeyOutlined } from '@material-ui/icons';
import { ArrowForwardIos, BubbleChartOutlined, Chat, LocationOnOutlined } from '@material-ui/icons';

import { profileStyles } from '../../../styles/profileStyles';
// import store from '../../../store';

const Body = ({ type }) => {
    const { profile } = useSelector((state) => state.profile);
    // const temp = profile.blocked;
    // const temp = store.getState().profile;
    // console.log('temp', temp);

    const classesProf = profileStyles();

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

    const date = new Date(profile.birth_date).toLocaleDateString();
    let orientation = '';
    if (
        profile.sex_orientation === 'straight_man' ||
        profile.sex_orientation === 'straight_woman'
    ) {
        orientation = 'straight';
    } else if (profile.sex_orientation === 'bi_man' || profile.sex_orientation === 'bi_woman') {
        orientation = 'bisexual';
    } else {
        orientation = profile.sex_orientation;
    }
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
        <Container>
            <Grid container justify="center" spacing={6}>
                <Grid container item xs={10} sm={8} justify="center">
                    <List key="desc1">
                        {userDescription.map((value, index) => {
                            return (
                                <div key={'title' + index}>
                                    <Divider light />
                                    <Paper className={classesProf.paper} elevation={4}>
                                        <ListItem>
                                            <Typography variant="h6" style={{ color: 'white' }}>
                                                {value.title}
                                            </Typography>
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
                                        <ListItem>
                                            <ListItemText primary={value.text} />
                                        </ListItem>
                                    </Paper>
                                </div>
                            );
                        })}
                    </List>
                </Grid>
                <Grid container item xs={10} sm={4} justify="center">
                    <List
                        key="desc2"
                        // style={{ backgroundColor: 'inherit', overflow: 'hidden' }}
                    >
                        {type === 'otherUser' &&
                        profile.connected === 1 &&
                        profile.blocked !== '1' ? (
                            <>
                                <ListItem
                                // style={{ justifyContent: 'center' }}
                                >
                                    <Favorite className={classesProf.connectionStyle} />
                                    <Typography style={{ display: 'flex' }}>
                                        You like them!
                                    </Typography>
                                </ListItem>
                                <Divider className={classesProf.divider} />
                            </>
                        ) : (
                            ''
                        )}
                        {type === 'otherUser' &&
                        profile.connected === 2 &&
                        profile.blocked !== '1' ? (
                            <>
                                <ListItem style={{ justifyContent: 'center' }}>
                                    <Chat className={classesProf.connectionStyle} />
                                    <Typography
                                    //  style={{ display: 'flex' }}
                                    >
                                        You are connected!
                                    </Typography>
                                </ListItem>
                                <Divider className={classesProf.divider} />
                            </>
                        ) : (
                            ''
                        )}
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
                </Grid>
            </Grid>
        </Container>
    );
};

export default Body;
