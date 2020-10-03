import React from 'react';
import { Box } from '@material-ui/core';

const Form = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit}>
        {children && (
            <Box display="flex" flexDirection="column" textAlign="center">
                {React.Children.map(children, child => React.cloneElement(<Box>{child}</Box>))}
            </Box>
        )}
    </form>
);

export default Form;
