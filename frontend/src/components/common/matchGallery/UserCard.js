import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
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

    return (
            <Grid item xs={12} sm={4}>
                {/* <img src={str}></img> */}
                <Card className={classes.root}>
                    {/* <CardMedia
                        className={classes.media}
                        src={require(`"/images/${card.profile_pic_path}"`)}
                        title="Profile_pic"
                    /> */}
                    <CardContent>
                        <Typography
                            className={classes.title}

                            gutterBottom
                        >
                            {card.user_id}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {card.first_name}, {card.age}
                        </Typography>
                        <Typography
                            className={classes.pos}

                        >
                            {card.distance === null ? 0 : card.distance} km
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <StarBorderIcon label="10">10</StarBorderIcon>
                        <Button size="small">{card.match.toFixed(0)}%</Button>
                        <Button size="small">{card.fame === null ? 0 : card.fame.toFixed(1)}</Button>
                        {/* <Connection connected={card.connected} /> */}
                        <IconButton aria-label="chat">
                            {card.connected ?
                            <ChatIcon />:
                                <FavoriteIcon />}
                            </IconButton>
                    </CardActions>
                </Card>
     </Grid>
    );
};

export default UserCard;