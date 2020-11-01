import React, { Fragment } from 'react';

import { componentStyles } from '../../styles/componentStyles';
import spinner from '../../images/spinner.gif';

const Spinner = () => {
    const classes = componentStyles();

    return (
        <Fragment>
            <img src={spinner} className={classes.spinner} alt="Loading..." />
        </Fragment>
    );
};

export default Spinner;
