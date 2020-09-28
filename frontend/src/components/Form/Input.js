import React, { Fragment } from 'react';
import { Typography, TextField } from '@material-ui/core';

const Input = ({ value, header, type, label, handleChange }) => (
    <Fragment>
        <Typography>{header}</Typography>
        <TextField
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
            variant='outlined'
            placeholder='{[type][0]}'
            value={value}
            onChange={handleChange}
        />
    </Fragment>
);
// {/* <input
//     className='form-control'
//     name={[type]}
//     type={
//         type === 'confirmPassword'
//             ? 'password'
//             : type === 'email' || type === 'password'
//             ? [type]
//             : 'text'
//     }
//     placeholder={[type]}
//     value={value} // Prop: The email input data
//     onChange={handleChange} // Prop: Puts data into state
// /> */}

export default Input;
