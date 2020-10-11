import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardActions, Button, CardContent } from "@material-ui/core";
import { CardMedia, CardActionArea } from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";

import { StarBorder } from "@material-ui/icons";

import { Link } from "react-router-dom";
import LikeButton from './LikeButton';

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
    const classes = useStyles();
    card.fame = parseFloat(card.fame);
    // console.log("USERCARD", card);

    const link = card.connected
        ? "/messages"
        : `/profile/${card.user_id}`;
    const linkToProfile = `/profile/${card.user_id}`;

    return (
        <Grid item xs={12} sm={4}>
            <Card className={classes.root}>
                <CardActionArea component={Link} to={linkToProfile}>
                    {/* <CardActionArea > */}
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        //   height="140"
                        image={"/" + card.profile_pic_path}
                        // image="/Photo_1601037282389_683.png"
                        title="Contemplative Reptile"
                    />

                    <CardContent>
                        <Typography className={classes.title} gutterBottom>
                            {card.user_id}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {card.first_name}, {card.age}
                        </Typography>

                        <Typography className={classes.pos}>
                            {card.distance === null ? 0 : card.distance} km
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
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
