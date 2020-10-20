import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

import { profileStyles } from '../../../styles/profileStyles';

const UserRating = ({ profile }) => {
    const classesProf = profileStyles();
    return (
        <>
            {/* <Box component="fieldset" mb={3} borderColor="transparent"
                className={classesProf.rating}
            > */}
                <Rating
                    name="read-only"
                    value={parseFloat(profile.fame_rating)}
                    max={5}
                    precision={0.1}
                    readOnly
                    styledrating={{ color: "white" }}
                />
            {/* </Box> */}
        </>
    );
};

export default UserRating;
