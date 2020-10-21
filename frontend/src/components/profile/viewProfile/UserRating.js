import React from "react";
import { Box } from "@material-ui/core";
import { StarBorder } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "../../../styles/custom";
import { profileStyles } from "../../../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";

const UserRating = ({ profile }) => {
    const classesProf = profileStyles();
    const classes = useStyles();
    const theme = useTheme();

    const StyledRating = withStyles({
        iconFilled: {
            color: "#b5bad3",
        },
    })(Rating);

    return (
        <StyledRating
            name="rating"
            value={parseFloat(profile.fame_rating)}
            max={5}
            precision={0.1}
            readOnly
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
