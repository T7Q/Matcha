import React from "react";
// import { Tooltip } from "@material-ui/core";
import { StarBorder } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { profileStyles } from "../../../styles/profileStyles";

const UserRating = ({ profile }) => {
    const classesProf = profileStyles();

    return (
        <Rating
            name="rating"
            value={parseFloat(profile.fame_rating)}
            max={5}
            precision={0.1}
            readOnly
            className={classesProf.ratingFill}
            emptyIcon={
                <StarBorder
                    className={classesProf.ratingColor}
                    fontSize="inherit"
                />
            }
        />
    );
};

export default UserRating;
