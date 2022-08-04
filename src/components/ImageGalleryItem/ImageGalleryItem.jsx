import React from "react";
import css from "./ImageGalleryItem.module.css"
import PropTypes from 'prop-types'

const ImageGalleryItem = ({ image, onClick }) => { 
    const { webformatURL, tags, id } = image;
    return (
        <li className={css.ImageGalleryItem} onClick={() => onClick(id)}>
            <img src={ webformatURL } alt={ tags } className={css.ImageGalleryItem__image} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({id: PropTypes.number, tags: PropTypes.string, webformatURL: PropTypes.string}),
    onClick: PropTypes.func,
};

export default ImageGalleryItem;