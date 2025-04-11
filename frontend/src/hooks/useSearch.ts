import {useState, useEffect} from "react";



export default function useSearch(value) {
    const [searchResults, setSearchResults] = useState<object[]>([]);
    const [searchError, setSearchError] = useState<string | null>("");
    useEffect(() => {
        console.log(value);
        if (value) {
            setSearchResults([{name: "Happy"}]);
            console.log(searchResults);
        } else {
            setSearchResults([]);
            setSearchError("Empty input");
            console.log("Empty input");
        }
    }, [value])

    return {searchResults, searchError};

    

}