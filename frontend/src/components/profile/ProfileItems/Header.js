import React from "react";
import { Typography, Avatar, Badge, Box, Grid } from "@material-ui/core";
import { ListItem, IconButton, Link, Button } from "@material-ui/core";
import { Favorite, Chat, Close } from "@material-ui/icons";
import LikeButton from "../../common/matchGallery/LikeButton";
import UserRating from "./UserRating";
import Dropdown from "./Dropdown";
import Moment from "react-moment";
import CustomizedDialogs from "./CustomizedDialogs";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));



const Header = ({ profile, type }) => {
    const avatarAlt = profile.first_name + " " + profile.last_name;
    const [open, setOpen] = React.useState(false);
    // const lastSeen = days(profile.last_seen);
    const handleClickOpen = () => {
        setOpen(true);
    };

    let description = "";
    if (type === "otherUser") {
        description = `${profile.age} * ${
            profile.country
        } * ${profile.compatibility.toFixed(0)}% match`;
    };

    return (
        <Box bgcolor="secondary.main">
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                    {type === "otherUser" ? (
                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            variant="dot"
                        >
                            <Avatar
                                onClick={handleClickOpen}
                                alt="user profile"
                                src={profile.profile_pic_path}
                            />
                        </StyledBadge>
                    ) : (
                        <Avatar
                            onClick={handleClickOpen}
                            alt={avatarAlt}
                            src={profile.profile_pic_path}
                        />
                    )}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="h3" noWrap>
                        {profile.first_name} id:{profile.user_id}
                    </Typography>
                    {type === "otherUser" ? (
                        <Typography variant="h6" style={{ display: "flex" }}>
                            {description}
                            <Dropdown
                                userId={profile.user_id}
                                blocked={profile.blocked}
                            />
                        </Typography>
                    ) : (
                        ""
                    )}
                    <UserRating profile={profile} />
                </Grid>
                {type === "otherUser" ? (
                    <Grid item xs={6} sm={6}>
                        <Button
                            variant="outlined"
                            variant="contained"
                            color="primary"
                            startIcon={<Close />}
                        >
                            Close
                        </Button>
                        <LikeButton card={profile} location={"profile"} />
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>
            <CustomizedDialogs
                open={open}
                setOpen={setOpen}
                profile={profile}
            />
        </Box>
    );
};

export default Header;
