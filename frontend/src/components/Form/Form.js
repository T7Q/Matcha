import React from 'react';
import { Grid } from '@material-ui/core';

const Form = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit}>
        {children && (
            <Grid container spacing={1} direction='column'>
                {React.Children.map(children, child => React.cloneElement(<Grid item>{child}</Grid>))}
            </Grid>
        )}
    </form>
);

export default Form;
