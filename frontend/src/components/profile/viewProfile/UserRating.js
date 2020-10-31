import React from 'react';
import { StarBorder } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import { profileStyles } from '../../../styles/profileStyles';
import { systemStyles } from '../../../styles/systemStyles';

const UserRating = ({ profile }) => {
    const classesProf = profileStyles();
    const classes = systemStyles();

    return (
        <Rating
            name="rating"
            value={parseFloat(profile.fame_rating)}
            max={5}
            precision={0.1}
            readOnly
            className={classesProf.ratingFill}
            emptyIcon={<StarBorder className={classes.someColor} fontSize="inherit" />}
        />
    );
};

export default UserRating;
