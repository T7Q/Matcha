import React from "react";
import { Typography, Avatar, Button, Box } from "@material-ui/core";
import LikeButton from "../../common/matchGallery/LikeButton";
import UserRating from "./UserRating";
import Dropdown from "./Dropdown";
import Moment from "react-moment";
import CustomizedDialogs from "./CustomizedDialogs";

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
                : differenceInDays = 0
                ? "today"
                : differenceInDays = 1
                ? "yesterday"
                : `a ${differenceInDays} day(s) ago`;
    return str;
};

const Header = ({ profile, type }) => {
    const avatarAlt = profile.first_name + " " + profile.last_name;
    const [open, setOpen] = React.useState(false);
    // const lastSeen = days(profile.last_seen);
    const handleClickOpen = () => {
        setOpen(true);
    };
    console.log("type", type);
    return (
        <Box bgcolor="secondary.main">
            <Typography variant="h6">user id: {profile.user_id}</Typography>
            { type === "otherUser" ? 
            <Typography variant="h6">
                match: {profile.compatibility}%
            </Typography> : ''}
            <Avatar alt={avatarAlt} src={profile.profile_pic_path} />
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Open Images
            </Button>
            <Button color="primary">Edit images</Button>
            <CustomizedDialogs
                open={open}
                setOpen={setOpen}
                profile={profile}
            />
            <Typography variant="h3" noWrap>
                {profile.first_name}{" "}
                {type === "otherUser" ? (
                    <LikeButton card={profile} location={"profile"} />
                ) : (
                    ""
                )}
                <UserRating profile={profile} />
            </Typography>
            {type === "otherUser" ? (
                <Typography variant="h6">
                    {profile.age} *{profile.distance}km away * last seen {days(profile.last_seen)}
                    <Dropdown
                        userId={profile.user_id}
                        blocked={profile.blocked}
                    />
                </Typography>
            ) : (
                ""
            )}
        </Box>
    );
};

export default Header;
