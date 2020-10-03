import React from 'react';
import { Grid, Box } from '@material-ui/core';

const Form = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit}>
        {children && (
            <Box display="flex" flexDirection="column" textAlign="center">
                {React.Children.map(children, child => React.cloneElement(<Box item>{child}</Box>))}
            </Box>
        )}
    </form>
);

export default Form;
