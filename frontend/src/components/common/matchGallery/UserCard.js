import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Tooltip } from "@material-ui/core";
import { CardActions, Button, CardContent, Box } from "@material-ui/core";
import { CardMedia, CardActionArea, IconButton } from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";

import { StarBorderOutlined, RadioButtonUncheckedOutlined } from "@material-ui/icons";
// import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';

import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

// import { useStyles } from "../../../styles/custom";
import { useTheme } from "@material-ui/core/styles";
import { galleryStyles } from "../../../styles/galleryStyles";

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const UserCard = ({ card }) => {
    const theme = useTheme();
    const classes = useStyles();
    const classesGallery = galleryStyles();

    card.fame = parseFloat(card.fame);

    const link = card.connected ? "/messages" : `/profile/${card.user_id}`;
    const linkToProfile = `/profile/${card.user_id}`;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
                // lassName={classes.root}
                className={classesGallery.card}
            >
                <CardActionArea component={Link} to={linkToProfile}>
                    <CardMedia
                        className={classesGallery.cardMedia}
                        component="img"
                        alt="profile pic"
                        image={card.profile_pic_path}
                    />
                </CardActionArea>
                <CardContent
                    className={classesGallery.cardContent}
                    style={{
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Typography
                        variant="h6"
                        className={classesGallery.title}
                        component="h2"
                    >
                        {card.first_name}, {card.age}
                    </Typography>
                    <Typography
                        variant="body2"
                        className={classesGallery.distance}
                    >
                        {card.distance === null ? 0 : card.distance} km away
                    </Typography>
                </CardContent>
                <CardActions className={classesGallery.cardActions}>
                    <Box
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                    >
                        <Tooltip title="Your astro compatibility level" placement="top">
                            <IconButton
                                className={classesGallery.bgIcon}
                            >
                                <RadioButtonUncheckedOutlined
                                    // color="primary"
                                    style={{color: theme.palette.text.secondary}}
                                    fontSize="large"
                                    className={classesGallery.textOverIcon}
                                />
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            className={classesGallery.textOver}
                            disabled
                            fontSize="large"
                        >
                            {card.match.toFixed(0)}%
                        </IconButton>
                    </Box>
                    <Box
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                    >
                        <Tooltip title="User fame rating" placement="top">                        
                        <IconButton className={classesGallery.bgIcon} >
                            <StarBorderOutlined
                                style={{color: theme.palette.text.secondary}}
                                fontSize="large"
                                className={classesGallery.textOverIcon}
                            />
                        </IconButton>
                        </Tooltip>
                        <IconButton
                            className={classesGallery.textOver}
                            disabled
                            fontSize="large"
                        >
                            {card.fame === null ? 0 : card.fame.toFixed(1)}
                        </IconButton>
                    </Box>
                    <LikeButton card={card} location={"userCard"} />
                </CardActions>
            </Card>
        </Grid>
    );
};
// {card.connected ? <Chat /> :

export default UserCard;
