import React from 'react';
import { Typography, Grid } from '@material-ui/core';

// import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
// import FormGroup from "@material-ui/core/FormGroup";
import { ArrowForwardIos, Timeline, VpnKey, TagFaces, MailOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Body = ({ profile }) => {
    // const classes = useStyles();
    // const [dense, setDense] = React.useState(false);
    // const [secondary, setSecondary] = React.useState(false);
    const date = new Date(profile.birth_date).toISOString().slice(0, 16);
    const userData = [
        {
            icon: <TagFaces />,
            text: `${profile.first_name} ${profile.last_name}`,
            link: '/profile/me/edit/name',
        },
        {
            icon: <MailOutline />,
            text: profile.username,
            link: '/profile/me/edit/username',
        },
        {
            icon: <Timeline />,
            text: `${profile.chinese_horo}, ${profile.western_horo}`,
            link: '/profile/me/edit/birthdate',
        },
        {
            icon: <VpnKey />,
            text: `${profile.gender} interested in ${profile.sex_preference}, ${date}`,
            link: '/profile/me/edit/sexPreference',
        },
        {
            icon: <VpnKey />,
            text: `${profile.country}`,
            link: '/profile/me/edit/country',
        },
    ];
    return (
        <Grid container justify="center">
            <Grid container item xs={10} sm={6} justify="center">
                <List>
                    <ListItem>
                        <Typography> My self-summary</Typography>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" component={Link} to="/profile/me/edit/bio">
                                <ArrowForwardIos />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={profile.bio} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="My passions" />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" component={Link} to="/profile/me/edit/tags">
                                <ArrowForwardIos />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={profile.tags ? profile.tags.join(', ') : ''} />
                    </ListItem>
                </List>
            </Grid>
            <Grid container item xs={10} sm={6} justify="center">
                <List style={{ backgroundColor: 'grey', overflow: 'hidden' }}>
                    {userData.map((value, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemIcon>{value.icon}</ListItemIcon>
                                <ListItemText style={{ fill: 'blue' }} primary={value.text} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" component={Link} to={value.link}>
                                        <ArrowForwardIos />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    );
};

export default Body;
