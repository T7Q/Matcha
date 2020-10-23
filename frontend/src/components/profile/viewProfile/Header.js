import React, { useState } from "react";
import { Typography, Avatar, Box, Grid } from "@material-ui/core";
import UserRating from "./UserRating";
import Buttons from "./Buttons";
import Dropdown from "./DropdownItem";
import OnlineBadge from "./OnlineBadge";
import CustomizedDialog from "./CustomizedDialog";
import { profileStyles } from "../../../styles/profileStyles";

const Header = ({ profile, type }) => {
    const [open, setOpen] = useState(false);
    const avatarAlt = profile.first_name + " " + profile.last_name;
    const handleClickOpen = () => {
        setOpen(true);
    };

    let description = "";
    if (type === "otherUser") {
        description = `${profile.age} * ${profile.country} * ${profile.compatibility}% match`;
    }

    const classesProf = profileStyles();
    return (
        <Box bgcolor="secondary.main" boxShadow={6} pt={4} pb={2}>
            <Grid container alignItems="flex-end">
                <Grid item xs={12} sm={4} md={3}>
                    {type === "otherUser" ? (
                        <OnlineBadge
                            profile={profile}
                            handleClickOpen={handleClickOpen}
                        />
                    ) : type === "myProfile" ? (
                        <Avatar
                            className={classesProf.avatarImageStyle}
                            onClick={handleClickOpen}
                            alt={avatarAlt}
                            src={profile.profile_pic_path}
                            p={10}
                        />
                    ) : (
                        ""
                    )}
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                    <Typography
                        variant="h4"
                        // nowrap
                        className={classesProf.name}
                    >
                        {profile.first_name}
                    </Typography>
                    {type === "otherUser" ? (
                        <Typography
                            variant="body1"
                            className={classesProf.description}
                        >
                            {description}
                            <Dropdown
                                userId={profile.user_id}
                                blocked={profile.blocked}
                            />
                        </Typography>
                    ) : (
                        ""
                    )}
                    <Box className={classesProf.ratingPosition}>
                        <UserRating profile={profile} />
                    </Box>
                </Grid>
                {type === "otherUser" ? (
                    <Grid item xs={12} sm={4} md={6}>
                        <Buttons card={profile} />
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>

            <CustomizedDialog
                type={type}
                open={open}
                setOpen={setOpen}
                profile={profile}
            />
        </Box>
    );
};

export default Header;
