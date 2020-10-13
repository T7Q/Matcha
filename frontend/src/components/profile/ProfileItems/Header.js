import React from "react";
import { Typography, Avatar, Button } from "@material-ui/core";
import LikeButton from "../../common/matchGallery/LikeButton";
import UserRating from "./UserRating";
import Dropdown from "./Dropdown";
import Moment from "react-moment";
import CustomizedDialogs from "./CustomizedDialogs";

const Header = ({ profile, type }) => {
    const avatarAlt = profile.first_name + " " + profile.last_name;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <Typography variant="h6">user id: {profile.user_id}</Typography>
            <Avatar alt={avatarAlt} src={"/" + profile.profile_pic_path} />
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Open dialog
            </Button>
            <CustomizedDialogs open={open} setOpen={setOpen} profile={profile}/>
            <Typography variant="h3">
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
                    {profile.age} *{profile.distance}km away * last seen{" "}
                    <Moment format="DD/MM/YYYY">{profile.last_seen}</Moment>{" "}
                    <Dropdown
                        userId={profile.user_id}
                        blocked={profile.blocked}
                    />
                </Typography>
            ) : (
                ""
            )}
        </>
    );
};

export default Header;
