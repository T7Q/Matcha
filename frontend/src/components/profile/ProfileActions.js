import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const ProfileActions = () => {
    return (
        <>
            {/* <Button variant="contained">Edit</Button> */}
            <IconButton>
                <ArrowForwardIosIcon />
            </IconButton>
        </>
    );
};

export default ProfileActions;
