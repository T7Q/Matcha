import React, { Fragment, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import UserCard from "./UserCard";
import { Grid } from "@material-ui/core";

const Gallery = ({ match }) => {
    if (match.length < 1) {
        return (
            <Typography variant="h6">
                No matches found.
            </Typography>
        );
    };
    return(
        <Grid container spacing={3}>
            {match.filter((elem, i) => i >= 0 && i < 6).map((mat) => {
                return <UserCard key={mat.user_id} card={mat} />;
            })}
        </Grid>
    )
    // return(
    //     <Grid container spacing={3}>
    //         {match.map((mat) => {
    //             return <UserCard key={mat.user_id} card={mat} />;
    //         })}
    //     </Grid>
    // )
};

export default Gallery;