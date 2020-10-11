import React from "react";
import { Typography } from "@material-ui/core";
import ActionsDropdown from "./ActionsDropdown";
import Moment from "react-moment";


const MoreInfo = ({ profile }) => {
    return (
        <>
            <Typography variant="h6">
                {profile.age} *
                {profile.distance}km away *
                last seen{" "}
                <Moment format="DD/MM/YYYY">{profile.last_seen}</Moment>{" "}
                <ActionsDropdown userId={profile.user_id}/>
            </Typography>
        </>
    );
};

export default MoreInfo;
