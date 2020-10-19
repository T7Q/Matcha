import React from "react";
import { Typography, Grid, IconButton, Divider } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Container } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { Timeline, AssignmentIndOutlined, VpnKeyOutlined } from "@material-ui/icons";
import { ArrowForwardIos, BubbleChartOutlined, LocationOnOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

// calcuate number of days until now
const days = (lastSeen) => {
    const today = new Date();
    const date = new Date(lastSeen);
    let differenceInTime = today.getTime() - date.getTime();
    let differenceInDays = parseInt(differenceInTime / (1000 * 3600 * 24));
    const str =
        differenceInDays > 365
            ? "more than a year ago"
            : differenceInDays > 365
            ? "6 months ago"
            : differenceInDays > 91
            ? "3 months ago"
            : differenceInDays > 31
            ? "a months ago"
            : (differenceInDays = 0
                  ? "today"
                  : (differenceInDays = 1
                        ? "yesterday"
                        : `a ${differenceInDays} day(s) ago`));
    return str;
};

// last seen {days(profile.last_seen)}

const Body = ({ profile, type }) => {
    // const classes = useStyles();
    // const [dense, setDense] = React.useState(false);
    // const [secondary, setSecondary] = React.useState(false);

    const userDescription = [
        {
            key: `desc1`,
            title: "My self-summary",
            text: profile.bio,
            link: "/profile/me/edit/bio",
        },
        {
            key: `desc2`,
            title: "My passions",
            text: profile.tags ? profile.tags.join(", ") : "",
            link: "/profile/me/edit/tags",
        },
    ];

    const date = new Date(profile.birth_date).toLocaleDateString();
    // const preference = profile.sex_preference === "both" ? "men and women" : profile.sex_preference;
    let orientation = "";
    if (profile.sex_orientation === "straight_man" || profile.sex_orientation === "straight_woman"){
        orientation = "straight";
    } else if (profile.sex_orientation === "bi_man" || profile.sex_orientation === "bi_woman") {
        orientation = "bisexual";
    } else {
        orientation = profile.sex_orientation;

    }
    const gender = profile['gender'].charAt(0).toUpperCase() + profile['gender'].slice(1);
    const userData = [
        {
            icon: <AssignmentIndOutlined />,
            text: `${profile.first_name} ${profile.last_name}`,
            link: "/profile/me/edit/name",
        },
        {
            icon: <VpnKeyOutlined />,
            text: profile.username,
            link: "/profile/me/edit/username",
        },
        {
            icon: <Timeline />,
            text: `${profile.chinese_horo}, ${profile.western_horo}, ${date}`,
            link: "/profile/me/edit/birthdate",
        },
        {
            icon: <BubbleChartOutlined />,
            text: `${gender}, ${orientation}`,
            link: "/profile/me/edit/sexPreference",
        },
        {
            icon: <LocationOnOutlined />,
            text: type === "myProfile" ? `${profile.country}` : `${profile.distance} km away, last seen ${days(profile.last_seen)}`,
            link: "/profile/me/edit/country",
        },
    ];
    return (
        <Container>

        
        <Grid container justify="center">
            <Grid container item xs={10} sm={6} justify="center">
                <List key="desc1">
                    {userDescription.map((value, index) => {
                        return (
                            <>
                                <Divider light />
                                <ListItem key={"title" + index}>
                                    <Typography>{value.title}</Typography>
                                        <ListItemSecondaryAction>
                                    {type === "myProfile" ? (
                                            <IconButton
                                                edge="end"
                                                component={Link}
                                                to={value.link}
                                            >
                                                <ArrowForwardIos fontSize="small"/>
                                            </IconButton>
                                    ) : (
                                        ""
                                    )}
                                        </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem key={"text" + index}>
                                    <ListItemText primary={value.text} />
                                </ListItem>
                            </>
                        );
                    })}
                </List>
            </Grid>
            <Grid container item xs={10} sm={6} justify="center">
                    {/* {type === "myProfile" && profile.connected === 1 ? <> <Favorite/><Typography style={{ display: "flex" }}>You like them!<Typography/> </>: ''} */}
                    {/* {type === "otherUser" && profile.connected === 2 ? <Chat/><Typography style={{ display: "flex" }}>You are connected!<Typography/>: ''} */}
                <List key="desc2" style={{ backgroundColor: "grey", overflow: "hidden" }}>
                    {userData.map((value, index) => {
                        return (
                            <ListItem key={"info" + index}>
                                <ListItemIcon>{value.icon}</ListItemIcon>
                                <ListItemText
                                    style={{ fill: "blue" }}
                                    primary={value.text}
                                />
                                    <ListItemSecondaryAction>
                                {type === "myProfile" ? (
                                        <IconButton 
                                            edge="end"
                                            component={Link}
                                            to={value.link}
                                        >
                                            <ArrowForwardIos fontSize="small"/>
                                        </IconButton>
                                ) : (
                                    ""
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
