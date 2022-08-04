import React from "react";
import { Component } from "react";
import css from "./ImageGalleryItem.module.css"
import PropTypes from 'prop-types'
class ImageGalleryItem extends Component { 

    render() {
        const { webformatURL, tags, id } = this.props.image;
        return (
            <li className={css.ImageGalleryItem} onClick={() => this.props.onClick(id)}>
                <img src={ webformatURL } alt={ tags } className={css.ImageGalleryItem__image} />
            </li>
        );
    };
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({id: PropTypes.number, tags: PropTypes.string, webformatURL: PropTypes.string}),
    onClick: PropTypes.func,
};

export default ImageGalleryItem;