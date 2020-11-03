import React from 'react';
import { Link } from 'react-router-dom';
import { CardActions, CardContent, Box, Tooltip } from '@material-ui/core';
import { CardMedia, CardActionArea, IconButton } from '@material-ui/core';
import { Typography, Grid, Card } from '@material-ui/core';
import { StarBorder, Brightness1 } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';

import LikeButton from './LikeButton';
import { galleryStyles } from '../../../styles/galleryStyles';

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const UserCard = ({ card }) => {
    const classes = galleryStyles();

    card.fame = parseFloat(card.fame);
    const linkToProfile = `/profile/${card.user_id}`;
    const onMediaFallback = (event) => (event.target.src = '/default.png');

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
                <CardActionArea component={Link} to={linkToProfile}>
                    <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        alt="profile pic"
                        image={card.profile_pic_path ? card.profile_pic_path : '/default.png'}
                        onError={onMediaFallback}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6" className={classes.title}>
                            {card.first_name}, {card.age}
                        </Typography>
                        <Typography variant="body2">
                            {card.distance === null ? 0 : numberWithCommas(card.distance)} km away
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Box className={classes.cardActionBox}>
                        <Tooltip title="Your astro compatibility level" placement="top">
                            <IconButton className={classes.p5}>
                                <Brightness1 className={classes.fillPrimary} />
                            </IconButton>
                        </Tooltip>
                        <IconButton className={classes.textOver} disabled>
                            {card.match}%
                        </IconButton>
                    </Box>
                    <Box className={classes.cardActionBox}>
                        <Tooltip title={`User fame rating ${card.fame.toFixed(1)}`} placement="top">
                            <IconButton className={classes.p5}>
                                <Rating
                                    name="customized-10"
                                    max={1}
                                    value={card.fame.toFixed(1) / 5}
                                    precision={0.2}
                                    className={classes.rating}
                                    readOnly
                                    emptyIcon={<StarBorder className={classes.someColor} />}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <LikeButton card={card} location={'userCard'} />
                </CardActions>
            </Card>
        </Grid>
    );
};

export default UserCard;
