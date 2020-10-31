import React, { Fragment } from 'react';

import { componentStyles } from '../../styles/componentStyles';
import spinner from '../../images/spinner.gif';

export default () => {
    const classes = componentStyles();

    return (
        <Fragment>
            <img src={spinner} className={classes.spinner} alt="Loading..." />
        </Fragment>
    );
};
