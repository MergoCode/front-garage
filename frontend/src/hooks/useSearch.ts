import {useState, useEffect} from "react";
import { useSearchResultsStore } from "../zustandStore/store";
import { defaultValue as freeAudiences } from "../data";

export default function useSearch(value) {
    const [searchResults, setSearchResults] = useState<object[]>([]);
    const [searchError, setSearchError] = useState<string | null>("");
    const setSearch = useSearchResultsStore((state) => state.setData);
    const data = useSearchResultsStore(state => state.data);
    useEffect(() => {
        if (value) {
            console.log(value);
            console.log(typeof value);
            console.log(freeAudiences );
            setSearch(freeAudiences.audiences.filter(el => el.audienceName.includes(value)));
            setSearchResults(data);
        } else {
            setSearchError("Empty input");
            console.log("Empty input");
        }
    }, [value])

    return {searchResults, searchError};

    

}