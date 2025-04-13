import {useState, useEffect} from "react";
import { useSearchResultsStore } from "../zustandStore/store";
import { defaultValue as freeAudiences } from "../data";

export default function useSearch(value) {
    const [searchResults, setSearchResults] = useState<object[]>([]);
    const [searchError, setSearchError] = useState<string | null>("");
    const setSearch = useSearchResultsStore((state) => state.setData);
    const setError = useSearchResultsStore(state => state.setError);
    const data = useSearchResultsStore(state => state.data);
    useEffect(() => {
        if (value) {
            if (freeAudiences.audiences.filter(el => el.audienceName.includes(value)).length > 0) {
            setSearch(freeAudiences.audiences.filter(el => el.audienceName.includes(value)));
            
            setSearchResults(data);
            } else {
                console.log(freeAudiences.audiences.filter(el => el.audienceName.includes(value)).length);
                setSearch([]);
                setSearchError("Немає результатів");
                setError("Немає результатів");
            }
        } else {
            setSearch(freeAudiences.audiences);
        }
        
    }, [value])

    return {searchResults, searchError};

    

}