import React from "react";
import { ThreeDots } from 'react-loader-spinner';
import css from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={css.loader__wrap}>
            <ThreeDots
                height="40"
                width="40"
                radius="9"
                color='blue'
                ariaLabel='three-dots-loading'
            />
        </div>    
    )
};

export default Loader;