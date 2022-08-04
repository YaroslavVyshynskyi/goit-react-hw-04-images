import React, { Component } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css"
import PropTypes from 'prop-types'

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
    
    componentDidMount() { 
        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() { 
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === "Escape") {
            this.props.onClose();
        }
    };
    
    handleBackdropClick = event => { 
        if (event.currentTarget === event.target) { 
            this.props.onClose();
        }
    }

    render() { 
        const { largeImageURL, tags } = this.props.image;
        return createPortal(
            <div className={css.Modal__backdrop} onClick={this.handleBackdropClick} >
                <div className={css.Modal__content}>
                    <img src={largeImageURL} alt={tags}></img>
                </div>
            </div>,
            modalRoot,
        );
    }
};

Modal.propTypes = {
    image: PropTypes.shape({tags: PropTypes.string, largeImageURL: PropTypes.string}),
    onClose: PropTypes.func,
};

export default Modal;