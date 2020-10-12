import React, { useState } from "react";
import "./slideImage.css";
import CarouselSlide from "./CarouselSlide";
import Slide from "@material-ui/core/Slide";
import { ChevronLeft, ChevronRight }from "@material-ui/icons";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon =
        direction === "left" ? <ChevronLeft /> : <ChevronRight />;

    return <div onClick={clickFunction}>{icon}</div>;
}

const Carousel = ({photos}) => {
    const [index, setIndex] = useState(0);
    const content = photos[index];
    const numSlides = photos.length;

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState();

    const onArrowClick = (direction) => {
        const increment = direction === "left" ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;

        const oppDirection = direction === "left" ? "right" : "left";
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };
    if (numSlides === 0 ) {
        return (
            <></>)
    }

    return (
        <div className="App">
            {numSlides > 1 ? (
                <Arrow
                    direction="left"
                    clickFunction={() => onArrowClick("left")}
                />
            ) : (
                ""
            )}
            <Slide in={slideIn} direction={slideDirection}>
                <div>
                    <CarouselSlide photo={content.image_path} />
                </div>
            </Slide>
            { numSlides > 1 ?
                <Arrow
                    direction="right"
                    clickFunction={() => onArrowClick("right")}
                />
            : ""
            }
        </div>
    );
};

export default Carousel;
