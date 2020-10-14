import React from "react";
import { Typography, Grid } from "@material-ui/core";

// import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
// import FormGroup from "@material-ui/core/FormGroup";
import {
    ArrowForwardIos,
    Timeline,
    VpnKey,
    TagFaces,
    MailOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const Body = ({ profile }) => {
    // const classes = useStyles();
    // const [dense, setDense] = React.useState(false);
    // const [secondary, setSecondary] = React.useState(false);
    const date = new Date(profile.birth_date).toISOString().slice(0, 16);
    const userData = [
        {
            icon: <TagFaces />,
            text: `${profile.first_name} ${profile.last_name}`,
            link: "/messages",
        },
        {
            icon: <MailOutline />,
            text: `${profile.username}`,
            link: "/messages",
        },
        {
            icon: <Timeline />,
            text: `${profile.chinese_horo}, ${profile.western_horo}, ${date}`,
            link: "/likes",
        },
        {
            icon: <VpnKey />,
            text: `${profile.gender} interested in ${profile.sex_preference}`,
            link: "/matches",
        },
        {
            icon: <VpnKey />,
            text: `${profile.country}`,
            link: "/matches",
        },
    ];
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <List>
                    <ListItem>
                        <Typography> My self-summary</Typography>
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                component={Link}
                                to="/messages"
                            >
                                <ArrowForwardIos />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={profile.bio} />
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <ListItemText primary="My passions" />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                component={Link}
                                to="/messages"
                            >
                                <ArrowForwardIos />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={profile.tags} />
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} sm={6}>
                <div>
                    <List 
                    // dense={dense} 
                    style={{ backgroundColor: "grey" }}>
                        {userData.map((value, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemIcon>{value.icon}</ListItemIcon>
                                    <ListItemText
                                        style={{ fill: "blue" }}
                                        primary={value.text}
                                    />
                                    <ListItemSecondaryAction>
                                        <ListItemIcon
                                            edge="end"
                                            aria-label="delete"
                                            component={Link}
                                            to={value.link}
                                        >
                                            <ArrowForwardIos />
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </Grid>
        </Grid>
    );
};

export default Body;
