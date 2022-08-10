import React, { useState }  from "react";
import { IoMdSearch } from 'react-icons/io';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'
import css from "./Searchbar.module.css";

const Searchbar = ({ onSubmit, searchQuery }) => {
    const [search, setSearch] = useState("");

    const handleInputChange = event => {
        setSearch(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (search.trim() === "") {
            toast.info("no images MF")
            return;
        }
        onSubmit(search);
        setSearch("");
    }

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={css.SearchForm__button}>
                    <IoMdSearch className={css.SearchForm__button__icon} />
                </button>

                <input
                    className={css.SearchForm__input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder={searchQuery || "Search images and photos"}
                    value={search}
                    onChange={handleInputChange}
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    searchQuery: PropTypes.string,
};

export default Searchbar;

