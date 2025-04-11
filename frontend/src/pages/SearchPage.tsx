import React, { useRef, useState } from "react";
import '../css/SearchPage.sass'
import useSearch from "../hooks/useSearch";

const SearchPage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string | null>();
    const {searchResults, searchError} = useSearch(query);
    const handleSearch = () => {
        if (inputRef.current) {
            setQuery(inputRef.current.value);
        }
    }

    return(<div className="search-container">
        <div className="search-upper">
        <div className="search-title">Пошук аудиторій</div>
        </div>
        <div className="search-bottom">
        <div className="input-container">
        <input type="text" className="search-page__input" ref={inputRef} placeholder="Введіть назву аудиторії..."/>
        <button className="search-page__button" onClick={handleSearch}>Пошук</button>
        </div>
        </div>
    </div>)
}

export default SearchPage;