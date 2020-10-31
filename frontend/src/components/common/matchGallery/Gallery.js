import React from 'react';
import UserCard from './UserCard';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { systemStyles } from '../../../styles/systemStyles';

const Gallery = () => {
    const { match, iEnd } = useSelector((state) => state.match);
    const classes = systemStyles();

    return (
        <Grid container spacing={3} className={classes.pt50}>
            {match.length > 0 &&
                match
                    .filter((elem, i) => i >= 0 && i < iEnd)
                    .map((mat) => {
                        return <UserCard key={mat.user_id} card={mat} />;
                    })}
        </Grid>
    );
};

export default Gallery;
