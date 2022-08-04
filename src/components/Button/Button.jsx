import React from "react";
import css from "./Button.module.css";
import PropTypes from 'prop-types'

const Button = ({ onClick }) => {
    return (
        <button onClick={onClick} type="button" className={css.Button}>Load More</button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
}

export default Button;

