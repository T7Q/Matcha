import React from "react";
import ImageGallery from "react-image-gallery";
// import SCSS from "~react-image-gallery/styles/scss/image-gallery.scss";
// import CSS from "~react-image-gallery/styles/css/image-gallery.css";


const images = [
    {
        original: "/Photo_1601037282389_683.png",
    },
    {
        original: "/Photo_1601037282389_683.png",
    },
    {
        original: "/Photo_1601037282389_683.png",
    },
];

const Images = () => {
    console.log("images");
    return (
        <>
            <div>Hello</div>
            <ImageGallery items={images} />
        </>
    );
};

export default Images;
