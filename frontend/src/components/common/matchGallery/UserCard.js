import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardActions, Button, CardContent } from "@material-ui/core";
import { CardMedia, CardActionArea } from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";

import { StarBorder } from "@material-ui/icons";

import { Link } from "react-router-dom";
import LikeButton from './LikeButton';

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

    const link = card.connected
        ? "/messages"
        : `/profile/${card.user_id}`;
    const linkToProfile = `/profile/${card.user_id}`;

    return (
        <Grid item xs={12} sm={4} md={3} lg={2}>
            <Card className={classes.root} className={classesGallery.card}>
                <CardActionArea component={Link} to={linkToProfile}>
                    <CardMedia
                        className={classesGallery.cardMedia}
                        component="img"
                        alt="Contemplative Reptile"
                        image={card.profile_pic_path}
                        title="Contemplative Reptile"
                    />

                    <CardContent className={classesGallery.cardContent} style={{ backgroundColor: theme.palette.secondary.main }}>
                        {/* <Typography className={classes.title} gutterBottom>
                            {card.user_id}
                        </Typography> */}
                        <Typography variant="h6" className={classesGallery.title} component="h2">
                            {card.first_name}, {card.age}
                        </Typography>

                        <Typography variant="body2" className={classes.pos}>
                            {card.distance === null ? 0 : card.distance} km away
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ backgroundColor: theme.palette.secondary.main }}>
                    <StarBorder label="10">10</StarBorder>
                    <Button size="small">{card.match.toFixed(0)}%</Button>
                    <Button size="small" component={Link} to={link}>
                        {card.fame === null ? 0 : card.fame.toFixed(1)}
                    </Button>
                    <LikeButton card={card} location={"userCard"} />
                </CardActions>
            </Card>
        </Grid>
    );
};
// {card.connected ? <Chat /> : 

export default UserCard;
