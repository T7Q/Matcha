import React from "react";
import { CardActions, CardContent, Box, Tooltip } from "@material-ui/core";
import { CardMedia, CardActionArea, IconButton } from "@material-ui/core";
import { Typography, Grid, Card } from "@material-ui/core";

import { StarBorder, Brightness1 } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import { galleryStyles } from "../../../styles/galleryStyles";
import { profileStyles } from "../../../styles/profileStyles";

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const UserCard = ({ card }) => {
    const classesGallery = galleryStyles();
    const classesProf = profileStyles();

    card.fame = parseFloat(card.fame);
    const linkToProfile = `/profile/${card.user_id}`;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classesGallery.card}>
                <CardActionArea component={Link} to={linkToProfile}>
                    <CardMedia
                        className={classesGallery.cardMedia}
                        component="img"
                        alt="profile pic"
                        image={card.profile_pic_path}
                    />
                    <CardContent className={classesGallery.cardContent}>
                        <Typography
                            variant="h6"
                            className={classesGallery.title}
                        >
                            {card.first_name}, {card.age}
                        </Typography>
                        <Typography
                            variant="body2"
                        >
                            {card.distance === null
                                ? 0
                                : numberWithCommas(card.distance)}{" "}
                            km away
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classesGallery.cardActions}>
                    <Box className={classesGallery.cardActionBox}>
                        <Tooltip
                            title="Your astro compatibility level"
                            placement="top"
                        >
                            <IconButton className={classesGallery.bgIcon}>
                                <Brightness1
                                    fontSize="medium"
                                    className={classesGallery.textOverIcon}
                                />
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            className={classesGallery.textOver}
                            disabled
                            fontSize="medium"
                        >
                            {card.match.toFixed(0)}%
                        </IconButton>
                    </Box>
                    <Box
                        className={classesGallery.cardActionBox}
                    >
                        <Tooltip
                            title={`User fame rating ${card.fame.toFixed(1)}`}
                            placement="top"
                        >
                            <IconButton className={classesGallery.bgIcon}>
                                <Rating
                                    name="customized-10"
                                    max={1}
                                    value={card.fame.toFixed(1) / 5}
                                    precision={0.2}
                                    className={classesGallery.rating}
                                    readOnly
                                    emptyIcon={
                                        <StarBorder
                                            className={classesProf.ratingColor}
                                        />
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <LikeButton card={card} location={"userCard"} />
                </CardActions>
            </Card>
        </Grid>
    );
};

export default UserCard;
