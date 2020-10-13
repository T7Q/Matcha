import React from "react";
import { Card, CardMedia } from "@material-ui/core";

const CarouselSlide = ({photo}) => {
    return (
        <Card >
            <CardMedia
                component="img"
                alt="img"
                image={`/${photo}`}
                title="Contemplative Reptile"
            /> title
        </Card>
    );
}

export default CarouselSlide
