import React, { Fragment } from 'react';

import { customStyles } from '../../styles/customStyles';
import spinner from './spinner.gif';

export default () => {
    const classes = customStyles();

    return (
        <Fragment>
            <img src={spinner} className={classes.spinner} alt="Loading..." />
        </Fragment>
    );
};
