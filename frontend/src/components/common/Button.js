import React from 'react';
import { Button } from '@material-ui/core';

import { btnStyles } from '../../styles/btnStyles';

const CustomButton = ({ ...props }) => {
    const classes = btnStyles();

    return (
        <Button
            className={props.customClass ? classes[[customClass]] : classes.mainButton}
            {...props}
        />
    );
};

export default CustomButton;
