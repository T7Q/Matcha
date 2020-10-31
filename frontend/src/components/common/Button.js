import React from 'react';
import { Button } from '@material-ui/core';

import { btnStyles } from '../../styles/btnStyles';

const CustomButton = ({ customClass, ...props }) => {
    const classes = btnStyles();

    return (
        <Button className={customClass ? classes[[customClass]] : classes.mainButton} {...props} />
    );
};

export default CustomButton;
