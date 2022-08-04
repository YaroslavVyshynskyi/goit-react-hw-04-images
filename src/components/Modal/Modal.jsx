import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css"
import PropTypes from 'prop-types'

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ image, onClose }) => {
    
    useEffect(() => {
        
        const handleKeyDown = event => {
            if (event.code === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown, true);
        return window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);
    
    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    }

    const { largeImageURL, tags } = image;
    
    return createPortal(
        <div className={css.Modal__backdrop} onClick={handleBackdropClick} >
            <div className={css.Modal__content}>
                <img src={largeImageURL} alt={tags}></img>
            </div>
        </div>,
        modalRoot,
    );
};

Modal.propTypes = {
    image: PropTypes.shape({tags: PropTypes.string, largeImageURL: PropTypes.string}),
    onClose: PropTypes.func,
};

export default Modal;