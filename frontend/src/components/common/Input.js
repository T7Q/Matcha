import React, { Fragment } from 'react';
import { Typography, TextField, Box } from '@material-ui/core';

import { componentStyles } from '../../styles/componentStyles';

const Input = ({ customClass, value, header, type, handleChange, placeholder, ...rest }) => {
    const classes = componentStyles();

    return (
        <Fragment>
            {header && (
                <Box py={2}>
                    <Typography variant="h5">{header}</Typography>
                </Box>
            )}
            <TextField
                error={rest.helperText ? true : false}
                variant="outlined"
                name={rest.name ? rest.name : [type][0]}
                type={
                    type === 'confirmPassword'
                        ? 'password'
                        : type === 'email' || type === 'password' || type === 'date'
                        ? [type][0]
                        : 'text'
                }
                className={customClass ? classes[[customClass]] : classes.input}
                placeholder={placeholder ? placeholder : [type][0]}
                value={value}
                onChange={handleChange}
                {...rest}
            />
        </Fragment>
    );
};

export default Input;
