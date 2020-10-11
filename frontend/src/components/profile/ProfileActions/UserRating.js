import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const UserRating = ({ profile }) => {
    return (
        <>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                    name="read-only"
                    value={parseFloat(profile.fame_rating)}
                    max={5}
                    precision={0.1}
                    readOnly
                    styledrating={{ color: "white" }}
                />
            </Box>
        </>
    );
};

export default UserRating;
