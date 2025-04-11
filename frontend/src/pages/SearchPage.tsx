import React, { useRef, useState } from "react";
import '../css/SearchPage.sass'
import useSearch from "../hooks/useSearch";
import { useSearchResultsStore } from "../zustandStore/store";
import { useNavigate } from "react-router";
const SearchPage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string | null>();
    const {searchResults, searchError} = useSearch(query);
    const setSearchData = useSearchResultsStore((state) => state.setData);
    const navigate = useNavigate();
    const handleSearch = () => {
        if (inputRef.current) {
            setQuery(inputRef.current.value);
        }
        console.log(searchResults);
        navigate("/search-results");
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