import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const UserRating = ({ profile }) => {
    console.log( "user rating", profile.fame_rating);
    return (
        <>
            <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="read-only" value={profile.fame_rating} max={5} precision={0.1}readOnly styledrating={{color: "white"}}/>
        </Box>
        </>
    );
};

export default UserRating;
