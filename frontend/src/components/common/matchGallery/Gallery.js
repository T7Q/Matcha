import React from "react";
import Typography from "@material-ui/core/Typography";
import UserCard from "./UserCard";
import { Grid } from "@material-ui/core";

const Gallery = ({ match, iEnd }) => {
    // console.log("GALLERY iEnd");
    if (match.length < 1) {
        return (
            <Typography mt={4} pt={4} variant="h6">
                No matches found.
            </Typography>
        );
    }
    return (
        <Grid container spacing={3} style={{ paddingTop: "50px" }}>
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
