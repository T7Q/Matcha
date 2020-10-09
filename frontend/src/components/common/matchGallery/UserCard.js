import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router-dom';

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
    // console.log("card", card);
    console.log("card", card);
    const handleRedirect = newRoute => {
        // history.push(newRoute);
        console.log("clicked");
        // return <Redirect to=`/profile/${card.user_id}` />
        return <Redirect to="/Likes" />
    
        // return <Link to={`/profile/${card.user_id}`} className='btn btn-primary' >visit profile</Link> 
    };
    const sendto = `/profile/${card.user_id}`;
    console.log("sendto", sendto);
    return (
        <Grid item xs={12} sm={4}>
            <Card className={classes.root}>
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
                <CardActions>
                    <StarBorderIcon label="10">10</StarBorderIcon>
                    <Button size="small">{card.match.toFixed(0)}%</Button>
                    <Button size="small">
                        {card.fame === null ? 0 : card.fame.toFixed(1)}
                    </Button>
                    {/* <Connection connected={card.connected} /> */}
                    <Link to={sendto} className='btn btn-primary' >visit profile</Link> 
                    <IconButton aria-label="chat" onClick={() => handleRedirect()}>
                        {/* {card.connected ? <ChatIcon /> : <FavoriteIcon onClick={() => { alert('clicked') }}/>} */}
                        {card.connected ? <ChatIcon /> : <FavoriteIcon />}
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default UserCard;
