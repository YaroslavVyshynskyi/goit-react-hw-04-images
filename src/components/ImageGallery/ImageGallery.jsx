import React from "react";
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types'

const ImageGallery = ({images,  onImageItemClick}) => {

    return (
        <ul className={css.ImageGallery}>
            {images.map((image) => {
                return <ImageGalleryItem key={image.id} image={image} onClick={onImageItemClick} />
            })}
        </ul>
    )
};


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number.isRequired, tags: PropTypes.string.isRequired, webformatURL: PropTypes.string.isRequired}).isRequired).isRequired,
    onImageItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;