import React, { Fragment } from 'react';
import { Typography, TextField, Box } from '@material-ui/core';
import { useStyles } from '../../styles/custom';

const Input = ({ value, header, type, label, handleChange }) => {
    const classes = useStyles();

    return (
        <Fragment>
            {header && (
                <Box py={2}>
                    <Typography variant="h5" className={classes.customHeader}>
                        {header}
                    </Typography>
                </Box>
            )}
            <TextField
                inputProps={{ style: { textAlign: 'center' } }}
                variant="outlined"
                id={[type][0]}
                name={[type][0]}
                type={
                    type === 'confirmPassword'
                        ? 'password'
                        : type === 'email' || type === 'password' || type === 'date'
                        ? [type][0]
                        : 'text'
                }
                label={label ? label : type}
                className={classes.customInput}
                placeholder={[type][0]}
                value={value}
                onChange={handleChange}
            />
        </Fragment>
    );
};

export default Input;
